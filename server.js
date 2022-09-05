const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static("express"));

app.get('/*', function(req,res){
    console.log(req.path)
    if (req.path != undefined && req.path != '/' && req.path.toLowerCase().indexOf("assets") === -1){
        // IF webpage, find webpage
        try {
            res.sendFile(path.join(__dirname+`/pages/${req.path}.html`))
        } catch (error) {
            res.sendStatus(404)
            console.log('Error! Page Not Found')
        }

    } else if (req.path.toLowerCase().indexOf("assets") !== -1) { 
        // IF asset, send asset file
        res.sendFile(path.join(__dirname+`/${req.path}`))

    } else {
        // ELSE, send index page
        res.sendFile(path.join(__dirname+'/pages/index.html'))
    }
});

const server = http.createServer(app);
const port = 80;
server.listen(port);
console.debug('Server listening on port ' + port);