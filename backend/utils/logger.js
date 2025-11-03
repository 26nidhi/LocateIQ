// server/utils/logger.js
const timestamp = () => new Date().toISOString();

export const logInfo = (...args) => {
  console.log(`[INFO] [${timestamp()}]`, ...args);
};

export const logWarn = (...args) => {
  console.warn(`[WARN] [${timestamp()}]`, ...args);
};

export const logError = (...args) => {
  console.error(`[ERROR] [${timestamp()}]`, ...args);
};
