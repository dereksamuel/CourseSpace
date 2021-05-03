import styled from "styled-components";

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
