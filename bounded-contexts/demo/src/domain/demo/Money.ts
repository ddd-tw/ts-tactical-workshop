import { Decimal } from 'decimal.js';
import { ValueObject } from 'ddd-lib'

export enum Currency {
  TWD,
  USD
}

export enum MoneyErrorCode {
  MONEY_AMOUNT_SHOULD_BE_POSITIVE
}

interface MoneyProps {
  amount: Decimal;
  currency: Currency;
}

export class Money extends ValueObject<MoneyProps> {

  get amount() {
    return this.props.amount;
  }
  get currency() {
    return this.props.currency;
  }

  substract(amount: Decimal) {
    if (amount.greaterThan(this.props.amount)) {
      throw new Error(MoneyErrorCode.MONEY_AMOUNT_SHOULD_BE_POSITIVE.toString());
    }
    return new Money({
      amount: this.props.amount.minus(amount),
      currency: this.props.currency,
    })
  }

  add(amount: Decimal) {
    return new Money({
      amount: this.props.amount.add(amount),
      currency: this.props.currency,
    })
  }

  equals(money: Money) {
    return money.currency === this.props.currency && money.amount.equals(this.props.amount);
  }
}