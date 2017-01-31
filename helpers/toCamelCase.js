'use babel';

export const toCamelCase = (str) => {
  return str.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
}
