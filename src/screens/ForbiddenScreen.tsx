import React from "react";
import { Link } from "react-router-dom";

export const ForbiddenScreen: React.FC<{}> = () => {
  return (
    <>
      <h1>Access Denied. Please Log In.</h1>
      <Link to="/login">Authenticate</Link>
    </>
  );
};
