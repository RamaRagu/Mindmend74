import React, { useEffect, useRef } from "react";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const TalkingTom: React.FC = () => {
    const ref = useRef<GLView | null>(null);

    useEffect(() => {
        const init = async () => {
            if (!ref.current) return;

            // Get GL context
            const gl = ref.current.gl;
            
            // Create renderer
            const renderer = new Renderer({ gl });
            renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
            
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(
                75, 
            });

            const render = () => {
                requestAnimationFrame(render);
                renderer.render(scene, camera);
                gl.endFrameEXP();
            };

            render();
        };

        init();
    }, []);

    return <GLView ref={ref} style={{ width: 300, height: 300 }} />;
};

export default TalkingTom;
