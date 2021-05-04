import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { FaPlus, FaFile, FaCalendar, FaCameraRetro, FaTimes } from "react-icons/fa";
import fb, { storage } from "../../helpers/firebase_config";
import { connect } from "react-redux";
import * as actionsCourses from "../../actions/courses";
import { Form, Button } from "../styles";
import { Close } from '../Courses/styles';
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Loader from '../Loader/index.jsx';
import Modal from "../Modal/index.jsx";
import Card from "../Card/index.jsx";

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
    photoURL: "",
  };
  const observer = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      if (isIntersecting) {
        if (target.dataset.src)
          target.setAttribute('src', target.dataset.src);
        target.setAttribute('style', 'opacity: 1; object-fit: scale-down;');
      } else {
        target.removeAttribute('src');
        target.setAttribute('style', 'opacity: 0;');
      }
    }
  })

  const functionCallback = useCallback(() => {
    const imgs = document.querySelectorAll('img.carousel-item__img');

    imgs.forEach(img => {
      console.log(observer);
      observer.observe(img);
    });
  });

  useEffect(() => {
    if (!fb.auth().currentUser) return;//FIXME: Arrégla esto por doble consulta a base de datos al sign out
    getCourses();
    functionCallback();
  }, []);

  const signOut = () => {
    localStorage.removeItem("rememberMe");
    fb.auth().signOut();
  };

  const handleChangeDate = (e) => {
    setAddDate(e.target.value);
    const dateNow = new Date(e.target.value);
    const day = dateNow.getDay()
    const hours = dateNow.getHours().toLocaleString();
    const minutes = dateNow.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    var weekday = new Array(7);
    weekday[0] = "domingo";
    weekday[1] = "lunes";
    weekday[2] = "martes";
    weekday[3] = "miércoles";
    weekday[4] = "jueves";
    weekday[5] = "viernes";
    weekday[6] = "sábado";
    setDate(`Estudia el ${weekday[day]} a las ${hours === 0 ? 12 : hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`);
  }

  const addStorage = (toSave) => {
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
        toSave.photoURL = url;
        createCourse(toSave);
        setStateButton("Guardar");
        closeModal();
      })
      .catch((err) => {
        console.error(err);
        setStatus("Lo sentimos, hubo un error al obtener");
      });
    })
  };
  
  const handleCreateCourse = (e) => {
    e.preventDefault();
    setStateButton("Cargando");
    const form = new FormData(ref.current);
    toSave.date = addDate;
    toSave = {
      ...toSave,
      "fullname": form.get("fullname"),
      "description": form.get("description"),
    }
    console.log(toSave, addDate);
    if (file)
      addStorage(toSave);
    else {
      setStatus("");
      createCourse(toSave);
      setStateButton("Guardar");
      closeModal();
    }
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

  if (coursesData.courses.length) {
    const functionTimeout = () => {
      const timeout = setTimeout(() => {
        const xImages = document.querySelectorAll('img.carousel-item__img');
        functionCallback();
        if (!xImages.length) {
          clearTimeout(timeout);
          functionTimeout();
        }
        clearTimeout(timeout);
      }, 10);
    }

    functionTimeout();
  }

  return (
    <div>
      <Modal></Modal>
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
                  {
                    addDate &&
                      <span className="datepicker-toggle">
                        <span className="datepicker-toggle-button">
                          <FaCalendar></FaCalendar>
                          <p>{date ? date : "Selecciona la fecha"}</p>
                        </span>
                        <input type="datetime-local" className="datepicker-input" onChange={handleChangeDate} />
                      </span>
                  }
                  {
                    addPhoto &&
                      <label className="imageContainer">
                        {
                          file ? <img src={ sessionStorage.getItem("urlPreview") } alt="image loaded" className="imageLoaded" />
                          : <>
                            <input type="file" onChange={handleChangeFile} className="custom-file" style={{ maxWidth: "150px", }} />
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
                    <input required name="fullname" type="text" placeholder="Nombre completo del curso" style={{ fontWeight: "500", }} />
                    <textarea name="description" type="text" placeholder="Añadir una descripción. . ." style={{ fontSize: "1rem", minHeight: "100px", }} />
                  </div>
                  <div className="icons">
                    <section>
                      <i className="tooltip top">
                        {
                          !addPhoto ? <FaFile onClick={() => {
                            if (screen.width > 768) {
                              return setAddPhoto(true);
                            }
                          }} /> : <FaTimes className="closeIcon" onClick={() => {
                            if (screen.width > 768) {
                              return setAddPhoto(false);
                            }
                          }}></FaTimes>
                        }
                        <span className="tiptext" onClick={() => {
                          return addPhoto ? setAddPhoto(false) : setAddPhoto(true);
                        }}>{!addPhoto ? "Añadir" : "Quitar"} foto</span>
                      </i>
                      <i className="tooltip top">
                        {
                          !addDate ? <FaCalendar onClick={() => {
                            if (screen.width > 768) {
                              return setAddDate(true);
                            }
                          }} /> : <FaTimes className="closeIcon" onClick={() => {
                            if (screen.width > 768) {
                              return setAddDate(false);
                            }
                          }}></FaTimes>
                        }
                        <span className="tiptext" onClick={() => {
                          return addDate ? setAddDate(false) : setAddDate(true);
                        }}>{!addDate ? "Añadir" : "Quitar"} la hora de estudio</span>
                      </i>
                    </section>
                    <Button size_f="1rem" padding="1rem" disabled={stateButton !== "Guardar"}>{stateButton}</Button>
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
      <ul className="ulListCards" style={{
        padding: "0 2rem",
        display: "flex",
        alignItems: "flex-start",
        flexWrap: "wrap",
        justifyContent: "start",
      }}>
        {
          coursesData.courses?.map((course) => {
            return (
              <Card item={course} key={course.id} />
            );
          }) || "No hay cursos"
        }
      </ul>
      <button onClick={signOut}>SignOut</button>
    </div>
  )
}

const mapStateToProps = (reducers) => ({
  authenticate: reducers.authenticate,
  courses: reducers.courses,
})

export default connect(mapStateToProps, actionsCourses)(memo(Courses));
