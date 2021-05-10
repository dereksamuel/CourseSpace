import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { FaPlus, FaFile, FaCalendar, FaCameraRetro, FaTimes } from "react-icons/fa";
import fb, { storage } from "../../helpers/firebase_config";
import { connect } from "react-redux";
import * as actionsCourses from "../../actions/courses";
import { Form, Button } from "../styles.js";
import { Close, InputInvisible, TextareaInvisible, InputAddCourse } from '../Courses/styles';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import CoursesSvg from "../../assets/courses.svg";

import Loader from '../Loader/index.jsx';
import Modal from "../Modal/index.jsx";
import Card from "../Card/index.jsx";

import "./styles.css";

function Courses({ authenticate, createCourse, getCourses, courses: coursesData, deleteCourse, updateCourse }) {
  const [visible, setVisible] = useState(false);
  const [addPhoto, setAddPhoto] = useState(null);
  const [addDate, setAddDate] = useState(null);
  const [status, setStatus] = useState("Selecciona una foto");
  const [date, setDate] = useState(null);
  const [dateEditVal, setEditVal] = useState(null);
  const [editValBackend, setEditValBackend] = useState(null);
  const [file, setFilePrevious] = useState(null);
  const [stateButton, setStateButton] = useState("Guardar");
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [editPhoto, seteditPhoto] = useState(false);
  const [editDate, seteditDate] = useState(false);
  const [filePreviousUpdate, setFilePreviousUpdate] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [textDelete, setTextDelete] = useState(null);
  const [textUpdate, setTextUpdate] = useState("Guardar");
  const ref = useRef(null);
  const refUpdate = useRef(null);
  const [successCreate, setSuccessCreate] = useState(false);
  let toSave = {
    uid: authenticate?.user?.uid,
    photoURL: "",
  };
  const observer = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      if (isIntersecting) {
        if (target.dataset.src)
          target.setAttribute('src', target.dataset.src || "https://img.icons8.com/ios-glyphs/90/ffffff/cactus-in-pot.png");
        target.setAttribute('style', 'opacity: 1; object-fit: scale-down;');
      } else {
        if (target.dataset.src)
          target.removeAttribute('src');
        target.setAttribute('style', 'opacity: 0;');
      }
    }
  })

  const functionCallback = useCallback(() => {
    const imgs = document.querySelectorAll('img.carousel-item__img');

    imgs.forEach(img => {
      // console.log(observer);
      observer.observe(img);
    });
  });

  useEffect(() => {
    if (!fb.auth().currentUser) return;//FIXME: Arrégla esto por doble consulta a base de datos al sign out
    getCourses();
    functionCallback();
  }, []);

  // const signOut = () => {
  //   localStorage.removeItem("rememberMe");
  //   fb.auth().signOut();
  // };

  const handleChangeDate = (e, otherDate) => {
    if (otherDate) setEditValBackend(e.target.value);
    else setAddDate(e.target.value);
    const dateNow = new Date(e?.target.value);
    const day = dateNow.getDay()
    let hours = dateNow.getHours().toLocaleString();
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
    if (hours > 12) hours = hours - 12;
    if (!otherDate) setDate(`Estudia el ${weekday[day]} a las ${hours === 0 ? 12 : hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`);
    else setEditVal(`Estudia el ${weekday[day]} a las ${hours === 0 ? 12 : hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`);
  }

  const handleChangeDateModal = (item) => {
    if (item.date) {
      const dateNow = new Date(item.date);
      const day = dateNow.getDay()
      let hours = dateNow.getHours().toLocaleString();
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
      if (hours > 12) hours = hours - 12;
      return (`Estudia el ${weekday[day]} a las ${hours === 0 ? 12 : hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`);
    }
  }

  const addStorage = (toSave, id, action) => {
    const ref = storage.ref(`imgsCourses/${fb.auth().currentUser.uid}/${!id ? file.name : filePreviousUpdate.name}`);
    const task = ref.put(!id ? file : filePreviousUpdate);

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
          action(toSave, id).then(() => {
            setTextUpdate("Curso actualizado con éxito");
          }).catch((error) => {
            console.error(error);
            setTextUpdate("Guardar");
            closeModal();
          });
          setStateButton("Guardar");
        })
        .catch((err) => {
          console.error(err);
          setStatus("Lo sentimos, hubo un error al obtener los datos de la urk");
        });
    })
  };

  const removeStorage = (toSave, condition) => {
    const desertRef = storage.ref(`imgsCourses/${fb.auth().currentUser.uid}/${condition}`);
    return desertRef.delete().catch((error) => console.error(error));
  };

  const handleActionCourse = async (e, id) => {
    e.preventDefault();
    setTextUpdate("Cargando");
    setStateButton("Cargando");
    console.log(id ? ref.current : refUpdate.current);
    const form = new FormData(id ? refUpdate.current : ref.current);
    const action = id ? updateCourse : createCourse;
    toSave.date = !id ? addDate : editValBackend;
    toSave = {
      ...toSave,
      "photoURL": !id ? file : filePreviousUpdate,
      "fullname": form.get("fullname"),
      "description": form.get("description"),
      "file": !id ? file?.name || "" : filePreviousUpdate?.name || "",
    };
    if (id) {
      if (!filePreviousUpdate) {
        if (dataModal.photoURL) {
          // alert(filePreviousUpdate);
          toSave = { ...toSave, photoURL: dataModal.photoURL, };
        }
        if (dataModal.photoURL ? editPhoto && dataModal.photoURL : !editPhoto && !dataModal.photoURL) {
          await removeStorage(toSave, dataModal.file);
          toSave = { ...toSave, photoURL: null, };
        }
      }
      if (!editValBackend) {
        if (dataModal.date) {
          toSave = { ...toSave, date: dataModal.date, };
        }
        if (dataModal.date ? editDate && dataModal.date : !editDate && !dataModal.date) toSave = { ...toSave, date: null, };
      }
    }
    if (!id ? file : filePreviousUpdate)
      addStorage(toSave, id, action);
    else {
      setStatus("");
      action(toSave, id);
      setStateButton("Guardar");
    }
    !id && (() => {
      setSuccessCreate("Curso añadido con éxito");
      const timeoutCreate = setTimeout(() => {
        setSuccessCreate(false);
        clearTimeout(timeoutCreate);
      }, 1000);
    })();
    id ? closeFunctionModal() : closeModal();
  };
//TODO: Pending best code
  const handleSetVisible = (value) => setVisible(value);
  const handleChangeFile = (e, otherFile) => {
    if (otherFile) setFilePreviousUpdate(e.target.files[0]);
    else setFilePrevious(e.target.files[0]);
    setStatus("Cargando");
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

  function closeFunctionModal() {
    const overlay = document.querySelector("#overlay");
    console.log(editPhoto);
    const modal = document.querySelector("#modal");
    overlay.style = "opacity: 0; transition: 0.5s;";
    modal.style = "opacity: 0; transition: 0.5s;";
    setTextUpdate("Guardar");
    const timeout = setTimeout(() => {
      seteditPhoto(false);
      seteditDate(false);
      setShowModal(false);
      setDataModal({});
      setFilePreviousUpdate(false);
      setDeleteId(null);
      clearTimeout(timeout);
      setTextDelete(false);
    }, 500);
  }

  return (
    <div>
      <Modal
        showMe={showModal}
        setShowMe={setShowModal}
        closeFunctionModal={closeFunctionModal}
        buttons={deleteId}
        secondButton={
          <Button
            disabled={textDelete}
            size_f="1rem"
            padding="0.8rem 1.5rem"
            onClick={() => {
              deleteCourse(deleteId);
              setTextDelete("Borrado exitosamente");
              const timeout = setTimeout(() => {
                closeFunctionModal();
                clearTimeout(timeout);
                setTextDelete(false);
              }, 1500);
            }}
            type="submit"
            form="modalUpdate"
            variant="danger">
            {textDelete ? textDelete : "Eliminar"}
          </Button>
        }
      >
        {
          !deleteId ? <form onSubmit={(e) => handleActionCourse(e, dataModal.id)} ref={refUpdate} id="modalUpdate">
            {!editDate ? <p style={{ textAlign: "center", marginBottom: "0.5rem", marginTop: "-0.5rem", fontStyle: "italic", }}>{handleChangeDateModal(dataModal)}</p> : <span className="datepicker-toggle">
              <span className="datepicker-toggle-button">
                <FaCalendar></FaCalendar>
                <p>{dateEditVal ? dateEditVal : "Selecciona la fecha"}</p>
              </span>
              <input type="datetime-local" className="datepicker-input" onChange={(e) => handleChangeDate(e, "otherDate")} />
            </span>}
            {editPhoto
              ? <label className="imageContainer">
                {
                  filePreviousUpdate ? <img src={sessionStorage.getItem("urlPreview")} alt="image loaded" className="imageLoaded" />
                    : <>
                      <input type="file" onChange={(e) => handleChangeFile(e, "fileUpdate")} className="custom-file" style={{ maxWidth: "150px", }} />
                      {status !== "Cargando"
                        ? <>
                          <FaCameraRetro />
                        </>
                        : <Loader />
                      }
                    </>
                }
              </label> :
              <img className="carousel-modal-img" src={dataModal.photoURL ? dataModal.photoURL : "https://img.icons8.com/ios-glyphs/90/ffffff/cactus-in-pot.png"} alt={dataModal.fullname} style={!dataModal?.photoURL ? { objectFit: "scale-down", } : {}} />
            }
            {editPhoto}
            <InputInvisible name="fullname" required type="text" defaultValue={dataModal.fullname} placeholder="Nombre completo del curso . . ." />
            <TextareaInvisible name="description" defaultValue={dataModal.description} placeholder="Añadir una descripción . . ."></TextareaInvisible>
            <div style={{ display: "flex", justifyContent: "space-between", }}>
              <div className="iconsModal">
                <i className="tooltip top">
                  {
                    (dataModal.photoURL ? editPhoto && dataModal.photoURL : !editPhoto && !dataModal.photoURL) ? <FaFile onClick={() => {
                      if (screen.width > 768) {
                        if (!dataModal.photoURL) return seteditPhoto(true);
                        return seteditPhoto(false);
                      }
                    }} /> : <FaTimes onClick={() => {
                      if (screen.width > 768) {
                        setFilePreviousUpdate(false);
                        if (!dataModal.photoURL) {
                          return seteditPhoto(false);
                        }
                        setStatus("Selecciona una foto");
                        return seteditPhoto(true);
                      }
                    }}></FaTimes>
                  }
                  <span className="tiptext" onClick={() => {
                    if (dataModal.photoURL && editPhoto) {
                      seteditPhoto(false);
                    } else {
                      if (editPhoto) return seteditPhoto(false);
                      seteditPhoto(true);
                    }
                  }}>{(dataModal.photoURL ? editPhoto && dataModal.photoURL : !editPhoto && !dataModal.photoURL) ? "Añadir otra foto" : "Cancelar"}</span>
                </i>
                <i className="tooltip top">
                  {
                    (dataModal.date ? editDate && dataModal.date : !editDate && !dataModal.date) ? <FaCalendar onClick={() => {
                      if (screen.width > 768) {
                        if (!dataModal.date) return seteditDate(true);
                        return seteditDate(false);
                      }
                    }} /> : <FaTimes onClick={() => {
                      if (screen.width > 768) {
                        if (!dataModal.date) return seteditDate(false);
                        return seteditDate(true);
                      }
                    }}></FaTimes>
                  }
                  <span className="tiptext" onClick={() => {
                    if (editDate && dataModal.date) {
                      if (editDate) seteditDate(true);
                      seteditDate(false);
                    } else {
                      if (editDate) return seteditDate(false);
                      seteditDate(true);
                    }
                  }}>{(dataModal.date ? editDate && dataModal.date : !editDate && !dataModal.date) ? "Añadir otra hora de estudio" : "Cancelar"}</span>
                </i>
              </div>
              <Button
                size_f="1rem"
                padding="0.8rem 1.5rem"
                type="submit"
                form="modalUpdate">
                { textUpdate }
              </Button>
            </div>
          </form> : <>
            <h2 className="deleteText">¿Está seguro de eliminar este curso?</h2>
          </>
        }
      </Modal>
      <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "0 2rem", }}>
        <Form
          style={visible ? { transition: "1s", } : { cursor: "pointer", transition: "1s", }}
          ref={ref}
          style={ successCreate ? {
            backgroundColor: "#F8FCB9",
            border: "1px solid #A7AE40",
            boxShadow: "0 0 20px 4px #c4ff8a",
          } : {}}
          onClick={!successCreate ? (!visible ? handleSetVisible : () => { }) : () => {}}
          onSubmit={handleActionCourse}
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
                          file ? <img src={sessionStorage.getItem("urlPreview")} alt="image loaded" className="imageLoaded" />
                            : <>
                              <input type="file" onChange={handleChangeFile} className="custom-file" style={{ maxWidth: "150px", }} />
                              {status !== "Cargando"
                                ? <>
                                  <FaCameraRetro />
                                </>
                                : <Loader />
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
                                setFilePrevious(false);
                                sessionStorage.removeItem("urlPreview");
                                setStatus("Selecciona una foto");
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
                                setDate(false);
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
                    <InputAddCourse type="text" disabled placeholder={!successCreate ? 'Añadir un curso. . .' : 'Curso añadido con éxito'} style={visible ? {} : { cursor: "pointer", }}>
                    </InputAddCourse>
                    <FaPlus />
                  </div>
              }
            </CSSTransition>
          </TransitionGroup>
        </Form>
      </div>
      <ul className="ulListCards" style={{
        display: "flex",
        alignItems: "flex-start",
        flexWrap: "wrap",
        justifyContent: "center",
        maxWidth: "1800px",
      }}>
        {
          coursesData.courses?.map((course, index) => {
            return (
              <Card item={course} setDataModal={setDataModal} setDeleteId={setDeleteId} setShowModal={setShowModal} key={course?.id || index} />
            );
          }) || "No hay cursos"
        }
        {
          !!!coursesData.courses.length && <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", alignItems: "center", }}>
            <img src={CoursesSvg} alt="coursesSvg" style={{ width: "100%", maxWidth: "500px", }} />
            <h2 style={{ maxWidth: "450px", textAlign: "center", fontWeight: "normal", }}>
              Los cursos que añadas aparecerán por aquí,
              lo único que debes hacer es ir y crearlos
              ¿Qué esperas?
            </h2>
          </div>
        }
      </ul>
      {/* <button onClick={signOut}>SignOut</button> */}
    </div>
  )
}

const mapStateToProps = (reducers) => ({
  authenticate: reducers.authenticate,
  courses: reducers.courses,
});

export default connect(mapStateToProps, actionsCourses)(memo(Courses));
