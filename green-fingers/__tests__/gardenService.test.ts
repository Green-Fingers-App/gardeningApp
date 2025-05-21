import {
	apiAddGarden,
	apiUpdateGarden,
	apiDeleteGarden,
	apiGetUserGardens,
} from "@/api/gardenService";
import * as SecureStore from "expo-secure-store";
import * as api from "@/api/api";
import { Garden } from "@/types/models";

jest.mock("expo-secure-store", () => ({
	getItemAsync: jest.fn(),
}));

global.fetch = jest.fn();

describe("gardenService", () => {
	const token = "mock-token";
	const baseUrl = "https://example.com";

	beforeEach(() => {
		jest.clearAllMocks();
		(SecureStore.getItemAsync as jest.Mock).mockResolvedValue(token);
		jest.spyOn(api, "getApiUrl").mockImplementation(async path => `${baseUrl}/api${path}`);
	});

	describe("apiAddGarden", () => {
		it("should add garden successfully", async () => {
			const garden: Garden = { id: 1, name: "My Garden", userId: 42, location: "Indoor" };
			(fetch as jest.Mock).mockResolvedValue({
				ok: true,
				json: async () => garden,
			});

			const result = await apiAddGarden({ name: "My Garden", userId: 42, location: "Balcony" });

			expect(result).toEqual(garden);
			expect(fetch).toHaveBeenCalledWith(`${baseUrl}/api/gardens`, expect.any(Object));
		});

		it("should throw on failed response", async () => {
			(fetch as jest.Mock).mockResolvedValue({
				ok: false,
				json: async () => ({ error: "Failed to add" }),
			});

			await expect(apiAddGarden({ name: "Bad", userId: 1, location: "Balcony" })).rejects.toThrow("Failed to add");
		});
	});

	describe("apiUpdateGarden", () => {
		it("should update garden successfully", async () => {
			(fetch as jest.Mock).mockResolvedValue({
				ok: true,
				json: async () => ({}),
			});

			await expect(apiUpdateGarden(1, { name: "Updated Name" })).resolves.toBeUndefined();
			expect(fetch).toHaveBeenCalledWith(`${baseUrl}/api/gardens/1`, expect.any(Object));
		});

		it("should throw on failed update", async () => {
			(fetch as jest.Mock).mockResolvedValue({
				ok: false,
				json: async () => ({ error: "Update failed" }),
			});

			await expect(apiUpdateGarden(1, { name: "Fail" })).rejects.toThrow("Update failed");
		});
	});

	describe("apiDeleteGarden", () => {
		it("should delete garden successfully", async () => {
			(fetch as jest.Mock).mockResolvedValue({
				ok: true,
				json: async () => ({}),
			});

			await expect(apiDeleteGarden(1)).resolves.toBeUndefined();
			expect(fetch).toHaveBeenCalledWith(`${baseUrl}/api/gardens/1`, expect.any(Object));
		});

		it("should throw on failed deletion", async () => {
			(fetch as jest.Mock).mockResolvedValue({
				ok: false,
				json: async () => ({ error: "Delete failed" }),
			});

			await expect(apiDeleteGarden(1)).rejects.toThrow("Delete failed");
		});
	});

	describe("apiGetUserGardens", () => {
		it("should return garden list", async () => {
			const gardens: Garden[] = [
				{ id: 1, name: "Garden A", userId: 1, location: "Balcony" },
				{ id: 2, name: "Garden B", userId: 1, location: "Balcony" },
			];

			(fetch as jest.Mock).mockResolvedValue({
				ok: true,
				json: async () => gardens,
			});

			const result = await apiGetUserGardens();

			expect(result).toEqual(gardens);
			expect(fetch).toHaveBeenCalledWith(`${baseUrl}/api/users/gardens`, expect.any(Object));
		});

		it("should throw on failed fetch", async () => {
			(fetch as jest.Mock).mockResolvedValue({
				ok: false,
				json: async () => ({ error: "Fetch failed" }),
			});

			await expect(apiGetUserGardens()).rejects.toThrow("Fetch failed");
		});
	});
});
