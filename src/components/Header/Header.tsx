import React from "react";

export interface HeaderProps {
  userName: string;
  onLogoutClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ userName, onLogoutClick }) => {
  return (
    <>
      <h1>Hello, {userName}</h1>
      <button onClick={onLogoutClick}>Logout</button>
    </>
  );
};
