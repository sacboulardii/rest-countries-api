/* Creating a type that can be used to check the state of the API. */
export enum ApiState {
  INIT,
  PENDING,
  SUCCESS,
  ERROR,
}

export enum Region {
  All = 'All',
  Africa = 'Africa',
  Asia = 'Asia',
  Americas = 'Americas',
  Europe = 'Europe',
  Antarctic = 'Antarctic',
  Oceania = 'Oceania',
}
