import React from "react";
import { HeaderPanel } from "./HeaderPanel";
import { text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import styled from "@emotion/styled";

export default { title: "Header Panel Component", decorators: [withKnobs] };

const HeaderContainer = styled.div`
  width: 200px;
`;

export const HeaderPanelStory: React.FC<{}> = () => {
  const userName = text("User Name", "Bob");

  return (
    <HeaderContainer>
      <HeaderPanel userName={userName} logOutUser={action("onClick")} />
    </HeaderContainer>
  );
};
