import { mergeData, mergeError, getLoc } from '../../methods.js'
const error = {
  code: 'WARNING.INVALID_BUTTON_POSITION',
  error: 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности'
}

export default ({ log, node, ast }) => {
  if (log.nodeName === 'warning') {
    if (node.value.value === 'button') {
      return mergeData(log, { buttonPosition: getLoc(node.value) })
    }

    if (node.value.value === 'placeholder' && log.data.buttonPosition) {
      return mergeError(log, { ...error, location: log.data.buttonPosition })
    }
  }
  return log
}
