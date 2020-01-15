import h1 from './text/h1'
import textSizes from './warning/textSizes'

export default [
  {
    nodeName: 'h1',
    validator: h1
  },
  {
    nodeName: 'warning',
    validator: textSizes
  }
]
