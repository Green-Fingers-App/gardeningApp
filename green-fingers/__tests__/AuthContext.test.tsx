import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import * as authApi from "@/api/auth";
import * as SecureStore from "expo-secure-store";
import { Text } from "react-native";
import type { SignUpData } from "@/types/authtypes";

const mockRouterReplace = jest.fn();

jest.mock("expo-router", () => ({
	useRouter: () => ({
		replace: mockRouterReplace,
	}),
}));

jest.mock("expo-secure-store", () => ({
	setItemAsync: jest.fn(),
	deleteItemAsync: jest.fn(),
}));

const mockUser = {
	id: 1,
	username: "malte",
	email: "malte@example.com",
};

const Consumer: React.FC = () => {
	const { user, isLoggedIn } = useAuth();

	return (
		<>
			{user && <Text testID="username">{user.username}</Text>}
			<Text testID="loggedIn">{isLoggedIn ? "true" : "false"}</Text>
		</>
	);
};

describe("AuthContext", () => {
	it("logs in the user and stores tokens", async () => {
		const apiLoginMock = jest.spyOn(authApi, "apiLogin").mockResolvedValue({
			accessToken: "access",
			refreshToken: "refresh",
			user: mockUser,
		});

		let loginFn!: (data: { email: string; password: string }) => Promise<void>;

		const Wrapper: React.FC = () => {
			const context = useAuth();
			loginFn = context.login;
			return <Consumer />;
		};

		const { findByTestId } = render(
			<AuthProvider>
				<Wrapper />
			</AuthProvider>
		);

		await waitFor(() =>
			loginFn({ email: "malte@example.com", password: "123456" })
		);

		const loggedInText = await findByTestId("loggedIn");
		const usernameText = await findByTestId("username");

		expect(apiLoginMock).toHaveBeenCalled();
		expect(SecureStore.setItemAsync).toHaveBeenCalledWith("accessToken", "access");
		expect(SecureStore.setItemAsync).toHaveBeenCalledWith("refreshToken", "refresh");
		expect(loggedInText.props.children).toBe("true");
		expect(usernameText.props.children).toBe("malte");
		expect(mockRouterReplace).toHaveBeenCalledWith("/profile/home");
	});

	it("signs up the user and stores tokens", async () => {
		const apiSignUpMock = jest.spyOn(authApi, "apiSignUp").mockResolvedValue({
			accessToken: "signup-access",
			refreshToken: "signup-refresh",
			user: mockUser,
		});

		let signupFn!: (data: SignUpData) => Promise<void>;

		const Wrapper: React.FC = () => {
			const context = useAuth();
			signupFn = context.signup;
			return <Consumer />;
		};

		const { findByTestId } = render(
			<AuthProvider>
				<Wrapper />
			</AuthProvider>
		);

		await waitFor(() =>
			signupFn({
				email: "malte@example.com",
				password: "123456",
				confirmPassword: "123456",
				username: "malte",
			})
		);

		const loggedInText = await findByTestId("loggedIn");
		const usernameText = await findByTestId("username");

		expect(apiSignUpMock).toHaveBeenCalled();
		expect(SecureStore.setItemAsync).toHaveBeenCalledWith("accessToken", "signup-access");
		expect(SecureStore.setItemAsync).toHaveBeenCalledWith("refreshToken", "signup-refresh");
		expect(loggedInText.props.children).toBe("true");
		expect(usernameText.props.children).toBe("malte");
		expect(mockRouterReplace).toHaveBeenCalledWith("/profile/home");
	});
});
