import React, {useState, useEffect} from 'react';
import axios from 'axios'
import '../App.css';

function FbPosts(props) {

    const [groupname, setgroupname] = useState({})

    let token = props.accessToken

    useEffect(() => {
        if(token === ""){
            return         //only run the funtion once token is added
        }

        let key = 'Bearer ' + token

        const authAxios = axios.create({
            headers: {
                    Authorization: key
                }
            })

        authAxios.get('https://graph.facebook.com/me/groups')
            .then(response => {
                setgroupname(response.data.data)
            })
            .catch(error => {
                console.log(error)
        })
    }, [token])


    let fb_call = () => {
        
        var display = ""

        for (var i = 0; i < groupname.length; i++) {
            display+="<div>name = "+groupname[i].name+"</div>"
            display+="<div> id = "+groupname[i].id+"</div>"
        }

        document.getElementById("fb_display").innerHTML = display


    }


    return (
        <div id='fb_display'>
            <button id='button1' onClick={() => fb_call()}>Get my Facebook Groups</button>
        </div>
    );
}

export default FbPosts;