import React, {useState} from 'react';
import EventScheduler from './EventScheduler';
import FbDisplay from './FbDisplay';
import Gmail from './Gmail';
import IgSelect from './IgSelect';

function SideBar(props) {

    let FbToken = props.accessToken
    let token = localStorage.getItem('data')


    return (
        <div className='menu'>
            <li className='menu-item' id='mail'>
                <a href='#mail' className='btn'>
                    Send Emails    
                </a> 
                <div className='menu-item__sub'>
                    <div>
                        <Gmail></Gmail>
                    </div>
                </div>
            </li>
            <li className='menu-item' id='fb'>
                <a href='#fb' className='btn'>
                    Schedule Facebook Posts    
                </a> 
                <div className='menu-item__sub'>
                    <div>
                        <FbDisplay FbToken = {FbToken}></FbDisplay>
                    </div>
                </div>
            </li>
            <li className='menu-item' id='insta'>
                <a href='#insta' className='btn'>
                    Schedule Instagram Post    
                </a> 
                <div className='menu-item__sub'>
                    <div>
                        <IgSelect FbToken = {FbToken}></IgSelect>
                    </div>
                </div>
            </li>
            <li className='menu-item' id='event'>
                <a href='#event' className='btn'>
                    Schedule Events    
                </a> 
                <div className='menu-item__sub'>
                    <div>
                        <EventScheduler></EventScheduler>
                    </div>
                </div>
            </li>
            <li className='menu-item' id='close'>
                <a href='#close' className='btn'>
                    Close    
                </a> 
            </li>
        </div>
    );
}

export default SideBar;