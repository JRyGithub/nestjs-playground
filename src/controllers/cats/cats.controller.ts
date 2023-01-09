import { Cat } from './interfaces/cat.interface';
import { CatsService } from './cats.service';
import { CreateCatDTO } from './dto/create-cat.dto';
import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post()
  @Header('Cache-Control', 'none')
  async create(@Body() createCatDTO: CreateCatDTO) {
    this.catsService.create(createCatDTO);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('name:id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }

  // The asterix is a wildcard so can be anything
  @Get('ab*cd')
  findAllWildCard() {
    return 'This route uses a wildcard';
  }

  @Get('nest')
  @Redirect('https://nestjs.com', 301)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}
