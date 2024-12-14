import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Country, CountryInfo } from './entities/country.entity';

@Injectable()
export class CountriesService {
  constructor(private readonly httpService: HttpService) {}
  findAll(): Observable<AxiosResponse<Country[]>> {
    return this.httpService
      .get('https://date.nager.at/api/v3/AvailableCountries', {
        headers: {
          Accept: 'application/json',
        },
      })
      .pipe(map((response) => response.data));
  }

  countryInfo(code: string): Observable<AxiosResponse<CountryInfo>> {
    return this.httpService
      .get(`https://date.nager.at/api/v3/CountryInfo/${code}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .pipe(map((response) => response.data));
  }

  population(): Observable<AxiosResponse<object>> {
    return this.httpService
      .get(`https://countriesnow.space/api/v0.1/countries/population`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .pipe(map((response) => response.data));
  }

  flags(): Observable<AxiosResponse<object>> {
    return this.httpService
      .get(`https://countriesnow.space/api/v0.1/countries/flag/images`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .pipe(map((response) => response.data));
  }
}
