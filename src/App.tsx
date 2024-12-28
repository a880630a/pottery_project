import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Pottery from "./components/pottery/Pottery";
import styles from "./App.module.scss";
import { useEffect } from "react";
const CameraHelper = () => {
    const { camera } = useThree();

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === "p") {
            // 使用 "p" 鍵打印相機位置與 FOV
            console.log("Camera Position:", camera.position);
            console.log("Camera FOV:", camera.fov);
            alert(
                `Camera Position: { x: ${camera.position.x.toFixed(
                    2
                )}, y: ${camera.position.y.toFixed(
                    2
                )}, z: ${camera.position.z.toFixed(
                    2
                )} }\nFOV: ${camera.fov.toFixed(2)}`
            );
        }
    };

    useEffect(() => {
        window.addEventListener("keypress", handleKeyPress);
        return () => {
            window.removeEventListener("keypress", handleKeyPress);
        };
    }, []);

    return null; // 此組件僅用於監聽事件
};

const App = () => {
    return (
        <div className={styles.container}>
            <Canvas camera={{ position: [0.33, -89, 12], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} />
                <Pottery />
                <OrbitControls
                    enablePan={false}
                    enableRotate={false}
                    enableZoom={false}
                />
                <CameraHelper />
            </Canvas>
        </div>
    );
};

export default App;
