import { UserPlant } from './models'

export interface PlantContextProps {
  plants: UserPlant[];
  fetchPlants: (userId: number, token: string) => void;
  fetchPlantDetail: (plantId: number) => UserPlant | undefined;
}