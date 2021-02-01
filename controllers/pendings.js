import pendings from '../models/pendings.js'
// import theaters from '../models/theaters.js'
// import mongoose from 'mongoose'

// 填寫表單新增一筆戲院資料，須提供姓名與信箱
export const addPendings = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    if (req.body.provider === 0) {
      res.status(400).send({ success: false, message: '提供者姓名必填' })
    } else if (req.body.email === 0) {
      res.status(400).send({ success: false, message: '提供者信箱必填' })
    } else {
      const result = await pendings.create({
        name: req.body.name,
        location: req.body.location,
        precision: req.body.precision,
        datestart: req.body.datestart,
        dateend: req.body.dateend,
        dateback: req.body.dateback,
        description: req.body.description,
        state: req.body.state,
        source: req.body.source,
        provider: req.body.provider,
        email: req.body.email
      })
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
      console.log(error)
    }
  }
}

// 不限權限，大家都可拿資料
export const getPendings = async (req, res) => {
  try {
    const result = await pendings.find()
    console.log(result)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 刪除待審核
export const deletePendings = async (req, res) => {
  try {
    const result = await pendings.findByIdAndDelete({ _id: req.params.pendings_id })
    console.log(result)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
