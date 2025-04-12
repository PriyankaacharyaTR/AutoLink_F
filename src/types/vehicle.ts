export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  location: string;
  kmDriven: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Manual' | 'Automatic';
  owner: string;
  seats: number;
  engine: string;
  maxPower: string;
  images: string[];
  video?: string;
  modelViewer?: string;
}

export interface MediaFiles {
  photos: File[];
  video?: File;
}