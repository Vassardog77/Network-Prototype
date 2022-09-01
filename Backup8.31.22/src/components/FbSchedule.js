import React, {useState, useEffect} from 'react';
import axios from 'axios'
import FbPosts from './FbPosts';

function FbSchedule(props) {

    let GToken = sessionStorage.getItem('GToken')
    let calendar_id = localStorage.getItem('calendar_id')
    const [start, setstart] = useState("")
    const FbToken = (props.FbToken)
    const [Pages, setPages] = useState({})


    //setting authAxios to be a request containting the google authorization token as a header
    let schedulePost = () => {
        let key = 'Bearer ' + GToken

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

        const authAxios = axios.create({
            headers: {
                    Authorization: key
                    }
          })

            //scheduling the facebook post on the users calendar containing all of the event information that is collected in the different input variables
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

    //getting the facebook pages that the user is involved with
    useEffect(() => {
      if(FbToken === ""){
          return         //only run the function once token is added
      }

    //setting authhaxios to include facebook authentication token
      let key = 'Bearer ' + FbToken

      const authAxios = axios.create({
          headers: {
                  Authorization: key
              }
          })

      authAxios.get('https://graph.facebook.com/v14.0/me/accounts?')
          .then(response => {
              setPages(response.data.data)
          })
          .catch(error => {
              console.log(error)
      })
  }, [FbToken])

  
  //setting a display variable to be a drop down menu of the facebook groups that the user is in
  useEffect(() => {
      if(Pages === null){
          return         //only run the funtion once Facebook pages exist
      }
          var display = "<select name='fb-select' id='fb-select'>"+
          "<option value=''>--Please choose a Page--</option>"

          for (var i = 0; i < Pages.length; i++) {
              
                  display+="<option value='"+i+"'>"
                  +Pages[i].name +"</option>"
          }
          display+="</select>"
          document.getElementById("fb_display_final").innerHTML = display //change get info button page info 

          var el = document
          .getElementById('fb-select')
          if(el) {
          el.addEventListener('input', handleSelect)}
      

    //getting the page id of the selected option in the dropdown menu
      function handleSelect(event) {
          sessionStorage.setItem('PageId', Pages[event.target.value].id)
          sessionStorage.setItem('FbPageToken', Pages[event.target.value].access_token)
      }
  }, [Pages])


    return (
        <div id='Fb_scheduler'>
          <div><div id='fb_display_final'></div></div>
        <input id='ig_image' type='file'
              accept='image/*'>
               </input>
              <div>
                <textarea rows="10" cols="50" placeholder='caption'></textarea>
              </div>
          <div>
              <input type="datetime-local"
               onChange={(event) => {
                  setstart(event.target.value)}}></input>
          </div><button>Post Now</button>
          <button onClick={() =>schedulePost()}>Schedule Post</button>
        </div>
    );
}

export default FbSchedule;