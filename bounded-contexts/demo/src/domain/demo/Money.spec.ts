import { Decimal } from 'decimal.js';
import { Money, Currency, MoneyErrorCode } from './Money';


describe('Given a 10 dollar TWD', () => {
  const get10Twd = () => new Money({
    amount: new Decimal(10),
    currency: Currency.TWD
  })
  describe('When substract 5 TWD', () => {
    it('should be 5 TWD', () => {
      const money = get10Twd();
      const actualMoney = money.substract(new Decimal(5));
      expect(actualMoney.amount.toNumber()).toBe(5)
    })
  })

  describe('When substract 20 TWD', () => {
    it('should throw error', () => {
      const money = get10Twd();
      expect(() => {
        money.substract(new Decimal(20));
      }).toThrowError(MoneyErrorCode.MONEY_AMOUNT_SHOULD_BE_POSITIVE.toString());
    })
  })

  describe('When add 5 TWD', () => {
    it('should be 15 TWD', () => {
      const money = get10Twd();
      const actualMoney = money.add(new Decimal(5));
      expect(actualMoney.amount.toNumber()).toBe(15)
    })
  })
})