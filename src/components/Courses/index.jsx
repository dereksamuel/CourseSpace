import React, { useEffect, useRef, useState } from 'react';
import { FaPlus, FaFile, FaCalendar, FaCameraRetro, FaTimes } from "react-icons/fa";
import fb, { storage } from "../../helpers/firebase_config";
import { connect } from "react-redux";
import * as actionsCourses from "../../actions/courses";
import { Form, Button } from "../styles";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Header from "../Header/index.jsx";
import Loader from '../Loader/index.jsx';
import Modal from "../Modal/index.jsx";
import { Close } from './styles';

function Courses({ authenticate, createCourse, getCourses, courses: coursesData }) {
  const [visible, setVisible] = useState(false);
  const [addPhoto, setAddPhoto] = useState(null);
  const [addDate, setAddDate] = useState(null);
  const [status, setStatus] = useState("Selecciona una foto");
  const [date, setDate] = useState(null);
  const [file, setFilePrevious] = useState(null);
  const [stateButton, setStateButton] = useState("Guardar");
  const ref = useRef(null);
  let toSave = {
    uid: authenticate?.user?.uid,
    date: fb.firestore.FieldValue.serverTimestamp(),
    photoURL: "",
  };

  useEffect(() => {
    if (!fb.auth().currentUser) return;//FIXME: Arrégla esto por doble consulta a base de datos al sign out
    getCourses();
  }, []);

  const signOut = () => {
    localStorage.removeItem("rememberMe");
    fb.auth().signOut();
  };
  const handleChangeDate = (e) => {
    setAddDate(false);
    setDate(e.target.value);
  }
  const addStorage = () => {
    const ref = storage.ref(`imgsCourses/${fb.auth().currentUser.uid}/${file.name}`);
    const task = ref.put(file);

    task.on("state_changed", (snapshot) => {
      const percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      setStatus(`${percentage.toFixed(1)}%`);
    }, (error) => {
      console.error(error);
      setStatus("Lo sentimos, hubo un error");
    }, () => {
      task.snapshot.ref.getDownloadURL()
      .then((url) => {
        setStatus("");
        sessionStorage.setItem("photoURL", url);
      })
      .catch((err) => {
        console.error(err);
        setStatus("Lo sentimos, hubo un error al obtener");
      });
    })
  };
  const handleCreateCourse = (e) => {
    e.preventDefault();
    addStorage();
    const form = new FormData(ref.current);
    const timer = setTimeout(() => {
      clearTimeout(timer);
      toSave.photoURL = sessionStorage.getItem("photoURL");
      toSave = {
        ...toSave,
        "fullname": form.get("fullname"),
        "description": form.get("description"),
      }
      createCourse(toSave);
      setStateButton("Cargando");
      closeModal();
    }, 2000);
  };
  const handleSetVisible = (value) => setVisible(value);
  const handleChangeFile = (e) => {
    setStatus("Cargando");

    setFilePrevious(e.target.files[0]);
    sessionStorage.setItem("urlPreview", URL.createObjectURL(e.target.files[0]));
    setStatus("Listo");
  };
  const closeModal = () => {
    handleSetVisible(false);
    setAddPhoto(false);
    setAddDate(false);
    setFilePrevious(null);
    setDate("");
    setStatus("Selecciona una foto");
  };

  return (
    <div>
      <Modal></Modal>
      <Header />
      <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "0 2rem", }}>
        <Form
          style={visible ? { transition: "1s", } : { cursor: "pointer", transition: "1s", }}
          ref={ref}
          onClick={!visible ? handleSetVisible : () => {}}
          onSubmit={handleCreateCourse}
          content={status}>
          <TransitionGroup>
            <CSSTransition
              key={visible}
              in={visible}
              timeout={300}
              appear={true}
              classNames="fade"
            >
              {
                visible ?
                <section className="grid">
                  <Close onClick={closeModal}>
                    <FaTimes className="closeIcon"></FaTimes>
                  </Close>
                  { date }
                  {
                    addDate &&
                    <label>
                      <input type="date" onChange={handleChangeDate} />
                    </label>
                  }
                  {
                    addPhoto &&
                      <label className="imageContainer">
                        {
                          file ? <img src={ sessionStorage.getItem("urlPreview") } alt="image loaded" className="imageLoaded" />
                          : <>
                            <input type="file" onChange={handleChangeFile} class="custom-file" style={{ maxWidth: "150px", }} />
                            { status !== "Cargando"
                              ? <>
                                <FaCameraRetro/>
                              </>
                              : <Loader/>
                            }
                          </>
                        }
                      </label>
                  }
                  <div>
                    <input name="fullname" type="text" placeholder="Nombre completo del curso" style={{ fontWeight: "500", }} />
                    <textarea name="description" type="text" placeholder="Añadir una descripción. . ." style={{ fontSize: "1rem", minHeight: "150px", }} />
                  </div>
                  <div className="icons">
                    <section>
                      <i className="tooltip top">
                        <FaFile onClick={() => {
                          if (screen.width > 768) {
                            return setAddPhoto(true);
                          }
                        }} />
                        <span className="tiptext" onClick={() => setAddPhoto(true)}>Añadir una foto</span>
                      </i>
                      <i className="tooltip top">
                        <FaCalendar onClick={() => {
                          if (screen.width > 768) {
                            return setAddDate(true);
                          }
                        }} />
                        <span className="tiptext" onClick={() => setAddDate(true)}>Añadir la hora de estudio</span>
                      </i>
                    </section>
                    <Button size_f="1rem" padding="1rem">{stateButton}</Button>
                  </div>
                </section>
                : <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                  <input type="text" disabled placeholder={'Añadir un curso. . .'} style={visible ? {} : { cursor: "pointer", }} />
                  <FaPlus />
                </div>
              }
            </CSSTransition>
          </TransitionGroup>
        </Form>
      </div>
      {
        coursesData.courses?.map((course) => {
          console.log(course);
          return (
            <li key={course.id}>
              <img src={course.photoURL} alt={course.fullname} />
              {course.fullname}
              <p>{course.description}</p>
            </li>
          );
        }) || "No hay cursos"
      }
      <button onClick={signOut}>SignOut</button>
    </div>
  )
}

const mapStateToProps = (reducers) => ({
  authenticate: reducers.authenticate,
  courses: reducers.courses,
})

export default connect(mapStateToProps, actionsCourses)(Courses);
