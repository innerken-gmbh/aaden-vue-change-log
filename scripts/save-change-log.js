#!/bin/node
import { defaultChangeLog, defaultProject, defaultVersion, VersionTag } from './defaultStructrue.js'
import fs from 'fs'

const CHANGE_LOG_PATH = __dirname+'../src/assets/changelog/changelog.json'

const log = process.argv.slice(2).join(' ')
let [ref, project, tag, message] = log.split('::')
tag = removeChar(tag)

if (!Object.keys(VersionTag).includes(tag)) {
  console.error(tag + ' not support')
  process.exit(-1)
}
function removeChar (str) {
  str = str.slice(1, -1)
  return str
}


const currentData = JSON.parse(
  fs.readFileSync(CHANGE_LOG_PATH)
)


const versionInfo = JSON.parse(
  fs.readFileSync('../package.json')
).version



let index = addIfNotExist(
  Object.assign({}, defaultVersion,
    { version: versionInfo }),
  currentData,
  c => c.version === versionInfo
)

const projectIndex = addIfNotExist(
  Object.assign({}, defaultProject, { name: project }),
  currentData[index].projects,
  p => p.name === project
)
const projectElement = currentData[index]
  .projects[projectIndex].changeLogs.find(c => c.type === tag)
projectElement.log.push(Object.assign({}, defaultChangeLog,
  { message: message, ref, timestamp: new Date().toLocaleString() }))

saveJson(currentData)


function saveJson (changeLog) {
  fs.writeFileSync(CHANGE_LOG_PATH, JSON.stringify(changeLog))
}

function addIfNotExist (item, arr, func) {
  let i = findIndex(arr, func)
  if (i === -1) {
    arr.push(item)
    i = arr.length - 1
  }
  return i

}

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


