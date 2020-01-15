import { getMod, mergeData, mergeError } from '../../methods.js'
const error = {
  code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
  error: 'Тексты в блоке warning должны быть одного размера'
}

export default ({ log, node, mods }) => {
  if (log.nodeName === 'warning') {
    if (node && node.value && node.value.value === 'text') {
      const size = getMod(mods, 'size')
      if (!log.data.textSize && size && size.value && size.value.value) {
        return mergeData(log, { textSize: size.value.value })
      }
      if (size && size.value && log.data.textSize && size.value.value !== log.data.textSize) {
        return mergeError(log, { ...error, location: log.location })
      }
    }
  }
  return log
}
