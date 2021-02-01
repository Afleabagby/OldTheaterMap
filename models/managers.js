import mongoose from 'mongoose'

const Schema = mongoose.Schema

const managerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '姓名必填']
    },
    account: {
      type: String,
      lowercase: [true, '請輸入小寫英文字母'],
      unique: true,
      required: [true, '信箱必填']
    },
    password: {
      type: String,
      required: [true, '密碼必填']
    }
  },
  {
    versionKey: false
  }
)

const managers = mongoose.model('managers', managerSchema)

export default managers
