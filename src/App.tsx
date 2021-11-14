import './App.css';

import React, { useEffect, useState } from 'react';

import { getExchangeRatesApi } from './api/api';
import CurrencyRow from './components/CurrencyRow/CurrencyRow';
import ExchangeRate from './components/ExchangeRate/ExchangeRate';
import { DEFAULT_DEPOSIT_CURRENCY, DEFAULT_WALLET, DEFAULT_WITHDRAWAL_CURRENCY } from './data/constants';
import { Currency } from './models/Currency';

function App() {
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');

  const [selectedWithdrawalCurrency, setSelectedWithdrawalCurrency] = useState(DEFAULT_WITHDRAWAL_CURRENCY);
  const [selectedDepositCurrency, setSelectedDepositCurrency] = useState(DEFAULT_DEPOSIT_CURRENCY);

  const [wallet, setWallet] = useState(DEFAULT_WALLET);
  const [exchangeRate, setExchangeRate] = useState(1);

  const withdrawalBalance = wallet[selectedWithdrawalCurrency.name];
  const depositBalance = wallet[selectedDepositCurrency.name];

  const [isLoading, setIsLoading] = useState(false);
  const [withdrawalError, setWithdrawalError] = useState('');
  const [exchangeRateError, setExchangeRateError] = useState('');

  function reset() {
    setWithdrawalError('');
    setExchangeRateError('');
    setWithdrawalAmount('');
    setDepositAmount('');
  }

  function doExchange() {
    if (selectedWithdrawalCurrency.name === selectedDepositCurrency.name) {
      setExchangeRateError('Convert a currency to another');
      return;
    } else if (!withdrawalAmount || !depositAmount) {
      setExchangeRateError('Please fill one of the fields');
      return;
    }

    setWallet({
      ...wallet,
      [selectedWithdrawalCurrency.name]: (+withdrawalBalance) - (+withdrawalAmount),
      [selectedDepositCurrency.name]: (+depositBalance) + (+depositAmount),
    });

    reset();
  }

  function handleWithdrawalValueChange(withdrawalAmount: string) {
    setWithdrawalError('');

    setWithdrawalAmount(withdrawalAmount);

    if (withdrawalAmount === '') {
      setDepositAmount('');
      return;
    }

    let depositAmount = +withdrawalAmount * exchangeRate;
    setDepositAmount(`${depositAmount.toFixed(2)}`);

    if (+withdrawalAmount > withdrawalBalance) setWithdrawalError('Balance Exceed');
  }

  function handleDepositValueChange(depositAmount: string) {
    setWithdrawalError('');

    setDepositAmount(depositAmount);
    if (depositAmount === '') {
      setWithdrawalAmount('');
      return;
    }

    const withdrawalAmount = +depositAmount / exchangeRate;
    setWithdrawalAmount(`${withdrawalAmount.toFixed(2)}`);

    if (+withdrawalAmount > withdrawalBalance) setWithdrawalError('Balance Exceed');
  }

  function handleWithdrawalCurrencyChange(currency: Currency) {
    reset();
    setSelectedWithdrawalCurrency(currency);
  }

  function handleDepositCurrencyChange(currency: Currency) {
    reset();
    setSelectedDepositCurrency(currency);
  }

  useEffect(() => {
    setIsLoading(true);
    getExchangeRatesApi()
      .then(res => {
        const rate = res.data.rates[selectedDepositCurrency.name] / res.data.rates[selectedWithdrawalCurrency.name];
        const roundedRate = rate.toFixed(2);
        setExchangeRate(+roundedRate);
      })
      .catch(err => setExchangeRateError(err.message))
      .finally(() => setIsLoading(false));
  }, [selectedDepositCurrency, selectedWithdrawalCurrency]);

  return (
    <div className="App-container">
      <div className="App">
        <div className="App-box">
          <CurrencyRow
            type="withdraw"
            amount={withdrawalAmount}
            onAmountChange={handleWithdrawalValueChange}
            balance={withdrawalBalance}
            selectedCurrency={selectedWithdrawalCurrency}
            onSelectCurrency={handleWithdrawalCurrencyChange}
            error={withdrawalError}
            disabled={isLoading}
          />

          <ExchangeRate
            withdrawalCurency={selectedWithdrawalCurrency}
            depositCurrency={selectedDepositCurrency}
            exchangeRate={exchangeRate}
            isLoading={isLoading}
            error={exchangeRateError}
          />

          <CurrencyRow
            type="deposit"
            amount={depositAmount}
            onAmountChange={handleDepositValueChange}
            balance={depositBalance}
            selectedCurrency={selectedDepositCurrency}
            onSelectCurrency={handleDepositCurrencyChange}
            disabled={isLoading}
          />
        </div>

        <button
          className="App-button"
          disabled={!!withdrawalError || isLoading}
          onClick={doExchange}>
          Exchange
        </button>
      </div>
    </div>
  );
}

export default App;
