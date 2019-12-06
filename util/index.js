const os = require("os");
const path = require("path");
const fs = require("fs-extra");

const utils = {};

utils.homedir = os.homedir;

utils.getRootPath = function() {
  return path.resolve(__dirname, "../");
};

utils.getTurboPath = function() {
  const taroPath = path.join(utils.homedir(), ".turbo");
  if (!fs.existsSync(taroPath)) {
    fs.ensureDirSync(taroPath);
  }
  return taroPath;
};

utils.getConfig = function() {
  const configPath = path.join(utils.getTurboPath(), "config.json");
  if (fs.existsSync(configPath)) {
    return require(configPath);
  }
  return {};
};

utils.getPkgVersion = function() {
  return require(path.join(utils.getRootPath(), "package.json")).version;
};

utils.printPkgVersion = function() {
  const version = utils.getPkgVersion();
  console.log(`Turbo v${version}`);
  console.log();
};

utils.getPkgItemByKey = function(key) {
  const packageMap = require(path.join(utils.getRootPath(), "package.json"));
  if (Object.keys(packageMap).indexOf(key) === -1) {
    return {};
  } else {
    return packageMap[key];
  }
};

utils.shouldUseYarn = function() {
  try {
    execSync("yarn --version", { stdio: "ignore" });
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = utils;
