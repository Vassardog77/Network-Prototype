import React, {useState, useEffect} from 'react';
import axios from 'axios'
import DiscordMessages from './DiscordMessages'


function Discord(props) {

    var client_id = '1012896743429513367'
    var client_secret = 'luyiRnKVL264NdIRO4fijUTNsTdVnpnL'
    var redirect_uri = 'https://localhost:3000'
    let access_code_pending = sessionStorage.getItem('discord_code_pending')
    let access_token = sessionStorage.getItem('discord_token')
    const [content, setcontent] = useState(<div><button onClick={() =>login()}>Login with Discord</button></div>)

    let login = () => {
        window.location.replace("https://discord.com/api/oauth2/authorize?response_type=code&client_id=1012896743429513367&scope=messages.read%20guilds.members.read%20guilds&state=15563059ghq9183habn&redirect_uri=https%3A%2F%2Flocalhost%3A3000&prompt=consent")
        sessionStorage.setItem('discord_code_pending', 'pending')
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

                const authAxios = axios.create({
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                            }
                  })
        
            
                  authAxios.post("https://discord.com/api/v10/oauth2/token",
                  "client_id="+client_id+"&client_secret="+client_secret+"&grant_type=authorization_code&code="+code+"&redirect_uri="+redirect_uri
                        )
                        .then(response => {
                            let token = response.data.access_token
                            console.log('token = '+token)
                            sessionStorage.setItem('discord_token', token)
                            sessionStorage.setItem('discord_code_pending', 'completed')
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