import React from 'react'
import './Style/Bar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import {NavLink } from 'react-router-dom';


function bar() {
    return (
        <div className='bar'> 
            <NavLink to='/' className='icon'> 
                      
                <FontAwesomeIcon icon={faStore} style={{color: 'white',height:'25px' }} ></FontAwesomeIcon>
                <span>Sklep</span>    
            </NavLink>  

            <NavLink exact to='/cart' className='cart'>                      
                <span>Koszyk</span>   
                <FontAwesomeIcon icon={faCartShopping} style={{color: 'white', height:'25px'}} ></FontAwesomeIcon>
            </NavLink>
        </div>
    )
}

export default bar
