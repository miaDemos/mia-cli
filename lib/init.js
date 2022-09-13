/*
 * @Author: 王敏
 * @LastEditTime: 2022-09-13 19:15:30
 * @Description: mia创建的命令页
 */
import { Command } from 'commander';
import fs from 'fs'
import create from './create.js'
import path from 'path'
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default function programInit() {
  const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'))

  const program = new Command();
  program
    .version(`@mia/cli ${pkg.version}`)
    .usage('<command> [options]')

  program
    .command('create <app-name>')
    .description('创建一个新的项目')
    .action(create)

  program.parse()
}