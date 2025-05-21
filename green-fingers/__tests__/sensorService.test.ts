import {
	apiGetAllMoistureSensors,
	apiGetMoistureSensor,
	apiGetSensorHistoryData,
	apiDeleteSensor,
	apiUpdateSensor,
} from "@/api/sensorService";

import * as SecureStore from "expo-secure-store";
import * as api from "@/api/api";
import type { MoistureSensor, SensorWithHistory } from "@/types/models";

jest.mock("expo-secure-store", () => ({
	getItemAsync: jest.fn(),
}));

global.fetch = jest.fn();

describe("sensorService", () => {
	const token = "mock-token";
	const baseUrl = "https://example.com";

	beforeEach(() => {
		jest.clearAllMocks();
		(SecureStore.getItemAsync as jest.Mock).mockResolvedValue(token);
		jest.spyOn(api, "getApiUrl").mockImplementation(async path => `${baseUrl}/api${path}`);
	});

	it("fetches all moisture sensors", async () => {
		const sensors: MoistureSensor[] = [
			{
				id: 1,
				name: "Sensor A",
				current_moisture_level: 450,
				sensorType: "Capacitive",
				plant_id: 1,
				nickname: "Tomato Sensor",
				user_id: 42,
				percentage: "80%",
				interpretedMoisture: "Moist",
			},
		];

		(fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: async () => sensors,
		});

		const result = await apiGetAllMoistureSensors();
		expect(result).toEqual(sensors);
	});

	it("fetches a single moisture sensor", async () => {
		const sensor: MoistureSensor = {
			id: 2,
			name: "Sensor B",
			current_moisture_level: 300,
			sensorType: "Capacitive",
			plant_id: 2,
			nickname: "Herbs Sensor",
			user_id: 42,
			percentage: "60%",
			interpretedMoisture: "Dry",
		};

		(fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: async () => sensor,
		});

		const result = await apiGetMoistureSensor(2);
		expect(result).toEqual(sensor);
	});

	it("fetches sensor with history", async () => {
		const data: SensorWithHistory = {
			sensor: {
				id: 3,
				name: "Sensor C",
				current_moisture_level: 500,
				sensorType: "Capacitive",
				plant_id: 3,
				nickname: "Lettuce Sensor",
				user_id: 42,
				percentage: "90%",
				interpretedMoisture: "Wet",
			},
			history: [
				{
					id: 1,
					interpreted: "Wet",
					moisture_level: 500,
					sensor_id: 3,
					time_stamp: "2025-05-20T10:00:00Z",
				},
			],
		};

		(fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: async () => data,
		});

		const result = await apiGetSensorHistoryData(3);
		expect(result).toEqual(data);
	});

	it("deletes a sensor", async () => {
		(fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: async () => ({}),
		});

		await expect(apiDeleteSensor(1)).resolves.toBeUndefined();
	});

	it("updates a sensor", async () => {
		(fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: async () => ({}),
		});

		await expect(
			apiUpdateSensor(1, {
				name: "Updated Sensor",
				current_moisture_level: 400,
				plant_id: 2,
			})
		).resolves.toBeUndefined();
	});
});
