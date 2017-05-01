
const prefix = 'https://www.schesign.com/datatype/';

export const TYPE_BOOLEAN = `${prefix}boolean`;
export const TYPE_TEXT = `${prefix}text`;
export const TYPE_URL = `${prefix}url`;
export const TYPE_EMAIL = `${prefix}email`;
export const TYPE_ENUM = `${prefix}enum`;
export const TYPE_HOSTNAME = `${prefix}hostname`;
export const TYPE_NUMBER = `${prefix}number`;
export const TYPE_INT = `${prefix}int`;
export const TYPE_INT_8 = `${prefix}int8`;
export const TYPE_INT_16 = `${prefix}int16`;
export const TYPE_INT_32 = `${prefix}int32`;
export const TYPE_INT_64 = `${prefix}int64`;
export const TYPE_FLOAT_32 = `${prefix}float32`;
export const TYPE_FLOAT_64 = `${prefix}float64`;
export const TYPE_DATETIME = `${prefix}datetime`;
export const TYPE_SHORT_DATE = `${prefix}shortdate`;
export const TYPE_TIME = `${prefix}time`;

/* Speical types */
export const LINKED_CLASS = 'LinkedClass';
export const NESTED_OBJECT = 'NestedObject';

/* Main Primitives */
export const TEXT = 'Text';
export const NUMBER = 'Number';
export const BOOLEAN = 'Boolean';
export const DATE = 'Date';
export const ENUM = 'Enum';

export const TEXT_FORMAT_URL = 'Url';
export const TEXT_FORMAT_EMAIL = 'Email';
export const TEXT_FORMAT_HOSTNAME = 'Hostname';

export const DATE_SHORT = 'ShortDate';
export const DATE_DATETIME = 'DateTime';
export const DATE_TIME = 'Time';

export const NUMBER_INT = 'Int';
export const NUMBER_INT_8 = 'Int8';
export const NUMBER_INT_16 = 'Int16';
export const NUMBER_INT_32 = 'Int32';
export const NUMBER_INT_64 = 'Int64';
export const NUMBER_FLOAT_32 = 'Float32';
export const NUMBER_FLOAT_64 = 'Float64';

export function reduceUrl(url) {
  return url.substring(url.indexOf('schesign.com'));
}


export function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function isRequiredCardinality(cardinality) {
  return cardinality.minItems > 0;
}

export function isMultipleCardinality(cardinality) {
  return !isNumber(cardinality.maxItems) || cardinality.maxItems > 1;
}
