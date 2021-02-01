import express from 'express'
import { create, login, logout, heartbeat, editUserInfo, addCollection, getUsers, getUserCollection, deleteUserCollection, editUser, deleteUser } from '../controllers/users.js'

const router = express.Router()

// 註冊/登入/登出，最終路徑是 /users
router.post('/', create)
router.post('/login', login)
router.delete('/logout', logout)
// 取得單一會員資料
// router.get('/:users_id', getThisUser)
// 取得會員資料，管理者權限
router.get('/manager/:manager_id', getUsers)
// 修改會員帳號，管理者權限
router.patch('/manager/:users_id/edit', editUser)
// 刪除會員，管理者權限
router.delete('/manager/:users_id/delete', deleteUser)

// 會員自己修改會員資料
router.patch('/:users_id', editUserInfo)
// 會員收藏，收藏&取消
router.patch('/:users_id/collection', addCollection)
// 取得會員收藏資料
router.get('/:users_id/collection', getUserCollection)
// 刪除會員收藏資料
router.patch('/:users_id/collection', deleteUserCollection)
router.get('/heartbeat', heartbeat)

export default router
