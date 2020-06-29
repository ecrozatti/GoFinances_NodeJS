import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transictions = this.find();

    /* eslint no-param-reassign: "error" */
    const { income, outcome } = (await transictions).reduce(
      (acumulator: Balance, transaction: Transaction) => {
        if (transaction.type === 'income') {
          acumulator.income += +transaction.value;
        } else if (transaction.type === 'outcome') {
          acumulator.outcome += +transaction.value;
        }
        return acumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return { income, outcome, total: income - outcome };
  }
}

export default TransactionsRepository;
