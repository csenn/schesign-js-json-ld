import { expect } from 'chai'
import { generateFromGraph } from '../src'

import basic from 'schesign-graph-examples/graphs/export/basic'
import propertyVariations from 'schesign-graph-examples/graphs/export/property_variations'
import inheritanceChain from 'schesign-graph-examples/graphs/export/inheritance_chain_2'
import recursion from 'schesign-graph-examples/graphs/export/recursion'
import linkedNodes from 'schesign-graph-examples/graphs/export/linked_nodes_2'

import basicLd from './fixtures/basic.ld.json'
import propertyVariationsLd from './fixtures/property_variations.ld.json'
import recursionLd from './fixtures/recursion.ld.json'
import inheritanceLd from './fixtures/inheritance.ld.json'
import linkedNodesLd from './fixtures/linked_nodes.ld.json'

const { describe, it } = global

describe('generateFromGraph', () => {
  it('should convert basic to a json schema', () => {
    const schema = generateFromGraph(basic.graph)
    expect(schema).to.deep.equal(basicLd)
  })

  it('should convert recursion to a json schema', () => {
    const result = generateFromGraph(recursion.graph)
    expect(result).to.deep.equal(recursionLd)
  })

  it('should convert propertyVariations to json ld', () => {
    const schema = generateFromGraph(propertyVariations.graph)
    expect(schema).to.deep.equal(propertyVariationsLd)
  })

  it('should convert inheritance to json ld', () => {
    const result = generateFromGraph(inheritanceChain.graph)
    expect(result).to.deep.equal(inheritanceLd)
  })

  it('should convert linkedNodes to json ld', () => {
    const result = generateFromGraph(linkedNodes.graph)
    expect(result).to.deep.equal(linkedNodesLd)
  })
})
