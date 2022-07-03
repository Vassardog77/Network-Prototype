import React, {useState, useEffect} from 'react';
import axios from 'axios'
import '../App.css';

function FbPosts(props) {

    const [groupname, setgroupname] = useState({})
    const [FbGroup, setFbGroup] = useState("")
    let token = props.FbToken
    let GToken = localStorage.getItem('data')
    let calendar_id = localStorage.getItem('calendar_id')
    const [start, setstart] = useState("")


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
    

    useEffect(() => {
        if(token === ""){
            return         //only run the funtion once token is added
        }

        let key = 'Bearer ' + token

        const authAxios = axios.create({
            headers: {
                    Authorization: key
                }
            })

        authAxios.get('https://graph.facebook.com/me/groups')
            .then(response => {
                setgroupname(response.data.data)
            })
            .catch(error => {
                console.log(error)
        })
    }, [token])


    let fb_call = () => {
        
        var display = ""

        for (var i = 0; i < groupname.length; i++) {
            display+="<div>name = "+groupname[i].name+"</div>"
            display+="<div> id = "+groupname[i].id+"</div>"
        }

        document.getElementById("fb_display").innerHTML = display
    }


    useEffect(() => {
        if(groupname === null){
            return         //only run the funtion once Facebook pages exist
        }
            var display = "<select name='ig-select' id='ig-select'>"+
            "<option value=''>--Please choose a Group--</option>"

            for (var i = 0; i < groupname.length; i++) {
                
                    display+="<option value='"+groupname[i].id+"'>"
                    +groupname[i].name +"</option>"
            }
            display+="</select>"
            document.getElementById("fb_display").innerHTML = display //change get info button page info 

            var el = document
            .getElementById('ig-select')
            if(el) {
            el.addEventListener('input', handleSelect)}
        

        function handleSelect(event) {
            setFbGroup(event.target.value)
        }
    }, [groupname])


    return (
        <div>
            <div id='fb_display'></div>
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
            <button onClick={() =>schedulePost()}>Schedule Fb Post</button>
        </div>
    );
}

export default FbPosts;