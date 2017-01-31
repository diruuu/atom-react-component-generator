'use babel';
import {toCamelCase} from './toCamelCase';

export const toUpperCase = (str) => {
  return toCamelCase(str).replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();}).toUpperCase();
}
