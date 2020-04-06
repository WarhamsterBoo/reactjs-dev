import hello from "./hello";

describe("hello", () => {
  it('should return value with "Hello World" in it', () => {
    expect(hello()).toContain("Hello World");
  });
});
