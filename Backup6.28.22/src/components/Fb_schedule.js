import React, {useState, useEffect} from 'react';
import axios from 'axios'

function FbSchedule(props) {

    let GToken = localStorage.getItem('data')
    let calendar_id = props.calendar_id
    
    const [postBody, setpostBody] = useState("")


    let post = {
        'summary': 'Google I/O 2015',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
          'dateTime': '2022-07-28T09:00:00-07:00',
          'timeZone': 'America/Los_Angeles',
        },
        'end': {
          'dateTime': '2022-07-28T17:00:00-07:00',
          'timeZone': 'America/Los_Angeles',
        },
        'recurrence': [
          'RRULE:FREQ=DAILY;COUNT=2'
        ],
        'attendees': [
          {'email': 'lpage@example.com'},
          {'email': 'sbrin@example.com'},
        ],
      }



    let schedulePost = () => {
            console.log(calendar_id)
            let key = 'Bearer ' + GToken

            const authAxios = axios.create({
                headers: {
                        Authorization: key
                    }
                })


            authAxios.post('https://www.googleapis.com/calendar/v3/calendars/'+calendar_id+'/events',
            {
                "end": {'dateTime': '2022-07-28T17:00:00-07:00',
                'timeZone': 'America/Los_Angeles',},
                "start": {'dateTime': '2022-07-28T09:00:00-07:00',
                'timeZone': 'America/Los_Angeles',}
              })
            .then(response => {
                setpostBody(response)
            })
            .catch(error => {
                console.log(error)
        })


    }

    return (
        <div id='Fb_scheduler'>
            <button onClick={() =>schedulePost()}>Schedule Fb Post</button>
        </div>
    );
}

export default FbSchedule;