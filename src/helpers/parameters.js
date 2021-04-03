export const paramTypes = {
  String: 'string',
  Boolean: 'boolean',
  Array: 'array',
  Integer: 'integer',
  Float: 'float',
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
  return req.query[name];
}

export const required = (req, name, type, options) => {
  if (req.query[name]) {
    return parseDataType(req, name, type, options);
  }
  throw new Error(`Parameter "${name}" of type ${type} not satisfied`);
}

export const optional = (req, name, type, defaultValue, options) => {
  if (req.query[name] && typeof req.query[name] === type) {
    return parseDataType(req, name, type, options);
  }
  return defaultValue;
}