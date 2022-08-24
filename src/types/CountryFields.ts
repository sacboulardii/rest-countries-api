/* Defining the shape of the data that we are getting from the API. */

export interface CountryCardFields {
  flags: {
    png: string
    svg: string
  }
  name: {
    common: string
    nativeName: {
      [key: string]: {
        official?: string
        common: string
      }
    }
    official: string
  }
  population: number
  region: string
}

export interface DetailFields extends CountryCardFields {
  borders: string[]
  capital: string[]
  currencies: {
    [key: string]: {
      name: string
      symbol: string
    }
  }
  languages: {
    [key: string]: string
  }
  subregion: string
  tld: string[]
}
