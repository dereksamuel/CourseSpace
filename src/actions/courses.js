import fb, { db } from "../helpers/firebase_config";

export const createCourse = (toSave) => async (dispatch) => {
  console.log(toSave);
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

export const updateCourse = (toSave, id) => async (dispatch) => {
  if (!toSave) return new Promise.reject("Lo sentimos debe contener algo el curso");
  try {
    const response = await db.collection("courses").doc(id).update(toSave);
    console.log(response.id);
    dispatch({
      type: "update_course",
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

export const deleteCourse = (id) => async (dispatch) => {
  if (!id) return new Promise.reject("Lo sentimos, es necesario el id");
  try {
    const response = await db.collection("courses").doc(`${id}`).delete();
    dispatch({
      type: "delete_course",
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
  return db.collection("courses")
  .orderBy("date", "asc")
  .where("uid", "==", fb.auth().currentUser.uid)
  .onSnapshot((querySnapshot) => {
    if (querySnapshot.empty) {
    }
    else {
      const dataPayload = [];
      querySnapshot.forEach((doc) =>
        dataPayload.push({
          ...doc.data(),
          id: doc.id,
        })
      );
      dispatch({
        type: "get_all",
        payload: dataPayload,
      });
    }
  });
};
