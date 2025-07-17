const fs = require('node:fs/promises')
const path = require("node:path")
const express = require('express')

const app = express()
let clients = []

app.disable('x-powered-by')

const PORT = process.argv[2] ?? 6355
let match_data = {}

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

app.use(/\.png$/,(req, res ,next)=>{
    res.header('Cache-Control','no-store')
    next()
})

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

app.post('/api-match-data', async (req, res)=>{
    let data = req.body
    const fileCopyPromises = []

    for(const x in data){
        if(match_data[x] == data[x]){ 
            delete data[x]
            continue
        }
        match_data[x] = data[x]
        if(x != "limg" && x != "rimg" ) continue
        let nme = data[x] +".png"
        const oldpath = path.resolve('chr_pp',nme)
        const newpath = path.resolve('img',x+'.png')
        fileCopyPromises.push(fs.copyFile(oldpath, newpath));
    }
    
    try{
        await Promise.all(fileCopyPromises);
    }
    catch(err){
         res.status(500).json({ error: "File copy failed", details: err.message})
    }

    clients.forEach( x =>{
        x.res.write(`data: ${JSON.stringify(data)}\n\n`)
    })
    console.log("Sent match data to overlay:", data);
    res.end();

})

///////////////////WEB SERVER///////////////////

app.get('panel', (req,res)=>{
    fs.readFile('overlay/panel.html').then((file) =>{
            res.end(file)
        })
})

app.get('/rimg.png', (req,res)=>{
    fs.readFile('img/rimg.png').then((file) =>{
            res.set("Content-Type","text/html")
            res.end(file)
        })
})

app.get('/limg.png', (req,res)=>{
     fs.readFile('img/limg.png').then((file) =>{
            res.end(file)
    })
})

app.use((req,res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(PORT, () =>{
    console.log('Petición')
})