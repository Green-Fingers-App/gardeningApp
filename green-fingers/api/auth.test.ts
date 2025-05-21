import { apiLogin, apiSignUp } from "./auth";
import { mockFetchResponse } from "@/test-utils/mockFetch";

describe("auth API", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("apiLogin", () => {
    it("Should return user data on success", async () => {
      const fakeResponse = {
        accessToken: "access123",
        refreshToken: "refresh123",
        user: { username: "TestUser", email: "test@example.com", id: 1 },
      };

      jest.spyOn(global, "fetch").mockImplementation(mockFetchResponse(200, fakeResponse));

      const result = await apiLogin({ email: "test@example.com", password: "secret" });

      expect(result).toEqual(fakeResponse);
    });

    it("should throw an error on failure", async () => {
      jest.spyOn(global, "fetch").mockImplementation(
        mockFetchResponse(401, { error: "Invalid credentials" })
      );

      await expect(
        apiLogin({ email: "wrong@example.com", password: "bad" })
      ).rejects.toThrow("Invalid credentials");
    });

  });

  describe("apiSignUp", () => {
    it("Should return user data on success", async () => {
      const fakeResponse = {
        accessToken: "access123",
        refreshToken: "refresh123",
        user: { username: "TestUser", email: "test@example.com", id: 1 },
      };

      jest.spyOn(global, "fetch").mockImplementation(mockFetchResponse(200, fakeResponse));

      const result = await apiSignUp({ username: "testUser", password: "secret", confirmPassword: "secret", email: "test@example.com" });

      expect(result).toEqual(fakeResponse);
    });


    it("should throw an error if the email is already in use", async () => {
      jest.spyOn(global, "fetch").mockImplementation(
        mockFetchResponse(400, { error: "Email already in use" })
      );

      await expect(
        apiSignUp({
          username: "TestUser",
          email: "existing@example.com",
          password: "somepassword",
          confirmPassword: "secret",
        })
      ).rejects.toThrow("Email already in use");
    });

    it("should throw an error if one or more parameters are missing", async () => {
      jest.spyOn(global, "fetch").mockImplementation(
        mockFetchResponse(400, { error: "Missing required fields" })
      );

      await expect(
        apiSignUp({
          username: "",
          email: "existing@example.com",
          password: "somepassword",
          confirmPassword: "secret",
        })
      ).rejects.toThrow("Missing required fields");
    });
  });

});
