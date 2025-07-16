const fs = require('node:fs/promises')
const express = require('express')

const app = express()
let clients = []

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

app.get('/event', (req, res) => {
    res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    
    const clientId = Date.now();
    const client = { id: clientId, res };
    clients.push(client);

    req.on('close', () => {
        clients = clients.filter(c => c.id !== clientId);
    });
});

app.get('/api-match-data',(req, res)=>{
    res.json(JSON.stringify(match_data))
})

app.post('/api-match-data', (req, res)=>{
    match_data = req.body
    
    // put logic to search a the img in img folder a then move it to static
    // file and rename it (fs + path)
    clients.forEach( x =>{
        x.res.write(`data: ${JSON.stringify(match_data)}\n\n`)
    })
    

    console.log("Sent match data to overlay:", match_data);
    res.end();

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