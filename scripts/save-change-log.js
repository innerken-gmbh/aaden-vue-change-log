#!/bin/node
import { defaultVersion } from './defaultStructrue.js'
import fs from 'fs'


const log = process.argv.slice(2).join(' ')
const [ref, project, tag, message] = log.split('::')
console.log(ref, project, tag, message)

const currentData = JSON.parse(
  fs.readFileSync('../src/assets/changelog/changelog.json')
).versions
console.log(currentData)

const versionInfo = JSON.parse(
  fs.readFileSync('../package.json')
).version
console.log(versionInfo)

let index = findIndex(currentData, c => c.version === versionInfo)
if (index === -1) {
  currentData.push(
    Object.assign({}, defaultVersion, { version: versionInfo })
  )
  index = currentData.length - 1
}

const scope = currentData[index]

function findIndex (arr, func) {
  let t = -1
  for (const i in arr) {
    if (func(arr[i])) {
      t = i
      break
    }
  }
  return t
}


