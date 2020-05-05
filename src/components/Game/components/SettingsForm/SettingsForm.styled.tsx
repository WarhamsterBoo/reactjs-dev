import styled from "@emotion/styled";

export const Form = styled.form`
  padding: 10px 10px 10px 10px;

  border: solid 1px black;
  background-color: #011627;

  display: inline-flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const Label = styled.label`
  margin-right: 10px;
  margin-left: 10px;

  color: #addb67;
  font-family: Inconsolata, monospace;
`;

export const Legend = styled.legend`
  color: #addb67;
  font-family: Inconsolata, monospace;
`;

export const FieldSet = styled.fieldset`
  border-color: #addb67;
`;
