import React, {useState} from 'react';
import axios from 'axios'
function Gmail(props) {

    let GToken = localStorage.getItem('data')

    const [recipient, setrecipient] = useState("")
    const [subjectText, setsubjectText] = useState("")
    const [bodyText, setbodyText] = useState("")

    let emailRaw = btoa(                    //sorry the text is ugly here it cant have and tabs inside it
            `Subject: `+subjectText+`
To: `+recipient+`

`+bodyText)

    let sendEmail = () => {
        let key = 'Bearer ' + GToken

        const authAxios = axios.create({
            headers: {
                    Authorization: key
                }
            })

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

    return (
        <div>
            <button onClick={() =>sendEmail()}>Send email!</button>
            <div>
                <div><input type="text"
                 placeholder='Send To?'
                 onChange={(event) => {
                    setrecipient(event.target.value)}}></input></div>
                <div><input type="text"
                 placeholder='Subject Line?'
                 onChange={(event) => {
                    setsubjectText(event.target.value)}}></input></div>
                <div><input type="text"
                 placeholder='Body Text?'
                 onChange={(event) => {
                    setbodyText(event.target.value)}}></input></div>
            </div>
        </div>
    );
}

export default Gmail;