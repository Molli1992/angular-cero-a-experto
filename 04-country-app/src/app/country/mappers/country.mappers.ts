import { Country } from '../interfaces/country.interfaces';
import { RESTCountry, RESTCountryObject } from '../interfaces/rest-countries.interfaces';

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountryObject): Country {
    return {
      code: restCountry.codes.alpha_3,
      emoji: restCountry.flag.emoji,
      flagSvg: restCountry.flag.url_svg,
      name: restCountry.names.common,
      capital: restCountry.capitals[0]?.name ?? '',
      population: restCountry.population,
      region: restCountry.region,
      subregion: restCountry.subregion,
    };
  }

  static mapRestCountriesToCountries(restCountries: RESTCountry): Country[] {
    return restCountries.data.objects.map(CountryMapper.mapRestCountryToCountry);
  }
}
