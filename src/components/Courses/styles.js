import styled from "styled-components";
import vars from "../vars";

export const Card = styled.div`
  background: #ebebeb;
  max-width: 350px;
  width: 100%;
  list-style: none;
  padding: 1rem;
  border-radius: 15px;
  border: 1px solid #cbcbcb;
  color: gray;
  margin: 1.5rem;
  /* content: "";
    background: white;
    color: #310d00;
    min-width: 100%;
    padding: 1rem;
    height: 20px;
    position: absolute;
    top: -38px;
    left: 0; */
  & img {
    width: 100%;
    border-radius: 15px;
    max-height: 200px;
    object-fit: contain;
    background: #442e3c;
    min-width: 100%;
    min-height: 201px;
    transition: 1s opacity;
  }
  .Title {
    font-size: 1.2rem;
    color: #737373;
    margin: 0.5rem 0;
  }
  .actions {
    display: flex;
    justify-content: space-between;
    height: 25px;
  }
  .icon {
    border-radius: 50%;
    padding: 0.5rem;
    opacity: 0;
    transition: 0.5s all;
    cursor: pointer;
    width: 32px;
    height: 32px;
    border: 1px solid;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &:hover .icon, &:focus .icon {
    background: #ffffff;
    opacity: 1;
  }
  .icon:focus, .icon:active {
    background: #b8b9b9;
  }
`;

export const InputInvisible = styled.input`
  background: none;
  border: none;
  font-size: 1.2rem;
  outline: none;
  color: gray;
`;

export const InputAddCourse = styled.input`
  cursor: pointer;
  ${({ success }) => success ? `
    backgroun-color: ${vars.color_success_bg};
    color: ${vars.color_success_txt};
  ` : ""}
`;

export const TextareaInvisible = styled.textarea`
  background: none;
  border: none;
  font-size: 1.2rem;
  outline: none;
  color: gray;
  resize: none;
  width: 100%;
  min-height: 101px;
  font-family: 'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;
`;

export const Close = styled.div`
  position: relative;
  font-size: 1.4rem;
  color: #555555;
  .closeIcon {
    cursor: pointer;
    border-radius: 50%;
    background-color: #ffffffb3;
    padding: 0.1rem;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: 35px;
    display: flex;
    align-items: center;
    height: 35px;
    justify-content: center;
    position: absolute;
    right: -24px;
    top: -35px;
    border: 1px solid darkgray;
    transition: 0.2s;
  }
  .closeIcon:hover {
    background-color: #ffffff;
    transform: scale(1.1);
  }
`;
