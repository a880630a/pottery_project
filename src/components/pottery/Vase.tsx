import texture from "../../assets/marble_texture2.jpg";
import { ModelLoaderSTL } from "../model/modelLoader";
import ModelRotate from "../model/modelAction/ModelRotate";
import { a, SpringValue } from "@react-spring/three";
import { modelConfig } from "../model/modelConfig";

const Vase = ({
    autoRotate = false,
    followMouse = false,
    opacity = 1,
}: {
    autoRotate?: boolean;
    followMouse?: boolean;
    opacity?: number | SpringValue<number>;
}) => {
    const {
        geometry: modelData,
        meshRef,
        loadedTexture,
    } = ModelLoaderSTL({
        path: "./models/vase2.stl",
        texture: texture,
    });

    ModelRotate({
        autoRotate,
        followMouse,
        meshRef,
    });
    const position = modelConfig.vase.objectPosition;
    return modelData ? (
        <a.mesh
            geometry={modelData}
            ref={meshRef}
            position={position as [number, number, number]}
        >
            <a.meshStandardMaterial
                // color="#d4a373" // 陶土色
                roughness={0.6} // 粗糙度，模擬陶器表面
                metalness={0.2} // 金屬感，讓高光更柔和
                map={loadedTexture}
                opacity={opacity}
            />
        </a.mesh>
    ) : null;
};

export default Vase;
