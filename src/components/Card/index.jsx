import React from "react";
import { Card } from '../Courses/styles';
import { Button } from "../styles";
import { FaEye, FaEdit, FaTrashAlt, FaEllipsisV, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { notify } from "../../helpers/sendNotifications";

export default function CardComponent({ item, other, setShowModal, setDataModal, setDeleteId }) {
  let count = 0;

  const handleChangeDate = () => {
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

  const showEdit = (data) => {
    setShowModal(true);
    setDataModal(data);
  };

  const deleteAction = (id) => {
    setDeleteId(id);
    setShowModal(true);
  }

  const showTextSpecial = (id) => {
    count += 1;
    const $allSpecialText = [
      ...document.querySelectorAll(".tiptextSpecial"),
    ];
    const allIcons = [
      ...document.querySelectorAll(".icon"),
    ];
    const allTimes = [
      ...document.querySelectorAll(".times"),
    ];
    const allEllipsis = [
      ...document.querySelectorAll(".ellipsis"),
    ];
    const $specialText = document.querySelector(`#tip_id${id}`);

    const $iconFirst = document.querySelector(`#icon_id${id}_first`);
    const $iconSecond = document.querySelector(`#icon_id${id}_second`);
    const $iconThree = document.querySelector(`#icon_id${id}_three`);

    const $closeButton = document.querySelector(`#refClose_id${item.id}`);
    const $ellipsisButton = document.querySelector(`#refEllipsis_id${item.id}`);
  
    for (const $specialtextSingular of $allSpecialText) {
      //TODO: Aquí eliminar los tooltips abiertos, y solo dejar uno
      $specialtextSingular.style = "";
    }

    for (const $icons of allIcons) {
      if (count === 2) {
        $closeButton.style = "display: none;";
        $ellipsisButton.style = "display: block;";
        count = 0;
      }
      $icons.style = "";
    }

    for (const $time of allTimes) {
      $time.style = "display: none;";
    }

    for (const $ellipsis of allEllipsis) {
      $ellipsis.style = "display: block;";
    }
    
    if (count === 1) {
      console.log(22);
      $closeButton.style = "display: block;";
      $ellipsisButton.style = "display: none;";
      
      $specialText.style = "display: initial;";
      $iconFirst.style = "opacity: 1;";
      $iconSecond.style = "opacity: 1;";
      $iconThree.style = "opacity: 1;";
    }
  };

  return (
    <Card>
      <p style={{ textAlign: "center", marginBottom: "0.5rem", marginTop: "-0.5rem", fontStyle: "italic", }}>{ handleChangeDate() }</p>
      <img data-src={item?.photoURL || "https://img.icons8.com/ios-glyphs/90/ffffff/cactus-in-pot.png"} className="carousel-item__img" src={"https://img.icons8.com/ios-glyphs/90/ffffff/cactus-in-pot.png"} alt={item.fullname} style={!item?.photoURL ? { objectFit: "scale-down", } : {}} />
      <p className="Title">{item.fullname}</p>
      <p>{item?.description || "No hay descripción"}</p>
      <Link to={`work/${item.id}`}>
        <Button padding="0.5rem" size_f="1.2rem" style={{ width: "100%", margin: "1rem 0", marginBottom: "1.1rem", }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
            <span style={{ fontSize: "1.6rem", height: "24px", }}>
              <FaEye></FaEye>
            </span>
            <span style={{ marginLeft: "0.5rem", }}>Tareas</span>
          </div>
        </Button>
      </Link>
      <div className="actions">
        <i className="tooltip top">
          <div className="icon" id={`icon_id${item.id}_first`} onClick={() => showEdit(item)}><FaEdit></FaEdit></div>
        </i>
        <i className="tooltip top">
          <div className="icon" id={`icon_id${item.id}_second`} onClick={() => deleteAction(item.id)}><FaTrashAlt></FaTrashAlt></div>
        </i>
        <i className="tooltipSpecial topSpecial">
          <div className="icon" id={`icon_id${item.id}_three`} onClick={() => showTextSpecial(item.id)}>
            <FaTimes id={`refClose_id${item.id}`} className="times" style={{ display: "none", }}></FaTimes>
            <FaEllipsisV id={`refEllipsis_id${item.id}`} className="ellipsis"></FaEllipsisV>
          </div>
          <span className="tiptextSpecial" id={`tip_id${item.id}`}>
            <p>Analíticas</p>
            <p onClick={() => notify("CourseSpace", `Es hora de estudiar con ${item.fullname}`)}>Notificarme</p>
          </span>
        </i>
      </div>
    </Card>
  )
}
