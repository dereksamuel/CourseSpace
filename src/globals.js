import { createGlobalStyle } from "styled-components";
import ChackImage from "./assets/check.png";
import vars from "./components/vars";

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

  [type="checkbox"], [type="radio"] {
    opacity: 0;
  }

  [type="checkbox"] + label, [type="radio"] + label {
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    display: inline-block;
    color: #666;
    line-height: 25px;
    margin: 15px 0px;
    transition: 1s background;
  }

  [type="checkbox"] + label::before, [type="radio"] + label::before {
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

  [type="checkbox"]:checked + label::before, [type="radio"]:checked + label::before {
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

  [type="checkbox"]:checked + label::after, [type="radio"]:checked + label::after {
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

  .tooltip {
    position: relative;
    display: inline-block;
  }
  .tooltip .tiptext {
      visibility: hidden;
      width: 120px;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 3px;
      padding: 6px 0;
      position: absolute;
      z-index: 1;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
  .tooltip .tiptext::after {
      content: "";
      position: absolute;
      border-width: 5px;
      border-style: solid;
  }
  .tooltip:hover .tiptext {
      visibility: visible;
  }

  .tooltip:focus .tiptext {
      visibility: visible;
  }

  .tooltip.top .tiptext{
      margin-left: -60px;
      bottom: 150%;
      left: 50%;
  }
  .tooltip.top .tiptext::after{
      margin-left: -5px;
      top: 100%;
      left: 50%;
      border-color: #2E2E2E transparent transparent transparent;
  }

  .tooltip.bottom .tiptext{
      margin-left: -60px;
      top: 150%;
      left: 50%;
  }
  .tooltip.bottom .tiptext::after{
      margin-left: -5px;
      bottom: 100%;
      left: 50%;
      border-color: transparent transparent #2E2E2E transparent;
  }

  .tooltip.left .tiptext{
      top: -5px;
      right: 110%;
  }
  .tooltip.left .tiptext::after{
      margin-top: -5px;
      top: 50%;
      left: 100%;
      border-color: transparent transparent transparent #2E2E2E;
  }

  .tooltip.right .tiptext{
      top: -5px;
      left: 110%;
  }
  .tooltip.right .tiptext::after{
      margin-top: -5px;
      top: 50%;
      right: 100%;
      border-color: transparent #2E2E2E transparent transparent;
  }

  .tiptextSpecial {
    border-radius: 30px;
    background-color: #999;
    color: white;
    text-align: center;
    padding: 1rem;
    position: absolute;
    top: -80px;
    display: none;
    transition: 0.5s all;
    right: -32px;
    font-style: normal;
  }

  .tiptextSpecial p {
    padding: 0.1rem;
  }

  .tiptextSpecial p:nth-child(1) {
    border-bottom: 1px solid;
  }

  .tooltipSpecial {
    position: relative;
  }

  .custom-file-input::-webkit-file-upload-button {
    visibility: hidden;
  }
  .custom-file-input::before {
    content: 'Selecciona una foto';
    transition: background 1s all;
    display: inline-block;
    background: linear-gradient(0deg, ${vars.color_semidark} 0%, ${vars.color_dark} 100%);
    border: 1px solid #999;
    border-radius: 3px;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    font-weight: 700;
    font-size: 10pt;
    color: white;
  }
  .custom-file-input:hover::before {
    border-color: black;
  }
  .custom-file-input:active::before {
    background: linear-gradient(0deg, ${vars.color_dark} 0%, ${vars.color_semidark} 100%);
  }

  .imageLoaded {
    max-width: 277px;
    min-height: 166px;
    object-fit: cover;
    object-position: center;
  }

  .ulListCards {
    padding: 0 2rem;
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

  @media screen and (min-width: 768px) {
    .Header_2 {
      & img {
        max-width: 228px;
      }
    }
  }

  @media screen and (max-width: 850px) {
    .ulListCards {
      justify-content: center !important;
    }
  }

  @media screen and (max-width: 500px) {
    .ulListCards {
      padding: 0 0.2rem;
    }
  }
`;
