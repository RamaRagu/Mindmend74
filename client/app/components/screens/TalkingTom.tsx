import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GLView, ExpoWebGLRenderingContext } from "expo-gl";
import { Renderer } from "expo-three";
import { Asset } from "expo-asset";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const { width, height } = Dimensions.get("window");

const TalkingTom = () => {
  const navigation = useNavigation();
  const [modelReady, setModelReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioPermission, setAudioPermission] = useState(false);
  const [recordedURI, setRecordedURI] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackObject, setPlaybackObject] = useState<Audio.Sound | null>(null);
  
  const timeoutRef = useRef<number>();
  const modelRef = useRef<THREE.Group>();
  const mixerRef = useRef<THREE.AnimationMixer>();
  const animationsRef = useRef<THREE.AnimationClip[]>([]);
  const recordingRef = useRef<Audio.Recording | null>(null);
  const animationIntensityRef = useRef<number>(0.5); // Mouth movement intensity
  const activeActionRef = useRef<THREE.AnimationAction | null>(null);
  
  // Request audio permissions on component mount
  useEffect(() => {
    const getPermissions = async () => {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        setAudioPermission(status === 'granted');
        if (status !== 'granted') {
          Alert.alert('Permission required', 'Audio recording permission is required to use this feature');
        }
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
          staysActiveInBackground: false,
        });
      } catch (error) {
        console.error('Error requesting audio permissions:', error);
      }
    };
    
    getPermissions();
  }, []);

  const onContextCreate = async (gl: WebGLRenderingContext) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const sceneColor = 0x000000;

    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(sceneColor);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(sceneColor);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 6);
    camera.lookAt(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0x7ec8ff, 0.7);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);

    try {
      const loader = new GLTFLoader();
      const gltf = await new Promise<GLTF>((resolve, reject) => {
        loader.load(
          require("@/assets/talking_tom_town_talking_angela.glb"),
          (gltf: GLTF) => {
            resolve(gltf);
          },
          undefined,
          reject
        );
      });

      const model = gltf.scene;
      modelRef.current = model;

      // Store animations
      if (gltf.animations && gltf.animations.length > 0) {
        animationsRef.current = gltf.animations;
        mixerRef.current = new THREE.AnimationMixer(model);
      }

      const box = new THREE.Box3().setFromObject(model);
      box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 3.5 / maxDim;
      model.scale.setScalar(scale);

      // Position and rotate the model to face forward
      model.position.set(0, -2, 0);
      model.rotation.y = 0; 

      scene.add(model);
      setModelReady(true);

      // Log available animations for debugging
      console.log(
        "Available animations:",
        gltf.animations.map((a: THREE.AnimationClip) => a.name)
      );
    } catch (error) {
      console.error("Error loading 3D model:", error);
    }

    let lastTime = 0;
    const render = (time = 0) => {
      timeoutRef.current = requestAnimationFrame(render);

      // Update animation mixer
      const deltaTime = (time - lastTime) * 0.001;
      lastTime = time;

      if (mixerRef.current) {
        // Update the animation mixer
        mixerRef.current.update(deltaTime);
        
        // Adjust the timeScale of the active action based on intensity
        if (activeActionRef.current) {
          activeActionRef.current.timeScale = animationIntensityRef.current;
        }
      }

      renderer.render(scene, camera);
      (gl as ExpoWebGLRenderingContext).endFrameEXP();
    };
    render();
  };

  const startTalking = () => {
    if (!mixerRef.current || !animationsRef.current.length) return;

    // Stop any existing animations
    mixerRef.current.stopAllAction();
    activeActionRef.current = null; // Reset the active action

    // Try to find the best talking animation
    const talkingAnimation = animationsRef.current.find(
      (anim: THREE.AnimationClip) =>
        anim.name.toLowerCase().includes("talk") ||
        anim.name.toLowerCase().includes("speak") ||
        anim.name.toLowerCase().includes("mouth") ||
        anim.name.toLowerCase().includes("chat")
    );

    if (talkingAnimation) {
      console.log("Playing animation:", talkingAnimation.name);
      const action = mixerRef.current.clipAction(talkingAnimation);
      action.reset();
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.setEffectiveTimeScale(0.5); // Base timeScale
      action.setEffectiveWeight(1);
      action.play();
      activeActionRef.current = action; // Store active action
    } else if (animationsRef.current.length > 0) {
      // If no talking animation found, use the first available one
      console.log("No talking animation found, using:", animationsRef.current[0].name);
      const action = mixerRef.current.clipAction(animationsRef.current[0]);
      action.reset();
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.setEffectiveTimeScale(0.5); // Base timeScale
      action.setEffectiveWeight(1);
      action.play();
      activeActionRef.current = action; // Store active action
    }
  };

  const stopTalking = () => {
    if (!mixerRef.current) return;
    mixerRef.current.stopAllAction();
  };

  // Start recording function
  const startRecording = async () => {
    if (!audioPermission) {
      Alert.alert('Permission required', 'Audio recording permission is required to use this feature');
      return;
    }

    try {
      // Prepare recording
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync({
        android: {
          extension: '.m4a',
          outputFormat: Audio.AndroidOutputFormat.MPEG_4,
          audioEncoder: Audio.AndroidAudioEncoder.AAC,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: '.m4a',
          outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
          audioQuality: Audio.IOSAudioQuality.HIGH,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
        web: {
          mimeType: 'audio/webm',
          bitsPerSecond: 128000,
        },
      });
      
      // Start recording
      await recording.startAsync();
      recordingRef.current = recording;
      
      // Start animation
      startTalking();
      
      // Set up audio data subscription to adjust mouth movement
      recording.setOnRecordingStatusUpdate(status => {
        if (status.isRecording) {
          // Update animation intensity based on recording metrics (dBFS)
          const dB = status.metering || -160; // dBFS value or default to very quiet
          const normalizedDb = Math.max(-60, Math.min(0, dB)) / -60; // Normalize between 0 and 1
          const intensity = 0.5 + normalizedDb * 1.5; // Scale appropriately
          animationIntensityRef.current = intensity;
          updateMouthAnimation(intensity);
        }
      });
      
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      Alert.alert('Recording error', 'Could not start recording');
    }
  };

  // Stop recording function
  const stopRecording = async () => {
    if (!recordingRef.current) return;

    try {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      setRecordedURI(uri);
      recordingRef.current = null;
      
      // Stop animation
      stopTalking();
      
      setIsRecording(false);
    } catch (error) {
      console.error('Error stopping recording:', error);
      Alert.alert('Recording error', 'Could not stop recording');
    }
  };

  // Play recording function
  const playRecording = async () => {
    if (!recordedURI) return;
    
    try {
      // Unload any existing playback
      if (playbackObject) {
        await playbackObject.unloadAsync();
      }
      
      // Create new sound object
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri: recordedURI });
      
      // Set up status monitoring for mouth movement sync
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && !status.isBuffering) {
          if (status.isPlaying) {
            const positionMillis = status.positionMillis || 0;
            const oscillation = Math.sin(positionMillis / 100) * 0.5 + 0.5;
            const intensity = oscillation * 2;
            animationIntensityRef.current = intensity;
            updateMouthAnimation(intensity);
          } else if (status.didJustFinish) {
            stopTalking();
            setIsPlaying(false);
          }
        }
      });
      
      // Start playback and animation
      await sound.playAsync();
      setPlaybackObject(sound);
      setIsPlaying(true);
      startTalking();
    } catch (error) {
      console.error('Error playing recording:', error);
      Alert.alert('Playback error', 'Could not play recording');
    }
  };

  // Handle recording button press
  const handleRecordingPress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Handle playback button press
  const handlePlaybackPress = () => {
    if (isPlaying) {
      if (playbackObject) {
        playbackObject.stopAsync();
        setIsPlaying(false);
        stopTalking();
      }
    } else {
      playRecording();
    }
  };

  useEffect(() => {
    return () => {
      // Clean up on unmount
      if (timeoutRef.current) {
        cancelAnimationFrame(timeoutRef.current);
      }
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
      if (recordingRef.current) {
        recordingRef.current.stopAndUnloadAsync();
      }
      if (playbackObject) {
        playbackObject.unloadAsync();
      }
    };
  }, []);

  // This function could be called whenever you get new audio data
  const updateMouthAnimation = (intensity: number) => {
    if (!activeActionRef.current) return;
    
    // Clamp the intensity between 0.2 and 2.0 for reasonable animation speed
    const clampedIntensity = Math.max(0.2, Math.min(2.0, intensity));
    
    // Set the time scale of the animation
    activeActionRef.current.timeScale = clampedIntensity;
    
    // You could also adjust weight for more natural transitions
    // activeActionRef.current.setEffectiveWeight(Math.min(1.0, intensity * 0.5 + 0.5));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Talking Tom</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.modelContainer}>
          <GLView style={styles.glView} onContextCreate={onContextCreate} />
          {!modelReady && (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingCard}>
                <Ionicons name="cube-outline" size={40} color="#007AFF" />
                <Text style={styles.loadingText}>Loading Tom...</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={[styles.recordButton, isRecording && styles.recordingButton]}
            onPress={handleRecordingPress}
          >
            <Ionicons
              name={isRecording ? "stop-circle" : "mic"}
              size={32}
              color="white"
            />
            <Text style={styles.buttonText}>
              {isRecording ? "Stop Recording" : "Start Speaking"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button, 
              styles.playButton, 
              recordedURI ? {} : { opacity: 0.5 },
              isPlaying && styles.playingButton
            ]}
            disabled={!recordedURI || isRecording}
            onPress={handlePlaybackPress}
          >
            <Ionicons 
              name={isPlaying ? "pause" : "play"} 
              size={24} 
              color="white" 
            />
            <Text style={styles.buttonText}>
              {isPlaying ? "Stop Playback" : "Play Back"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    marginTop: Platform.OS === "ios" ? 0 : 30,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backText: {
    fontSize: 17,
    color: "#007AFF",
    marginLeft: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  modelContainer: {
    width: width * 0.9,
    height: height * 0.55,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "#000000",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 20,
  },
  glView: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  loadingCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  loadingText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
    marginTop: 12,
  },
  controlsContainer: {
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === "ios" ? 20 : 40,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#2C2C2E",
    marginTop: 12,
  },
  recordButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 12,
  },
  recordingButton: {
    backgroundColor: "#FF3B30",
    shadowColor: "#FF3B30",
  },
  playButton: {
    backgroundColor: "#2C2C2E",
  },
  playingButton: {
    backgroundColor: "#34C759",
    shadowColor: "#34C759",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default TalkingTom;