import React, {useState} from 'react';
import EventScheduler from './EventScheduler';
import FbDisplay from './FbDisplay';
import Gmail from './Gmail';
import IgSelect from './IgSelect';
import DiscordLogin from './DiscordLogin';
import SlackLogin from './SlackLogin';

function SideBar(props) {

    let FbToken = props.accessToken

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
            <li className='menu-item' id='discord'>
                <a href='#discord' className='btn'>
                    Discord   
                </a> 
                <div className='menu-item__sub'>
                    <div>
                        <DiscordLogin></DiscordLogin>
                    </div>
                </div>
            </li>
            <li className='menu-item' id='slack'>
                <a href='#slack' className='btn'>
                    Slack   
                </a> 
                <div className='menu-item__sub'>
                    <div>
                        <SlackLogin></SlackLogin>
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