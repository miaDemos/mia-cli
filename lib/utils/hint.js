/*
 * @Author: 王敏
 * @LastEditTime: 2022-09-13 15:07:49
 * @Description: file content
 */
import chalk from 'chalk'

const mError = (message) => {
  console.error(chalk.red(message));
};
const mLog = (message) => {
  console.log(chalk.white(message));
};
const mWarn = (message) => {
  console.log(chalk.yellow(message));
};
const mSuccess = (message) => {
  console.log(chalk.white.bgGreen.bold(message));
};

export {
  mError,
  mLog,
  mWarn,
  mSuccess,
};
