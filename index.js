const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO.listen(server)

app.use(express.static(__dirname + '/public'))


server.listen(3000, function () {
    console.log('Server listening on port', 3000)
})

// SERIAL COMM
const Serialport = require('serialport')
const port = new Serialport('COM12', {
    baudRate: 9600
})

const readLine = Serialport.parsers.Readline

const parser = port.pipe(new readLine({ delimiter: 'Size: 18'}))

parser.on('open', function (data) {
    console.log('connection is opened')
})

parser.on('data', function (data) {
    const mystring = data.toString()
    const lat = parseFloat(mystring.slice(34, 48))
    const lng = parseFloat(mystring.slice(56, 70))
    io.emit('data', {
        lat: lat,
        lng: lng
    })
})