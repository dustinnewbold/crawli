import { LoggerAdapter } from "../../types/Adapters";

export const systemLogger: LoggerAdapter = config => {
    return console.log;
};