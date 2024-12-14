import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  findAll() {
    return this.countriesService.findAll();
  }

  @Get('countryInfo/:code')
  countryInfo(@Param('code') code: string) {
    return this.countriesService.countryInfo(code);
  }

  @Get('population')
  population() {
    return this.countriesService.population();
  }

  @Get('flags')
  flags() {
    return this.countriesService.flags();
  }
}
