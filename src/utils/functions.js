const os = require("os");
const logger = require("../config/logger");

function getRelativePathForImage(fullPath) {
  const platform = os.platform();

  if (platform == "win32") {
    pathSegments = fullPath.split("\\");
    uploadsIndex = pathSegments.indexOf("public");
    if (uploadsIndex !== -1 && uploadsIndex < pathSegments.length - 1) {
      const relativePath = pathSegments.slice(uploadsIndex + 1).join("\\");
      return "\\" + relativePath;
    } else {
      return fullPath;
    }
  } else {
    pathSegments = fullPath.split("/");
    uploadsIndex = pathSegments.indexOf("public");
    if (uploadsIndex !== -1 && uploadsIndex < pathSegments.length - 1) {
      const relativePath = pathSegments.slice(uploadsIndex + 1).join("/");
      return "/" + relativePath;
    } else {
      return fullPath;
    }
  }
}

function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (!arr2.includes(arr1[i])) {
      return false;
    }
  }

  return true;
}


function logError(err, req) {
  const requestType = req.originalUrl.startsWith('/api') ? 'API' : 'WEB';

  logger.error({
    message: err.message,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    requestType,
    'trace-stack': err.stack,
  });
}

module.exports = logError;

module.exports = {
  getRelativePathForImage,
  arraysAreEqual,
  logError,
};
