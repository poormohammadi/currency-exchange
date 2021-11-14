import { Currency } from '../models/Currency';
import { Wallet } from '../models/Wallet';

export const ALL_CURRENCIES: Currency[] = [
    {
        name: 'EUR',
        symbol: '€',
    },
    {
        name: 'GBP',
        symbol: '£',
    },
    {
        name: 'USD',
        symbol: '$',
    }
];

export const DEFAULT_WALLET: Wallet = {
    'USD': 200,
    'EUR': 150,
    'GBP': 10,
};

export const DEFAULT_WITHDRAWAL_CURRENCY: Currency = { name: 'USD', symbol: '$' };
export const DEFAULT_DEPOSIT_CURRENCY: Currency = { name: 'EUR', symbol: '€' };
