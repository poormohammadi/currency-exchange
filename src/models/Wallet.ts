import { CurrencyName } from "./CurrencyName";

export type Wallet = {
    [key in CurrencyName]: number;
}