import { expect } from 'chai';
import { generateFromGraph } from '../src';
const { describe, it } = global;

// import simple from './fixtures/simple.json';
// import simpleSchema from './fixtures/simpleSchema.json';
// import propertyVariationsSchema from './fixtures/propertyVariationsSchema.json';

// import inheritanceSchema from './fixtures/inheritanceSchema.json';
// import inheritanceOverride from './fixtures/inheritanceOverride.json';
// import inheritanceOverrideSchema from './fixtures/inheritanceOverrideSchema.json';
// import excludeParent from './fixtures/excludeParent';
// import excludeParentSchema from './fixtures/excludeParentSchema';
// import recursive from './fixtures/recursive';
// import recursiveSchema from './fixtures/recursiveSchema';
// import schemaDotOrg from './fixtures/schemaDotOrg';

import propertyVariations from './fixtures/propertyVariations.json';
import propertyVariationsLd from './fixtures/propertyVariations.ld.json';
import inheritance from './fixtures/inheritance.json';
import inheritanceLd from './fixtures/inheritance.ld.json';

describe('generateFromGraph', () => {
  // it('should convert simple to a json schema', () => {
  //   const schema = generateFromClass(
  //     simple.graph,
  //     'https://www.schesign.com/u/my_user/my_design/0.0.1/class/class1'
  //   );
  //   expect(schema).to.deep.equal(simpleSchema);
  // });

  it('should convert propertyVariations to json ld', () => {
    const result = generateFromGraph(propertyVariations.graph);
    // console.log(JSON.stringify(result, null, 2));
    expect(result).to.deep.equal(propertyVariationsLd);
  });

  it('should convert inheritance to json ld', () => {
    const result = generateFromGraph(inheritance.graph);
    console.log(JSON.stringify(result, null, 2));
    expect(result).to.deep.equal(inheritanceLd);
  });

  // it('should convert excludeParent to a json schema', () => {
  //   const schema = generateFromClass(
  //     excludeParent.graph,
  //     'https://www.schesign.com/u/my_user/my_design/0.0.1/class/class2'
  //   );
  //   expect(schema).to.deep.equal(excludeParentSchema);
  // });

  // it('should convert inheritanceOverride to a json schema', () => {
  //   const schema = generateFromClass(
  //     inheritanceOverride.graph,
  //     'https://www.schesign.com/u/csenn/test_inheritance_override_1/master/class/class1'
  //   );
  //   expect(schema).to.deep.equal(inheritanceOverrideSchema);
  // });

  // it('should convert recursive to a json schema', () => {
  //   const schema = generateFromClass(
  //     recursive.graph,
  //     'https://www.schesign.com/o/tests/recursive/master/class/class1'
  //   );
  //   expect(schema).to.deep.equal(recursiveSchema);
  //   // expect(schema).to.deep.equal(inheritanceOverrideSchema);
  // });

  // it.skip('should convert schemaDotOrg to a json schema', () => {
  //   const schema = generateFromClass(
  //     schemaDotOrg.graph,
  //     'https://www.schesign.com/u/csenn/schemadotorg/master/class/person'
  //   );
  //   console.log(JSON.stringify(schema, null, 2));
  //   // expect(schema).to.deep.equal(inheritanceOverrideSchema);
  // });
});
