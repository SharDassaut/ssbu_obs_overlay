const evtSource = new EventSource("//localhost:6355/event",{})

function remplace_data(data){
    for(const x in data){
            const e = document.getElementById(x)
            
            if(e !== null){ 
                e.classList.remove('fade-out', 'fade-in')
                void e.offsetWidth;
                e.classList.add('fade-out')
                
                e.addEventListener('animationend',()=>{
                    e.classList.remove('fade-out')
                    e.innerText = data[x]
                    void e.offsetWidth;
                    e.classList.add('fade-in');
            })
        }
    }
}

window.addEventListener('load', () => {
    fetch("/api-match-data",)
    .then(data => data.json()
        .then( data => {
            console.log(JSON.parse(data))
            remplace_data(JSON.parse(data))
        })
    )
    .catch(error =>{

    })
})

evtSource.onmessage = (event) =>{
    const data = JSON.parse(event.data)
    remplace_data(data)
}
    




