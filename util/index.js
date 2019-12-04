const os = require("os");
const path = require("path");
const fs = require("fs-extra");

export const homedir = os.homedir;

export const getRootPath = function() {
  return path.resolve(__dirname, "../../");
};

export const getTaroPath = function() {
  const taroPath = path.join(exports.homedir(), ".turbo");
  if (!fs.existsSync(taroPath)) {
    fs.ensureDirSync(taroPath);
  }
  return taroPath;
};

export const getConfig = function() {
  const configPath = path.join(getTaroPath(), "config.json");
  if (fs.existsSync(configPath)) {
    return require(configPath);
  }
  return {};
};

exports.getPkgVersion = function() {
  return require(path.join(getRootPath(), "package.json")).version;
};

exports.getPkgItemByKey = function(key) {
  const packageMap = require(path.join(getRootPath(), "package.json"));
  if (Object.keys(packageMap).indexOf(key) === -1) {
    return {};
  } else {
    return packageMap[key];
  }
};

exports.shouldUseYarn = function() {
  try {
    execSync("yarn --version", { stdio: "ignore" });
    return true;
  } catch (e) {
    return false;
  }
};
