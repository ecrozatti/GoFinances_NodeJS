import { getCustomRepository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import TransictionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';
import AppError from '../errors/AppError';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransictionsRepository);
    const categoriesRepository = getRepository(Category);

    if (type !== 'income' && type !== 'outcome') {
      throw new AppError('Invalid operation.');
    }

    // check if the outcome is greater than the total balance
    const { total } = await transactionsRepository.getBalance();
    if (type === 'outcome' && value > total) {
      throw new AppError('insufficient funds');
    }

    // check if the category exists
    let addCategory = await categoriesRepository.findOne({
      where: { title: category },
    });

    // if it doesn't exist, save the new category
    if (!addCategory) {
      addCategory = categoriesRepository.create({
        title: category,
      });
      await categoriesRepository.save(addCategory);
    }

    // create instance of the transaction
    const transiction = transactionsRepository.create({
      title,
      type,
      value,
      category: addCategory,
    });

    // save transaction in the db
    await transactionsRepository.save(transiction);

    return transiction;
  }
}

export default CreateTransactionService;
