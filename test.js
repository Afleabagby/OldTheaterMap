import util from 'util'
import dotenv from 'dotenv'
import data from './searchresult2.js'
import mongoose from 'mongoose'
import theaters from './models/theaters.js'

dotenv.config()
mongoose.connect(process.env.DBURL)

for (const d of data) {
  theaters.create(
    {
      name: d.name,
      location: d.detail.location,
      precision: d.detail.precision,
      datestart: d.detail.datestart,
      dateend: d.detail.dateend,
      dateback: d.detail.dateback,
      description: d.detail.description,
      state: d.detail.state,
      source: d.detail.source
    }
  ).then(result => {
    console.log(util.inspect(result, { showHidden: true, depth: null }))
  }).catch(error => {
    console.log(error)
  })
}
