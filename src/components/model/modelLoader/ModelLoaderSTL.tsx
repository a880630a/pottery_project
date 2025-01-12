import { useEffect, useRef, useState } from "react";
import { Box3, BufferAttribute, BufferGeometry, Mesh, Vector3 } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

const applyUVs = (geometry: BufferGeometry) => {
    geometry.computeBoundingBox();
    const bbox = geometry.boundingBox;
    const size = new Vector3();
    bbox?.getSize(size);

    const uv = [];
    const positions = geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];

        if (bbox?.min.x && bbox?.min.y && size.x && size.y) {
            uv.push((x - bbox.min.x) / size.x); // U
            uv.push((y - bbox.min.y) / size.y); // V
        }
    }

    geometry.setAttribute("uv", new BufferAttribute(new Float32Array(uv), 2));
};

const adjustModelSize = (geometry: BufferGeometry, targetSize: number) => {
    const bbox = new Box3().setFromBufferAttribute(
        geometry.attributes.position as BufferAttribute
    );
    const size = new Vector3();
    bbox.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z); // 計算最大邊長
    const scale = targetSize / maxDim; // 計算縮放比例

    geometry.scale(scale, scale, scale); // 應用縮放
};

const ModelLoaderSTL = ({
    path,
    texture,
    targetSize = 5,
}: {
    path: string;
    texture?: string;
    targetSize?: number;
}) => {
    const [geometry, setGeometry] = useState<BufferGeometry | null>(null); // 儲存 STL 幾何體
    const meshRef = useRef<Mesh>(null);
    const loadedTexture = texture ? new TextureLoader().load(texture) : null;

    useEffect(() => {
        const loader = new STLLoader();

        loader.load(
            path, // STL 檔案的路徑
            (geometry) => {
                applyUVs(geometry); // 添加 UV 座標
                adjustModelSize(geometry, targetSize); // 調整模型大小
                setGeometry(geometry); // 成功載入 STL
            },
            undefined,
            (error) => {
                console.error("Error loading STL:", error); // 載入失敗
            }
        );
    }, []);

    return { geometry, meshRef, loadedTexture };
};

export default ModelLoaderSTL;
