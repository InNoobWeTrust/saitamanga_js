import { interleave } from '../utils/arr_mix.js';

export const styled = tag => ([...attrTmpls], ...attrEvals) => {
  const attrs = interleave(attrTmpls, attrEvals);
  return `${tag} ${attrs}`;
};

export const styleObj2Str = styleObj =>
  Object.keys(styleObj)
    .map(k => `${k}: ${styleObj[k]}`)
    .join('; ');

export const render = ({ tag, props = {}, children = [] }, text) => {
  const propsStr = Object.keys(props)
    .map(k => `${k}="${props[k]}"`)
    .join(' ');
  const txt = undefined !== text ? text : '';
  const childrenStr = children.map(render).join('');
  return `<${tag} ${propsStr}>
    ${txt}
    ${childrenStr}
  </ ${tag}>`;
};
