const chalk = require("chalk");
const inquirer = require("inquirer");
const ora = require("ora");

const logs = {};

function resolveChalk(arr, fn) {
  arr.forEach((item, index) => {
    if (typeof item === "function") {
      arr[index] = item(chalk);
      return;
    }
    if (fn && typeof fn === "function") {
      arr[index] = fn(item);
    }
  });
  return arr;
}

logs.select = function select(arr) {
  const promptList = [];
  arr.forEach(item => {
    const params = Object.assign(item, { type: "rawlist" });
    promptList.push(params);
  });
  return inquirer.prompt(promptList);
};

logs.input = function input(arr) {
  const promptList = [];
  arr.forEach(item => {
    const params = Object.assign(item, { type: "input" });
    promptList.push(params);
  });
  return inquirer.prompt(promptList);
};

logs.loading = function loading(text) {
  return ora(text).start();
};

logs.log = function log(...args) {
  args = resolveChalk(args);
  console.log(...args);
};

logs.info = function info(...args) {
  args = resolveChalk(args);
  args.unshift(chalk.blue("ℹ"));
  console.log(...args);
};

logs.warning = function warning(...args) {
  args = resolveChalk(args, item => {
    return chalk.yellowBright(" " + item);
  });
  args.unshift("\n" + chalk.yellowBright("WARNING:") + "\n");
  args.push("\n");
  console.log(...args);
};

logs.error = function error(...args) {
  args = resolveChalk(args, item => {
    return chalk.red(item);
  });
  args.unshift(chalk.red("✘"));
  console.log(...args);
};

logs.success = function success(...args) {
  args = resolveChalk(args, item => {
    return chalk.green(item);
  });
  args.unshift(chalk.green("✔"));
  console.log(...args);
};

module.exports = logs;
