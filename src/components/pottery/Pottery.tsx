import { useEffect, useRef, useState } from "react";
import { BufferAttribute, BufferGeometry, Mesh, TextureLoader } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import texture from "../../assets/marble_texture2.jpg";
import { Box3, Vector3 } from "three";

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

const Pottery = () => {
    const [geometry, setGeometry] = useState<BufferGeometry | null>(null); // 儲存 STL 幾何體
    const meshRef = useRef<Mesh>(null);
    const loadedTexture = new TextureLoader().load(texture);

    useEffect(() => {
        const loader = new STLLoader();
        loader.load(
            "./models/vase15.stl", // STL 檔案的路徑
            (geometry) => {
                applyUVs(geometry); // 添加 UV 座標
                setGeometry(geometry); // 成功載入 STL
            },
            undefined,
            (error) => {
                console.error("Error loading STL:", error); // 載入失敗
            }
        );
    }, []);

    // useEffect(() => {
    //     const handleMouseMove = (event: MouseEvent) => {
    //         // 計算滑鼠位置比例 (-1 到 1)
    //         const x = (event.clientX / window.innerWidth) * 2 - 1;
    //         const y = -(event.clientY / window.innerHeight) * 2 + 1;

    //         // 設定模型的小幅度旋轉
    //         if (meshRef.current) {
    //             meshRef.current.rotation.x = y * 0.1; // 縮小影響範圍
    //             meshRef.current.rotation.y = x * 0.1;
    //         }
    //     };

    //     window.addEventListener("mousemove", handleMouseMove);
    //     return () => {
    //         window.removeEventListener("mousemove", handleMouseMove);
    //     };
    // }, []);

    useEffect(() => {
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            // 計算滑鼠位置比例 (-1 到 1)
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        const animatePosition = () => {
            if (meshRef.current) {
                meshRef.current.rotation.x += 0.001; // 持續旋轉 x 軸
                meshRef.current.rotation.y += 0.005; // 持續旋轉 y 軸
                // 模型位置小幅度跟隨滑鼠
                meshRef.current.position.x +=
                    (mouseX * 2 - meshRef.current.position.x) * 0.1;
                meshRef.current.position.y +=
                    (mouseY * 2 - meshRef.current.position.y) * 0.1;
            }
            requestAnimationFrame(animatePosition); // 確保動畫函數持續執行
        };

        // 設置滑鼠移動事件
        window.addEventListener("mousemove", handleMouseMove);

        // 啟動動畫循環
        animatePosition();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);
    return geometry ? (
        <mesh geometry={geometry} ref={meshRef} position={[1, 1, -10]}>
            <meshStandardMaterial
                // color="#d4a373" // 陶土色
                roughness={0.6} // 粗糙度，模擬陶器表面
                metalness={0.2} // 金屬感，讓高光更柔和
                map={loadedTexture}
            />
        </mesh>
    ) : null;
};

export default Pottery;
