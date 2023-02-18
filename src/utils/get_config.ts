import { t_config } from "../types/t_config";

export default ((): t_config => {
    return (process.env as any);
})