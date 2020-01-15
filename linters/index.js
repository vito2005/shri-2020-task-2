import h1 from './text/h1'
import textSizes from './warning/textSizes'
import buttonSize from './warning/buttonSize'

export default [
  {
    nodeName: 'h1',
    validator: h1
  },
  {
    nodeName: 'warning',
    validator: textSizes
  },
  {
    nodeName: 'warning',
    validator: buttonSize
  },
]
