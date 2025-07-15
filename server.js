const fs = require('node:fs/promises')
const express = require('express')

const app = express()

app.disable('x-powered-by')

const PORT = process.argv[2] ?? 6355
let match_data = null

//// MIDDLEWARE ////

app.use(express.json());
app.use(express.static('overlay'))
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

///////////////BASE API //////////////////

app.get('/api-match-data', (req, res)=>{
    if(match_data == null){
        res.status(500)
        res.end("")
    }
    res.json(match_data)
})

app.post('/api-match-data', (req, res)=>{
    match_data = req.body
    
    // put logic to search a the img in img folder a then move it to static
    // file and rename it (fs + path)

    console.log(match_data)
})

///////////////////WEB SERVER///////////////////

app.get('/dr.png', (req,res)=>{
     fs.readFile('img/dr.png').then((file) =>{
            res.end(file)
            }
        )
})

app.get('/iz.png', (req,res)=>{
     fs.readFile('img/iz.png').then((file) =>{
            res.end(file)
            }
        )
})

app.use((req,res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(PORT, () =>{
    console.log('Petición')
})