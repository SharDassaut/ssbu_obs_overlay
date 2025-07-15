const div = document.getElementById("match-data");
const match_data = div.querySelectorAll("input");
const btn = div.querySelector("button")

btn.addEventListener('click',async ()=>{
    let json = {}

    match_data.forEach((e)=> {
        if(e.value == "") return 
        json[e.id] = e.value
    })

    await postData(json);

})

// re-read and understand this piece of cde
async function postData(json) {
  const response = await fetch('http://localhost:6355/api-match-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(json)
  });

  const data = await response.json();
  console.log(data);
}