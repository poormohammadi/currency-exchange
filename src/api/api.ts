import axios, { AxiosPromise } from 'axios';

import { ExchangeRateResponse } from './../models/ExchangeRateResponse';

const CURRENCY_EXCHANGE_RATE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=42a264e9d421d1e8b006e8537afca2d4&format=1';

export function getExchangeRatesApi(): AxiosPromise<ExchangeRateResponse> {
    return axios.get(CURRENCY_EXCHANGE_RATE_URL);
}