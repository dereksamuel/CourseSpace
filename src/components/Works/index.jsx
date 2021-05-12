import React, { useEffect, useRef, useState } from "react";
import { FaEdit, FaPlus, FaTimes, FaTrashAlt } from "react-icons/fa";
import { Close, InputAddCourse } from "../Courses/styles.js";
import { Button, Form, Subtitle } from "../styles.js";
import { ProgressBar, WorksCss } from "./styles";
import worksImage from "../../assets/works.svg";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import * as actionsWorks from "../../actions/works";
import fb from "../../helpers/firebase_config";

function Works({ authenticate, createWork, works: worksData, getWorks, updateWork, deleteWork }) {
  const [percent, setPercent] = useState(`100%`);
  const [visible, setVisible] = useState(true);
  const ref = useRef(null);
  const worksCompleted = worksData?.works?.filter((work) => work.completeWork);
  let toSave = {
    uid: authenticate?.user?.uid,
  };
  useEffect(() => {
    if (!fb.auth().currentUser) return;
    getWorks();
  }, []);

  const closeModal = () => {
    setVisible(true);
  };

  const handleActionWork = async (e, id) => {
    e.preventDefault();
    const action = id ? updateWork : createWork;
    if (!id) {
      const form = new FormData(ref.current);
      toSave = {
        ...toSave,
        title: form.get("title"),
        completeWork: form.get("completeWork"),
      }
    } else {
      const title = document.querySelector(`#refTitle${id}`);
      toSave = {
        ...toSave,
        title: title.textContent,
        completeWork: e.target.checked,
      };
    }

    await action(toSave, id);
    closeModal();
  }

  const visibleEdit = (id, update) => {
    const input = document.querySelector(`#inputEdit${id}`);
    const title = document.querySelector(`#refTitle${id}`);
    const buttonUpdate = document.querySelector(`#updateButton${id}`);
    const cancelButton = document.querySelector(`#cancelButton${id}`);
    const editButtonPencil = document.querySelector(`#pencilButtonEdit${id}`);

    const buttonSavesAll = [
      ...document.querySelectorAll(".save"),
    ];
    const editPencilAll = [
      ...document.querySelectorAll(".editPencil"),
    ];
    const titles = [
      ...document.querySelectorAll(".title"),
    ];
    const inputEdits = [
      ...document.querySelectorAll(".inputEdit"),
    ];
    const cancels = [
      ...document.querySelectorAll(".cancel"),
    ];

    for (const titleItem of titles) {
      titleItem.style = `display: initial;`;
    }
    for (const editPencilItem of editPencilAll) {
      editPencilItem.style = `display: initial;`;
    }
    for (const buttonItem of buttonSavesAll) {
      buttonItem.style = `display: none;`;
    }
    for (const cancelButton of cancels) {
      cancelButton.style = `display: none;`;
    }
    for (const inputEditItem of inputEdits) {
      inputEditItem.style = `display: none;`;
    }

    if (update) {
      title.style = `display: none;`;
      input.style = `display: initial; border: none; background: #ebebeb; width: 100%; border-right: 8px solid white;`;
      buttonUpdate.style = `display: initial;`;
      editButtonPencil.style = `display: none;`;
      input.focus();
      cancelButton.style = `display: initial;`;
    } else {
      title.style = `display: initial;`;
      input.style = `display: none; border: none; background: #ebebeb; width: 100%; border-right: 8px solid white;`;
      buttonUpdate.style = `display: none;`;
      cancelButton.style = `display: none;`;
      editButtonPencil.style = `display: initial;`;
    }
  };

  const handleUpdateWork = async (id) => {
    const input = document.querySelector(`#inputEdit${id}`);
    const checkValue = document.querySelector(`#refCheck${id}`);

    toSave = {
      ...toSave,
      title: input.value,
      completeWork: checkValue.checked,
    };

    await updateWork(toSave, id);
    visibleEdit(id, false);
    console.log("Updated successfully");
  };

  return (
    <WorksCss>
      <ProgressBar percent={`${((worksData.works.reduce((acum, item) => item.completeWork ? 1 + acum : acum, 0))) * 100 / worksData.works.length}%`}>
        <div className="breakpoint active">0%</div>
        <div style={{ width: "100%", }}>
          <div className="progressbar"><p>{ `${(((worksData.works.reduce((acum, item) => item.completeWork ? 1 + acum : acum, 0))) * 100 / worksData.works.length).toFixed(1)}%` }</p></div>
        </div>
        <div className="breakpoint active">100%</div>
      </ProgressBar>
      <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "0 2rem", }}>
        <Form
          onClick={() => visible ? setVisible(false) : () => {}}
          style={visible ? { cursor: "pointer", } : {}}
          ref={ref}
          onSubmit={handleActionWork}
          id="WorkAreaCreate"
        >
          <TransitionGroup>
            <CSSTransition
              key={visible}
              in={visible}
              timeout={300}
              appear={true}
              classNames="fade"
            >
              {
                visible ? <div style={{ display: "flex", alignItems: "center", }}>
                  <InputAddCourse type="text" disabled placeholder={'Añadir una tarea. . .'} style={visible ? {} : { cursor: "pointer", }}>
                  </InputAddCourse>
                  <FaPlus></FaPlus>
                </div> : <section className="grid">
                  <Close onClick={closeModal}>
                    <FaTimes className="closeIcon"></FaTimes>
                  </Close>
                  {/* <p>Lógica</p> */}
                  <div>
                    <textarea name="title" type="text" placeholder="Añadir una tarea. . ." style={{ fontSize: "1rem", minHeight: "100px", }} />
                  </div>
                  <div className="icons">
                    <div style={{ maxWidth: "12px", position: "relative", }}>
                      <input style={{ position: "absolute", bottom: "-4px", zIndex: 89, width: "22px", height: "22px", }} type="checkbox" name="completeWork" id="completeWork" />
                      <label></label>
                    </div>
                    <Button
                      size_f="1rem"
                      padding="1rem"
                      type="submit"
                      form="WorkAreaCreate">
                      Guardar
                    </Button>
                  </div>
                </section>
              }
            </CSSTransition>
          </TransitionGroup>
        </Form>
      </div>
      {
        !worksData.works || !worksData.works.length ? <div className="WorksArea" style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
          <h2 style={{ maxWidth: "450px", textAlign: "center", fontWeight: "normal", }}>
            Las tareas que les solicites a tus cursos
            bíblicos estarán por aquí, pero
            primero anímate a crear
            un curso 😉.
          </h2>
          <img src={worksImage} alt="tareas" />
        </div> : <>
          <ul className="worksList">
            { worksData?.works?.map((work, index) => {
              if (!work.completeWork) {
                return (
                  <li className="workItem" key={work?.id || index}>
                    <div style={{ minWidth: "50px", position: "relative", }}>
                      <input id={`refCheck${work.id}`} style={{ position: "absolute", bottom: "-4px", zIndex: 89, width: "22px", height: "22px", }} onChange={(e) => handleActionWork(e, work.id)} defaultChecked={work.completeWork} type="checkbox" name="completeWorkUpdate"/>
                      <label></label>
                    </div>
                    <div style={{ width: "100%", }}>
                      <p id={`refTitle${work.id}`} className="title">{work.title}</p>
                      <input className="inputEdit" type="text" id={`inputEdit${work.id}`} defaultValue={work.title} style={{ display: "none", border: "none", background: "#ebebeb", outline: "none", }} />
                    </div>
                    <div className="icons_item" style={{ minWidth: "150px", }}>
                      <FaEdit className="editPencil" id={`pencilButtonEdit${work.id}`} onClick={() => visibleEdit(work.id, "update")}></FaEdit>
                      <FaTimes className="cancel" onClick={() => visibleEdit(work.id, false)} style={{ display: "none", }} id={`cancelButton${work.id}`}></FaTimes>
                      <FaTrashAlt></FaTrashAlt>
                      <Button
                        style={{ display: "none", }}
                        id={`updateButton${work.id}`}
                        size_f="1rem"
                        className="save"
                        onClick={() => handleUpdateWork(work.id)}
                        padding="0.5rem">
                        Guardar
                      </Button>
                    </div>
                  </li>
                );
              }
            }) }
          </ul>
          <Subtitle background="white" style={{ margin: "3rem auto", maxWidth: "1100px", }}>
            <h2 style={{ fontStyle: "italic", color: "gray", padding: "0.2rem 5rem", }}>Tareas Completadas</h2>
          </Subtitle>
          { worksCompleted?.map((work, index) => (
            <li className="workItem" key={work?.id || index} style={{ maxWidth: "530px", margin: "1.5rem auto", }}>
              <div style={{ minWidth: "50px", position: "relative", }}>
                <input id={`refCheck${work.id}`} style={{ position: "absolute", bottom: "-4px", zIndex: 89, width: "22px", height: "22px", }} defaultChecked={work.completeWork} onChange={(e) => handleActionWork(e, work.id)} type="checkbox" name="completeWorkUpdate"/>
                <label></label>
              </div>
              <div style={{ width: "100%", textDecoration: "line-through" }}>
                <p id={`refTitle${work.id}`} className="title">{work.title}</p>
                <input className="inputEdit" type="text" id={`inputEdit${work.id}`} defaultValue={work.title} style={{ display: "none", border: "none", background: "#ebebeb", outline: "none", }} />
              </div>
              <div className="icons_item" style={{ minWidth: "150px", }}>
                <FaEdit className="editPencil" id={`pencilButtonEdit${work.id}`} onClick={() => visibleEdit(work.id, "update")}></FaEdit>
                <FaTimes className="cancel" onClick={() => visibleEdit(work.id, false)} style={{ display: "none", }} id={`cancelButton${work.id}`}></FaTimes>
                <FaTrashAlt></FaTrashAlt>
                <Button
                  style={{ display: "none", }}
                  id={`updateButton${work.id}`}
                  size_f="1rem"
                  padding="0.5rem"
                  className="save"
                  onClick={() => handleUpdateWork(work.id)}>
                  Guardar
                </Button>
              </div>
            </li>
          )) }
        </>
      }
    </WorksCss>
  )
}

const mapStateProps = (reducers) => {
  return {
    works: reducers.works,
    authenticate: reducers.authenticate,
  };
}

export default connect(mapStateProps, actionsWorks)(Works);
