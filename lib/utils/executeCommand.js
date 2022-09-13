/*
 * @Author: 王敏
 * @LastEditTime: 2022-09-13 15:15:50
 * @Description: file content
 */
import { execa } from 'execa';
import {
  mError,
  mLog,
  mWarn,
  mSuccess,
} from './hint.js'

export default function executeCommand(command, args, cwd = process.cwd()) {
  return new Promise((resolve, reject) => {
    let child = execa(command, args, { cwd })
    child.stdout.on('data', buffer => {
      let str = buffer.toString().trim()
      mLog(str)
    })
    child.stderr.on('data', buf => {
      const str = buf.toString()
      mWarn(str)
    })
    child.on('close', code => {
      if (code !== 0) {
        reject(new Error(`该命令执行失败: ${command} ${args.join(' ')}`))
      }
      resolve()
    })
  })
}