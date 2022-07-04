import React, {useState, useEffect} from 'react';
import FbLogin from '../FbLogin';
import CentralDisplay from '../CentralDisplay'
import '../App.css';

function MainDisplay(props) {

    const [displayType, setdisplayType] = useState(true)
    const [testCall, settestCall] = useState([])
    let GToken = localStorage.getItem('data')


    useEffect(() => {                //get calender ids
        fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
        headers: {
            'Authorization': 'Bearer ' + GToken
            }
        })
        .then(content => settestCall(content))
        .then(content => console.log(content))
        .catch(err => { console.log(err) });
}, [GToken])


    let Content;

    if (displayType === (null)) {
        Content = (
          <div></div>)
    } else {
        Content = (
        <div><FbLogin></FbLogin>
        <CentralDisplay></CentralDisplay>
        </div>)
    }



    return (
        <div>
            {Content}
        </div>
    );
}

export default MainDisplay;