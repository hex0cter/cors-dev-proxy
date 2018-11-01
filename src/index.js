
const express = require('express')
const app = express()
const fetch = require('node-fetch')
const { URL } = require('url')
const urlUtils = require('./utils/url')

const port = 4000

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

app.all('/*', async (req, res, next) => {
  console.log('===================================================')
  console.log('request url', req.url)

  const destinationUrl = req.url.slice(1)
  const requestMethod = req.method
  console.log(`${requestMethod} ${destinationUrl}`)

  if (!urlUtils.isUrl(destinationUrl)) {
    console.log(`${destinationUrl} is not a valid url`)
    next()
    return
  }

  const url = new URL(destinationUrl)
  console.log('host', url.hostname)

  const headers = { ...req.headers, host: url.hostname }
  console.log('headers', headers)

  const response = await fetch(destinationUrl, {
    method: requestMethod,
    headers: headers
  })
  const body = await response.text()
  console.log('return text', body)

  res.send(body)

  next()
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
