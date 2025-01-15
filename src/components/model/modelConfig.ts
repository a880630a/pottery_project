import Vase from "../pottery/Vase";
import Cup from "../pottery/Cup";

// 模型配置
export const modelConfig = {
    // position 是相對於 camera 的位置
    // LookAt 是模型的位置
    vase: { component: Vase, position: [0, 0, 10], objectPosition: [1, 1, 0] },
    cup: {
        component: Cup,
        position: [0, 0, 530],
        objectPosition: [0, 0, 500],
    },
    // 未來可以新增更多模型
    // bowl: { component: Bowl, position: [...], lookAt: [...] },
};
