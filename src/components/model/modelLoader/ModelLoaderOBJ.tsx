import { useEffect, useRef, useState } from "react";
import { Box3, Mesh, Object3D, TextureLoader, Vector3 } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

const ModelLoaderOBJ = ({
    path,
    texture,
}: {
    path: string;
    texture?: string;
    targetSize?: number;
}) => {
    const [obj, setObj] = useState<Mesh | null>(null); // 儲存 OBJ 模型
    const meshRef = useRef<Mesh>(null);
    const loadedTexture = texture ? new TextureLoader().load(texture) : null;

    useEffect(() => {
        const loader = new OBJLoader();
        loader.load(
            path, // OBJ 檔案的路徑
            (object) => {
                // 獲取模型的 Mesh
                const mesh = object.children.find(
                    (child) => child.type === "Mesh"
                );
                if (mesh) {
                    setObj(mesh as Mesh); // 儲存 OBJ 模型
                }
            },
            undefined,
            (error) => {
                console.error("Error loading OBJ:", error); // 載入失敗
            }
        );
    }, []);

    return { obj, meshRef, loadedTexture };
};

export default ModelLoaderOBJ;
