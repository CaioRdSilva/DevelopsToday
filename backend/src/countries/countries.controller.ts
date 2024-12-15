import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';

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

  @Get('population/:countryName')
  async population(@Param('countryName') countryName: string) {
    // Lógica para pegar dados de população com base no nome do país
    return this.countriesService.population(countryName);
  }

  @Get('flags/:countryName')
  flags(@Param('countryName') countryName: string) {
    return this.countriesService.flags(countryName);
  }
}
