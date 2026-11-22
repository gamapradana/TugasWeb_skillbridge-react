import {
  IsString,
  IsNumber,
  IsIn,
  MinLength,
  Min,
} from 'class-validator';

export class CreateJobDto {
  @IsString()
  @MinLength(3)
  posisi: string;

  @IsString()
  @MinLength(2)
  perusahaan: string;

  @IsString()
  @MinLength(3)
  lokasi: string;

  @IsString()
  @IsIn(['Full-time', 'Part-time', 'Internship', 'Contract'])
  tipe: string;

  @IsNumber()
  @Min(0)
  gaji: number;

  @IsString()
  @MinLength(10)
  deskripsi: string;
}
