export interface Category {
  id: number;
  name: string;
  displayName: string;
  manufacturer: string[];
  country: string[];
  volume: string[];
  strength: string[];
}

export const getCategories = async (): Promise<Category[]> => {
  return [];
};

export const getCategory = async (name: string): Promise<Category | null> => {
  return null;
}; 