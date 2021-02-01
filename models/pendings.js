import mongoose from 'mongoose'

const Schema = mongoose.Schema

// const providerSchema = new Schema({
//   name: {
//     type: String,
//     required: [true, '缺少提供者姓名']
//   },
//   email: {
//     type: String,
//     required: [true, '缺少提供者電子信箱']
//   }
// })

const pendingSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '缺少戲院名稱']
    },
    location: {
      type: String,
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
      type: String
    },
    provider: {
      type: String,
      required: [true, '缺少提供者姓名']
    },
    email: {
      type: String,
      required: [true, '缺少提供者電子信箱']
    }
  }
)

const pendings = mongoose.model('pendings', pendingSchema)

export default pendings
