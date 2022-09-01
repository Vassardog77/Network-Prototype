import React, {useState, useEffect} from 'react';
import axios from 'axios'
import IgPosts from './IgPosts';
import '../App.css';


function IgSelect(props) {

    const [Pages, setPages] = useState({})
    const [FbId, setFbId] = useState("")
    const [IgId, setIgId] = useState("")

    let FbToken = props.FbToken

    //setting authAxios to be a request containting the google authorization token as a header
    useEffect(() => {
        if(FbToken === ""){
            return         //only run the function once token is added
        }

        let key = 'Bearer ' + FbToken

        const authAxios = axios.create({
            headers: {
                    Authorization: key
                }
            })

        //getting the facebook pages that the user has
        authAxios.get('https://graph.facebook.com/v14.0/me/accounts?')
            .then(response => {
                setPages(response.data.data)
            })
            .catch(error => {
                console.log(error)
        })
    }, [FbToken])


    //creating a dropdown menu of all of the facebook pages thath the user has
    useEffect(() => {
        if(Pages === null){
            return         //only run the funtion once Facebook pages exist
        }
            var display = "<select name='ig-select' id='ig-select'>"+
            "<option value=''>--Please choose an option--</option>"

            for (var i = 0; i < Pages.length; i++) {
                
                    display+="<option value='"+Pages[i].id+"'>"
                    +Pages[i].name +"</option>"
            }
            display+="</select>"
            document.getElementById("ig_display_final").innerHTML = display //change get info button page info 

            var el = document
            .getElementById('ig-select')
            if(el) {
            el.addEventListener('input', handleSelect)}
        
        //setting the FbId variable to the id of the selected facebook page
        function handleSelect(event) {
            setFbId(event.target.value)
        }
    }, [Pages])


    //getting the instagram account from the facebook page that the user selected
    useEffect(() => {
        if(FbId === ""){
            return         //only run the funtion once FbId is added
        }

        let key = 'Bearer ' + FbToken

        const authAxios = axios.create({
            headers: {
                    Authorization: key
                }
            })

            let url = 'https://graph.facebook.com/v14.0/' + FbId + '?fields=instagram_business_account'

        authAxios.get(url)
            .then(response => {
                setIgId(response.data.instagram_business_account.id)
            })
            .catch(error => {
                console.log(error)
        })
    }, [FbId, FbToken])

    //setting the igContent variable which will be the display for the component
    let igContent;

    if (IgId === "") {
        igContent = (
            <div>
                <div>Please select the Facebook page connected to your Instagram business account</div>
                <div id='ig_display_final'></div>
            </div>)
      } else {
        igContent = (<IgPosts IgId = {IgId}></IgPosts>)
      }


    return (
        <div id='ig_display'>
            {igContent}
        </div>
    );
}

export default IgSelect;