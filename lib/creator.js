/*
 * @Author: 王敏
 * @LastEditTime: 2022-09-13 19:15:18
 * @Description: file content
 */
import { execa } from 'execa';
import path from 'path'
import fs from 'fs'

import executeCommand from './utils/executeCommand.js'


//git仓库地址获取
const gitPre = 'https://github.com/miaDemos/mia-'
const gitPath = function (type) {
  return gitPre + type + '.git'
}
//npm装包命令
const npmObj = {
  "npm": "npm install",
  "pnpm": "pnpm install",
  "cnpm": "cnpm install",
  "yarn": "yarn",

}


export default async function creator(answers, options) {
  // console.log(111, answers, options)
  // answers = {
  //   name: 'aaa',
  //   type: 'vue',
  //   depends: ["element-plus", "ant-design-vue", "vant"],
  //   needInstall: true,
  //   npmManage: 'yarn'
  // }

  let { name, type, depends, needInstall, npmManage } = answers

  //当前目录不可有同名文件
  let hadPkg = fs.existsSync(name);
  if (hadPkg) throw new Error('当前目录不可存在同名文件')

  //拉取模板代码并重命名
  await executeCommand('git', ['clone', gitPath(type), name])

  //修改package.json，写入新增第三方库
  let pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), `./${name}/package.json`), 'utf-8'))
  await Promise.all(depends.map(async npmName => {
    let { stdout } = await execa('npm', ['show', npmName, 'version'])
    pkg.dependencies[npmName] = `^${stdout}`
  }))
  fs.writeFileSync(path.resolve(process.cwd(), `./${name}/package.json`), JSON.stringify(pkg, null, 2))

  //如果需要安装依赖，用指定装包工具装包
  if (needInstall) await executeCommand(`${npmObj[npmManage]}`, [], path.resolve(process.cwd(), `./${name}`))
  return true
}







