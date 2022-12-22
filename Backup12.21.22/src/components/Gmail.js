import React, {useState} from 'react';
import axios from 'axios'
function Gmail(props) {

    let GToken = sessionStorage.getItem('GToken')

    const [recipient, setrecipient] = useState("")
    const [subjectText, setsubjectText] = useState("")
    const [bodyText, setbodyText] = useState("")

    //setting the text of the email which contains variables
    let emailRaw = btoa(                    //sorry the text is ugly here it cant have and tabs inside it
            `Subject: `+subjectText+`
To: `+recipient+`

`+bodyText)

    //creating authAxios variable to include google authorization token
    let sendEmail = () => {
        let key = 'Bearer ' + GToken

        const authAxios = axios.create({
            headers: {
                    Authorization: key
                }
            })

        //sending the email using axios post request
        authAxios.post('https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
        {
            "raw": emailRaw
          })
        .then(response => {
            //console.log(response)
            alert("Email Sent!")
        })
        .catch(error => {
            console.log(error)
            alert("Error Sending Email")
        })
    }

    //getting the variables for the email using user input
    return (
        <div>
            <button onClick={() =>sendEmail()}>Send email!</button>
            <div>
                <div><textarea rows="4" cols="50"
                 placeholder='Send To?'
                 onChange={(event) => {
                    setrecipient(event.target.value)}}></textarea></div>
                <div><input type="text"
                 placeholder='Subject Line?'
                 onChange={(event) => {
                    setsubjectText(event.target.value)}}></input></div>
                <div><textarea rows="15" cols="50"
                 placeholder='Body Text?'
                 onChange={(event) => {
                    setbodyText(event.target.value)}}></textarea></div>
            </div>
        </div>
    );
}

export default Gmail;