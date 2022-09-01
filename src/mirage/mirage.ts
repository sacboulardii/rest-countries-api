// src/server.js
import { createServer, Model } from 'miragejs'
import countriesJson from '@/mirage/database/countries.json'

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

      this.get('/region/:region', (schema, request) => {
        const region = request.params.region
        return region === 'All'
          ? schema.db.countries
          : schema.db.countries.where({ region: request.params.region })
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
