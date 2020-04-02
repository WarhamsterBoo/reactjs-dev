import hello from "./hello"

test('should return hello world', () => {
    expect(hello()).toContain("Hello World")
})