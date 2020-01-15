import { getMod, mergeData, mergeError, getLocation } from '../../methods.js'

const error = {
  code: 'TEXT.SEVERAL_H1',
  error: 'Заголовок первого уровня на странице должен быть единственным'
}

export default ({ log, node, mods, ast }) => {
  if (log.nodeName === 'h1') {
    if (node && node.value && node.value.value === 'text') {
      const type = getMod(mods, 'type')
      if (type && type.value && type.value.value === 'h1') {
        if (log.data.h1) {
          return mergeError(log, { location: getLocation(ast), ...error })
        }
        return mergeData(log, { h1: true })
      }
    }
  }

  return log
}
