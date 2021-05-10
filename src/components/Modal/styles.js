import styled from "styled-components";
import colors from "../vars";

export const Overlay = styled.div`
  background: linear-gradient(0deg, ${colors.color_dark} 0%, #9771769e 100%);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: fixed;
  z-index: 8000;
  animation: fadeOut 0.5s ease-in-out;
  .unvisible {
    animation: fadeOut 0.5s ease-in-out forwards;
  }
  @keyframes fadeOut {
    from {
      transform: translateY(-1010px);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export const ModalContent = styled.section`
  .iconsModal {
    display: flex;
    align-items: center;
  }
  .iconsModal svg {
    background-color: white;
    padding: 0.2rem;
    border-radius: 50%;
    font-size: 1.7rem;
    margin: 0rem 0.3rem;
    border: 1px solid;
    cursor: pointer;
  }
  background-color: white;
  position: fixed;
  z-index: 10000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  border-radius: 30px;
  animation: fadeOut 0.5s ease-in-out;
  width: 100%;
  max-width: 357px;
  .containerTitle {
    border-bottom: 1px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    /* min-height: 13px; */
    position: relative;
    height: 8px;
    margin: 1.5rem 0;
    margin-top: 1rem;
    padding: 0 10rem;
    color: #555555;
  }
  .containerClose {
    position: relative;
    font-size: 1.4rem;
    color: #555555;
  }
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
    right: -19px;
    top: -22px;
    border: 1px solid darkgray;
    transition: 0.2s;
  }
  .closeIcon:hover {
    background-color: #ffffff;
    transform: scale(1.1);
  }
  .containerTitle p {
    position: absolute;
    z-index: 32;
    background: white;
    padding: 0 0.5rem;
    font-size: 1.45rem;
    font-weight: 600;
  }
  @keyframes fadeOut {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media screen and (max-width: 500px) {
    .containerTitle {
      border: none;
      height: auto;
      margin: 3px;
      padding: 0;
      text-align: center;
    }
    .containerTitle p {
      position: relative;
    }
  }
`;
