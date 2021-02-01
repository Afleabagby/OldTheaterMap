import mongoose from 'mongoose'

const Schema = mongoose.Schema

// const providerSchema = new Schema({
//   name: {
//     type: String
//   },
//   email: {
//     type: String
//   }
// })

const theaterSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '缺少戲院名稱']
    },
    location: {
      type: [String],
      required: [true, '缺少所在地名稱']
    },
    precision: {
      type: String
    },
    datestart: {
      type: String
    },
    dateend: {
      type: String
    },
    dateback: {
      type: String
    },
    description: {
      type: String
    },
    state: {
      type: String,
      required: [true, '缺少現況描述']
    },
    source: {
      type: [String]
    },
    provider: {
      type: String
    },
    email: {
      type: String
    }
  }
)

const theaters = mongoose.model('theaters', theaterSchema)

export default theaters
