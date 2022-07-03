import React, {useState, useEffect} from 'react';
import axios from 'axios'


function EventScheduler(props) {

    let GToken = localStorage.getItem('data')
    let calendar_id = localStorage.getItem('calendar_id')
    const [start, setstart] = useState("")
    const [end, setend] = useState("")
    const [title, settitle] = useState("")
    const [location, setlocation] = useState("")
    const [description, setdescription] = useState("")


    let schedulePost = () => {
        let key = 'Bearer ' + GToken

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

        const authAxios = axios.create({
            headers: {
                    Authorization: key
                    }
          })

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
                alert("Post Scheduled!")
            })
            .catch(error => {
              console.log(calendar_id)
              alert("Error Scheduling Post")
              console.log(error)
        })
    }

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
                  <textarea placeholder='description'
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