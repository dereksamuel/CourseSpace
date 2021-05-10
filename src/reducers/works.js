const INITIAL_STATE = {
  works: [],
  lastwork: undefined,
  error: null,
  loading: true,
  updatedwork: null,
  deletedwork: null,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case "create_work":
      return {
        ...state,
        lastwork: action.payload,
      }
    case "update_work":
      return {
        ...state,
        updatedwork: action.payload,
      }
    case "delete_work":
      return {
        ...state,
        deletedwork: action.payload,
      }
    case "set_loading":
      return {
        ...state,
        loading: action.payload,
      }
    case "get_all":
      return {
        ...state,
        works: action.payload,
      }
    case "error":
      return {
        ...state,
        error: action.payload,
      }
    default: return state;
  }
};
