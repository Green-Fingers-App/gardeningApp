import {
	apiCreateUserPlant,
	apiGetUserPlants,
	apiDeleteUserPlant,
	apiUpdateUserPlant,
	apiGetCatalogPlants,
	apiSearchCatalogPlantsByCommonName,
	apiBatchUpdateWateredDate,
	apiEditWateredDate,
} from "@/api/plantService";

import * as SecureStore from "expo-secure-store";
import * as api from "@/api/api";
import { SunLight, type CatalogPlant, type UserPlant } from "@/types/models";

jest.mock("expo-secure-store", () => ({
	getItemAsync: jest.fn(),
}));

global.fetch = jest.fn();

describe("plantService", () => {
	const token = "mock-token";
	const baseUrl = "https://example.com";

	beforeEach(() => {
		jest.clearAllMocks();
		(SecureStore.getItemAsync as jest.Mock).mockResolvedValue(token);
		jest.spyOn(api, "getApiUrl").mockImplementation(async (path) => `${baseUrl}/api${path}`);
	});

	it("creates a user plant", async () => {
		(fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: async () => ({ id: 123 }),
		});

		const result = await apiCreateUserPlant({
			nickName: "Tomato",
			catalogPlant_id: 1,
			userId: 42,
			garden_id: 5,
			wateredDate: "2024-05-01",
			plantedDate: "2024-04-01",
			feededDate: "2024-05-15",
			moistureLevel: "Optimal",
			sunlightLevel: "Good",
			harvested: false,
			sensorId: "abc123",
			name: { commonName: "Tomato", scientificName: "Solanum lycopersicum" },
			blooming: { start: "03", end: "08", flowerColor: "yellow" },
			waterFrequency: "WEEKLY",
			neededMoisture: "Moist",
			sunLight: SunLight.FULL_SUN,
			temperature: { min: 10, max: 30 },
			size: { height: 80, width: 40 },
			fertilizerType: "NPK",
			planting: { start: "03", end: "06" },
			imageUrl: "http://example.com/tomato.jpg",
		});

		expect(result).toBe(123);
	});

	it("gets user plants", async () => {
		const mockPlants: UserPlant[] = [
			{
				id: 1,
				nickName: "Rose",
				garden_id: 1,
				userId: 42,
				catalogPlant_id: 5,
				wateredDate: "2024-05-01",
				plantedDate: "2024-04-01",
				feededDate: "2024-05-15",
				moistureLevel: "Optimal",
				sunlightLevel: "Good",
				harvested: false,
				sensorId: "sensor-001",
				name: { commonName: "Rose", scientificName: "Rosa" },
				blooming: { start: "05", end: "09", flowerColor: "red" },
				waterFrequency: "WEEKLY",
				neededMoisture: "Moist",
				sunLight: SunLight.FULL_SUN,
				temperature: { min: 5, max: 30 },
				size: { height: 100, width: 60 },
				fertilizerType: "Compost",
				planting: { start: "04", end: "06" },
				imageUrl: "http://example.com/rose.jpg",
			},
		];

		(fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: async () => mockPlants,
		});

		const result = await apiGetUserPlants();
		expect(result).toEqual(mockPlants);
	});

	it("deletes a user plant", async () => {
		(fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: async () => ({}),
		});

		await expect(apiDeleteUserPlant(1)).resolves.toBeUndefined();
	});

	it("updates a user plant", async () => {
		(fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: async () => ({}),
		});

		await expect(apiUpdateUserPlant(1, { nickName: "New Name" })).resolves.toBeUndefined();
	});

	it("gets catalog plants", async () => {
		const mockCatalog: CatalogPlant[] = [
			{
				id: 1,
				name: { commonName: "Basil", scientificName: "Ocimum basilicum" },
				blooming: { start: "06", end: "09", flowerColor: "white" },
				waterFrequency: "WEEKLY",
				neededMoisture: "Moist",
				sunLight: SunLight.FULL_SUN,
				temperature: { min: 15, max: 35 },
				size: { height: 40, width: 20 },
				fertilizerType: "Organic",
				planting: { start: "04", end: "06" },
				imageUrl: "http://example.com/basil.jpg",
			},
		];

		(fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: async () => mockCatalog,
		});

		const result = await apiGetCatalogPlants();
		expect(result).toEqual(mockCatalog);
	});

	it("searches catalog plants by name", async () => {
		const mockCatalog: CatalogPlant[] = [
			{
				id: 1,
				name: { commonName: "Mint", scientificName: "Mentha" },
				blooming: { start: "05", end: "08", flowerColor: "purple" },
				waterFrequency: "WEEKLY",
				neededMoisture: "Moist",
				sunLight: SunLight.PARTIAL_SUN,
				temperature: { min: 10, max: 30 },
				size: { height: 25, width: 15 },
				fertilizerType: "General",
				planting: { start: "03", end: "05" },
				imageUrl: "http://example.com/mint.jpg",
			},
		];

		(fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: async () => mockCatalog,
		});

		const result = await apiSearchCatalogPlantsByCommonName("mint");
		expect(result).toEqual(mockCatalog);
	});

	it("batch updates watered date", async () => {
		(fetch as jest.Mock).mockResolvedValue({ ok: true });

		await expect(apiBatchUpdateWateredDate([1, 2, 3])).resolves.toBeUndefined();
	});

	it("edits watered date", async () => {
		(fetch as jest.Mock).mockResolvedValue({ ok: true });

		await expect(apiEditWateredDate(1, "2025-05-21")).resolves.toBeUndefined();
	});
});
