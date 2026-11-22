
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { CreateJobDto } from './dto/create-job.dto.js';
import { UpdateJobDto } from './dto/update-job.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createJobDto: CreateJobDto) {
    const isDuplicate = await this.prisma.job.findFirst({
      where: {
        posisi: {
          equals: createJobDto.posisi,
          mode: 'insensitive',
        },
        perusahaan: {
          equals: createJobDto.perusahaan,
          mode: 'insensitive',
        },
      },
    });

    if (isDuplicate) {
      throw new ConflictException(
        'Lowongan dari perusahaan tersebut sudah tersedia.',
      );
    }

    return this.prisma.job.create({
      data: createJobDto,
    });
  }

  async findAll() {
    return this.prisma.job.findMany();
  }

  async findOne(id: number) {
    const job = await this.prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      throw new NotFoundException(
        `Lowongan dengan ID ${id} tidak ditemukan.`,
      );
    }

    return job;
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
    await this.findOne(id);

    return this.prisma.job.update({
      where: { id },
      data: updateJobDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.job.delete({
      where: { id },
    });

    return {
      message: 'Lowongan berhasil dihapus.',
    };
  }
}
