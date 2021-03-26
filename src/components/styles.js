import styled from "styled-components";
import vars from "./vars";

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
  ${(props) => {
    switch(props.variant) {
      case "gray":
        return `
          background: linear-gradient(0deg, ${vars.color_gray_input} 0%, ${vars.color_white} 100%);
          border: 1px solid gray;
          border-radius: 31px;
          color: gray;
          &:hover {
            box-shadow: 0px 0px 15px #b1b0b0;
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
