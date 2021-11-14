import { CurrencyName } from './CurrencyName';

export interface ExchangeRateResponse{
    success: boolean;
    timestamp: number;
    base: string;
    date: string;
    rates: {
        [key in CurrencyName]: number;
    }
}