import React, { useEffect, useState } from "react";
import ModelLoaderOBJ from "../modelLoader/ModelLoaderOBJ";

const Cup = () => {
    const {
        obj: modelData,
        meshRef,
        loadedTexture,
    } = ModelLoaderOBJ({
        path: "./models/vase4.obj",
    });

    const [position, setPosition] = useState<[number, number, number]>([
        0, 0, 0,
    ]); // 預設位置
    const [scale, setScale] = useState(1); // 預設縮放大小
    const [dragging, setDragging] = useState(false); // 是否正在拖動
    const [lastMousePosition, setLastMousePosition] = useState<{
        x: number;
        y: number;
    } | null>(null);

    useEffect(() => {
        const handlePointerDown = (event: PointerEvent) => {
            if (event.button === 2) {
                // 右鍵
                setDragging(true);
                setLastMousePosition({ x: event.clientX, y: event.clientY });
            }
        };

        const handlePointerMove = (event: PointerEvent) => {
            if (dragging && lastMousePosition && meshRef.current) {
                const deltaX = (event.clientX - lastMousePosition.x) * 0.01;
                const deltaY = (event.clientY - lastMousePosition.y) * 0.01;

                // 更新模型位置
                meshRef.current.position.x += deltaX;
                meshRef.current.position.y -= deltaY;

                // 更新狀態中的位置值
                setPosition([
                    meshRef.current.position.x,
                    meshRef.current.position.y,
                    meshRef.current.position.z,
                ]);

                // 更新最後滑鼠位置
                setLastMousePosition({ x: event.clientX, y: event.clientY });
            }
        };

        const handlePointerUp = (event: PointerEvent) => {
            if (event.button === 2) {
                // 右鍵
                setDragging(false);
                setLastMousePosition(null);

                // 在拖動結束時打印當前位置和縮放大小
                if (meshRef.current) {
                    console.log("模型位置：", {
                        x: meshRef.current.position.x,
                        y: meshRef.current.position.y,
                        z: meshRef.current.position.z,
                    });
                    console.log("模型縮放：", {
                        scale: meshRef.current.scale.x, // 假設 x, y, z 的縮放是一致的
                    });
                    alert(
                        `模型位置:\nX: ${meshRef.current.position.x.toFixed(
                            2
                        )}, Y: ${meshRef.current.position.y.toFixed(
                            2
                        )}, Z: ${meshRef.current.position.z.toFixed(2)}\n` +
                            `模型縮放: ${meshRef.current.scale.x.toFixed(2)}`
                    );
                }
            }
        };

        const handleWheel = (event: WheelEvent) => {
            // 滾輪調整縮放大小
            setScale((prevScale) =>
                Math.max(0.1, prevScale - event.deltaY * 0.001)
            );
        };

        window.addEventListener("pointerdown", handlePointerDown);
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);
        window.addEventListener("wheel", handleWheel);

        return () => {
            window.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
            window.removeEventListener("wheel", handleWheel);
        };
    }, [dragging, lastMousePosition, meshRef]);

    return modelData ? (
        <mesh
            geometry={modelData.geometry} // 加載的模型幾何
            ref={meshRef} // 模型引用
            position={[0.1, -1.8, 0]} // 動態更新位置
            scale={0.6} // 動態縮放
        >
            <meshStandardMaterial map={loadedTexture} />
        </mesh>
    ) : null;
};

export default Cup;
