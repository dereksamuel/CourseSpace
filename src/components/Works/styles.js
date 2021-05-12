import styled from "styled-components";
import vars from "../vars";

let timeout;

export const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .breakpoint {
    border-radius: 50%;
    background-color: ${vars.color_gray_input};
    color: black;
    max-width: 50px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    transition: 1s all;
    ${({ percent }) => percent === "100%" ? () => {
      timeout = setTimeout(() => {
        clearTimeout(timeout);
        return `transform: scale(1); background-color: ${vars.color_success_bg};`;
      }, 3000);
      return `transform: scale(1.05); background-color: ${vars.color_success_bg};`;
    } : ""}
  }
  .progressbar {
    background-color: #c8ffa0;
    color: #c8ffa0;
    border: 6.5px solid currentColor;
    width: ${({ percent }) => percent};
    height: 11px;
    justify-self: flex-start;
    position: relative;
    transition: 0.5s all;
    p {
      position: absolute;
      left: 50%;
      top: -10px;
      color: black;
      font-style: italic;
      ${({ percent }) => percent < 10 ? "" : `transform: translateX(-50%);`}
    }
  }
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1rem;
`;

export const WorksCss = styled.section `
  margin-bottom: 1rem;
  .WorksArea {
    img {
      max-width: 500px;
    }
  }
  .worksList {
    list-style: none;
    max-width: 530px;
    margin: 1rem auto;
  }
  .workItem {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 1.5rem auto;
    .icons_item {
      font-size: 1.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        margin: 0 0.5rem;
      }
    }
  }
`;
