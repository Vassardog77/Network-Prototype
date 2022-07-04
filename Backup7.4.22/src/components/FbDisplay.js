import React, {useState, useEffect} from 'react';
import axios from 'axios'
import FbPosts from './FbPosts';
import FbSchedule from './FbSchedule';

function FbDisplay(props) {

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
        FbContent = (<div>
          <FbSchedule FbToken = {FbToken}></FbSchedule>
          </div>)
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

export default FbDisplay;