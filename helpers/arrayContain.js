'use babel';
export const arrayContain = (arr, find) => {
  var i = arr.length;
  while (i--) {
      if (arr[i] == find) {
          return true;
      }
  }
  return false;
}
