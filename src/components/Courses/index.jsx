import React, { useEffect } from 'react';
import fb from "../../helpers/firebase_config";
import { connect } from "react-redux";
import * as actionsCourses from "../../actions/courses";

import Header from "../Header/index.jsx";

function Courses({ authenticate, createCourse, getCourses, courses: coursesData }) {
  useEffect(() => {
    if (!fb.auth().currentUser) return;//FIXME: Arrégla esto por doble consulta a base de datos al sign out
    getCourses();
  }, []);
  let toSave = {
    uid: authenticate?.user?.uid,
    course_id: "xiopaaasssssss",
  };

  return (
    <div>
      <Header />
      <h1>Hello Home</h1>
      <button onClick={() => createCourse(toSave)}>Create "course"</button>
      {
        coursesData.courses?.map((course) => {
          console.log(course);
          return (
            <li key={course.id}>{course.course_id}</li>
          );
        }) || "No hay cursos"
      }
      <button onClick={() => fb.auth().signOut()}>SignOut</button>
    </div>
  )
}

const mapStateToProps = (reducers) => ({
  authenticate: reducers.authenticate,
  courses: reducers.courses,
})

export default connect(mapStateToProps, actionsCourses)(Courses);
