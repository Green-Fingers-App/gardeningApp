import React from "react";
import { Text } from "react-native";
import { render, waitFor } from "@testing-library/react-native";
import { AuthProvider, useAuth } from "./AuthContext";
import * as authApi from "@/api/auth";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

jest.mock("expo-secure-store", () => ({
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

const mockReplace = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

const TestComponent = () => {
  const { login, user, isLoggedIn } = useAuth();

  React.useEffect(() => {
    login({ email: "test@example.com", password: "secret" });
  }, []);

  return (
    <>
      {user && <Text testID="username">{user.username}</Text>}
      <Text testID="loggedIn">{isLoggedIn ? "true" : "false"}</Text>
    </>
  );
};

describe("AuthContext", () => {
  it("login() stores tokens, updates user, and navigates", async () => {
    const fakeUser = {
      username: "TestUser",
      email: "test@example.com",
      id: 1,
    };

    const fakeAuthResponse = {
      accessToken: "access123",
      refreshToken: "refresh123",
      user: fakeUser,
    };

    jest.spyOn(authApi, "apiLogin").mockResolvedValue(fakeAuthResponse);

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(getByTestId("username").props.children).toBe("TestUser");
      expect(getByTestId("loggedIn").props.children).toBe("true");
    });

    expect(SecureStore.setItemAsync).toHaveBeenCalledWith("accessToken", "access123");
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith("refreshToken", "refresh123");

    expect(mockReplace).toHaveBeenCalledWith("/profile/home");
  });
});

