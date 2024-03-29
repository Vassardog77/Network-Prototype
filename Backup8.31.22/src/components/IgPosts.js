import React, {useState} from 'react';
import axios from 'axios'
import '../App.css';

function IgPosts(props) {

    let GToken = sessionStorage.getItem('GToken')
    let IgId = props.IgId
    let calendar_id = localStorage.getItem('calendar_id')
    const [start, setstart] = useState("")
    const [end, setend] = useState("")


    //setting authAxios to be a request containting the google authorization token as a header
    let schedulePost = () => {
        let key = 'Bearer ' + GToken

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

        const authAxios = axios.create({
            headers: {
                    Authorization: key
                    }
          })

          //scheduling the instagram post on the users calendar containing all of the event information that is collected in the different input variables
            authAxios.post('https://www.googleapis.com/calendar/v3/calendars/'+calendar_id+'/events',
            {
                'summary': 'intagram post scheduled',
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
              console.log(calendar_id)
              alert("Error Scheduling Post")
              console.log(error)
        })
    }


    return (
        <div id='ig_display_final'>
                <input id='ig_image' type='file'
                accept='image/*'>
                 </input>
                <div>
                    <textarea placeholder='caption' rows="10" cols="50"></textarea>
                </div>
            <div id='Fb_scheduler'>
                <div>
                    <input type="datetime-local"
                    onChange={(event) => {
                    setstart(event.target.value)}}></input>
                </div><button>Post Now</button>
                <button onClick={() =>schedulePost()}>Schedule Post</button>
            </div>
        </div>
    );
}

export default IgPosts;