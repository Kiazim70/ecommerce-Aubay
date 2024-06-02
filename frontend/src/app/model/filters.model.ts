
export interface Filters {
    postalCode: string;
    region: string;
    radius: string;
    priceDrop: boolean;
    price: PriceRange;
    brands: { [key: string]: boolean };
    fuelTypes: { [key: string]: boolean };
    year: YearRange;
    categories: { [key: string]: boolean };
    mileage: MileageRange;
  }
  
  export interface PriceRange {
    min: number;
    max: number;
  }
  
  export interface YearRange {
    min: number;
    max: number;
  }
  
  export interface MileageRange {
    min: number;
    max: number;
  }
  