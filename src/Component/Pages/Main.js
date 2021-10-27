import React, { useState, useEffect } from 'react'
import '../Style/Main.css'
import db from '../../products.json'
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
function Main() {
    
const [Cart, setCart] = useState([])    

useEffect((Cart)=>{    
    if (!Cart) {      
        setCart(JSON.parse(localStorage.getItem('Cart')))    
        console.log('test useeffect')    
    }    
  },[]) 

  const Notification = (Type, Message) =>{
    store.addNotification({    
        message: Message,      
        type: Type,
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 300,
        //   onScreen: true
        }
      });
} 
  

const addToCart =  (id) =>{    
    let cartData = Cart     
    cartData===null? 
        <>  
            {cartData = [{idItem:id, count:1}]}
            {setCart(cartData)}
            {console.log('pierwsze dodanie')}
            {localStorage.setItem('Cart', JSON.stringify(cartData))}            
        </>
        : 
        <>     
            {Notification('danger', 'Produkt jest juz w koszyku')}
        </>       
    
    if(cartData.find(el => el.idItem===id)===undefined){
        console.log('Dodanie nad podstawie braku w tabeli')
        Notification('success', 'Dodano do koszyka')
        
        cartData = [{idItem:id, count:1},...cartData]
        setCart(cartData)        
        localStorage.setItem('Cart', JSON.stringify(cartData))
    }      
}    
    const [Date,] = useState(db)//pobieranie danych z pliku
    

    return (
        <div className='site'>
        <ReactNotification/>
        {Date?
            Date.map((product) =>(
                <div key={product.id} className='product'>
                    <div className='picture'>
                        
                    <img className='picMain' src={product.img} alt="błąd"/>
                        
                    </div>
                    <div className='info'>
                        
                        <div className='name'>{product.name}</div>
                        <div className='price'>{product.price} zł</div>
                        <button type='submit' onClick={() =>addToCart(product.id)}>Dodaj do koszyka</button>
                        
                    </div>      
                        
                    <div className='desc'>{product.description}</div>
                        
                </div>
                
            ))
            :
            'Brak pobrania danych'
            }

            


        </div>
    )
}

export default Main
