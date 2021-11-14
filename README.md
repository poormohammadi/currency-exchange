# Sample Currency Exchange App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Functionality
User has three wallets:
- USD (initial balance $200)
- EUR (initial balance €150)
- GBP (initial balance £10)
  
They can switch wallets e.g: EUR > GBP., GBP > USD., USD > EUR.  
Enter the desired amount to exchange and has a CTA (call-to-action) to conclude the transaction.  
This (https://exchangeratesapi.io/documentation/) is used to get the conversion rates.  
Wallet balances are updated correctly.  
It shows an error message when the desired exchange amount exceeds the current balance, the network request fails, amounts are empty or currencies are the same.

## Demo

To see the demo, click [here](http://currency-exchange.poormohammmadi.ir/).

`Note : make sure to run it without "https" since it is blocked by api.exchangeratesapi.io.`

## Run Locally

1- Clone the project.
```
git clone https://github.com/poormohammadi/currency-exchange.git
```
2- Go to the project directory and install node modules.
```
cd currency-exchange
npm i
```
3- Run the application
```
npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
