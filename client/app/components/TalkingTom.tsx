import React, { useEffect, useRef, useState } from "react";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Audio } from "expo-av";
import { recognizeSpeech, textToSpeech } from "../services/speechServices";

const TalkingTom: React.FC = () => {
    const glViewRef = useRef<any>(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [feedback, setFeedback] = useState("");
    const modelRef = useRef<THREE.Group | null>(null);
    const soundRef = useRef<Audio.Sound | null>(null);
    const recordingRef = useRef<Audio.Recording | null>(null);

    useEffect(() => {
        if (glViewRef.current) {
            glViewRef.current.onContextCreate = initGL;
        }
    }, []);

    const initGL = async (gl: WebGLRenderingContext) => {
        const renderer = new Renderer({ gl });
        const scene = new THREE.Scene();

        const light = new THREE.AmbientLight(0xffffff);
        scene.add(light);

        const loader = new GLTFLoader();
        loader.load(require("@/assets/talking_tom_town_talking_angela.glb"), (gltf) => { 
            modelRef.current = gltf.scene;
            scene.add(gltf.scene);
        });

        const renderLoop = () => {
            requestAnimationFrame(renderLoop);
            renderer.render(scene, new THREE.PerspectiveCamera(75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000));
            (gl as WebGLRenderingContext & { endFrameEXP?: () => void }).endFrameEXP?.();
        };
        renderLoop();
    };

    const startSpeechCycle = async () => {
        setIsSpeaking(true);
        setFeedback("");

        const phrase = "Hello! Can you repeat after me: Apple?";
        try {
            const audioUri = await textToSpeech(phrase);
            const sound = new Audio.Sound();
            await sound.loadAsync({ uri: audioUri });
            await sound.playAsync();

            sound.setOnPlaybackStatusUpdate(async (status) => {
                if (status.isLoaded && !status.isBuffering && status.didJustFinish) {
                    setIsSpeaking(false);
                    await startRecording();
                }
            });

            soundRef.current = sound;
        } catch (error) {
            console.error("Error in text-to-speech:", error);
            setIsSpeaking(false);
        }
    };

    const startRecording = async () => {
        setIsRecording(true);
        const recording = new Audio.Recording();

        try {
            // await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            recordingRef.current = recording;

            setTimeout(async () => {
                setIsRecording(false);
                await stopRecording();
            }, 5000);
        } catch (error) {
            console.error("Error starting recording:", error);
            setIsRecording(false);
        }
    };

    const stopRecording = async () => {
        if (!recordingRef.current) return;

        try {
            await recordingRef.current.stopAndUnloadAsync();
            const uri = recordingRef.current.getURI();

            if (uri) {
                const response = await fetch(uri);
                const blob = await response.blob();
                const transcript = await recognizeSpeech(blob);
                validateSpeech(transcript, "Apple");
            } else {
                console.error("Recording URI is null.");
            }
        } catch (error) {
            console.error("Error stopping recording:", error);
        }
    };

    const validateSpeech = (transcript: string, expected: string) => {
        if (transcript.toLowerCase() === expected.toLowerCase()) {
            setFeedback("Great job! ✅");
        } else {
            setFeedback("Oops! Try again ❌");
            startSpeechCycle();
        }
    };

    return (
        <div>
            <GLView ref={glViewRef} style={{ width: 300, height: 300 }} onContextCreate={initGL} />
            <button onClick={startSpeechCycle} disabled={isSpeaking || isRecording}>
                {isSpeaking ? "Tom is Speaking..." : isRecording ? "Listening..." : "Start"}
            </button>
            <p>{feedback}</p>
        </div>
    );
};

export default TalkingTom;
