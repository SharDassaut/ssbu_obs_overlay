const div = document.getElementById("match-data");
const match_data = div.querySelectorAll("input");
const chr_img = div.querySelectorAll("select")
const btn = div.querySelector("button")

btn.addEventListener('click',async ()=>{
    let data = {}

    match_data.forEach((e)=> {
        if(e.value == "") return 
        data[e.id] = e.value
    })

    chr_img.forEach((e)=>{
      data[e.id] = e.value
    })
    console.log(data)
    await postData(data);

})



async function postData(json) {
  const response = await fetch('/api-match-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(json)
  });
}