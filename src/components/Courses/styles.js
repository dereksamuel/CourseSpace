import styled from "styled-components";

export const Card = styled.div`
  background: #ebebeb;
  max-width: 350px;
  width: 100%;
  list-style: none;
  padding: 1rem;
  border-radius: 15px;
  border: 1px solid #cbcbcb;
  color: gray;
  margin: 1rem;
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
