'use babel';

import {toCamelCase} from '../helpers';

export const Style = (name, env) => {
  return(
`.${toCamelCase(name)} {
  display: relative;
}`
  );
}
