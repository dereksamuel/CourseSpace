import fb, { db } from "../helpers/firebase_config";

export const createWork = (toSave) => async (dispatch) => {
  if (!toSave) return new Promise.reject("Lo sentimos debe contener algo la tarea");
  try {
    const response = await db.collection("works").add(toSave);
    console.log(response.id);
    dispatch({
      type: "create_work",
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

export const updateWork = (toSave, id) => async (dispatch) => {
  if (!toSave) return new Promise.reject("Lo sentimos debe contener algo la tarea");
  try {
    const response = await db.collection("works").doc(id).update(toSave);
    console.log(response.id);
    dispatch({
      type: "update_work",
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

export const deleteWork = (id) => async (dispatch) => {
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

export const getWorks = () => (dispatch) => {
  return db.collection("works")
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
