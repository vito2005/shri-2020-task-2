import { getMod, mergeData, mergeError, getLoc } from '../../methods.js'
import { sizes } from './../../constants'
const error = {
  code: 'WARNING.INVALID_BUTTON_SIZE',
  error: 'Размер кнопки блока warning должен быть на 1 шаг больше эталонного'
}

export default ({ log, node, mods, ast, parent }) => {
  if (log.nodeName === 'warning' && parent === 'warning') {
    const { buttonSize } = log.data
    const size = getMod(mods, 'size')

    if ((node.value.value === 'text' || node.value.value === 'placeholder') && !buttonSize && size) {
      return mergeData(log, { buttonSize: sizes[sizes.findIndex(s => s === size.value.value) + 1] })
    }

    if (node.value.value === 'button' && buttonSize && buttonSize !== size.value.value) {
      return mergeError(log, { ...error, location: getLoc(ast) })
    }
  }
  return log
}
