console.log('DOM started');
const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.getElementById('message-one');
const messageTwo = document.getElementById('message-two')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location = searchInput.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

   fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = 'Error: '+ data.error
            messageTwo.textContent = ''
        }else{
          messageOne.textContent = 'Location: ' +(data.location)
        messageTwo.textContent = 'Forecast: '+ (data.forecast);  
        }
       
    })

})
})