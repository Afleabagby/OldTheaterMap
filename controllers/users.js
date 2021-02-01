import md5 from 'md5'
import '../models/theaters.js'
import users from '../models/users.js'
import mongoose from 'mongoose'

// 會員註冊
export const create = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    if (req.body.password.length < 4) {
      res.status(400).send({ success: false, message: '密碼必須四個字以上' })
    } else if (req.body.password.length > 20) {
      res.status(400).send({ sucess: false, message: '密碼必須二十個字以上' })
    } else {
      await users.create({
        name: req.body.name,
        account: req.body.account,
        password: md5(req.body.password)
      })
      res.status(200).send({ success: true, message: '' })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'MongoError' && error.code === 11000) {
      res.status(400).send({ success: false, message: '該信箱已使用' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 會員登入
export const login = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    const result = await users.findOne({
      account: req.body.account,
      password: md5(req.body.password)
    })
    console.log(result)
    if (result === null) {
      res.status(404).send({ success: false, message: '帳號或密碼錯誤' })
      console.log(result)
    } else {
      req.session.user = result
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 會員登出
export const logout = async (req, res) => {
  req.session.destroy(error => {
    if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    } else {
      res.clearCookie()
      res.status(200).send({ success: true, message: '' })
    }
  })
}

// 會員自己修改資料
export const editUserInfo = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    if (req.body.password) {
      req.body.password = md5(req.body.password)
    }
    const result = await users.findByIdAndUpdate(req.params.users_id, req.body, { new: true })
    if (result === null) {
      res.status(404).send({ success: false, message: '帳號或密碼錯誤' })
    } else {
      req.session.user = result
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 新增取消會員收藏
export const addCollection = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }
  try {
    // 是否使用者收藏裡有該筆收藏
    // 有的話，取消收藏
    const collect = await users.find({ _id: req.params.users_id, collections: { $elemMatch: { p_id: mongoose.Types.ObjectId(req.body.p_id) } } })
    if (collect.length > 0) {
      await users.findByIdAndUpdate(req.params.users_id,
        {
          $pull: {
            collections: {
              p_id: req.body.p_id
            }
          }
        }, { new: true }
      )
      res.status(200).send({ success: true, message: '' })
    } else {
      // 新增收藏
      await users.findByIdAndUpdate(req.params.users_id,
        {
          $push: {
            collections: {
              date: new Date(),
              p_id: req.body.p_id
            }
          }
        }, { new: true }
      )
      res.status(200).send({ success: true, message: '' })
    }
  } catch (error) {
    console.log(error)
  }
}

// 取得會員資料，管理者權限
export const getUsers = async (req, res) => {
  if (req.session.manager === undefined) {
    res.status(401).send({ success: false, message: '非管理登入' })
    return
  }
  // .populate('collections.p_id')
  try {
    const result = await users.find({}, '-password')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 取得會員收藏資料
export const getUserCollection = async (req, res) => {
  try {
    const result = await users.find({ _id: req.params.users_id }).populate('collections.p_id')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 刪除會員收藏資料
export const deleteUserCollection = async (req, res) => {
  try {
    // 刪除收藏
    const reuslt = await users.findByIdAndUpdate(req.params.users_id,
      {
        $pullAll: {
          collections: {
            p_id: req.body.p_id
          }
        }
      }, { new: true }
    )
    console.log(reuslt)
    res.status(200).send({ success: true, message: '' })
    // const result = await users.findByIdAndDelete({ _id: req.params.users_id }).populate('collections.p_id')
    // console.log(result)
    // res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 修改會員，管理者權限
export const editUser = async (req, res) => {
  if (req.session.manager === undefined) {
    res.status(401).send({ success: false, message: '非管理登入' })
    return
  }

  try {
    const result = await users.findByIdAndUpdate(req.params.users_id, 'account', { new: true })
    if (result === null) {
      res.status(404).send({ success: false, message: '帳號或密碼錯誤' })
    } else {
      req.session.user = result
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
// 刪除會員，管理者權限
export const deleteUser = async (req, res) => {
  if (req.session.manager === undefined) {
    res.status(401).send({ success: false, message: '非管理登入' })
    return
  }
  try {
    let result = await users.findById(req.params.users_id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      result = await users.findByIdAndDelete(req.params.users_id)
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const heartbeat = async (req, res) => {
  let isLogin = false
  if (req.session.user !== undefined) {
    isLogin = true
  }
  res.status(200).send(isLogin)
}
