export class Country {
  'countryCode': string;
  'name': string;
}

export class CountryInfo {
  'commonName': string;
  'officialName': string;
  'countryCode': string;
  'region': string;
  'borders': [CountryInfo];
}
