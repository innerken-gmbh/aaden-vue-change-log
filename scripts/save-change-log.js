#!/bin/node
import { defaultChangeLog, defaultProject, defaultVersion } from './defaultStructrue.js'
import fs from 'fs'

const log = process.argv.slice(2).join(' ')
console.log('Log-->' + log)


const currentData = JSON.parse(
  fs.readFileSync('../src/assets/changelog/changelog.json')
)
console.log(currentData)

const versionInfo = JSON.parse(
  fs.readFileSync('../package.json')
).version
console.log(versionInfo)

let index = currentData.findIndex(c => c.version === versionInfo)
if (index === -1) {
  currentData.push(
    Object.assign({}, defaultVersion, { version: versionInfo })
  )
  index = currentData.length - 1
}

const scope = currentData[index]

console.log(defaultVersion, defaultProject, defaultChangeLog)
