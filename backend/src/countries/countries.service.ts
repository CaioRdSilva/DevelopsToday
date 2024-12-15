import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Country, CountryInfo } from './entities/country.entity';

@Injectable()
export class CountriesService {
  constructor(private readonly httpService: HttpService) {}
  findAll(): Observable<AxiosResponse<Country[]>> {
    return this.httpService
      .get(`${process.env.API_V3}/AvailableCountries`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .pipe(map((response) => response.data));
  }

  countryInfo(code: string): Observable<AxiosResponse<CountryInfo>> {
    return this.httpService
      .get(`${process.env.API_V3}/CountryInfo/${code}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .pipe(map((response) => response.data));
  }

  population(countryName: string): Observable<AxiosResponse<object>> {
    return this.httpService
      .get(`${process.env.API_V01}/countries/population`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .pipe(
        map((response) => {
          const countryData = response.data.data.find(
            (country) => country.country === countryName,
          );

          if (countryData) {
            return countryData;
          } else {
            console.log(`País com nome ${countryName} não encontrado`);
            throw new Error('País não encontrado');
          }
        }),
      );
  }

  flags(countryName: string): Observable<AxiosResponse<object>> {
    return this.httpService
      .get(`${process.env.API_V01}/countries/flag/images`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .pipe(
        map((response) => {
          const countryData = response.data.data.find(
            (country) => country.name === countryName,
          );

          if (countryData) {
            return countryData;
          } else {
            console.log(`País com nome ${countryName} não encontrado`);
            throw new Error('País não encontrado');
          }
        }),
      );
  }
}
