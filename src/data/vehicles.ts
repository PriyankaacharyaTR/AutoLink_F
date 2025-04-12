import { Vehicle } from '../types/vehicle';

export const vehicles: Vehicle[] = [
  {
    id: '1',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2022,
    price: 45000,
    location: 'San Francisco, CA',
    kmDriven: 15000,
    fuelType: 'Electric',
    transmission: 'Automatic',
    owner: 'First',
    seats: 5,
    engine: 'Electric Motor',
    maxPower: '283 kW',
    images: ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80'],
    modelViewer: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb'
  },
  {
    id: '2',
    brand: 'BMW',
    model: 'M3',
    year: 2021,
    price: 65000,
    location: 'Los Angeles, CA',
    kmDriven: 25000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    owner: 'First',
    seats: 5,
    engine: '3.0L Twin-Turbo',
    maxPower: '473 hp',
    images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80']
  },
];

let nextId = vehicles.length + 1;

export const addVehicle = (vehicle: Omit<Vehicle, 'id'>) => {
  const newVehicle: Vehicle = {
    ...vehicle,
    id: nextId.toString(),
  };
  nextId++;
  vehicles.push(newVehicle);
  return newVehicle;
};