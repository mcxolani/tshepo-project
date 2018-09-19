const crypto = require('crypto')
const request = require('request')
const express = require('express')

const app = express()
const port = 3000

const base_url = 'https://gateway.marvel.com:443/v1/public/characters'

const private_key = '75267cef37ff26d9677b067cecfaac67ad54f649'
const public_key = '3187ef773dc8ab9f494de9798eec872d'

const ts = new Date().getTime()
const hash = crypto.createHash('md5').update(ts+private_key+public_key).digest("hex")

const url = `${base_url}?apikey=${public_key}&hash=${hash}&ts=${ts}`

app.get('/', (req, res) => {
    request(url, null, (error, response, body) => {
        if (error) {
            res.json({})
        }
        res.json(JSON.parse(body))
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
