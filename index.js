import {apiKey, databaseUrl} from './firebase.js'
const signinUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
$(document).ready(()=>{
    $('button').on('click',(e)=>{
        e.preventDefault()

        $('#login-email').removeClass('warning')
        $('#login-email').siblings('p').css('display', 'none')
        $('#login-password').removeClass('warning')
        $('#login-password').siblings('p').css('display', 'none')

        const email = $('#login-email').val()
        const password = $('#login-password').val()
       

        let reEmail = /[a-z]+@[a-z]+\.[a-z]+/
        let rePassword = /[a-zA-Z0-9]{6,20}/
        if(!reEmail.test(email)){
            $('#login-email').addClass('warning')
            $('#login-email').siblings('p').css('display', 'block')
            console.log('email should be in correct format!')
        }else if(!rePassword.test(password)){
            $('#login-password').addClass('warning')
            $('#login-password').siblings('p').css('display', 'block')
            console.log('password should be in correct format!')
        }else{
          

            const url = signinUrl + apiKey
            fetch(url,{
                method:'POST',
                body: JSON.stringify({email:email,password:password,returnSecureToken:true})
            })
            .then(res=>{
                return res.json()
            })
            .then(response=>{
                const userKey = response.localId
                const token = response.idToken
                const url = databaseUrl+'/Users/'+userKey+'/.json?auth='+ token

                fetch(url)
                .then(response=>{
                    return response.json()
                })
                .then(response=>{
                    console.log(response)

                    localStorage.setItem('token', token)
                    localStorage.setItem('name', response.FirstName)
                    localStorage.setItem('dob',response.DOB)
                    window.location.href="welcome.html"
                })
            })
           
            
        }
    })
})