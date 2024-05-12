import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Transaction } from './entities/transaction.entity'
import { Repository } from 'typeorm'
import { errorContext } from 'rxjs/internal/util/errorContext'

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, id: number) {
    const newTransaction = {
      title: createTransactionDto.title,
      amount: Number(createTransactionDto.amount),
      type: createTransactionDto.type,
      category: { id: +createTransactionDto.category },
      user: { id },
    }
    for (const newTransactionElement in newTransaction) {
      console.log(
        newTransactionElement,
        ' ',
        typeof newTransaction[newTransactionElement],
      )
    }
    if (!newTransaction)
      throw new BadRequestException('Something went wrong...')
    try {
      return await this.transactionRepository.save(newTransaction)
    } catch (error) {
      console.table(createTransactionDto)
      console.log('Error saving transaction:', error.message)
      throw new InternalServerErrorException('Failed to save transaction.')
    }
  }

  async findAll(id: number) {
    const transactions = await this.transactionRepository.find({
      where: { user: { id } },
      relations: {
        category: true,
      },
      order: {
        createdAt: 'DESC',
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

  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    })

    if (!transaction) throw new NotFoundException('Transaction not found')

    return await this.transactionRepository.delete(id)
  }

  async findAllWithPagination(id: number, page: number, limit: number) {
    const transactions = await this.transactionRepository.find({
      where: { user: { id } },
      relations: { user: true, category: true },
      order: { createdAt: 'DESC' },
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
