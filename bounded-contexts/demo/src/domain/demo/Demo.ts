import { EntityId, AggregateRoot } from 'ddd-lib';
import { Money, Currency } from './Money';

export enum DemoErrorCode {
  Currency_NOT_MATCHED,
}

export class DemoId extends EntityId<string> { }

interface DemoProps {
  name: string;
  money: Money;
}

export class Demo extends AggregateRoot<DemoId, DemoProps> {
  get name() {
    return this.props.name;
  }
  get money() {
    return this.props.money;
  }

  introduceDemo(): string {
    const money = this.props.money;
    const name = this.props.name;

    let currency: string;
    switch (money.currency) {
      case Currency.TWD:
        currency = 'TWD';
        break;
      case Currency.USD:
        currency = 'USD';
        break;
      default:
        throw new Error(DemoErrorCode.Currency_NOT_MATCHED.toString());
    }
    return `This is ${name}, I have ${money.amount} ${currency}.`
  }

  changeName(name: string): void {
    this.props.name = name;
  }

  pay(money: Money) {
    if (money.currency !== this.money.currency) {
      throw new Error(DemoErrorCode.Currency_NOT_MATCHED.toString());
    }
    this.props.money = this.props.money.substract(money.amount);
  }

  earn(money: Money) {
    if (money.currency !== this.money.currency) {
      throw new Error(DemoErrorCode.Currency_NOT_MATCHED.toString());
    }
    this.props.money = this.props.money.add(money.amount);
  }


}

