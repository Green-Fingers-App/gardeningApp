import { apiLogin, apiSignUp } from "@/api/auth";
import * as SecureStore from "expo-secure-store";

// SecureStore mock
jest.mock("expo-secure-store", () => ({
	getItemAsync: jest.fn(),
}));

// fetch global mock
global.fetch = jest.fn();

const BASE_URL = "https://example.com";
const mockUser = {
	id: 1,
	username: "malte",
	email: "malte@example.com",
};

const mockAuthResponse = {
	accessToken: "test-access-token",
	refreshToken: "test-refresh-token",
	user: mockUser,
};

describe("auth API", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("apiLogin", () => {
		it("should return user data on success", async () => {
			(SecureStore.getItemAsync as jest.Mock).mockResolvedValue(BASE_URL);
			(fetch as jest.Mock).mockResolvedValue({
				ok: true,
				json: async () => mockAuthResponse,
			});

			const result = await apiLogin({
				email: "malte@example.com",
				password: "123456",
			});

			expect(result).toEqual(mockAuthResponse);
			expect(fetch).toHaveBeenCalledWith(
				`${BASE_URL}/api/auth/login`,
				expect.objectContaining({
					method: "POST",
				})
			);
		});

		it("should throw an error on failure", async () => {
			(SecureStore.getItemAsync as jest.Mock).mockResolvedValue(BASE_URL);
			(fetch as jest.Mock).mockResolvedValue({
				ok: false,
				json: async () => ({ error: "Invalid credentials" }),
			});

			await expect(
				apiLogin({ email: "wrong@example.com", password: "wrong" })
			).rejects.toThrow("Invalid credentials");
		});

		it("should throw if no base URL is set", async () => {
			(SecureStore.getItemAsync as jest.Mock).mockResolvedValue(null);

			await expect(
				apiLogin({ email: "test@example.com", password: "test" })
			).rejects.toThrow("No backend URL set.");
		});
	});

	describe("apiSignUp", () => {
		it("should return user data on success", async () => {
			(SecureStore.getItemAsync as jest.Mock).mockResolvedValue(BASE_URL);
			(fetch as jest.Mock).mockResolvedValue({
				ok: true,
				json: async () => mockAuthResponse,
			});

			const result = await apiSignUp({
				email: "malte@example.com",
				password: "123456",
				confirmPassword: "123456",
				username: "malte",
			});

			expect(result).toEqual(mockAuthResponse);
			expect(fetch).toHaveBeenCalledWith(
				`${BASE_URL}/api/auth/signup`,
				expect.objectContaining({
					method: "POST",
				})
			);
		});

		it("should throw an error on failure", async () => {
			(SecureStore.getItemAsync as jest.Mock).mockResolvedValue(BASE_URL);
			(fetch as jest.Mock).mockResolvedValue({
				ok: false,
				json: async () => ({ error: "Email already in use" }),
			});

			await expect(
				apiSignUp({
					email: "duplicate@example.com",
					password: "123456",
					confirmPassword: "123456",
					username: "malte",
				})
			).rejects.toThrow("Email already in use");
		});
	});
});
