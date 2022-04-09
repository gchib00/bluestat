export type Color = "blue" | "green" | "red"
export interface Country {
  id: string;
  value: string;
}
export interface CountryData {
  country: Country;
  date: string;
  decimal?: number;
  indicator: {
    id: string;
    value: string;
  };
  obs_status?: string;
  unit?: string;
  value: number;
}
