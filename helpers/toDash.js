'use babel';

export const toDash = (str) => {
  return str.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
}
