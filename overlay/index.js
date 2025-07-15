const evtSource = new EventSource("//localhost:6355/event",{
})

evtSource.onmessage = (event) =>{
    const data = JSON.parse(event.data)
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
    




