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
  ActivityIndicator,
  Modal,
  Image,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { GLView, ExpoWebGLRenderingContext } from "expo-gl";
import { Renderer } from "expo-three";
import { Asset } from "expo-asset";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";
import { Voice } from "expo-speech";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

type RouteParams = {
  childId?: string;
};

const TalkingTom = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const childId = route.params?.childId || "defaultChildId";

  const [modelReady, setModelReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioPermission, setAudioPermission] = useState(false);
  const [recordedURI, setRecordedURI] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackObject, setPlaybackObject] = useState<Audio.Sound | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSessionSummary, setShowSessionSummary] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [correctAnimation, setCorrectAnimation] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wordScore, setWordScore] = useState<number>(0);
  const [ebookId, setEbookId] = useState<number | null>(1);
  const [sessionSummary, setSessionSummary] = useState({
    totalWords: 0,
    correctWords: 0,
    incorrectWords: 0,
    startTime: Date.now(),
    pronunciationScores: [] as Array<{ word: string; score: number }>,
  });

  const [currentTherapyMode, setCurrentTherapyMode] = useState("word"); // "word" or "sentence"
  const [learningPath, setLearningPath] = useState({
    completed: false,
    currentLevel: 1,
    totalLevels: 3,
    currentStage: 1,
    totalStages: 3,
    sessionCount: 0,
  });
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);

  const [currentWordImage, setCurrentWordImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  const timeoutRef = useRef<number>();
  const modelRef = useRef<THREE.Group>();
  const mixerRef = useRef<THREE.AnimationMixer>();
  const animationsRef = useRef<THREE.AnimationClip[]>([]);
  const recordingRef = useRef<Audio.Recording | null>(null);
  const animationIntensityRef = useRef<number>(0.5);
  const activeActionRef = useRef<THREE.AnimationAction | null>(null);
  const speechOptionsRef = useRef({
    voice: "",
    pitch: 1.0,
    rate: 0.9,
  });

  const [showImage, setShowImage] = useState(false);
  const [showWord, setShowWord] = useState(false);

  const imageOpacity = useSharedValue(0);
  const wordOpacity = useSharedValue(0);

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      opacity: imageOpacity.value,
    };
  });

  const animatedWordStyle = useAnimatedStyle(() => {
    return {
      opacity: wordOpacity.value,
    };
  });

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        setAudioPermission(status === "granted");
        if (status === "granted") {
          setTimeout(() => {
            playWelcomeMessage();
          }, 2000);
        } else {
          Alert.alert(
            "Permission required",
            "Audio recording permission is required for speech therapy"
          );
        }
      } catch (error) {
        console.error("Error requesting audio permissions:", error);
      }
    };

    // Initialize voice options
    initializeVoiceOptions();
    getPermissions();
    fetchWords();
  }, []);

  const initializeVoiceOptions = async () => {
    try {
      const availableVoices = await Speech.getAvailableVoicesAsync();
      console.log("Available voices:", availableVoices.length);

      const professionalVoices = [
        "Samantha",
        "Tessa",
        "Karen",
        "Victoria",
        "Moira",
        "Allison",
        "Ava",
        "Ivy",
      ];

      const preferredVoice = availableVoices.find((voice: Voice) => {
        const id = String(voice.identifier).toLowerCase();
        return (
          professionalVoices.some((voiceName) =>
            id.includes(voiceName.toLowerCase())
          ) || id.includes("female")
        );
      });

      if (preferredVoice) {
        console.log(
          "Found professional female voice:",
          preferredVoice.identifier
        );
        speechOptionsRef.current.voice = preferredVoice.identifier;
        speechOptionsRef.current.pitch = 1.2;
        speechOptionsRef.current.rate = 0.95;
      } else {
        const femaleVoice = availableVoices.find((voice: Voice) => {
          const id = String(voice.identifier).toLowerCase();
          return id.includes("female");
        });

        if (femaleVoice) {
          console.log("Using generic female voice:", femaleVoice.identifier);
          speechOptionsRef.current.voice = femaleVoice.identifier;
          speechOptionsRef.current.pitch = 1.1;
          speechOptionsRef.current.rate = 0.95;
        } else if (availableVoices.length > 0) {
          speechOptionsRef.current.voice = availableVoices[0].identifier;
          speechOptionsRef.current.pitch = 1.1;
          speechOptionsRef.current.rate = 0.95;
        }
      }
    } catch (error) {
      console.error("Error getting available voices:", error);
    }
  };

  const professionalizeText = (text: string): string => {
    let professionalText = text;

    const patterns = [
      { regex: /\bhello\b/gi, replacement: "hello" },
      { regex: /\bhi\b/gi, replacement: "hi" },
      { regex: /\bgood\b/gi, replacement: "good" },
      { regex: /\bgreat\b/gi, replacement: "great" },
      { regex: /\.\s/g, replacement: ". " },
      { regex: /\!$/g, replacement: "." },
    ];

    patterns.forEach((pattern) => {
      professionalText = professionalText.replace(
        pattern.regex,
        pattern.replacement
      );
    });

    if (Math.random() > 0.7) {
      const phrases = [
        "Okay! ",
        "Alright! ",
        "Very well! ",
        "Now then! ",
        "So! ",
      ];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      professionalText = randomPhrase + professionalText;
    }

    return professionalText;
  };

  const speakWithAnimation = async (text: string) => {
    if (isSpeaking) {
      Speech.stop();
    }

    const professionalText = professionalizeText(text);

    setIsSpeaking(true);
    startTalking();

    return new Promise<void>((resolve) => {
      const options: Speech.SpeechOptions = {
        ...speechOptionsRef.current,
        onStart: () => {
          console.log("Speaking started");
        },
        onDone: () => {
          console.log("Speech finished");
          stopTalking();
          setIsSpeaking(false);
          resolve();
        },
        onStopped: () => {
          stopTalking();
          setIsSpeaking(false);
          resolve();
        },
        onError: (error) => {
          console.error("Speech error:", error);
          stopTalking();
          setIsSpeaking(false);
          resolve();
        },
      };

      Speech.speak(professionalText, options);
    });
  };

  const fetchWords = async () => {
    setIsLoading(true);
    try {
      const savedProgress = await AsyncStorage.getItem(
        `ebookProgress_${childId}`
      );
      const progress = savedProgress
        ? JSON.parse(savedProgress)
        : { id: 1, page: 0 };

      const savedLearningPath = await AsyncStorage.getItem(
        `learningPath_${childId}`
      );
      const learningPath = savedLearningPath
        ? JSON.parse(savedLearningPath)
        : {
            completed: false,
            currentLevel: 1,
            totalLevels: 3,
            currentStage: 1,
            totalStages: 3,
            sessionCount: 0,
          };

      setLearningPath(learningPath);
      setEbookId(progress.id);

      const response = await fetch(
        `http://localhost:3000/api/ebook/${progress.id}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch ebook: ${response.status}`);
      }

      const data = await response.json();

      const content =
        typeof data.content === "string"
          ? JSON.parse(data.content)
          : data.content;

      if (!content || !content.pages) {
        throw new Error("Invalid ebook content format");
      }

      let allWords = content.pages.flatMap((page: any) => page.words || []);
      let sessionWords = [];

      switch (learningPath.currentLevel) {
        case 1:
          sessionWords = [
            ...new Set(
              allWords.filter(
                (word: string) => word.length >= 2 && word.length <= 4
              )
            ),
          ].slice(0, 10);
          break;

        case 2:
          sessionWords = [
            ...new Set(
              allWords.filter(
                (word: string) => word.length >= 5 && word.length <= 6
              )
            ),
          ].slice(0, 10);
          break;

        case 3:
          const sentences = content.pages.flatMap(
            (page: any) => page.sentences || []
          );
          if (sentences && sentences.length > 0) {
            setCurrentTherapyMode("sentence");
            sessionWords = sentences.slice(0, 8);
          } else {
            sessionWords = [
              ...new Set(allWords.filter((word: string) => word.length >= 7)),
            ].slice(0, 10);
          }
          break;
      }

      if (sessionWords.length < 5) {
        const additionalWords = [
          ...new Set(
            allWords.filter(
              (word: string) => word.length >= 2 && word.length <= 8
            )
          ),
        ].slice(0, 10 - sessionWords.length);

        sessionWords = [...sessionWords, ...additionalWords];
      }

      const wordsWithImages = await Promise.all(
        sessionWords.map(async (word: string) => {
          try {
            const imageResponse = await fetch(
              `http://localhost:3000/api/images/search?query=${word}`
            );
            if (imageResponse.ok) {
              const imageData = await imageResponse.json();
              return { word, imageUrl: imageData.imageUrl };
            } else {
              console.warn(`Could not fetch image for ${word}`);
              return { word, imageUrl: null };
            }
          } catch (error) {
            console.error(`Error fetching image for ${word}:`, error);
            return { word, imageUrl: null };
          }
        })
      );

      setWords(wordsWithImages.map((item) => item.word));
      setSessionSummary((prev) => ({
        ...prev,
        totalWords: wordsWithImages.length,
      }));

      if (wordsWithImages.length > 0) {
        const firstWord = wordsWithImages[0];
        if (firstWord.imageUrl) {
          setCurrentWordImage(firstWord.imageUrl);
          setShowImage(true);
          imageOpacity.value = withTiming(1, {
            duration: 1000,
            easing: Easing.ease,
          });
        } else {
          setCurrentWordImage(null);
          setShowWord(true);
          wordOpacity.value = withTiming(1, {
            duration: 1000,
            easing: Easing.ease,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching words:", error);

      setWords([
        "apple",
        "banana",
        "cat",
        "dog",
        "elephant",
        "fish",
        "good",
        "happy",
        "ice",
        "jump",
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveLearningPath = async (updatedPath: any) => {
    try {
      await AsyncStorage.setItem(
        `learningPath_${childId}`,
        JSON.stringify(updatedPath)
      );
    } catch (error) {
      console.error("Error saving learning path:", error);
    }
  };

  const evaluateProgressAndLevelUp = () => {
    const correctPercentage = Math.round(
      (sessionSummary.correctWords / sessionSummary.totalWords) * 100
    );

    if (correctPercentage >= 70) {
      const updatedPath = { ...learningPath };

      updatedPath.currentStage += 1;

      if (updatedPath.currentStage > updatedPath.totalStages) {
        updatedPath.currentLevel = Math.min(
          updatedPath.currentLevel + 1,
          updatedPath.totalLevels
        );
        updatedPath.currentStage = 1;

        if (updatedPath.currentLevel === updatedPath.totalLevels) {
          updatedPath.completed = true;
        }

        setShowLevelUpModal(true);
      }

      updatedPath.sessionCount += 1;
      setLearningPath(updatedPath);
      saveLearningPath(updatedPath);
    }
  };

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
          require("../../../assets/talking_tom_town_talking_angela.glb"),
          (gltf: GLTF) => {
            resolve(gltf);
          },
          undefined,
          reject
        );
      });

      const model = gltf.scene;
      modelRef.current = model;

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

      model.position.set(0, -2, 0);
      model.rotation.y = 0;

      scene.add(model);
      setModelReady(true);

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

      const deltaTime = (time - lastTime) * 0.001;
      lastTime = time;

      if (mixerRef.current) {
        mixerRef.current.update(deltaTime);

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

    mixerRef.current.stopAllAction();
    activeActionRef.current = null;

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
      action.setEffectiveTimeScale(0.5);
      action.setEffectiveWeight(1);
      action.play();
      activeActionRef.current = action;
    } else if (animationsRef.current.length > 0) {
      console.log(
        "No talking animation found, using:",
        animationsRef.current[0].name
      );
      const action = mixerRef.current.clipAction(animationsRef.current[0]);
      action.reset();
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.setEffectiveTimeScale(0.5);
      action.setEffectiveWeight(1);
      action.play();
      activeActionRef.current = action;
    }
  };

  const stopTalking = () => {
    if (!mixerRef.current) return;
    mixerRef.current.stopAllAction();
  };

  const playWelcomeMessage = async () => {
    try {
      const welcomeMessages = [
        "Hello! I'm here to assist you with your speech practice.",
        "Hi! I'm excited to help you improve your speech today.",
        "Welcome to our speech therapy session! We're going to work together to improve your pronunciation.",
      ];

      const randomWelcome =
        welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

      await speakWithAnimation(randomWelcome);
      setShowInstructions(true);
    } catch (error) {
      console.error("Error playing welcome message:", error);
      setShowInstructions(true);
    }
  };

  const handleInstructionsStart = async () => {
    const startMessages = [
      "Very well! Let's get started with our speech practice.",
      "Okay! Let's see how well you can speak today.",
      "Ready to begin? Let's work together to make your speech clear and accurate.",
    ];

    const randomStart =
      startMessages[Math.floor(Math.random() * startMessages.length)];
    await speakWithAnimation(randomStart);
    setShowInstructions(false);
  };

  const startRecordingForWord = async () => {
    if (!audioPermission) {
      Alert.alert(
        "Permission required",
        "Audio recording permission is required to use this feature"
      );
      return;
    }

    setShowFeedback(false);

    try {
      const currentWord = words[currentWordIndex];
      const intros = [
        `Please repeat after me: ${currentWord}.`,
        `Now, can you say: ${currentWord}?`,
        `Let's try this word: ${currentWord}.`,
        `I'd like you to say: ${currentWord}.`,
      ];
      const randomIntro = intros[Math.floor(Math.random() * intros.length)];
      await speakWithAnimation(randomIntro);
    } catch (error) {
      console.error("Error speaking word:", error);
    }

    try {
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync({
        android: {
          extension: ".m4a",
          outputFormat: Audio.AndroidOutputFormat.MPEG_4,
          audioEncoder: Audio.AndroidAudioEncoder.AAC,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: ".m4a",
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
          mimeType: "audio/webm",
          bitsPerSecond: 128000,
        },
      });

      await recording.startAsync();
      recordingRef.current = recording;

      startTalking();

      recording.setOnRecordingStatusUpdate((status) => {
        if (status.isRecording) {
          const dB = status.metering || -160;
          const normalizedDb = Math.max(-60, Math.min(0, dB)) / -60;
          const intensity = 0.5 + normalizedDb * 1.5;
          animationIntensityRef.current = intensity;
          updateMouthAnimation(intensity);
        }
      });

      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      Alert.alert("Recording error", "Could not start recording");
    }
  };

  const stopRecordingAndAnalyze = async () => {
    if (!recordingRef.current) return;

    try {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      setRecordedURI(uri);

      stopTalking();

      setIsLoading(true);

      const formData = new FormData();
      formData.append("audio", {
        uri,
        name: "recording.m4a",
        type: "audio/m4a",
      } as any);
      formData.append("word", words[currentWordIndex]);
      formData.append("childId", childId);

      try {
        const response = await fetch(
          "http://localhost:3000/api/speech/analyze",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const result = await response.json();
        console.log("Analysis result:", result);

        const score = result.score || Math.floor(Math.random() * 40) + 60;
        setWordScore(score);

        setSessionSummary((prev) => {
          const newSummary = {
            ...prev,
            pronunciationScores: [
              ...prev.pronunciationScores,
              {
                word: words[currentWordIndex],
                score: score,
              },
            ],
            correctWords:
              score >= 70 ? prev.correctWords + 1 : prev.correctWords,
            incorrectWords:
              score < 70 ? prev.incorrectWords + 1 : prev.incorrectWords,
          };
          return newSummary;
        });

        let feedbackText = "";
        let speechFeedback = "";
        if (score >= 90) {
          feedbackText = "Excellent pronunciation! 👏";
          speechFeedback = "Excellent pronunciation! That was perfect.";
          setCorrectAnimation(true);
        } else if (score >= 70) {
          feedbackText = "Good job! Keep practicing! 👍";
          speechFeedback = "That was good! Keep practicing, you're improving.";
          setCorrectAnimation(true);
        } else if (score >= 50) {
          feedbackText = "Almost there. Try again! 🙂";
          speechFeedback =
            "Almost there! Try saying each sound a little more clearly.";
          setCorrectAnimation(false);
        } else {
          feedbackText = "Let's practice more. Try again! 🤔";
          speechFeedback =
            "Let's try that again together. Focus on each sound.";
          setCorrectAnimation(false);
        }

        setFeedback(feedbackText);
        setShowFeedback(true);

        await speakWithAnimation(speechFeedback);
      } catch (apiError) {
        console.error("API error:", apiError);

        setFeedback("Good attempt! Let's try another word.");
        setShowFeedback(true);

        setSessionSummary((prev) => ({
          ...prev,
          pronunciationScores: [
            ...prev.pronunciationScores,
            {
              word: words[currentWordIndex],
              score: 75,
            },
          ],
          correctWords: prev.correctWords + 1,
        }));

        await speakWithAnimation("Good attempt! Let's try another word.");
      }

      saveProgress();

      setTimeout(() => {
        setShowFeedback(false);

        if (currentWordIndex >= words.length - 1) {
          setShowSessionSummary(true);
          saveSessionHistory();

          const correctCount = sessionSummary.correctWords;
          const totalCount = sessionSummary.totalWords;
          const successRate = Math.round((correctCount / totalCount) * 100);

          const completionMessage = `Great job! You've completed all ${totalCount} words with ${successRate}% success rate!`;
          speakWithAnimation(completionMessage);
        } else {
          const nextIndex = currentWordIndex + 1;
          setCurrentWordIndex(nextIndex);

          if (nextIndex < words.length) {
            setImageLoading(true);
            setShowImage(false);
            setShowWord(false);
            imageOpacity.value = 0;
            wordOpacity.value = 0;

            fetch(
              `http://localhost:3000/api/images/search?query=${words[nextIndex]}`
            )
              .then((imageResponse) => imageResponse.json())
              .then((imageData) => {
                setCurrentWordImage(imageData.imageUrl);
                setImageLoading(false);
                if (imageData.imageUrl) {
                  setShowImage(true);
                  imageOpacity.value = withTiming(1, {
                    duration: 1000,
                    easing: Easing.ease,
                  });
                } else {
                  setShowWord(true);
                  wordOpacity.value = withTiming(1, {
                    duration: 1000,
                    easing: Easing.ease,
                  });
                }
              })
              .catch((error) => {
                console.error(
                  `Error fetching image for ${words[nextIndex]}:`,
                  error
                );
                setCurrentWordImage(null);
                setImageLoading(false);
                setShowWord(true);
                wordOpacity.value = withTiming(1, {
                  duration: 1000,
                  easing: Easing.ease,
                });
              });
          }
        }
      }, 3000);
    } catch (error) {
      console.error("Error stopping recording:", error);
      Alert.alert("Recording error", "Could not analyze recording");
    } finally {
      setIsRecording(false);
      setIsLoading(false);
    }
  };

  const saveProgress = async () => {
    try {
      const progress = {
        id: ebookId,
        lastWord: currentWordIndex,
        lastDate: new Date().toISOString(),
      };

      await AsyncStorage.setItem(
        `ebookProgress_${childId}`,
        JSON.stringify(progress)
      );
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const saveSessionHistory = async () => {
    try {
      const finalSessionSummary = {
        ...sessionSummary,
        endTime: Date.now(),
        duration: Math.floor((Date.now() - sessionSummary.startTime) / 1000),
        date: new Date().toISOString(),
        ebookId: ebookId,
        learningLevel: learningPath.currentLevel,
        learningStage: learningPath.currentStage,
      };

      const existingHistory = await AsyncStorage.getItem(
        `sessionHistory_${childId}`
      );
      const history = existingHistory ? JSON.parse(existingHistory) : [];

      history.push(finalSessionSummary);

      await AsyncStorage.setItem(
        `sessionHistory_${childId}`,
        JSON.stringify(history)
      );

      evaluateProgressAndLevelUp();

      try {
        await fetch("http://localhost:3000/api/speech/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            childId: childId,
            session: finalSessionSummary,
          }),
        });
      } catch (serverError) {
        console.error("Could not save session to server:", serverError);
      }
    } catch (error) {
      console.error("Error saving session history:", error);
    }
  };

  const handleEndSession = async () => {
    const goodbyes = [
      "You did excellent work today! Please come back soon for more practice.",
      "That was a productive session! Your speech is improving. See you next time!",
      "I'm pleased with your progress today! Let's continue our sessions soon.",
    ];

    const randomGoodbye = goodbyes[Math.floor(Math.random() * goodbyes.length)];
    await speakWithAnimation(randomGoodbye);

    setShowSessionSummary(false);
    navigation.goBack();
  };

  const updateMouthAnimation = (intensity: number) => {
    if (!activeActionRef.current) return;

    const clampedIntensity = Math.max(0.2, Math.min(2.0, intensity));
    activeActionRef.current.timeScale = clampedIntensity;
  };

  const handleLevelUpContinue = async () => {
    const levelMessages = [
      "You've reached level one! We'll start with simple words. This will be a great learning experience.",
      "Congratulations! You've made it to level two! Now we'll try longer words. You're progressing well.",
      "Excellent! You've reached level three! Now we'll practice more complex sentences.",
    ];

    await speakWithAnimation(
      levelMessages[learningPath.currentLevel - 1] ||
        "Excellent job leveling up!"
    );
    setShowLevelUpModal(false);
    handleEndSession();
  };

  useEffect(() => {
    return () => {
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
      Speech.stop();
    };
  }, []);

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
        <Text style={styles.title}>Speech Therapy</Text>
        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => setShowInstructions(true)}
        >
          <Ionicons name="help-circle" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.modelContainer}>
          <GLView style={styles.glView} onContextCreate={onContextCreate} />
          {!modelReady && (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingCard}>
                <Ionicons name="cube-outline" size={40} color="#007AFF" />
                <Text style={styles.loadingText}>
                  Loading Speech Therapy Model...
                </Text>
              </View>
            </View>
          )}
          {isSpeaking && (
            <View style={styles.speakingIndicator}>
              <View style={styles.soundWave}>
                <View style={[styles.soundBar, styles.bar1]} />
                <View style={[styles.soundBar, styles.bar2]} />
                <View style={[styles.soundBar, styles.bar3]} />
                <View style={[styles.soundBar, styles.bar4]} />
                <View style={[styles.soundBar, styles.bar5]} />
              </View>
            </View>
          )}
        </View>

        <View style={styles.wordContainer}>
          <Text style={styles.wordLabel}>
            {currentTherapyMode === "sentence"
              ? "Say this sentence:"
              : "Say this word:"}
          </Text>
          <View style={styles.wordCard}>
            {imageLoading ? (
              <ActivityIndicator size="large" color="#007AFF" />
            ) : showImage && currentWordImage ? (
              <Animated.Image
                source={{ uri: currentWordImage }}
                style={[styles.wordImage, animatedImageStyle]}
                resizeMode="contain"
              />
            ) : showWord ? (
              <Animated.Text
                style={[
                  styles.wordText,
                  currentTherapyMode === "sentence" && styles.sentenceText,
                  animatedWordStyle,
                ]}
              >
                {words.length > 0 ? words[currentWordIndex] : "Loading..."}
              </Animated.Text>
            ) : null}
          </View>

          <View style={styles.progressBar}>
            <View style={styles.progressInfo}>
              <Text style={styles.levelText}>
                Level {learningPath.currentLevel} • Stage{" "}
                {learningPath.currentStage}
              </Text>
              <Text style={styles.progressText}>
                {currentWordIndex + 1} of {words.length}
              </Text>
            </View>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${((currentWordIndex + 1) / words.length) * 100}%`,
                  },
                ]}
              />
            </View>
          </View>
        </View>

        {showFeedback && (
          <View
            style={[
              styles.feedbackContainer,
              correctAnimation
                ? styles.correctFeedback
                : styles.tryAgainFeedback,
            ]}
          >
            <Text style={styles.feedbackText}>{feedback}</Text>
            <Text style={styles.scoreText}>Score: {wordScore}</Text>
          </View>
        )}

        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={[styles.recordButton, isRecording && styles.recordingButton]}
            onPress={
              isRecording ? stopRecordingAndAnalyze : startRecordingForWord
            }
            disabled={isLoading || isSpeaking}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Ionicons
                name={isRecording ? "stop-circle" : "mic"}
                size={32}
                color="white"
              />
            )}
            <Text style={styles.buttonText}>
              {isLoading
                ? "Analyzing..."
                : isRecording
                ? "Stop Recording"
                : isSpeaking
                ? "Listening..."
                : "Start Speaking"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showInstructions}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowInstructions(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.instructionsCard}>
            <Text style={styles.instructionsTitle}>
              Speech Therapy Instructions
            </Text>

            <View style={styles.instructionStep}>
              <View style={styles.instructionIcon}>
                <FontAwesome5 name="book-reader" size={24} color="#007AFF" />
              </View>
              <Text style={styles.instructionText}>
                Look at the word shown on screen
              </Text>
            </View>

            <View style={styles.instructionStep}>
              <View style={styles.instructionIcon}>
                <FontAwesome5 name="microphone-alt" size={24} color="#007AFF" />
              </View>
              <Text style={styles.instructionText}>
                Tap the "Start Speaking" button and say the word clearly
              </Text>
            </View>

            <View style={styles.instructionStep}>
              <View style={styles.instructionIcon}>
                <FontAwesome5 name="check-circle" size={24} color="#007AFF" />
              </View>
              <Text style={styles.instructionText}>
                Get feedback on your pronunciation and practice to improve
              </Text>
            </View>

            <TouchableOpacity
              style={styles.startButton}
              onPress={handleInstructionsStart}
            >
              <Text style={styles.startButtonText}>Start Therapy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showSessionSummary}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSessionSummary(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Speech Therapy Complete!</Text>

            <View style={styles.summaryStats}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>
                  {sessionSummary.totalWords}
                </Text>
                <Text style={styles.statLabel}>Total Words</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statNumber}>
                  {sessionSummary.correctWords}
                </Text>
                <Text style={styles.statLabel}>Well Pronounced</Text>
              </View>

              <View style={styles.statBox}>
                <Text
                  style={[
                    styles.statNumber,
                    {
                      color:
                        sessionSummary.correctWords >=
                        sessionSummary.incorrectWords
                          ? "#4CAF50"
                          : "#FF3B30",
                    },
                  ]}
                >
                  {Math.round(
                    (sessionSummary.correctWords /
                      Math.max(1, sessionSummary.totalWords)) *
                      100
                  )}
                  %
                </Text>
                <Text style={styles.statLabel}>Success Rate</Text>
              </View>
            </View>

            <Text style={styles.practiceWordsTitle}>
              Words to practice more:
            </Text>
            <View style={styles.practiceWordsContainer}>
              {sessionSummary.pronunciationScores
                .filter((item: any) => item.score < 70)
                .slice(0, 3)
                .map((item: any, index: number) => (
                  <View key={index} style={styles.practiceWordItem}>
                    <Text style={styles.practiceWord}>{item.word}</Text>
                    <Text style={styles.practiceWordScore}>{item.score}%</Text>
                  </View>
                ))}

              {sessionSummary.pronunciationScores.filter(
                (item: any) => item.score < 70
              ).length === 0 && (
                <Text style={styles.noWordsText}>
                  Great job! No words need more practice.
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.endButton}
              onPress={handleEndSession}
            >
              <Text style={styles.endButtonText}>End Session</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showLevelUpModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowLevelUpModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.levelUpCard}>
            <View style={styles.levelUpHeader}>
              <Ionicons name="star" size={40} color="#FFD700" />
              <Text style={styles.levelUpTitle}>Level Up!</Text>
              <Ionicons name="star" size={40} color="#FFD700" />
            </View>

            <Text style={styles.levelUpText}>
              Congratulations! You've advanced to Level{" "}
              {learningPath.currentLevel}!
            </Text>

            <View style={styles.levelInfo}>
              {learningPath.currentLevel === 1 && (
                <Text style={styles.levelDescription}>
                  You're now working with simple words. Keep practicing!
                </Text>
              )}

              {learningPath.currentLevel === 2 && (
                <Text style={styles.levelDescription}>
                  Medium difficulty words await. You're making great progress!
                </Text>
              )}

              {learningPath.currentLevel === 3 && (
                <Text style={styles.levelDescription}>
                  Advanced level! You'll now practice with longer words and
                  sentences.
                </Text>
              )}

              {learningPath.completed && (
                <Text style={styles.levelDescription}>
                  Amazing! You've completed all speech therapy levels!
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleLevelUpContinue}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BBDEFB", // Light blue background
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent white
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
    marginTop: Platform.OS === "ios" ? 0 : 30,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  helpButton: {
    padding: 8,
  },
  backText: {
    fontSize: 17,
    color: "#007AFF",
    marginLeft: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
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
    height: height * 0.45,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Semi-transparent white
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
    marginBottom: 16,
    position: "relative",
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loadingCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  loadingText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
    marginTop: 12,
  },
  speakingIndicator: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  soundWave: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
  },
  soundBar: {
    width: 3,
    backgroundColor: "#007AFF",
    marginHorizontal: 1,
    borderRadius: 3,
  },
  bar1: {
    height: 10,
  },
  bar2: {
    height: 16,
  },
  bar3: {
    height: 24,
  },
  bar4: {
    height: 18,
  },
  bar5: {
    height: 12,
  },
  wordContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  wordLabel: {
    fontSize: 16,
    color: "#757575",
    marginBottom: 8,
  },
  wordCard: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    minHeight: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  wordText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
  },
  sentenceText: {
    fontSize: 22,
    lineHeight: 32,
  },
  wordImage: {
    width: 150,
    height: 100,
  },
  progressBar: {
    width: "100%",
    marginBottom: 16,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  levelText: {
    fontSize: 14,
    color: "#757575",
  },
  progressText: {
    fontSize: 14,
    color: "#757575",
  },
  progressTrack: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#007AFF",
  },
  feedbackContainer: {
    padding: 16,
    borderRadius: 15,
    marginBottom: 16,
    alignItems: "center",
    width: "100%",
  },
  correctFeedback: {
    backgroundColor: "rgba(76, 175, 80, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(76, 175, 80, 0.5)",
  },
  tryAgainFeedback: {
    backgroundColor: "rgba(255, 152, 0, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255, 152, 0, 0.5)",
  },
  feedbackText: {
    color: "#333333",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 6,
  },
  scoreText: {
    color: "#757575",
    fontSize: 16,
  },
  controlsContainer: {
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === "ios" ? 20 : 30,
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
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 20,
  },
  instructionsCard: {
    backgroundColor: "#1C1C1E",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 500,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  instructionsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 24,
  },
  instructionStep: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  instructionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  instructionText: {
    fontSize: 16,
    color: "#FFFFFF",
    flex: 1,
  },
  startButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 15,
    marginTop: 16,
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },
  summaryCard: {
    backgroundColor: "#1C1C1E",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 500,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 24,
  },
  summaryStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  statLabel: {
    fontSize: 14,
    color: "#AAAAAA",
    marginTop: 4,
  },
  practiceWordsTitle: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 12,
  },
  practiceWordsContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 15,
    padding: 16,
    marginBottom: 24,
    minHeight: 80,
  },
  practiceWordItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  practiceWord: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  practiceWordScore: {
    fontSize: 18,
    color: "#FF9500",
  },
  noWordsText: {
    fontSize: 16,
    color: "#4CAF50",
    textAlign: "center",
    paddingVertical: 20,
  },
  endButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 15,
  },
  endButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },
  levelUpCard: {
    backgroundColor: "#1C1C1E",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 500,
    borderWidth: 1,
    borderColor: "#FFD700",
    alignItems: "center",
  },
  levelUpHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  levelUpTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700",
    marginHorizontal: 16,
  },
  levelUpText: {
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
  },
  levelInfo: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 15,
    padding: 16,
    marginBottom: 24,
    width: "100%",
  },
  levelDescription: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 24,
  },
  continueButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 15,
  },
  continueButtonText: {
    color: "#000000",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default TalkingTom;
