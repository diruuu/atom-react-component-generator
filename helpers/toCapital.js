'use babel';
import {toCamelCase} from './toCamelCase';

export const toCapital = (str) => {
  const string = toCamelCase(str);
  return string.charAt(0).toUpperCase() + string.slice(1);
}
