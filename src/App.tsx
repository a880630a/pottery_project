import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import styles from "./App.module.scss";
import Vase from "./components/pottery/Vase";
import Cup from "./components/pottery/Cup";
import NavBar from "./components/navBar/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // 修正 Router 的引入

const App = () => {
    return (
        <div className={styles.container}>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<div>asdjfiojoi</div>} />
                    <Route path="/vase" element={<Vase />} />
                    <Route path="/cup" element={<Cup />} />
                </Routes>
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
            </Router>
        </div>
    );
};

export default App;
