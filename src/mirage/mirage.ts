// src/server.js
import { createServer, Model } from 'miragejs'
import countriesJson from '@/mirage/database/countries.json'

/**
 * It takes an object and an array of allowed keys, and returns a new object with only the allowed keys
 * @param {object} dataObj - The object you want to filter
 * @param {string[]} allowedFields - An array of strings that represent the keys of the object that you
 * want to keep.
 * @returns An object with only the keys that are in the allowedFields array.
 */
function filterObjectProps(dataObj: object, allowedFields: string[]): object {
  const filteredObj = Object.keys(dataObj)
    .filter((key) => allowedFields.includes(key))
    .reduce((obj, key) => {
      type K = keyof typeof obj
      obj[key as K] = dataObj[key as K]
      return obj
    }, {})

  return filteredObj
}

/**
 * It takes a request object and an array of objects, and returns the array of objects with only the
 * properties specified in the request's fields query parameter
 * @param {any} request - any - the request object
 * @param {object[]} data - object[] - the data to be filtered
 */
function filterByRequiredFields(request: any, data: object[]) {
  const fieldsParams = request.queryParams.fields?.split(',')

  return fieldsParams
    ? data.map((obj) => filterObjectProps(obj, fieldsParams))
    : data
}

export function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    models: {
      country: Model,
    },

    seeds(server) {
      server.db.loadData({
        countries: countriesJson,
      })
    },

    routes() {
      this.namespace = 'api'

      this.get('/all', (schema, request) => {
        return filterByRequiredFields(request, schema.db.countries)
      })

      this.get('/region/:region', (schema, request: any) => {
        const countriesFilteredByRegion = schema.db.countries.where({
          region: request.params.region,
        })

        if (!countriesFilteredByRegion.length) throw 'Error'

        return filterByRequiredFields(request, countriesFilteredByRegion)
      })

      this.get('/name/:name', (schema, request) => {
        const countries: object[] = [...schema.db.countries]
        const name: string = request.params.name

        const countriesFilteredByName: any = countries.filter(
          (country: any): boolean => {
            const countryNameLower: string = country.name.common.toLowerCase()
            const requestParamNameLower: string = name.toLowerCase()
            return countryNameLower.startsWith(requestParamNameLower)
          }
        )

        if (!countriesFilteredByName.length) throw 'Error'

        return filterByRequiredFields(request, countriesFilteredByName)
      })

      this.get('/alpha', (schema, request: any) => {
        const codes = request.queryParams.codes.split(',')

        const borderCountries: any = schema.db.countries.filter((country) =>
          codes.includes(country.cioc)
        )

        if (!borderCountries.length) throw 'Error'
        console.log(borderCountries)

        return borderCountries
      })
    },
  })

  return server
}
