import { Plant } from '../../databaseStructure/models'

export interface PlantContextProps {
  plants: Plant[] | null;
  fetchPlants: (userId: number, token: string) => void;
}