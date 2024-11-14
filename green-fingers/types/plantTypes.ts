
import { UserPlant } from './models'

export interface PlantContextProps {
  plants: UserPlant[];
  fetchPlants: (userId: number, token: string) => void;
  fetchPlantDetail: (plantId: number) => UserPlant | undefined;
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