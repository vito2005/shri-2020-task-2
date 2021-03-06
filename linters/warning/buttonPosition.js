import { mergeData, mergeError, getLoc } from '../../methods.js'
const error = {
  code: 'WARNING.INVALID_BUTTON_POSITION',
  error: 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности'
}

export default ({ log, node, ast, parent }) => {
  if (log.nodeName === 'warning' && parent === 'warning') {
    if (node && node.value && node.value.value === 'button') {
      return mergeData(log, { buttonPosition: getLoc(ast) })
    }

    if (node && node.value && node.value.value === 'placeholder' && log.data.buttonPosition) {
      return mergeError(log, { ...error, location: log.data.buttonPosition })
    }
  }
  return log
}
