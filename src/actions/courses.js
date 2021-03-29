import fb, { db } from "../helpers/firebase_config";

export const createCourse = (toSave) => async (dispatch) => {
  if (!toSave) return new Promise.reject("Lo sentimos debe contener algo el curso");
  try {
    const response = await db.collection("courses").add(toSave);
    console.log(response.id);
    dispatch({
      type: "create_course",
      payload: response,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: "error",
      payload: error,
    });
    return;
  }
};

export const getCourses = () => (dispatch) => {
  db.collection("courses").onSnapshot((querySnapshot) => {
    if (querySnapshot.empty) {}
    else {
      const dataPayload = [];
      querySnapshot.forEach((doc) =>
        dataPayload.push(doc.data())
      );
      dispatch({
        type: "get_all",
        payload: dataPayload,
      });
    }
  });
};
