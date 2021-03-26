import { createGlobalStyle } from "styled-components";
import ChackImage from "./assets/check.png";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    overscroll-behavior: none;
    scroll-behavior: smooth;
  }

  [type="checkbox"] {
    opacity: 0;
  }

  [type="checkbox"] + label {
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    display: inline-block;
    color: #666;
    line-height: 25px;
    margin: 15px 0px;
    transition: 1s background;
  }

  [type="checkbox"] + label::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 0px;
    width: 20px;
    height: 20px;
    border: rgb(170, 170, 170) solid 2px;
    background: rgb(255, 255, 255);
    border-radius: 10px;
  }

  [type="checkbox"]:checked + label::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 0px;
    width: 20px;
    height: 20px;
    border: #A7AE40 solid 2px;
    background: #F8FCB9;
    border-radius: 10px;
  }

  [type="checkbox"]:checked + label::after {
    content: "";
    position: absolute;
    left: 0px;
    top: 0px;
    width: 20px;
    height: 20px;
    background-image: url(${ChackImage});
    background-size: 15px;
    border-radius: 10px;
    background-position: 5px;
    background-repeat: no-repeat;
  }

  .fade-appear {
    opacity: 0;
    z-index: 1;
  }
  .fade-appear.fade-appear-active {
    opacity: 1;
    transition: opacity 300ms linear;
  }

  .fade-enter {
    opacity: 0;
    z-index: 1;
  }
  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms linear;
  }

  .fade-exit {
    opacity: 0;
  }
  .fade-exit.fade-exit-active {
      opacity: 0;
      transition: opacity 300ms linear;
  }
  .fade-exit-done {
    opacity: 0;
  }
  .display_none {
    display: none;
  }
  .display_visible {
    display: initial;
  }

  @media screen and (min-width: 768px) {
    .Header_2 {
      & img {
        max-width: 228px;
      }
    }
  }
`;
