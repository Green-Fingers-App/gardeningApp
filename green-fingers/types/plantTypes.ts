
import { Garden, UserPlant } from './models'

export interface PlantContextProps {
  plants: UserPlant[];
  gardens: Garden[];
  databasePlants: CatalogPlant[];
  fetchPlants: (userId: string, token: string) => void;
  fetchAllPlants: () => Promise<void>;
  fetchPlantsByCommonName: (input: string) => Promise<CatalogPlant[]>;
  fetchPlantDetail: (plantId: string) => UserPlant | undefined;
  fetchGardens: (userId: string, token: string) => void;
  fetchGardenDetail: (gardenId: string) => Garden | undefined;
  fetchGardenPlants: (gardenId: string) => UserPlant[] | undefined;
}

export interface CatalogPlant {
  id?: string;
  name: {
    commonName: string;
    scientificName?: string;
  };
  type: string;
  water_frequency: string;
  water_amount?: string;
  temperature?: {
    min?: number;
    max?: number;
  };
  humidity?: string;
  light?: string;
  soil_type?: string;
  fertilizer_type?: string;
  fertilizer_frequency?: string;
}