#!/usr/bin/env node
/*
 * @Author: 王敏
 * @LastEditTime: 2022-09-13 17:53:11
 * @Description: file content
 */
import chalk from 'chalk';
import init from '../lib/init.js'

//要求node16 以上
const currentNodeVersion = process.versions.node;
const major = +currentNodeVersion.split('.')[0];
const needVersions = 16
if (major < needVersions) {
  console.error(
    chalk.red(
      `You are running Node \n${currentNodeVersion} \n@mia/cli requires Node ${needVersions} or higher.\nPlease update your version of Node`
    )
  );
  process.exit(1);
}

init()