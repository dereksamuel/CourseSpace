const INITIAL_STATE = {
  courses: [],
  lastCourse: undefined,
  error: null,
  loading: true,
  updatedCourse: null,
  deletedCourse: null,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case "create_course":
      return {
        ...state,
        lastCourse: action.payload,
      }
    case "update_course":
      return {
        ...state,
        updatedCourse: action.payload,
      }
    case "delete_course":
      return {
        ...state,
        deletedCourse: action.payload,
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
