import theaters from '../models/theaters.js'
import pendings from '../models/pendings.js'

// 新增一筆戲院資料
export const create = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('appliacation/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    if (!req.body.provider.length) {
      res.status(400).send({ success: false, message: '提供者姓名必填' })
    } else if (!req.body.email.length) {
      res.status(400).send({ success: false, message: '提供者帳號信箱必填' })
    } else {
      await theaters.create({
        name: req.body.name,
        location: req.body.location,
        precision: req.body.precision,
        datestart: req.body.datesatrt,
        dateend: req.body.dateend,
        dateback: req.body.dateback,
        description: req.body.description,
        state: req.body.state,
        source: req.body.source,
        provider: req.body.provider,
        email: req.body.email
      })
      res.status(200).send({ success: true, message: '' })
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

// 找到 pendings 的 ID，丟到theaters裡
export const addPending = async (req, res) => {
  try {
    const result = await pendings.findById(req.params.pendings_id, '-_id')
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      await pendings.findByIdAndDelete(req.params.pendings_id)
      await theaters.create(
        {
          name: result.name,
          location: result.location,
          precision: result.precision,
          datestart: result.datestart,
          dateend: result.dateend,
          dateback: result.dateback,
          description: result.description,
          state: result.state,
          source: result.source
        }
      )
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

// 不限權限，大家都可拿資料
export const getAll = async (req, res) => {
  try {
    const result = await theaters.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 管理者權限
export const manager = async (req, res) => {
  if (req.session.manager === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (req.session.manager._id !== req.params.manager) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }

  try {
    const result = await theaters.find({ manager: req.params.manager })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 管理者編輯資料
export const edit = async (req, res) => {
  if (req.session.manager === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    let result = await theaters.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else if (result.manager !== req.session.manager._id) {
      res.status(403).send({ success: false, message: '沒有權限' })
    } else {
      result = await theaters.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 管理者刪除資料
export const deletee = async (req, res) => {
  try {
    const result = await theaters.findByIdAndDelete(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
