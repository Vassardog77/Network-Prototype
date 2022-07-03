import React, {useState, useEffect} from 'react';
import FbSchedule from './FbSchedule';
import '../App.css';

function GcalDisplay() {

    let token = localStorage.getItem('data')
    const [calendar_id, setcalendar_id] = useState("")
    const [display, setdisplay] = useState("")
    const [calendar_id2, setcalendar_id2] = useState([])

    useEffect(() => {
        setdisplay(
        "https://calendar.google.com/calendar/embed?"
        + "src=" + calendar_id
        + "&bgcolor=%230083b9"
        + "&ctz=America%2FLos_Angeles")
        localStorage.setItem('calendar_id', calendar_id)
    }, [calendar_id])

    useEffect(() => {                //get calender ids
            if(calendar_id2 === (null)){
                return         //only run the funtion once you have the token
            }
            fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
            headers: {
                'Authorization': 'Bearer ' + token
                }
            })
            .then(response => response.json())
            .then(content => setcalendar_id2(content.items))
            .catch(err => { console.log(err) });
    }, [token])

    useEffect(() => {                //get calender ids
        if(calendar_id2.length === (0)){
            return         //only run the funtion once you have the token
        }

        var cal_dropdown = "<select name='cal-select' id='cal-select'>"

        for (var i = 0; i < calendar_id2.length; i++) {
            if (calendar_id2[i].summary === "Holidays in United States") {}
            else if (calendar_id2[i].summary === "Birthdays") {}
             else {
                cal_dropdown+="<option value='"+calendar_id2[i].id+"'>"
                +calendar_id2[i].summary +"</option>"
            }


        }
        cal_dropdown+="</select>"
        document.getElementById("dropdown").innerHTML = cal_dropdown //change get info button page info 

        setcalendar_id(calendar_id2[1].id)

        var el = document
        .getElementById('cal-select')
        if(el) {
        el.addEventListener('input', handleSelect)}
        console.log("calender rendered!")
    }, [calendar_id2])


        function handleSelect(event) {
            setcalendar_id(event.target.value)
        }
    
    let calendarDisplay;

    if (calendar_id === "") {
        calendarDisplay = <div></div>
    } else {
        calendarDisplay = 
        <div>
            <iframe id="calendar" title="calendar" 
            src={display}
            ></iframe>
        </div>
    }

    return (
        <div>
            <div id='dropdown'></div>
            <div>{calendarDisplay}</div>
        </div>
    );
}

export default GcalDisplay;