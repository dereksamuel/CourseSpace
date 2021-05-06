import React from "react";
import { Card } from '../Courses/styles';
import { Button } from "../styles";
import { FaEye, FaEdit, FaTrashAlt, FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CardComponent({ item, other }) {
  const handleChangeDate = () => {
    if (item.date) {
      const dateNow = new Date(item.date);
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
      return (`Estudia el ${weekday[day]} a las ${hours === 0 ? 12 : hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`);
    }
  }

  const showTextSpecial = (id) => {
    const allSpecialText = [
      ...document.querySelectorAll(".tiptextSpecial")
    ];
    for (const specialtextSingular of allSpecialText) {
      //TODO: Aquí eliminar los tooltips abiertos, y solo dejar uno
    }
    const specialText = document.querySelector(`#tip_id${id}`);
    specialText.style = "display: initial;";
  };

  return (
    <Card>
      <p style={{ textAlign: "center", marginBottom: "0.5rem", marginTop: "-0.5rem", fontStyle: "italic", }}>{ handleChangeDate() }</p>
      <img data-src={item?.photoURL} className="carousel-item__img" src={"https://img.icons8.com/ios-glyphs/90/ffffff/cactus-in-pot.png"} alt={item.fullname} style={!item?.photoURL ? { objectFit: "scale-down", } : {}} />
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
          <div className="icon"><FaEdit></FaEdit></div>
        </i>
        <i className="tooltip top">
          <div className="icon"><FaTrashAlt></FaTrashAlt></div>
        </i>
        <i className="tooltipSpecial topSpecial">
          <div className="icon" onClick={() => showTextSpecial(item.id)}><FaEllipsisV></FaEllipsisV></div>
          <span className="tiptextSpecial" id={`tip_id${item.id}`}>
            <p>Analíticas</p>
            <p>Notificarme</p>
          </span>
        </i>
      </div>
    </Card>
  )
}
