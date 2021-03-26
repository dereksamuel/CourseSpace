export const getAll = (response) => (dispatch) => {
  dispatch({
    type: "get_user",
    payload: response,
  });
};

export const setLoading = (action) => (dispatch) => {
  dispatch({
    type: "set_loading",
    payload: action,
  });
};
