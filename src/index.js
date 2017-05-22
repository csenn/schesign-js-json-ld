import * as constants from './constants'

function _addPrefix (uid) {
  return `https://www.schesign.com/${uid}`
}

export function getRangeId (context, property) {
  const { uid, range } = property
  if (range.type === 'LinkedClass') {
    return range.ref
  }
  if (range.type === 'NestedObject') {
    return context.blankNodes[uid]
  }
  if (range.type === constants.BOOLEAN) {
    return constants.TYPE_BOOLEAN
  }
  if (range.type === constants.ENUM) {
    return constants.TYPE_ENUM
  }
  if (range.type === constants.TEXT) {
    if (range.format === constants.TEXT_FORMAT_URL) {
      return constants.TYPE_URL
    }
    if (range.format === constants.TEXT_FORMAT_EMAIL) {
      return constants.TYPE_EMAIL
    }
    if (range.format === constants.TEXT_FORMAT_HOSTNAME) {
      return constants.TYPE_HOSTNAME
    }
    return constants.TYPE_TEXT
  }
  if (range.type === constants.NUMBER) {
    if (range.format === constants.NUMBER_INT) {
      return constants.TYPE_INT
    }
    if (range.format === constants.NUMBER_INT_8) {
      return constants.TYPE_INT_8
    }
    if (range.format === constants.NUMBER_INT_16) {
      return constants.TYPE_INT_16
    }
    if (range.format === constants.NUMBER_INT_32) {
      return constants.TYPE_INT_32
    }
    if (range.format === constants.NUMBER_INT_64) {
      return constants.TYPE_INT_64
    }
    if (range.format === constants.NUMBER_FLOAT_32) {
      return constants.TYPE_FLOAT_32
    }
    if (range.format === constants.NUMBER_FLOAT_64) {
      return constants.TYPE_FLOAT_64
    }
    return constants.TYPE_NUMBER
  }
  if (range.type === constants.DATE) {
    if (range.format === constants.DATE_SHORT) {
      return constants.TYPE_SHORT_DATE
    }
    if (range.format === constants.DATE_TIME) {
      return constants.TYPE_TIME
    }
    return constants.TYPE_DATETIME
  }

  throw new Error(`Not expecting range: ${JSON.stringify(range)}`)
}

export function _buildDomainMapping (context) {
  const domainMapping = {}
  const addRefs = (parentId, propertySpecs) => {
    propertySpecs.forEach(propertySpec => {
      if (!domainMapping[propertySpec.ref]) {
        domainMapping[propertySpec.ref] = []
      }
      domainMapping[propertySpec.ref].push(parentId)
    })
  }
  Object.keys(context.classCache).forEach(key => {
    const classItem = context.classCache[key]
    addRefs(key, classItem.propertySpecs)
  })
  Object.keys(context.propertyCache).forEach(key => {
    const property = context.propertyCache[key]
    if (property.range.type === 'NestedObject') {
      addRefs(context.blankNodes[key], property.range.propertySpecs)
    }
  })
  return domainMapping
}

export function _addProperties (context) {
  const domainMapping = _buildDomainMapping(context)
  Object.keys(context.propertyCache).forEach(key => {
    const property = context.propertyCache[key]
    const node = {
      '@id': _addPrefix(key),
      '@type': 'rdf:Property',
      'rdf:label': property.label,
      'rdfs:range': { '@id': getRangeId(context, property) }
    }
    if (domainMapping[key]) {
      if (domainMapping[key].length === 1) {
        node['rdfs:domain'] = { '@id': _addPrefix(domainMapping[key][0]) }
      } else {
        node['rdfs:domain'] = domainMapping[key].map(id => ({ '@id': _addPrefix(id) }))
      }
    }
    context['@graph'].push(node)
  })
}

export function _addClasses (context) {
  Object.keys(context.classCache).forEach(key => {
    const classItem = context.classCache[key]
    const node = {
      '@id': _addPrefix(key),
      '@type': 'rdfs:Class',
      'rdf:label': classItem.label
    }
    if (classItem.description) {
      node['rdfs:comment'] = classItem.description
    }
    if (classItem.subClassOf) {
      node['rdfs:subClassOf'] = { '@id': classItem.subClassOf }
    }
    context['@graph'].push(node)
  })
}

export function _addBlankNodes (context) {
  Object.keys(context.blankNodes).forEach(key => {
    context['@graph'].push({
      '@id': context.blankNodes[key],
      '@type': 'rdfs:Class'
    })
  })
}

export function generateFromGraph (graph, options = {}) {
  /* Create a simple context obj to thread through */
  const context = {
    classCache: {},
    propertyCache: {},
    blankNodes: {},
    '@graph': []
  }

  /* Create a dict lookup for classes and properties for speed and convenience */
  let blankCounter = 0
  graph.forEach(node => {
    if (node.type === 'Class') {
      context.classCache[node.uid] = node
    } else if (node.type === 'Property') {
      context.propertyCache[node.uid] = node
      if (node.range.type === 'NestedObject') {
        context.blankNodes[node.uid] = `_:a${blankCounter}`
        blankCounter++
      }
    }
  })

  _addBlankNodes(context)
  _addClasses(context)
  _addProperties(context)

  return {
    '@context': {
      rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
      rdfs: 'http://www.w3.org/2000/01/rdf-schema#'
    },
    '@graph': context['@graph']
  }
}
