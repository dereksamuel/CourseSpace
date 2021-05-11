import React, { useEffect, useRef, useState } from "react";
import { FaEdit, FaPlus, FaTimes, FaTrashAlt } from "react-icons/fa";
import { Close, InputAddCourse } from "../Courses/styles.js";
import { Button, Form, Subtitle } from "../styles.js";
import { ProgressBar, WorksCss } from "./styles";
import worksImage from "../../assets/works.svg";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import * as actionsWorks from "../../actions/works";
import fb, { storage } from "../../helpers/firebase_config";

function Works({ authenticate, createWork, works: worksData, getWorks, updateWork }) {
  const [percent, setPercent] = useState("100%");
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
  }

  return (
    <WorksCss>
      <ProgressBar percent={percent}>
        <div className="breakpoint active">0%</div>
        <div style={{ width: "100%", }}>
          <div className="progressbar"><p>{ percent }</p></div>
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
                      <input style={{ position: "absolute", bottom: "-4px", zIndex: 89, width: "22px", height: "22px", }} type="radio" name="completeWork" id="completeWork" />
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
                  <li className="workItem" key={work.id || index}>
                    <div style={{ minWidth: "50px", position: "relative", }}>
                      <input style={{ position: "absolute", bottom: "-4px", zIndex: 89, width: "22px", height: "22px", }} onChange={(e) => handleActionWork(e, work.id)} defaultChecked={work.completeWork} type="checkbox" name="completeWorkUpdate"/>
                      <label></label>
                    </div>
                    <div style={{ width: "100%", }}>
                      <p id={`refTitle${work.id}`}>{work.title}</p>
                    </div>
                    <div className="icons_item" style={{ minWidth: "50px", }}>
                      <FaTrashAlt></FaTrashAlt>
                      <FaEdit></FaEdit>
                    </div>
                  </li>
                );
              }
            }) }
          </ul>
          <Subtitle background="white" style={{ margin: "3rem auto", maxWidth: "700px", }}>
            <h2 style={{ fontStyle: "italic", color: "gray", }}>Tareas Completadas</h2>
          </Subtitle>
          { worksCompleted?.map((work, index) => (
            <li className="workItem" key={work.id || index} style={{ maxWidth: "530px", margin: "auto", }}>
              <div style={{ minWidth: "50px", position: "relative", }}>
                <input style={{ position: "absolute", bottom: "-4px", zIndex: 89, width: "22px", height: "22px", }} defaultChecked={work.completeWork} onChange={(e) => handleActionWork(e, work.id)} type="checkbox" name="completeWorkUpdate"/>
                <label></label>
              </div>
              <div style={{ width: "100%", textDecoration: "line-through" }}>
                <p id={`refTitle${work.id}`}>{work.title}</p>
              </div>
              <div className="icons_item" style={{ minWidth: "50px", }}>
                <FaTrashAlt></FaTrashAlt>
                <FaEdit></FaEdit>
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
