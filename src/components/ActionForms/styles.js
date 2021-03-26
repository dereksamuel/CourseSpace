import styled from "styled-components";
import vars from "../vars";

export const Form = styled.form`
  max-width: 350px;
  margin: auto;
  position: relative;
  z-index: 99;
  margin-top: 2rem;
  & .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & p {
      margin: 0 10px;
      transition: 1s all color;
    }
  }
  & button {
    margin: 2rem auto;
    display: block;
  }
  & a {
    color: ${vars.color_medium};
  }
`;

export const Figure = styled.figure`
  max-width: 120px;
  max-height: 120px;
  margin: 0 auto;
  border-radius: 50%;
  background-color: ${vars.color_dark};
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    max-width: 120px;
  }
`;
