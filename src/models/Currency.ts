import { CurrencyName } from "./CurrencyName";

export interface Currency { 
    name: CurrencyName;
    symbol: '£' | '€' | '$';
}