var express = require('express');
var path = require('path');
var app = express();

const http = require('http');
const fs = require('fs');
const { mainModule } = require('process');
const port = 80;

app.use(express.static(__dirname + 'public'));

const server = http.createServer(function(req, res) {
    home(req, res);
    css(req,res);
})

function home(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html' } );
    fs.readFile('public/index.html', function(error, data) {
        if (error) {
            res.writeHead(404);
            res.write('Error: File not found!');
            res.end();
        } else {
            res.write(data);
            res.end();
        }
        
    })
}

function css(req, res) {
    if (req.url === '/css/styles.css') {
        res.writeHead(200, {'Content-Type': 'text/css' } );
        var cssdata = fs.readFileSync('public/css/styles.css');
        res.write(cssdata);
    }
}

server.listen(port, function(error) {
    if (error)  console.log('Something went wrong!\n', error);
    else console.log('Server is now running on', port);
})