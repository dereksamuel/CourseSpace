const INITIAL_STATE = {
  user: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case "get_user":
      return {
        ...state,
        user: action.payload
      }
    case "set_loading":
      return {
        ...state,
        loading: action.payload,
      }
    default: return state;
  }
};
