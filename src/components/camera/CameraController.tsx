import { useSpring } from "@react-spring/three";
import { modelConfig } from "../model/modelConfig";
import { useThree } from "@react-three/fiber";

const CameraController = ({
    targetModel,
}: {
    targetModel: keyof typeof modelConfig;
}) => {
    const { camera } = useThree();

    const targetPosition = modelConfig[targetModel].position;
    const targetObjectPosition = modelConfig[targetModel].objectPosition;

    useSpring({
        position: targetPosition,
        objectPosition: targetObjectPosition,
        config: { tension: 100, friction: 26 },
        onChange: ({ value }) => {
            console.log(value);
            if (value.position) {
                const [x, y, z] = value.position as [number, number, number];
                camera.position.set(x, y, z);
            }
            if (value.objectPosition) {
                const [lx, ly, lz] = value.objectPosition as [
                    number,
                    number,
                    number
                ];
                camera.lookAt(lx, ly, lz);
            }
        },
    });

    return null;
};

export default CameraController;
