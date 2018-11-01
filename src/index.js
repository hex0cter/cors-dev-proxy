
const express = require('express')
const app = express()
const axios = require('axios')
const { URL } = require('url')

const port = 4000

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, klarna-correlation-id");
  next();
});

app.all('/*', async (req, res, next) => {
  console.log('===================================================')
  console.log('request url', req.url)

  const destinationUrl = req.url.slice(1)
  const requestMethod = req.method
  console.log(`${requestMethod} ${destinationUrl}`)

  const url = new URL(destinationUrl)
  console.log('destination host', url.hostname)

  try {
    const verifyResponse = await axios({
      method: requestMethod,
      url: destinationUrl,
      headers: {...req.headers, 'HOST': url.hostname },
      data: { token: req.query.token }
    })

    res.send(verifyResponse.data)
  } catch (err) {
    console.log('error', err.message)
    res.sendStatus(err.response.status)
    res.send(err.message)
  }
  next()
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
