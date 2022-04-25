const fallback = require('express-history-api-fallback')
const express = require('express')
const { join } = require('path')
const helmet = require("helmet");

const app = express()
const root = join(__dirname, 'dist')
app.use(express.static(root))
app.use(fallback('index.html', { root }))
app.use(helmet())
app.listen(process.env.PORT || 3000)