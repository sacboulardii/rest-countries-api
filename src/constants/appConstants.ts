/* Creating a type that can be used to check the state of the API. */
export enum ApiStatus {
  INIT,
  PENDING,
  SUCCESS,
  ERROR,
}

/* Creating query strings that will be used to get the fields that we want from the API. */

export const COUNTRY_CARD_FIELDS_QUERY =
  '?fields=name,flags,population,region,capital'

export const COUNTRY_DETAILS_FIELDS_QUERY =
  '?fields=name,flags,population,region,capital,subregion,languages,currencies,tld,borders'
