import React, {useState, useEffect} from 'react';
import axios from 'axios'


function EventScheduler(props) {

    let GToken = sessionStorage.getItem('GToken')
    let calendar_id = localStorage.getItem('calendar_id')
    const [start, setstart] = useState("")
    const [end, setend] = useState("")
    const [title, settitle] = useState("")
    const [location, setlocation] = useState("")
    const [description, setdescription] = useState("")

    let schedulePost = () => {
        let key = 'Bearer ' + GToken

        //sets the timezone varaible to be the timezone that the users computer has (in proper format)
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

        //setting authAxios to be a request containting the google authorization token as a header
        const authAxios = axios.create({
            headers: {
                    Authorization: key
                    }
          })

          //posting the event to the users calendar containing all of the event information that is collected in the different input variables
            authAxios.post('https://www.googleapis.com/calendar/v3/calendars/'+calendar_id+'/events',
            {
                'summary': title,
                'location': location,
                'description': description,
                "end": {
                  'dateTime': end+':00',
                  'timeZone': timezone,
                },
                "start": {
                  'dateTime': start+':00',
                  'timeZone': timezone,
                }
              })
            .then(response => {
                //console.log(response)
                alert("Event Scheduled!")
            })
            .catch(error => {
              alert("Error Scheduling Event")
              console.log(error)
        })
    }

    //return function containing all of the various inputs that will show up to get event info
    return (
        <div>
                <div>
                  <input type='text' placeholder='title'
                   onChange={(event) => {
                    settitle(event.target.value)}}></input>
                </div>
                <div>
                  <input type='text' placeholder='location'
                   onChange={(event) => {
                    setlocation(event.target.value)}}></input>
                </div>
                <div>
                  <textarea placeholder='description' rows="4" cols="50"
                   onChange={(event) => {
                    setdescription(event.target.value)}}></textarea>
                </div>
            <div>
                <input type="datetime-local"
                 onChange={(event) => {
                    setstart(event.target.value)}}></input>
                    <input type="datetime-local"
                 onChange={(event) => {
                    setend(event.target.value)}}></input>
            </div>
            <button onClick={() =>schedulePost()}>Schedule Event</button>
        </div>
    );
}

export default EventScheduler;