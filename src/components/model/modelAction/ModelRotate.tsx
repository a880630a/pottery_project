import React, { useEffect } from "react";
import { Mesh } from "three";

const ModelRotate = ({
    autoRotate,
    followMouse,
    meshRef,
}: {
    autoRotate: boolean;
    followMouse: boolean;
    meshRef: React.RefObject<Mesh>;
}) => {
    useEffect(() => {
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            // 計算滑鼠位置比例 (-1 到 1)
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        const animatePosition = () => {
            if (meshRef.current && autoRotate) {
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
        if (followMouse) {
            window.addEventListener("mousemove", handleMouseMove);
        }

        // 啟動動畫循環
        animatePosition();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [autoRotate, followMouse, meshRef]);
    return;
};

export default ModelRotate;
