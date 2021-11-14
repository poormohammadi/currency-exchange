import './CurrencySelector.css';

import React from 'react';

import { ALL_CURRENCIES } from '../../data/constants';
import { Currency } from '../../models/Currency';

type Props = {
    value: Currency;
    onValueChange: (v: Currency) => void;
    disabled?: boolean;
}

export default function CurrencySelector(props: Props) {
    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const currency = ALL_CURRENCIES.find(currency => currency.name === e.target.value);
        if (currency)
            props.onValueChange(currency);
    }

    return (
        <select disabled={props.disabled} className="CurrencySelector-select" value={props.value.name} onChange={handleChange}>
            {ALL_CURRENCIES.map(currency =>
                <option key={currency.name} value={currency.name}>
                    {currency.name}
                </option>
            )}
        </select>
    )
}
