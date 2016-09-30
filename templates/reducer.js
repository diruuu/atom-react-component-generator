'use babel';

import {toCamelCase, toDash} from '../helpers';

export const Reducer = (name, env) => {
  return(
`const Immutable = require("immutable");
import {actionTypes} from "./${toDash(name)}.act";

const initialState: any = Immutable.Map({
    isFetching: false
});

export const ${toCamelCase(name)}Reducer: any = (state: any = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.INCREMENT_COUNTER:
            return state
                .set("isFetching", true);
        default:
            return state;
    }
};`
  );
}
