const socket = io()

let user

Swal.fire ({
    title: 'Identificate',
    input:'text',
    text: 'Ingresa Usuario para ingresar al chat',
    inputValidator: value => {
        return !value && 'Necesitas ingresar el nombre usuario para continuar'
    },
    allowOutsideClick:false
}).then(result =>{
    user=result.value
    console.log(user)
})

const chatbox = document.querySelector('#chatbox')
chatbox.addEventListener('keyup', (eve)=>{
    if(eve.key==='Enter'){
        chatbox.value
    }
})