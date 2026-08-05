export interface Equipment {
  id: string;
  name: string;
  category: string;
  brand: string;
  modelNumber: string;
  baseCost: number;
}

export interface Customer {
  id: string;
  name: string;
  address: string;
  phone?: string;
  propertyType: 'residential' | 'commercial';
  squareFootage: number;
  systemType: string;
  systemAge: number;
  lastServiceDate?: string;
}

export interface LaborRate {
  id: number;
  jobType: string;
  level: string;
  hourlyRate: number;
  estimatedHoursMin: number;
  estimatedHoursMax: number;
}
