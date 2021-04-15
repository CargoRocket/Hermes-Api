export const paramTypes = {
  String: 'string',
  Boolean: 'boolean',
  Array: 'array',
  Integer: 'integer',
  Float: 'float',
  Enum: 'enum',
}

const parseDataType = (req, name, type, options) => {
  if (type === 'array') {
    const data = JSON.parse(req.query[name]);
    if (options.minLength && data.length < options.minLength) {
      throw new Error('Array does not meet length requirements - Too small');
    }
    if (options.maxLength && data.length > options.maxLength) {
      throw new Error('Array does not meet length requirements - Too long');
    }
    return data;
  }
  if (type === paramTypes.Integer) {
    return parseInt(req.query[name]);
  }
  if (type === paramTypes.Integer) {
    return parseFloat(req.query[name]);
  }
  if (type === paramTypes.Enum) {
    if (!options.options.includes(req.query[name])) {
      throw new Error(`Parameter ${name} did not satisfy on of the possible values! (${options.options.join(',')})`);
    }
  }
  return req.query[name];
}

export const required = (req, name, type, options) => {
  if (req.query[name]) {
    return parseDataType(req, name, type, options);
  }
  throw new Error(`Parameter "${name}" of type ${type} not satisfied`);
}

export const optional = (req, name, type, defaultValue, options) => {
  if (req.query[name]) {
    return parseDataType(req, name, type, options);
  }
  return defaultValue;
}