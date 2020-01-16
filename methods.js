export const getMod = (mods, modName) => {
  if (mods) {
    return mods.value.children.find(node => node.key.value === modName)
  }
}
export const copy = (array) => JSON.parse(JSON.stringify(array))

export const createLog = ({ nodeName, loc, mods }) => {
  if (!nodeName) {
    throw new Error('HAS_NO_NODE_NAME')
  }

  return {
    data: {},
    errors: [],
    nodeName,
    mods,
    location: {
      start: {
        column: loc.start.column,
        line: loc.start.line
      },
      end: {
        column: loc.end.column,
        line: loc.end.line
      }
    }
  }
}

export const hasLog = (logs, location) => {
  return logs.find(log => {
    return log.location && location && deepEqual(log.location, location)
  })
}
const deepEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true

  if (isPrimitive(obj1) && isPrimitive(obj2)) return obj1 === obj2

  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false

  for (const key in obj1) {
    if (!(key in obj2)) return false
    if (!deepEqual(obj1[key], obj2[key])) return false
  }

  return true
}

function isPrimitive (obj) {
  return (obj !== Object(obj))
}

export const mergeData = (log, newData) => {
  const data = { ...log.data, ...newData }

  return { ...log, data }
}

export const mergeError = (log, error) => {
  const errors = [...log.errors, error]

  return { ...log, errors }
}
export const getLoc = node => {
  return {
    start: {
      column: node.loc && node.loc.start.column,
      line: node.loc && node.loc.start.line
    },
    end: {
      column: node.loc && node.loc.end.column,
      line: node.loc && node.loc.end.line
    }
  }
}
