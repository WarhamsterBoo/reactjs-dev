import React from "react";

export interface HeaderProps {
  userName?: string;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName = "anonymous",
  onLogout,
}) => {
  return (
    <>
      <h1>Hello, {userName}</h1>
      <button onClick={onLogout}>Logout</button>
    </>
  );
};
