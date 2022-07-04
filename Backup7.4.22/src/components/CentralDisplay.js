import React, {useState, useEffect} from 'react';
import GcalDisplay from './GcalDisplay';
import Analytics from './Analytics';
import Notifications from './Notifications';
function CentralDisplay(props) {

    const [displayType, setdisplayType] = useState(1)
    const FbToken = (props.FbToken)



    let set_Analytics = () => {
      setdisplayType(2)
    }
    let set_Calendar = () => {
      setdisplayType(1)
    }
    let set_Notifications = () => {
      setdisplayType(3)
    }

   
    let Content;

    if (displayType === (1)) {
        Content = (
          <div><GcalDisplay></GcalDisplay></div>)
    } else if (displayType === (2)) {
        Content = (
        <div><Analytics></Analytics></div>)
    } else if (displayType === (3)) {
      Content = (
      <div><Notifications></Notifications></div>)}

    return (
        <div id='Main_display'>
          <button onClick={() =>set_Calendar()}>Calendar Display</button>
          <button onClick={() =>set_Analytics()}>Analytics</button>
          <button onClick={() =>set_Notifications()}>Notifications</button>
          {Content}
        </div>
    );
}

export default CentralDisplay;