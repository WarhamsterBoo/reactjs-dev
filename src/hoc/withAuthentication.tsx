import React from "react";

export const withAuthentication = <Props extends object>(
  Component: React.FC<Props>
): React.FC<Props> => (props: Props) => {
  return <Component {...props} />;
};
