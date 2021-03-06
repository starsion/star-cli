#!/usr/bin/env node
const clone = require('git-clone')
const program = require('commander')
const shell = require('shelljs')
const log = require('tracer').colorConsole()
const Listr = require('listr')
const package = require("./package.json")


program
    .version(package.version)
program
    .command('init <project>','初始化一个项目，project为自定义的项目名称')
    .action(function (project) {
        if (project) {
            let pwd = shell.pwd()
            let url = `https://github.com/starsion/react-star.git`
            // console.log("")
            log.info(`Template address：${url}`)

            new Listr([
                {
                    title: 'download.....',
                    task: () => {
                        return new Promise((resolve, reject) => {
                            clone(url, pwd + `/${project}`, null, function () {
                                resolve("ok")
                            })
                        })
                    }
                },
                {
                    title: 'setting.....',
                    task: () => shell.rm('-rf', pwd + `/${project}/.git`)
                },
            ])
                .run(
                )
                .then(
                    () => {
                        console.log(`\n\t1 - cd ${project}`)
                        console.log(`\t2 - npm install`)
                        console.log(`\t3 - npm run\n`)
                    }
                )
                .catch(
                    (err) => { log.error(err) }
                )
        } else {
            log.error('请输入你的项目名称')
            console.log('请输入你的项目名称')
        }
    })
program.parse(process.argv)



