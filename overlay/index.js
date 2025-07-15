fetch('http://localhost:6355/api-match-data')
.then((res)=>{
    res.json()
    .then(data =>{
        console.log(data)
        for(const x in data){
            const e = document.getElementById(x)
            e.innerText = data[x]
        }
    })
    
})
.catch((err)=>{
    console.log(err)
})
    




