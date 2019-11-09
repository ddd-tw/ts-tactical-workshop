import { Decimal } from 'decimal.js';
import { Demo, DemoId } from './Demo';
import { Money, Currency } from './Money';

describe('Given a Demo with name demo and 100 NTD', () => {
  const getMoney = (amount: number) => new Money({
    amount: new Decimal(amount),
    currency: Currency.TWD
  })

  const getDemo = () => new Demo(new DemoId('1'), {
    name: 'demo',
    money: getMoney(10),
  })
  describe('When demo introduces', () => {
    it('should return correct words', () => {
      const demo = getDemo();
      const actualWords = demo.introduceDemo();
      expect(actualWords).toBe('This is demo, I have 10 TWD.')
    })
  })
  describe('When demo change Name', () => {
    it('should succeed', () => {
      const demo = getDemo();
      const actualWords = demo.introduceDemo();
      expect(actualWords).toBe('This is demo, I have 10 TWD.')
    })
  })
  describe('When demo change Name', () => {
    it('should succeed', () => {
      const demo = getDemo();
      const updatedName = 'happy';
      demo.changeName(updatedName);
      expect(demo.name).toBe(updatedName)
    })
  })
  describe('When demo pay 5 TWD', () => {
    it('should have 5 TWD', () => {
      const demo = getDemo();
      const moneyToPay = getMoney(5);
      demo.pay(moneyToPay);
      const expectedMoney = getMoney(5);
      expect(demo.money.equals(expectedMoney)).toBeTruthy();
    })
  })
  describe('When demo pay 100 TWD', () => {
    it('should have 5 TWD', () => {
      const demo = getDemo();
      const moneyToPay = getMoney(100);
      expect(() => { demo.pay(moneyToPay); }).toThrow();
    })
  })

  describe('When demo earn 10 TWD', () => {
    it('should have 20 TWD', () => {
      const demo = getDemo();
      const moneyToPay = getMoney(10);
      demo.earn(moneyToPay);
      const expectedMoney = getMoney(20);
      expect(demo.money.equals(expectedMoney)).toBeTruthy();
    })
  })

})