import './ExchangeRate.css';

import React from 'react';

import { Currency } from '../../models/Currency';

type Props = {
    withdrawalCurency: Currency;
    depositCurrency: Currency;
    exchangeRate: number;
    isLoading: boolean;
    error?: string;
}

export default function ExchangeRate(props: Props) {
    const { withdrawalCurency, depositCurrency, exchangeRate, isLoading, error } = props;

    let containerClassName = 'ExchangeRate-container';
    if (error) containerClassName += ' ExchangeRate-container-error';

    return (
        <div className="ExchangeRate-row">
            <span className={containerClassName}>
                {isLoading
                    ? 'Loading...'
                    : error
                    || `${withdrawalCurency.symbol}1 = ${depositCurrency.symbol}${exchangeRate}`
                }
            </span>
        </div>
    )
}
