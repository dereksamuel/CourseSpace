import styled from "styled-components";
import vars from "./vars";

export const Form = styled.form`
  background-color: ${vars.color_gray_input};
  padding: 1rem;
  border-radius: 16px;
  border: 1px solid #b1b1b1;
  margin-top: 2rem;
  transition: 1s height;
  i svg {
    color: rgb(156 156 156);
    background-color: rgb(235 235 235);
    padding: 3px;
    font-size: 1.4rem;
    margin-right: 7px;
    /* border: 3px solid rgb(156 156 156); */
    cursor: pointer;
  }
  i svg:hover {
    background-color: rgb(226 226 226);
    transition: padding 1s all;
  }
  .datepicker-toggle {
    display: inline-block;
    position: relative;
    width: 300px;
    height: 30px;
    color: #665959;
    max-width: 100%;
  }
  .datepicker-toggle p {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1.1rem;
    font-style: italic;
    font-weight: 400;
    text-align: center;
  }
  .datepicker-toggle-button {
    /* position: absolute;
    left: 0;
    top: 0; */
    display: flex;
    width: 100%;
    height: 100%;
  }
  .datepicker-input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    box-sizing: border-box;
  }
  .datepicker-input::-webkit-calendar-picker-indicator {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }
  .imageContainer {
    min-height: 166px;
    background-color: rgb(68, 46, 60);
    color: white;
    border-radius: 19px;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icons {
    /* grid-row: 3 / 4; */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & .grid {
    display: block;
    /* grid-template-rows: auto 110px 50px;
    position: relative;
    grid-auto-rows: auto; */
    .grid_cancel {
      color: #442e3c;
      position: absolute;
      top: -22px;
      right: -17px;
      font-size: 1.5rem;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  & input, textarea {
    border: none;
    outline: none;
    background: none;
    font-size: 1.2rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    width: 100%;
    resize: none;
  }
  @media screen and (max-width: 500px) {
    .datepicker-toggle p {
      font-size: 0.7rem;
    }
  }
`;

export const Input = styled.label`
  display: flex;
  background-color: ${vars.color_gray_input};
  padding: 1rem;
  border-radius: 16px;
  border: 1px solid #b1b1b1;
  margin-top: 2rem;
  & input {
    border: none;
    outline: none;
    background: none;
    font-size: 1.2rem;
    width: 100%;
  }
`;

export const Subtitle = styled.div`
  height: 2px;
  width: 100%;
  border: 1px solid #ababab;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 55px 0;
  margin-top: 70px;
  & p {
    background: ${(props) => props.background};
    padding: 1rem;
    font-weight: normal;
  }

  & h2 {
    background: ${(props) => props.background};
    padding: 1rem;
    font-weight: normal;
  }
`;

export const Button = styled.button`
  padding: ${(props) => props.padding};
  border: none;
  border-radius: 31px;
  color: white;
  outline: none;
  font-size: ${({ size_f = "1.4rem" }) => size_f};
  cursor: pointer;
  transition: 0.5s;

  &::disabled {
    border-color: -internal-light-dark(rgba(118, 118, 118, 0.3), rgba(195, 195, 195, 0.3));
    background: -internal-light-dark(rgba(118, 118, 118, 0.3), rgba(195, 195, 195, 0.3));
  }

  ${(props) => {
    switch(props.variant) {
      case "gray":
        return `
          background: linear-gradient(0deg, ${vars.color_gray_input} 0%, ${vars.color_white} 100%);
          border: 1px solid #d4d4d4;
          border-radius: 31px;
          color: gray;
          &:hover {
            box-shadow: 0px 0px 15px #b1b0b0;
            transition: 1s all box-shadow;
          }
        `;
      case "success":
        return `
          background: linear-gradient(0deg, ${vars.color_success_bg} 0%, ${vars.color_white} 100%);
          border: 1px solid ${vars.color_success_txt};
          border-radius: 31px;
          color: #A7AE40;
          &:hover {
            box-shadow: 0px 0px 15px ${vars.color_success_txt};
            transition: 1s all box-shadow;
          }
        `;
      case "danger":
        return `
          background: linear-gradient(0deg, ${vars.color_light} 0%, ${vars.color_semidark} 100%);
          border: 1px;
          border-radius: 31px;
          color: ${vars.color_white};
          &:hover {
            box-shadow: 0px 0px 15px ${vars.color_dark};
            transition: 1s all box-shadow;
          }
        `;
      default:
        return `
          background: linear-gradient(0deg, ${vars.color_semidark} 0%, ${vars.color_dark} 100%);
          border: none;
          border-radius: 20px;
          color: white;
          &:hover {
            box-shadow: 0px 0px 16px 0px ${vars.color_semidark};
            transition: 1s all box-shadow;
          }
        `;
    }
  }};
`;
