import React, {useState} from 'react';
import FacebookLogin from "react-facebook-login"
import '../App.css';
import FbPosts from './FbPosts';
import IgSelect from './IgSelect';

function FbLogin() {

    const [isLoggedIn, setisLoggedIn] = useState(false)
    /*const [userID, setuserID] = useState("")
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [picture, setpicture] = useState("")*/
    const [accessToken, setaccessToken] = useState("")


    const responseFacebook = response => {
            //console.log(response);
            setisLoggedIn(true)                 //UNCOMMENT THIS LINE TO ALLOW LOGIN
            /*setuserID(response.userID)
            setname(response.name)
            setemail(response.email)
            setpicture(response.picture.data.url)*/
            setaccessToken(response.accessToken)
            }

        let fbContent;

        if (isLoggedIn === (true)) {              //add fb posts once logged in
          fbContent = (<div>
          <FbPosts accessToken = {accessToken}></FbPosts></div>
          )
        } else {
          fbContent = (
            <FacebookLogin
              appId="354529376664526"
              autoLoad={true}
              fields="name,email,picture"
              scope='publlic_profile, publish_to_groups,
               groups_show_list, instagram_basic, pages_show_list'
              callback={responseFacebook}
            />

            );
        }

        let igContent;

        if (isLoggedIn === (true)) {
          igContent = (<IgSelect accessToken = {accessToken}></IgSelect>)//add ig posts once logged in
        } else {
          igContent = (null);
        }

    return (
        <div id='fblogin_button'>
          <div>
            {fbContent}
          </div>
          <div>
            {igContent}
          </div>
        </div>
    );
}

export default FbLogin;