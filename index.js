import jsonToAst from 'json-to-ast'
import linters from './linters'
import { initLogs } from './constants.js'
import { createLog, copy, hasLog } from './methods.js'

function lint (jsonString) {
  const ast = jsonToAst(jsonString)
  const logs = parse(ast)
  const errors = logs && logs.reduce((acc, { errors }) => [...acc, ...errors], [])
  return errors || []
}

if (global) {
  global.lint = lint
} else {
  window.lint = lint
}

function parse (ast, logs = initLogs, parent) {
  const { loc, children, type } = ast
  if (type === 'Array') {
    return children.reduce((acc, child) => parse(child, acc, parent), copy(logs))
  }
  const block = children && children.find(node => node.key.value === 'block')
  const content = children && children.find(node => node.key.value === 'content')
  const elem = children && children.find(node => node.key.value === 'elem')
  const mods = children && children.find(node => node.key.value === 'mods')
  const elemMods = children && children.find(node => node.key.value === 'elemMods')
  const node = elem || block

  const relevantLinters = linters
    .filter(({ nodeName }) => logs.some(log => log.nodeName === nodeName))

  if (node && node.value && node.value.value === 'warning') {
    parent = 'warning'
  }
  const lintedLogs = relevantLinters.reduce((acc, { validator }) => {
    return acc.map(log => validator({ log, content, node, mods, ast, elemMods, parent }))
  }, copy(logs))

  if (content && !hasLog(lintedLogs, loc)) {
    const log = createLog({ nodeName: node && node.value && node.value.value, loc, mods })

    if (content.value.type === 'Object') {
      return parse(content.value, copy([...lintedLogs, log]), parent)
    }

    try {
      const newLogs = copy([...lintedLogs, log])

      if (content.value.children && content.value.children.length) {
        return content.value.children.reduce((acc, child) => {
          return parse(child, acc, parent)
        }, newLogs)
      }
    } catch {
      return lintedLogs
    }
  }
  return lintedLogs
}
