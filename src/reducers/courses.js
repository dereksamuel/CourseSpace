const INITIAL_STATE = {
  courses: [],
  lastCourse: undefined,
  error: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case "create_course":
      return {
        ...state,
        lastCourse: action.payload,
      }
    case "set_loading":
      return {
        ...state,
        loading: action.payload,
      }
    case "get_all":
      return {
        ...state,
        courses: action.payload,
      }
    case "error":
      return {
        ...state,
        error: action.payload,
      }
    default: return state;
  }
};
