import jsonToAst from 'json-to-ast'
import linters from './linters'
import { initLogs } from './constants.js'
import { createLog, copy, hasLog } from './methods.js'

function lint (jsonString) {
  const ast = jsonToAst(jsonString)
  const logs = parse(ast)
  const errors = logs.reduce((acc, { errors }) => [...acc, ...errors], [])

  return errors
}

if (global) {
  global.lint = lint
} else {
  window.lint = lint
}

function parse (ast, logs = initLogs) {
  const { loc, children } = ast
  const block = children.find(node => node.key.value === 'block')
  const content = children.find(node => node.key.value === 'content')
  const elem = children.find(node => node.key.value === 'elem')
  const mods = children.find(node => node.key.value === 'mods')
  const node = elem || block

  const relevantLinters = linters
    .filter(({ nodeName }) => logs.some(log => log.nodeName === nodeName))

  const lintedLogs = relevantLinters.reduce((acc, { validator }) => {
    return acc.map(log => validator({ log, content, node, mods }))
  }, copy(logs))

  if (content && !hasLog(lintedLogs, loc)) {
    const log = createLog({ nodeName: node.value.value, loc })

    return content.value.children.reduce((acc, child) => {
      return parse(child, acc)
    }, copy([...lintedLogs, log]))
  }

  return lintedLogs
}

export default lint