import React, {useState, useEffect} from 'react';
import axios from 'axios';

function DiscordMessages(props) {
    const [content, setcontent] = useState(<div  id='discord_display'><button onClick={() =>get_channels()}>Get Channels</button></div>)
    let access_token = sessionStorage.getItem('discord_token')
    const [Servers, setServers] = useState(null)

    let get_channels = () => {

        let key = 'Bearer ' + access_token

        const authAxios = axios.create({
            headers: {
                    Authorization: key
                }
            })

        authAxios.get("https://discord.com/api/v10/users/@me/guilds"
                        )
                        .then(response => {
                            console.log(response.data[1])
                            setServers(response.data)
                            
                        })
                        .catch(error => {
                          console.log(error)
                    })
    }

    useEffect(() => {
        if(Servers === null){
            return         //only run the funtion once discord Servers exist
        }
            console.log(Servers)
            var display = "<select name='d-select' id='d-select'>"+
            "<option value=''>--Please choose an option--</option>"

            for (var i = 0; i < Servers.length; i++) {
                
                    display+="<option value='"+Servers[i].id+"'>"
                    +Servers[i].name +"</option>"
                    console.log(Servers[i].name)
            }
            display+="</select>"
            document.getElementById("discord_display").innerHTML = display //change get info button page info 

            var el = document
            .getElementById('d-select')
            if(el) {
            el.addEventListener('input', handleSelect)}
        
        //setting the FbId variable to the id of the selected facebook page
        function handleSelect(event) {

        }
    }, [Servers])

    return (
        <div>
            {content}
        </div>
    );
}

export default DiscordMessages;