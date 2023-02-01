import {apiKey, databaseUrl} from './firebase.js'
const singupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
$(document).ready(()=>{
    $('button').on('click',(e)=>{
        e.preventDefault()

        if($('p').length){
            $('p').each(function(){
                $(this).remove()
            })
        }
        
        const email = $($('.form-control')[0]).val()
        const password = $($('.form-control')[1]).val()
        const firstName = $($('.form-control')[2]).val()
        const dob = $($('.form-control')[3]).val()

        //console.log(date)

      
            const userData = {Email: email, Password: password, 
                FirstName: firstName, DOB:dob, 
                }
            const url = singupUrl + apiKey
            fetch(url,{
                method:'POST',
                body: JSON.stringify({email:email,password:password,returnSecureToken:true})
            })
            .then(res=>{
                return res.json()
            })
            .then(response=>{
                console.log(response)
                const userKey = response.localId
                const token = response.idToken
                const dataUrl = databaseUrl+'/Users/'+userKey+'/.json?auth='+ token
                fetch(dataUrl,{
                    method: 'PUT',
                    body: JSON.stringify(userData)
                })
                .then(response=>{
                    return response.json()
                })
                .then(response=>{
                    
                    // localStorage.setItem('token', token)
                    // localStorage.setItem('name','dob', response.FirstName,response.DOB)
                    const data = {name:response.FirstName, dob:response.DOB}

        //console.log(data)
            localStorage.setItem('welocome', JSON.stringify(data))
                    //$('p').css('display', 'block')
                        window.location.href="index.html"
                        alert("Successfuly Registered, Please Login Now")

                })
            })
        //}
    })
})