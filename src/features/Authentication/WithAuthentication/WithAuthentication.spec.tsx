import { AuthStatus } from "@/features/Authentication";
import { AuthInProgressScreen } from "@/screens/AuthInProgressScreen";
import { ForbiddenScreen } from "@/screens/ForbiddenScreen";
import React from "react";
import { create } from "tests/dsl/create";
import { mountWithMockStore } from "tests/dsl/mountWithMockStore";
import { WithAuthentication } from "./WithAuthentication";

jest.mock("@/screens/ForbiddenScreen");

describe("WithAuthentication", () => {
  it("should render Access Denied Screen if user is not authenticated", () => {
    const { sut } = mountWithMockStore(
      <WithAuthentication>
        <div>Hello there!</div>
      </WithAuthentication>
    );

    expect(sut.find(ForbiddenScreen)).toHaveLength(1);
  });

  it("should render Auth In Progress Screen if user is authenticating", () => {
    const { sut } = mountWithMockStore(
      <WithAuthentication>
        <div>Hello there!</div>
      </WithAuthentication>,
      {
        auth: create.authState({
          status: AuthStatus.in_progress,
          userName: "anonymous",
        }),
      }
    );

    expect(sut.find(AuthInProgressScreen)).toHaveLength(1);
  });

  it("should render Forbidden Screen if user authentication failed", () => {
    const { sut } = mountWithMockStore(
      <WithAuthentication>
        <div>Hello there!</div>
      </WithAuthentication>,
      {
        auth: create.authState({
          status: AuthStatus.failed,
          userName: "anonymous",
        }),
      }
    );

    expect(sut.find(ForbiddenScreen)).toHaveLength(1);
  });

  it("should render children if user authenticated", () => {
    const { sut } = mountWithMockStore(
      <WithAuthentication>
        <div>Hello there!</div>
      </WithAuthentication>,
      {
        auth: create.authState({
          status: AuthStatus.authenticated,
          userName: "anonymous",
        }),
      }
    );

    expect(sut.find("div")).toHaveLength(1);
    expect(sut.find("div").text()).toBe("Hello there!");
  });
});
