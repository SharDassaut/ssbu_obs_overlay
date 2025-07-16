const div = document.getElementById("match-data");
const match_data = div.querySelectorAll("input");
const btn = div.querySelector("button")

btn.addEventListener('click',async ()=>{
    let data = {}

    match_data.forEach((e)=> {
        if(e.value == "") return 
        data[e.id] = e.value
    })
    console.log(data)
    await postData(data);

})


async function postData(json) {
  const response = await fetch('http://localhost:6355/api-match-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(json)
  });
}