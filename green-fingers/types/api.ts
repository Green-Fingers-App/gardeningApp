import { CatalogPlant, UserPlant, Garden, MoistureSensor, SensorWithHistory } from "./models";

// API responses for plant endpoints
export type CreateUserPlantResponse = UserPlant & {
  error?: string;
};

export type GetUserPlantsResponse = UserPlant[] & {
  error?: string;
};

export type UpdateUserPlantResponse = { error?: string };

export type DeleteUserPlantResponse = { error?: string };

export type GetCatalogPlantsResponse = CatalogPlant[] & {
  error?: string;
};

export type SearchCatalogPlantsByCommonNameResponse = CatalogPlant[] & {
  error?: string;
};

// API responses for garden endpoints
export type CreateGardenResponse = Garden & {
  error?: string;
};

export type GetGardenResponse = Garden[] & {
  error?: string;
};

export type UpdateGardenResponse = { error?: string };

export type DeleteGardenResponse = { error?: string };

export type GetAllMoistureSensorsResponse = MoistureSensor[] & {
  error?: string;
}

export type GetMoistureSensorResponse = MoistureSensor & {
  error?: string;
}

export type GetMoistureSensorWithHistoryResponse = SensorWithHistory & {
  error?: string;
}

export type UpdateSensorResponse = { error?: string };

export type DeleteSensorResponse = { error?: string };


