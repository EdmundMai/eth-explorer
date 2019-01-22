import styled from "styled-components";

export default styled.button`
  background-color: #5a88e8;
  border: none;
  color: #ffffff;
  cursor: pointer;
  outline: none;
  padding: 10px 15px;

  &:disabled {
    background-color: #e7e9ec;
    cursor: not-allowed;
  }
`;
