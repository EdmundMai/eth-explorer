import React from "react";
import styled from "styled-components";

export default styled.button`
  padding: 10px 15px;
  cursor: pointer;
  outline: none;
  border: none;
  background-color: #5A88E8;
  color: #ffffff;

  &:disabled {
    background-color: #E7E9EC;
    cursor: not-allowed;
  }
`;
