import React from "react";

export interface HeaderProps {
  userName?: string;
  logOutUser?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName = "anonymous",
  logOutUser,
}) => {
  return (
    <>
      <h1>Hello, {userName}</h1>
      <button onClick={logOutUser}>Logout</button>
    </>
  );
};
