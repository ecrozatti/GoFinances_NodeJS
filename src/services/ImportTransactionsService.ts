import csvParse from 'csv-parse';
import { getRepository, getCustomRepository, In } from 'typeorm';
import fs from 'fs';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface CSVTransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    // open the file.csv
    const linesReadStream = fs.createReadStream(filePath);

    // start on the 2nd line, because the first is header
    const parsers = csvParse({
      from_line: 2,
    });

    // read line by line
    const parseCSV = linesReadStream.pipe(parsers);

    // initialize the arrays
    const transactions: CSVTransaction[] = [];
    const categories: string[] = [];

    // read cell by cell and remove spaces
    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );

      // disregard if any data is empty
      if (!title || !type || !value) return;

      // add to arrays
      categories.push(category);
      transactions.push({ title, type, value, category });
    });

    // create this "await Promise", because "parseCSV.on" is an async function.
    // this Promise awaits the 'end' event of the async function.
    await new Promise(resolve => parseCSV.on('end', resolve));

    // check which categories already exist in the db.
    const existentCategories = await categoriesRepository.find({
      where: { title: In(categories) },
    });

    // search only titles of the categories
    const categoriesExistsTitle = existentCategories.map(
      (category: Category) => category.title,
    );

    // check categories that do not exist in the db and remove duplicates
    const addCategories = categories
      .filter(category => !categoriesExistsTitle.includes(category))
      .filter((title, index, category) => category.indexOf(title) === index);

    // creates instances of the categories
    const newCategories = categoriesRepository.create(
      addCategories.map(title => ({ title })),
    );

    // save the categories in the db
    await categoriesRepository.save(newCategories);

    // join categories
    const allCategories = [...newCategories, ...existentCategories];

    // create instances of the transactions
    const importTransactions = transactionsRepository.create(
      transactions.map(transaction => ({
        title: transaction.title,
        type: transaction.type,
        value: transaction.value,
        category: allCategories.find(
          category => category.title === transaction.category,
        ),
      })),
    );

    // save transactions in the db
    await transactionsRepository.save(importTransactions);

    // delete the CSV file
    await fs.promises.unlink(filePath);

    return importTransactions;
  }
}

export default ImportTransactionsService;
