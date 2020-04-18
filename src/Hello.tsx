import React from "react";

interface HelloProps {
  name: string;
}

const Hello: React.FC<HelloProps> = (props) => (
  <h1>Hello World, {props.name}!</h1>
);

export default Hello;
