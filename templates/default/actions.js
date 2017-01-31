export const actionConstants = {
  LOAD_{{name.uppercase}}_REQUEST: '{{name.camelCase}}/LOAD_{{name.uppercase}}_REQUEST',
  LOAD_{{name.uppercase}}_SUCCESS: '{{name.camelCase}}/LOAD_{{name.uppercase}}_SUCCESS',
  LOAD_{{name.uppercase}}_FAILURE: '{{name.camelCase}}/LOAD_{{name.uppercase}}_FAILURE',
};

export function load{{name.capital}}() {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: actionConstants.LOAD_{{name.uppercase}}_REQUEST });
    return axios.get(`${protocol}://${host}/api/v1/{{name.dash}}`)
      .then((res) => {
        dispatch({
          type: actionConstants.LOAD_{{name.uppercase}}_SUCCESS,
          payload: res.data,
          meta: {
            lastFetched: Date.now(),
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: actionConstants.LOAD_{{name.uppercase}}_FAILURE,
          payload: error,
          error: true,
        });
      });
  };
}
