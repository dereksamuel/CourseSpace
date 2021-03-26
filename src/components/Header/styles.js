import styled from "styled-components";
import vars from "../vars";

export const Layout = styled.header`
  display: block;
  a {
    color: ${vars.color_white};
  }
  & .Header_1 {
    padding: 1rem;
    background-color: #442E3C;
    & img {
      max-width: 30px;
      border-radius: 50%;
      margin-left: 0.3rem;
      border: 2px solid;
    }
    nav {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
  & .Header_2 {
    .right {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgb(178 24 74 / 77%);
      a {
        color: ${vars.color_white};
        display: block;
        border-bottom: 0.1rem solid;
        padding-bottom: 1rem;
        padding-left: 1rem;
        padding-top: 1rem;
      }
    }
    padding: 1rem;
    padding-bottom: 0;
    padding-top: 0;
    background: linear-gradient(0deg, ${vars.color_dark} 0%, ${vars.color_semidark} 100%);
    & img {
      max-width: 112px;
      margin-left: 0.3rem;
    }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  
  @media screen and (min-width: 768px) {
    .display_none {
      display: initial;
    }
    .Header_2 {
      padding-bottom: 1rem;
      padding-top: 1rem;
      & img {
        max-width: 228px;
      }
    }
    .menu {
      display: none;
    }
    .Header_2 {
      & .right {
        position: relative;
        background: none;
        a {
          color: ${vars.color_white};
          display: inline-block;
          border-bottom: 0;
          padding-bottom: 0;
          padding-left: 0;
          padding-top: 0;
        }
      }
    }
  }
`;
