import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import styles from "./Home.module.scss";

import { modelConfig } from "../components/model/modelConfig";
import CameraController from "../components/camera/CameraController";

const Home = () => {
    const [currentModel, setCurrentModel] =
        useState<keyof typeof modelConfig>("vase");

    const [cameraPosition, setCameraPosition] = useState([0, 5000, 0]);

    useEffect(() => {
        setCameraPosition(modelConfig[currentModel].position);
    }, [currentModel]);

    return (
        <div className={styles.container}>
            <button
                style={{
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                    zIndex: 1,
                    padding: "10px 20px",
                }}
                onClick={() =>
                    setCurrentModel((prev) =>
                        prev === "vase" ? "cup" : "vase"
                    )
                }
            >
                Toggle Model
            </button>
            {/* 渲染模型 camera 位置  需要跟第一個模型位置一樣 */}
            <Canvas
                camera={{
                    position: cameraPosition as [number, number, number],
                    fov: 75,
                }}
            >
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} />

                <CameraController targetModel={currentModel} />

                {Object.entries(modelConfig).map(([key, config]) => {
                    const ModelComponent = config.component;
                    return (
                        <ModelComponent
                            key={key}
                            autoRotate={true}
                            followMouse={true}
                        />
                    );
                })}

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={false}
                />
            </Canvas>
        </div>
    );
};

export default Home;
