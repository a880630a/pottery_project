import { Canvas } from "@react-three/fiber";
import React from "react";
import Vase from "../components/pottery/Vase";
import Cup from "../components/pottery/Cup";
import { OrbitControls } from "@react-three/drei";

const Contact = () => {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 100 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} />
            <Vase />
            <Cup />
            <OrbitControls
                enablePan={true}
                enableRotate={true}
                enableZoom={true}
            />
        </Canvas>
    );
};

export default Contact;
