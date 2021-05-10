import styled from "styled-components";
import vars from "../vars";

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
  }
  .active {
    background-color: ${vars.color_success_bg};
  }
  .progressbar {
    background-color: #c8ffa0;
    color: #c8ffa0;
    border: 6.5px solid currentColor;
    width: ${({ percent }) => percent};
    height: 11px;
    justify-self: flex-start;
    position: relative;
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
    margin: 1rem auto;
    .icons_item {
      font-size: 1.3rem;
    }
  }
`;
