import React, {useState, useEffect} from 'react';
import SideBar from './SideBar';
function FbLogin2() {

    const [content, setcontent] = useState(<div><button onClick={() =>login()}>Login with Facebook</button></div>)
    const [accessToken, setaccessToken] = useState("")
    let access_code_pending = sessionStorage.getItem('fb_code_pending')

    let login = () => {
        window.location.replace("https://www.facebook.com/v15.0/dialog/oauth?client_id=354529376664526&scope=groups_show_list&response_type=token&redirect_uri=https://localhost:3000&state=1h12j5215ggdn8ng7fj3")
        sessionStorage.setItem('fb_code_pending', 'pending')
    }

    useEffect(() => {
        if(access_code_pending === (null)){
            return         //only run the function once code is pending
        }
        if(access_code_pending === ('pending')){
            var url = window.location.href;
            let token = url.substring(
                    url.indexOf("access_token=") + 13, 
                    url.lastIndexOf("&data_access_expiration_time"))
                setaccessToken(token)
                console.log(accessToken)
                }
            })


    return (
        <div>
        <div id='fblogin'>
          <div>
            {content}
          </div>
          <SideBar accessToken = {accessToken} id='sidebar'></SideBar>
        </div>
      </div>
    );
}

export default FbLogin2;