'use babel';
import {toCamelCase} from './toCamelCase';

export const toDash = (str) => {
  return toCamelCase(str).replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();}).toLowerCase();
}
