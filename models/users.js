import mongoose from 'mongoose'

const Schema = mongoose.Schema

// 會員收藏
const theaterCollectionSchema = new Schema({
  saveDate: {
    type: Date
  },
  p_id: {
    type: mongoose.ObjectId,
    ref: 'theaters'
  }
})

// 會員
const userSchema = new Schema({
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
  },
  collections: {
    type: [theaterCollectionSchema]
  }
},
{
  versionKey: false
})

const users = mongoose.model('users', userSchema)

export default users
