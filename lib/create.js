/*
 * @Author: 王敏
 * @LastEditTime: 2022-09-13 11:44:59
 * @Description: file content
 */
import inquirer from 'inquirer';
import {
  mError,
  mLog,
  mSuccess,
} from './utils/hint.js'
import creator from './creator.js'

//错误处理
function errorFun(error) {
  mError(error)
  if (error.isTtyError) {
    // Prompt couldn't be rendered in the current environment
  } else {
    // Something else went wrong
  }
}

//用户勾选安装依赖类型
async function programInit(name) {
  // return {}
  try {
    let answers = await inquirer
      .prompt([
        /* Pass your questions in here */
        {
          type: 'input',
          name: 'name',
          message: '请输入仓库名字(可含：英文、数字、-)',
          validate: async (input) => {
            let reg = /^[A-Za-z0-9-]+$/
            if (input && reg.test(input)) return true
            else throw new Error("仓库名字可包含英文、数字、-")
          },
          default: name
        },
        {
          type: 'list',
          name: 'type',
          message: '请选择初始化哪种类型项目',
          choices: ["vue", "react"]
        },
        {
          type: 'checkbox',
          name: 'depends',
          message: '请选择第三方依赖',
          choices: async (ans) => {
            let { type } = ans
            let map = {
              vue: ["element-plus", "ant-design-vue", "vant"],
              react: ["antd", "antd-mobile"]
            }
            return map[type]
          }
        },
        {
          type: 'confirm',
          name: 'needInstall',
          message: '是否需要帮您安装依赖'
        },
        {
          type: 'list',
          name: 'npmManage',
          message: '请选择您的包管理工具',
          choices: ['pnpm', 'yarn', 'cnpm', 'npm'],
          when(ans) {
            return ans.needInstall
          }
        },

      ])
    return answers
  } catch (error) {
    errorFun(error)
  }

}

export default async function create(name, options) {
  let answers = await programInit(name)
  try {
    await creator(answers, options)
    mSuccess('创建成功')
  } catch (err) {
    mError(err.message)
  }
}