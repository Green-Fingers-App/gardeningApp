
import { Garden, UserPlant } from './models'

export interface PlantContextProps {
  plants: UserPlant[];
  gardens: Garden[];
  fetchPlants: (userId: string, token: string) => void;
  fetchPlantDetail: (plantId: string) => UserPlant | undefined;
  fetchGardens: (userId: string, token: string) => void;
  fetchGardenDetail: (gardenId: string) => Garden | undefined;
  fetchGardenPlants: (gardenId: string) => (UserPlant[] | undefined);
}

export interface Plant {
    name: string;
    scientific_name?: string;
    type: string;
    water_frequency: string;
    water_amount?: string;
    temperature?: string;
    humidity?: string;
    light?: string;
    soil_type?: string;
    fertilizer_type?: string;
    fertilizer_frequency?: string;
  }