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

// /**
//  * It takes a request object and an array of objects, and returns an array of objects with only the
//  * fields specified in the request
//  * @param {any} request - the request object
//  * @param {object[]} data - the data you want to filter
//  */
function filterByFieldsParams(request: any, data: object[]) {
  const fields = request.queryParams.fields?.split(',')
  // EGAEGAEGGUFA
  return fields ? 
  data.map(obj => filterObjectProps(obj, fields)) :
  data
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

      this.get('/all', (schema) => {
        return schema.db.countries
      })
      

      this.get('/region/:region', (schema, request: any) => {
        const region = request.params.region

        const filteredCountries = filterByFieldsParams(request, schema.db.countries) 
        const shouldFilterByRegion = region !== 'All'
        console.log(filteredCountries)
        return shouldFilterByRegion ?
        filteredCountries.filter((country: any) => country.region === region) :
        filteredCountries 
      })

      this.get('/name/:name', (schema, request) => {
        return schema.db.countries.where({
          name: { common: request.params.name },
        })
      })

      this.get('/alpha', (schema, request: any) => {
        const codes = request.queryParams.codes.split(',')

        return schema.db.countries.filter((country) =>
          codes.includes(country.cioc)
        )
      })
    },
  })

  return server
}
