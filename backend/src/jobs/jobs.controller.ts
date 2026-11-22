import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { JobsService } from './jobs.service.js';
import { CreateJobDto } from './dto/create-job.dto.js';
import { UpdateJobDto } from './dto/update-job.dto.js';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  
  @Get()
  findAll() {
    return this.jobsService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(Number(id));
  }


  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
  ) {
    return this.jobsService.update(Number(id), updateJobDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(Number(id));
  }
}
