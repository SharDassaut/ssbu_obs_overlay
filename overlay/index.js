const evtSource = new EventSource("//localhost:6355/event",{
})

evtSource.onmessage = (event) =>{
    const data = JSON.parse(event.data)
    for(const x in data){
            const e = document.getElementById(x)
            if(e) e.innerText = data[x]
        }
}
    




