import React, {useState, useEffect} from 'react';
import FbSchedule from './FbSchedule';
import '../App.css';

function GcalDisplay() {

    let token = sessionStorage.getItem('GToken')
    const [calendar_id, setcalendar_id] = useState("")
    const [display, setdisplay] = useState("")
    const [calendar_id2, setcalendar_id2] = useState([])

    //creating the url for the embedded calendar display which includes some varaibles (only create the display once we have a calendar id)
    useEffect(() => {
        setdisplay(
        "https://calendar.google.com/calendar/embed?"
        + "src=" + calendar_id
        + "&bgcolor=%230083b9"
        + "&ctz=America%2FLos_Angeles")
        localStorage.setItem('calendar_id', calendar_id)
    }, [calendar_id])

    //getting the id of all of the users google calendars (using google authentication token)
    //setting calendar_id2 to be the list of calendar info
    useEffect(() => {             
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


    //setting the dropdown menu to contain the different calendars that the user has
    useEffect(() => {              
        if(calendar_id2.length === (0)){
            return         //only run the funtion once you have the token
        }

        var cal_dropdown = "<select name='cal-select' id='cal-select'>"

        //hollidays and birthdays calendars do not work so we skip them
        for (var i = 0; i < calendar_id2.length; i++) {
            if (calendar_id2[i].summary === "Holidays in United States") {}
            else if (calendar_id2[i].summary === "Birthdays") {}
             else {
                cal_dropdown+="<option value='"+calendar_id2[i].id+"'>"
                +calendar_id2[i].summary +"</option>"

                if (i<3) {
                setcalendar_id(calendar_id2[i].id)}
            }

        }

        cal_dropdown+="</select>"
        document.getElementById("dropdown").innerHTML = cal_dropdown 


        var el = document
        .getElementById('cal-select')
        if(el) {
        el.addEventListener('input', handleSelect)}
    }, [calendar_id2])

        //setting calendar_id to the id of the calendar that the user selected
        function handleSelect(event) {
            setcalendar_id(event.target.value)
        }

    
    //making sure that the calendar doesnt try to render until the system can access the calendar info so that there is no error
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