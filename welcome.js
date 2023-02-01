import{databaseUrl } from './firebase.js'
$(document).ready(()=>{
    const token = localStorage.getItem('token')
    if(token){
        // const cardData = JSON.parse(localStorage.getItem('welcome'))
        let name = localStorage.getItem('name')
        let dob = localStorage.getItem('dob')
        console.log("dob=",dob)
        $($('p')[0]).text('Hello, ' + name).css("color", "red")
        $($('p')[1]).text('Your Birthdate is ' + dob)
        let text = dob;
        const myArray = text.split("-");
        let word1 = myArray[0];
        let monthB = myArray[1];
        let dayB =myArray[2];

        console.log(monthB);
        console.log(dayB)
        let today = new Date().toLocaleDateString()

        console.log(today)
        const myArray1 = today.split("/");
        let monthC = myArray1[1];
        let dayC=myArray1[0];
        console.log(monthC);
        console.log(dayC)


        if (monthC == monthB && dayC == dayB){

            //alert("i am")
            $($('p')[2]).text('Happy Birthday').css('color','red')

            const getQutoes = async (url)=>{
                try{
                    const response = await fetch(url, {cache: 'no-cache'});
                    if (response.ok){
                        const jsonResponse = await response.json();
                        return(jsonResponse);
                    }
                }
                catch(error){
                    console.log(error);
                }
            }
            
            function displayQuotes(quotes){
               
                const randomNum = Math.floor(Math.random() * (quotes.length-1));
                $($('p')[3]).text(quotes[randomNum].text)
               $($('p')[4]).text(quotes[randomNum].author)

            }
            
            getQutoes('https://type.fit/api/quotes')
            .then((response)=>{
                console.log(response)
                displayQuotes(response)
            });



            let $music = $(`<audio src="birthday.mp3" controls >	
            <embed 
                src="./birthday.mp3"
                autostart="true">
        </audio>`)
        //let $music = $(`<audio autoplay > <source src="birthday.mp3" type="audio/mpeg"></audio>`)
                $('#app').append($music)

        }else{



    function daysCal(month, day) {

            var check = new Date()
            console.log("check",check)
              var fullyear = check.getFullYear()
              console.log("fullyear",fullyear)

               var next = new Date(fullyear, month-1, day);
              console.log("next",next)

              check.setHours(0, 0, 0, 0);
              console.log("check",check)

            if (check > next) next.setFullYear(fullyear + 1);
          console.log("next",next)
            return Math.round((next - check) / (1000*60*60*24));
          }
          //8.64e7= 1000*60*60*24


     




          var showdays = daysCal(monthB, dayB);
          console.log(showdays)
          let daystogo = $(`<p>Days to go for your Birthday Celebration</p>`)

          if (showdays != 0){
          $($('p')[2]).text(showdays).append(daystogo)

        }

            

        }


    }

    $($('button')[0]).on('click', ()=>{
        localStorage.removeItem('token')
        window.location.href="index.html"
  
    })
  
})