import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Gmail from './Gmail';

function FbSchedule(props) {

    let GToken = localStorage.getItem('data')
    let calendar_id = props.calendar_id
    const [start, setstart] = useState("")
    const [end, setend] = useState("")


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
                'summary': 'facebook post scheduled',
                "end": {
                  'dateTime': start+':30',
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
              alert("Error Scheduling Post")
              console.log(error)
        })
    }

    return (
        <div id='Fb_scheduler'>
            <button onClick={() =>schedulePost()}>Schedule Fb Post</button>
            <div>
                <input type="datetime-local"
                 onChange={(event) => {
                    setstart(event.target.value)}}></input>
            </div>
            <div><Gmail></Gmail></div>
        </div>
    );
}

export default FbSchedule;