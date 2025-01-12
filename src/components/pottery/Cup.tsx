import ModelLoaderOBJ from "../model/modelLoader/ModelLoaderOBJ";
import ModelRotate from "../model/modelAction/ModelRotate";
import { a, SpringValue } from "@react-spring/three";
import { modelConfig } from "../model/modelConfig";

const Cup = ({
    autoRotate = false,
    followMouse = false,
    opacity = 1,
}: {
    autoRotate?: boolean;
    followMouse?: boolean;
    opacity?: number | SpringValue<number>;
}) => {
    const {
        obj: modelData,
        meshRef,
        loadedTexture,
    } = ModelLoaderOBJ({
        path: "./models/vase4.obj",
    });

    ModelRotate({
        autoRotate,
        followMouse,
        meshRef,
    });
    const position = modelConfig.cup.objectPosition;
    console.log(position);
    return modelData ? (
        <a.mesh
            geometry={modelData.geometry} // 加載的模型幾何
            ref={meshRef} // 模型引用
            position={position as [number, number, number]} // 動態更新位置
            scale={0.6} // 動態縮放
        >
            <a.meshStandardMaterial map={loadedTexture} opacity={opacity} />
        </a.mesh>
    ) : null;
};

export default Cup;
