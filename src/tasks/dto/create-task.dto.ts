import { Validator } from 'class-validator';
import { IsNotEmpty } from 'class-Validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
