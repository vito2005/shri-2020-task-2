import jsonToAst from 'json-to-ast'
import linters from './linters'
import { initLogs } from './constants.js'
import { createLog, copy, hasLog } from './methods.js'

function lint (jsonString) {
  try {
    const ast = jsonToAst(jsonString)
    const logs = parse(ast)
    const errors = logs && logs.reduce((acc, { errors }) => [...acc, ...errors], [])
    return errors || []
  } catch (e) {
    return []
  }
}

if (global) {
  global.lint = lint
} else {
  window.lint = lint
}

function parse (ast, logs = initLogs) {
  const { loc, children, type } = ast
  if (type === 'Array') {
    return children.reduce((acc, child) => parse(child, acc), copy(logs))
  }
  const block = children && children.find(node => node.key.value === 'block')
  const content = children && children.find(node => node.key.value === 'content')
  const elem = children && children.find(node => node.key.value === 'elem')
  const mods = children && children.find(node => node.key.value === 'mods')
  const elemMods = children && children.find(node => node.key.value === 'elemMods')
  const node = elem || block

  const relevantLinters = linters
    .filter(({ nodeName }) => logs.some(log => log.nodeName === nodeName))

  const lintedLogs = relevantLinters.reduce((acc, { validator }) => {
    return acc.map(log => validator({ log, content, node, mods, ast, elemMods }))
  }, copy(logs))

  if (content && !hasLog(lintedLogs, loc)) {
    const log = createLog({ nodeName: node && node.value && node.value.value, loc, mods })

    return content.value.children.reduce((acc, child) => {
      return parse(child, acc)
    }, copy([...lintedLogs, log]))
  }

  return lintedLogs
}
