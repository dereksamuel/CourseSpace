import styled from "styled-components";
import vars from "./vars";

export const Form = styled.form`
  background-color: ${vars.color_gray_input};
  padding: 1rem;
  border-radius: 16px;
  border: 1px solid #b1b1b1;
  margin-top: 2rem;
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
  .custom-file::-webkit-file-upload-button {
    visibility: hidden;
  }
  .custom-file::before {
    content: ${({ content = 'Selecciona una foto' }) => `"${content}"`};
    transition: background 1s all;
    display: inline-block;
    background: linear-gradient(0deg, ${vars.color_semidark} 0%, ${vars.color_dark} 100%);
    border: 1px solid #999;
    border-radius: 10px;
    padding: 5px 8px;
    outline: none;
    border: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    font-weight: 700;
    font-size: 10pt;
    color: white;
  }
  .custom-file:hover::before {
    border: none;
  }
  .custom-file:active::before {
    background: linear-gradient(0deg, ${vars.color_dark} 0%, ${vars.color_semidark} 100%);
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
