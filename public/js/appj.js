
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// we use fetch ()function to fetch APi data at the client side JS file
// fetch is a function and we pass to it a string(this is a url we fetch from)
// fech('http://puzzle.mead.io/puzle') now calling fetch will trigger an async operation like request in node js, that means we dont have access to data right away, but we provide a function thet will get data once available
// with fetch we use the then()method on the return value and and we provide the call function to it and we get access to response as only argument and here we use response to do what we want to do like extract data and render it to browser
// so fetch the data and then run the function
// 


// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
// response.json().then((data)=>{  //this function is gonna run when jason data arrive and now we have access to js data as only one argument passed in and now we can use the data

// }
// }



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


  weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
messageOne.textContent = 'loading..... '
messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error
        } else {
        
          messageOne.textContent = data.location 
          messageTwo.textContent = data.forcastData
        }
      })
    })


  })