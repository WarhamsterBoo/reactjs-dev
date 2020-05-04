import { action } from "@storybook/addon-actions";
import React from "react";
import { Form } from "./Form";

export default { title: "Form Component" };

export const FormStory: React.FC<{}> = () => {
  return <Form onSubmit={action("onSubmit")} />;
};
