import React from 'react';

function SideBar(props) {
    return (
        <div className='menu'>
            <li className='menu-item' id='profile'>
                <a href='#profile' className='btn'>
                    Profile    
                </a> 
                <div className='menu-item__sub'>
                    <div>Password</div>
                    <div>Language</div>
                </div>
            </li>
            <li className='menu-item' id='messages'>
                <a href='#messages' className='btn'>
                    Messages    
                </a> 
                <div className='menu-item__sub'>
                    <div>Password</div>
                    <div>Language</div>
                </div>
            </li>
            <li className='menu-item' id='settings'>
                <a href='#settings' className='btn'>
                    Settings    
                </a> 
                <div className='menu-item__sub'>
                    <div>Password</div>
                    <div>Language</div>
                    <div>Language</div>
                </div>
            </li>
            <li className='menu-item'>
                <a href='' className='btn'>
                    Logout    
                </a> 
            </li>
        </div>
    );
}

export default SideBar;