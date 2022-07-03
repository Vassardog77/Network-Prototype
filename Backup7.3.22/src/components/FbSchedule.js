import React, {useState, useEffect} from 'react';
import axios from 'axios'
import FbPosts from './FbPosts';

function FbSchedule(props) {

    let GToken = localStorage.getItem('data')
    let calendar_id = localStorage.getItem('calendar_id')
    const [start, setstart] = useState("")
    const [end, setend] = useState("")
    const [displayType, setdisplayType] = useState(true)
    const FbToken = (props.FbToken)


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
              console.log(calendar_id)
              alert("Error Scheduling Post")
              console.log(error)
        })
    }

    let set_Groups = () => {
      setdisplayType(false)
    }
    let set_Pages = () => {
      setdisplayType(true)
    }

    let FbContent;

    if (displayType === (true)) {
        FbContent = (<div>
        <input id='ig_image' type='file'
              accept='image/*'>
               </input>
              <div>
                <textarea placeholder='caption'></textarea>
              </div>
          <div>
              <input type="datetime-local"
               onChange={(event) => {
                  setstart(event.target.value)}}></input>
          </div>
          <button onClick={() =>schedulePost()}>Schedule Fb Post</button></div>)
    } else if (displayType === (false)) {
        FbContent = (<div><FbPosts FbToken = {FbToken}></FbPosts></div>)
    }

    return (
        <div id='Fb_scheduler'>
          <button onClick={() =>set_Pages()}>Post To Pages</button>
          <button onClick={() =>set_Groups()}>Post To Groups</button>
          {FbContent}
        </div>
    );
}

export default FbSchedule;