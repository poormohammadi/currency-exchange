import './CurrencyRow.css';

import React from 'react';

import { Currency } from '../../models/Currency';
import CurrencySelector from '../CurrencySelector/CurrencySelector';
import NumberInput from '../NumberInput/NumberInput';

type Props = {
  balance: number;
  selectedCurrency: Currency;
  onSelectCurrency: (v: Currency) => void;
  amount?: string;
  onAmountChange: (v: string) => void;
  type: 'withdraw' | 'deposit';
  error?: string;
  disabled?: boolean;
}

function CurrencyRow(props: Props) {

  let containerClassName = 'CurrencyRow-container';
  if (props.type === 'withdraw') {
    containerClassName += ' CurrencyRow-container-withdraw';
  } else if (props.type === 'deposit') {
    containerClassName += ' CurrencyRow-container-deposit';
  }

  return (
    <div className={containerClassName}>
      <div className="CurrencyRow-balance-container">
        <CurrencySelector
          value={props.selectedCurrency}
          onValueChange={props.onSelectCurrency}
          disabled={props.disabled}
        />

        <span className="CurrencyRow-balance-text">
          Balance: {props.selectedCurrency.symbol}{props.balance}
        </span>
      </div>

      <NumberInput disabled={props.disabled} error={props.error} type={props.type} value={props.amount} onChange={props.onAmountChange} />
    </div>
  );
}

export default CurrencyRow;
