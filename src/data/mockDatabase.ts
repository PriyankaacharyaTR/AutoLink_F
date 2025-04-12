interface CarPricing {
  brand: string;
  year: number;
  kmDriven: number;
  fuelType: string;
  transmission: string;
  basePrice: number;
  carDekhoPrice: number;
  cars24Price: number;
  spinnyPrice: number;
}

export const carPricingData: CarPricing[] = [
  {
    brand: 'BMW',
    year: 2022,
    kmDriven: 15000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    basePrice: 45000,
    carDekhoPrice: 43500,
    cars24Price: 44200,
    spinnyPrice: 44800
  },
  {
    brand: 'Tesla',
    year: 2023,
    kmDriven: 10000,
    fuelType: 'Electric',
    transmission: 'Automatic',
    basePrice: 55000,
    carDekhoPrice: 54000,
    cars24Price: 53800,
    spinnyPrice: 54500
  },
  // Add more sample data...
];

export const getPricePredictions = (
  brand: string,
  year: string,
  kmDriven: string,
  fuelType: string,
  transmission: string
): { platform: string; price: number; url: string }[] => {
  // Simple price calculation logic
  const basePrice = Math.random() * (80000 - 30000) + 30000;
  const yearFactor = (2024 - parseInt(year)) * 2000;
  const kmFactor = parseInt(kmDriven) * 0.1;
  
  return [
    {
      platform: 'CarDekho',
      price: Math.round(basePrice - yearFactor - kmFactor + (Math.random() * 5000)),
      url: 'https://www.cardekho.com/sell-used-car'
    },
    {
      platform: 'Cars24',
      price: Math.round(basePrice - yearFactor - kmFactor + (Math.random() * 3000)),
      url: 'https://www.cars24.com/sell-car/'
    },
    {
      platform: 'Spinny',
      price: Math.round(basePrice - yearFactor - kmFactor + (Math.random() * 4000)),
      url: 'https://www.spinny.com/sell-used-car/'
    }
  ];
};