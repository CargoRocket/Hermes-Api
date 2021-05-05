export const paramTypes = {
  String: 'string',
  Boolean: 'boolean',
  Array: 'array',
  Integer: 'integer',
  Float: 'float',
  Enum: 'enum',
}

const parseDataType = (request, name, type, options) => {
  if (type === 'array') {
    const data = JSON.parse(request[name]);
    if (options.minLength && data.length < options.minLength) {
      throw new Error('Array does not meet length requirements - Too small');
    }
    if (options.maxLength && data.length > options.maxLength) {
      throw new Error('Array does not meet length requirements - Too long');
    }
    return data;
  }
  if (type === paramTypes.Integer) {
    return parseInt(request[name]);
  }
  if (type === paramTypes.Integer) {
    return parseFloat(request[name]);
  }
  if (type === paramTypes.Enum) {
    if (!options.options.includes(request[name])) {
      throw new Error(`Parameter ${name} did not satisfy on of the possible values! (${options.options.join(',')})`);
    }
  }
  return request[name];
}

export const required = (request, name, type, options) => {
  if (request[name]) {
    return parseDataType(request, name, type, options);
  }
  throw new Error(`Parameter "${name}" of type ${type} not satisfied`);
}

export const optional = (request, name, type, defaultValue, options) => {
  if (request[name]) {
    return parseDataType(request, name, type, options);
  }
  return defaultValue;
}