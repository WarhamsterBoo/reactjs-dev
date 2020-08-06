import { userSessionStorage } from './userSessionStorage'

describe("userSessionStorage", () => {
    afterEach(() => {
        localStorage.clear()
    })

    it("should create new session in localstorage", () => {
        userSessionStorage.newSession("John Doe");

        expect(localStorage.setItem).toBeCalledWith("username", "John Doe")
    })

    it("should create remove session from localstorage", () => {
        userSessionStorage.endSession();

        expect(localStorage.removeItem).toBeCalledWith("username")
    })

    it("should retrieve existed user session", () => {
        localStorage.__STORE__["username"] = "John Doe"

        expect(userSessionStorage.getCurrentSession()).toBe("John Doe")
    })

    it("should return undefinedis user session does not exists", () => {
        expect(userSessionStorage.getCurrentSession()).toBe(undefined)
    })

    it("should indicate that session exists", () => {
        localStorage.__STORE__["username"] = "John Doe"

        expect(userSessionStorage.hasActiveSession()).toBeTruthy()
    })
})