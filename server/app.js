const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParse = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const router = require('./router')
const app = express()

const resolve = file => path.resolve(__dirname, file)

app.use('/dist', express.static(resolve('../dist')))
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))
app.use(router)

// session
// app.set('trust proxy', 1) // trust first proxy

app.use(session({
  name: 'blog', // 设置 cookie 中保存 session id 的字段名称
  secret: 'blog', // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: 2592000000// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: 'mongodb://localhost:27017/blog' // mongodb 地址
  })
}))

app.get('*', function (req, res) {
  let html = fs.readFileSync(resolve('../public/' + 'index.html'), 'utf-8')
  res.send(html)
})

app.listen(3000, function () {
  console.log('访问地址为 localhost:3000')
})
