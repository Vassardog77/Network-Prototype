import React, {useEffect, useState} from 'react';
import axios from 'axios'
function Notifications(props) {

    let PageId = sessionStorage.getItem('PageId')
    let FbPageToken = sessionStorage.getItem('FbPageToken')
    const [FbChats, setFbChats] = useState({})
    const [FbUnreads, setFbUnreads] = useState(0)
    const [FbDisplay, setFbDisplay] = useState("Facebook Page Messages:\n\n\nYou have no new messages")
    const [IgDisplay, setIgDisplay] = useState("Instagram Messages:\n\n\nYou have no new messages")

        
    useEffect(() => {
        if(PageId === ""){
            return         //only run the function once token is added
        }
         //setting authAxios to be a request containting the google authorization token as a header
        let key = 'Bearer '+ FbPageToken
        
        const authAxios = axios.create({
            headers: {
                    Authorization: key
                }
            })
        
        //getting the facebook conversations of the user
        authAxios.get('https://graph.facebook.com/v14.0/'+PageId+'?fields=conversations{unread_count, snippet, participants}')
            .then(response => {
                console.log(response.data)
                setFbChats(response.data)
            })
            .catch(error => {
                console.log(error)
        })

    }, [FbPageToken, PageId])

    //setting the display to either display the messages or show that the user has no new messages
    useEffect(() => {
        
        if(FbChats.conversations !== undefined){

            var tempDisplay = "Facebook Page Messages:\n\n"

            for (var i = 0; i < FbChats.conversations.data.length; i++) {
                
                if(FbChats.conversations.data[i].unread_count > 0) {
                    tempDisplay += "\nYou have "+FbChats.conversations.data[i].unread_count+" new messages from "
                    +FbChats.conversations.data[i].participants.data[0].name+"\n("
                    +FbChats.conversations.data[i].snippet+")\n"
                }
                if(tempDisplay === "Facebook Page Messages:\n\n"){
                    setFbDisplay("Facebook Page Messages:\n\n\nYou have no new messages")
                } else{
                    setFbDisplay(tempDisplay)
                }
        }

        } else {
            setFbDisplay("Facebook Page Messages:\n\n\nYou have no new messages")
        }
    
    }, [FbChats])



    return (
        <div id='analytics' className="display-linebreak">
            <div id='FbChats'>{FbDisplay}</div><div id='IgChats'>{IgDisplay}</div>
        </div>
    );
}

export default Notifications;