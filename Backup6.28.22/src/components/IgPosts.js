import React, {useState} from 'react';
import '../App.css';

function IgPosts(props) {

    let token = localStorage.getItem('data')

    const [IgImage, setIgImage] = useState()

    let IgId = props.IgId
    console.log(IgId)


    let file_submit = () =>{
        document.getElementById('ig_image').src='../images/test1.png'
        console.log('image saved')
    }

    return (
        <div id='ig_display_final'>
                <input id='ig_image' type='file'
                accept='image/*'
                onChange={() => file_submit()}>
                 </input>
                 <div>
                    <input type='text' placeholder='hashtag'></input>
                </div>
        </div>
    );
}

export default IgPosts;