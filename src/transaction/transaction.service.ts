import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Transaction } from './entities/transaction.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}
  create(createTransactionDto: CreateTransactionDto, id: number) {
    const newTransaction = {
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      user: { id },
      category: { id: +createTransactionDto.category },
    }
    if (!newTransaction)
      throw new BadRequestException(
        `Something went wrong while creating transaction`,
      )
    return this.transactionRepository.save(newTransaction)
  }

  async findAll(id: number) {
    const transactions = await this.transactionRepository.find({
      where: { user: { id } },
      relations: {
        category: true,
      },
      order: {
        crearedAt: 'DESC',
      },
    })
    if (!transactions) throw new BadRequestException('Transactions not found')
    return transactions
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: { user: true, category: true },
    })
    if (!transaction) throw new BadRequestException('Transaction not found')
    return transaction
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    })
    if (!transaction) throw new BadRequestException('Transaction not found')
    await this.transactionRepository.update(id, updateTransactionDto)
  }

  remove(id: number) {
    const transactions = this.transactionRepository.findOne({
      where: { id },
    })
    if (!transactions) throw new BadRequestException('Transaction not found')
    return this.transactionRepository.delete(id)
  }
  async findAllWithPagination(id: number, page: number, limit: number) {
    const transactions = await this.transactionRepository.find({
      where: { user: { id } },
      relations: { user: true, category: true },
      order: { crearedAt: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    })
    if (!transactions) throw new BadRequestException('Transactions not found')
    return transactions
  }
  async findAllByType(id: number, type: string) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: { id },
        type,
      },
    })

    const total = transactions.reduce((acc, trs) => acc + trs.amount, 0)

    return total
  }
}
