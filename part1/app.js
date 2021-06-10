let favNum = 20;
let url = "http://numbersapi.com";

// 1- 

$.getJSON(`${url}/${favNum}?json`).then(data => {
    console.log(data)
})

/**************** axios is sllower than getJSON ********
axios.get(`${url}/${favNum}?json`)
    .then(res => {
        console.log(res.data)
    })*/


// 2
let favNumbers = [10, 11, 4, 27];

$.getJSON(`${url}/${favNumbers}?json`)
    .then(data => console.log(data))
    

//3
Promise.all(
    Array.from({ length: 4 }, () => {
        return $.getJSON(`${url}/${favNum}?json`);
    })
).then(facts => {    
     facts.forEach(data => $("body").append(`<p>${data.text}</p>`))  
   
});

/*
//3 also random number
Promise.all(
    Array.from({ length: 4 }, () => {
        return $.getJSON(`${url}/random?json`);
    })
).then(facts => {
    facts.forEach(data => $("body").append(`<p>${data.text}</p>`))
});*/