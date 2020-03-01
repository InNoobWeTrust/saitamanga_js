import selectParser from "./parser.js";

/**
 * Parse from element with specified array of field configurations
 */
const config2ParserMap = (configs) => (elem) => {
  const dataMap = {};
  for (let i = 0; i < configs.length; i += 1) {
    const config = configs[i];
    const { field, selector, attribute, single } = config;
    const parser = selectParser(selector, { attribute, single: !!single });
    const data = parser(elem);
    dataMap[field] = data;
  }
  return dataMap;
};

export default config2ParserMap;
