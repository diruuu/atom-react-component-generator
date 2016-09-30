'use babel';

export const ReduxAction = (name, env) => {
  return(
`export const actionTypes = {
  INCREMENT_COUNTER: 'INCREMENT_COUNTER'
};

export function increment() {
  return {
    type: actionTypes.INCREMENT_COUNTER
  };
};`
  );
}
