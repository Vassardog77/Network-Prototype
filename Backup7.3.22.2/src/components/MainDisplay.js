import React, {useState, useEffect} from 'react';
import axios from 'axios'
import GcalDisplay from './GcalDisplay';
import Analytics from './Analytics';
function MainDisplay(props) {

    const [displayType, setdisplayType] = useState(true)
    const FbToken = (props.FbToken)
    const [Pages, setPages] = useState({})



    let set_Groups = () => {
      setdisplayType(false)
    }
    let set_Pages = () => {
      setdisplayType(true)
    }

   
    let FbContent;

    if (displayType === (true)) {
        FbContent = (
          <div><GcalDisplay></GcalDisplay></div>)
    } else if (displayType === (false)) {
        FbContent = (
        <div><Analytics></Analytics></div>)
    }

    return (
        <div id='Main_display'>
          <button onClick={() =>set_Pages()}>Calendar Display</button>
          <button onClick={() =>set_Groups()}>Analytics</button>
          {FbContent}
        </div>
    );
}

export default MainDisplay;