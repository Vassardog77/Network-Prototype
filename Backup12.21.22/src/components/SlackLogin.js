import React, {useState, useEffect} from 'react';
import axios from 'axios'
import DiscordMessages from './DiscordMessages'


function Discord(props) {

    var client_id = '1293540453238.4051151285521'
    var client_secret = '507dccf2cab43d306a819d41812592ab'
    var redirect_uri = 'https://localhost:3000'
    let access_code_pending = sessionStorage.getItem('slack_code_pending')
    let access_token = sessionStorage.getItem('slack_token')
    const [content, setcontent] = useState(<div><button onClick={() =>login()}>Login with Slack</button></div>)

    let login = () => {
        window.location.replace("https://slack.com/oauth/authorize?client_id=1293540453238.4051151285521&scope=admin.usergroups:read&state=16663059ghq9183habn&redirect_uri=https%3A%2F%2Flocalhost%3A3000")
        sessionStorage.setItem('slack_code_pending', 'pending')
    }

    useEffect(() => {
        if(access_code_pending === (null)){
            return         //only run the function once code is pending
        }
        if(access_code_pending === ('pending')){
            let url = window.location.search
            let code = url.substring(
                url.indexOf("code=") + 5, 
                url.lastIndexOf("&state"))
            console.log(code)

                const authAxios = axios.create({
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                            }
                  })
        
            
                  authAxios.post("https://slack.com/api/oauth.access",
                  "client_id="+client_id+"&client_secret="+client_secret+"&grant_type=authorization_code&code="+code+"&redirect_uri="+redirect_uri
                        )
                        .then(response => {
                            let token = response.data.access_token
                            console.log('token = '+token)
                            console.log(response)
                            sessionStorage.setItem('slack_token', token)
                            sessionStorage.setItem('slack_code_pending', 'completed')
                            setcontent(<DiscordMessages></DiscordMessages>)
                        })
                        .catch(error => {
                          console.log(error)
                    })
        }
    })

    return (
        <div>
            {content}
        </div>
    );
}

export default Discord;