import React, { useState, useEffect } from 'react'
import '../Style/Main.css'
import db from '../../products.json'
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
function Main() {    
const [Cart, setCart] = useState([])    
const [Date,] = useState(db)//pobieranie danych z pliku 

useEffect((Cart)=>{    
    if (!Cart) {      
        setCart(JSON.parse(localStorage.getItem('Cart')))          
    }    
  },[]) 
// komunikaty
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
  
// dodawanie produktu do koszyka wraz z komunikatem
const addToCart =  (id) =>{    
    let cartData = Cart     
    if(cartData===null){    //sprawdzenie czy są dane w przegladarce    
        cartData = [{idItem:id, count:1}]
        setCart(cartData)
        console.log('pierwsze dodanie')          
        localStorage.setItem('Cart', JSON.stringify(cartData)) 
        Notification('success', 'Dodano do koszyka')         
    }else{
        if(cartData.find(el => el.idItem===id)===undefined){// dodanie produktu do koszyka i zapisanie w przeglądarce        
            Notification('success', 'Dodano do koszyka')        
            cartData = [{idItem:id, count:1},...cartData]
            setCart(cartData)        
            localStorage.setItem('Cart', JSON.stringify(cartData))
        }else if(cartData.find(el => el.idItem===id)){// komunikat ze produkt juz jest w koszyku
            Notification('danger', 'Produkt znajduje sie juz w koszyku')  
        } 
    }          
}    
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
                    <div className='desc'>
                        {product.description}
                    </div>                        
                </div>                
            ))
            :
            'Brak pobrania danych'
            }
        </div>
    )
}

export default Main
