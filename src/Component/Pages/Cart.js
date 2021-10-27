import React, { useState, useEffect } from 'react'
import '../Style/Cart.css'
import db from '../../products.json'
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

function Cart() {  
    const [Cart, setCart] = useState([])  
    const [Date,] = useState(db)//pobieranie danych z pliku  
    const [Price, setPrice] = useState([])
    const [Voucher, setVoucher] = useState(false)

    useEffect((Cart)=>{  
        
        if (!Cart) {     
            localStorage.getItem('Cart')?     
            setCart(JSON.parse(localStorage.getItem('Cart')))  
            :
             <></>            
        }       
    },[]) 

    // zmiana ilosci przy danym produkcie w koszyku
    const  editCount = (e, id) =>{
        e.preventDefault();        
        let cartToEdit = Cart
        let index=Cart.findIndex(el => el.idItem===id)     
        cartToEdit[index].count=e.target.count.value    
        setCart(cartToEdit)    
        localStorage.setItem('Cart',JSON.stringify(cartToEdit))
        Notification('success', 'zmieniono prawidłowo', 1000) 
        sumOrder()
    }
    //usuwanie produktu z koszyku
    const deleteProduct = (e, id) =>{
        e.preventDefault();    
        let cartToEdit = Cart
        let index=Cart.findIndex(el => el.idItem===id)    
        cartToEdit.splice(index,1)
        setCart([])
        setTimeout(() => setCart(cartToEdit),10  )       
        localStorage.setItem('Cart',JSON.stringify(cartToEdit))
        Notification('success', 'usunięto',1000) 
        sumOrder()
    }
    //sumowanie kwoty za zamówienie
    const sumOrder = () => {
        if(Voucher===true){
            removeVoucher()
        }
        var sum=0      
        Cart.map((pr) =>{        
            sum+=Date.find(el => el.id===pr.idItem).price*pr.count   
            return sum 
        })   
        sum=Math.round(sum * 100) / 100  
        setPrice(sum)  
        return sum      
    }
    //sprwadzanie poprawnosci kodu promocyjnego
    const checkCode = (e)=>{
        e.preventDefault();   
        let reduc=  e.target.code.value.replace(/[^0-9]/g,"").length
        if(reduc>0 && Voucher===false){
            setVoucher(true)
            Notification('success', 'przyznano kod rabatowy o wysokości '+reduc+'%',2000) 
            setPrice(Math.round((Price*(100-reduc)/100) * 100) / 100)        
        }else if(Voucher===false){
            Notification('danger', 'Błędny kod ',2000)
        }else{
            Notification('danger', 'Kod został juz przyznany w celu zmiany prosze o usunięcie ',2000)
        }           
        
    }
    //usuwanie wpisanego kodu i przywrócenie kwoty
    const removeVoucher = ()=>{
        setVoucher(false)
        Notification('danger', 'Usunięto kod promocyjny prosze wpisać ponownie',2000) 

    }
    // komunikaty
    const Notification = (Type, Message, time) =>{
        store.addNotification({    
            message: Message,      
            type: Type,
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
            duration: time,
            //   onScreen: true
            }
        });
    }    
    //sprwadzenie wystepowanie prawidłowego kodu i zablokowanie automatycznej zmieny ceny
    Voucher===false?
    setTimeout(()=>sumOrder(),10)
    :
    <></>   

    return (
        
        <div className='cartSite'>
            <ReactNotification/>
            Twój koszyk
            {Cart.length>=1?
                <div>
                    {Cart.map((prod) =>(
                        <div className='productInCart' key={prod.idItem}>                  
                            <img className='picCart' src={Date.find(el => el.id===prod.idItem).img} alt="błąd"/>
                            <div className='infoInCart'>
                                <div>
                                    {Date.find(el => el.id===prod.idItem).name}
                                </div>
                                <div>
                                    Cena produktu za sztuke: {Date.find(el => el.id===prod.idItem).price} zł
                                </div>                                
                                <form onSubmit={(e) =>editCount(e, prod.idItem)}>
                                    Ilosc:<input min='1' max='100' id='count' type='number' defaultValue={prod.count} className={'countInProduct'}></input>
                                    <button>Zmień ilość</button>                                
                                </form>
                                <form onSubmit={(e) =>deleteProduct(e, prod.idItem)}>
                                    <button className='buttonDelete'>Usuń produkt</button>
                                </form>
                            </div>          
                        </div>
                    ))}
                    <div className='order'>
                        <div>
                            Cena całego zamówienia {Price} zł
                        </div>
                        <div>
                            <form onSubmit={(e) =>checkCode(e)}>   
                                Kod rabatowy<input id='code' maxLength="8" minLength="2"></input>                 
                                <button type='submit'>Sprawdz kod</button>
                                <button type='button' onClick={()=> removeVoucher()} className={Voucher===true? 'buttonRemoveCode show': 'noShow'}>Usuń kod </button>
                            </form>
                        </div>
                        <div>
                            Wpisz email <input></input>
                            <button>Złoż zamówienie</button>
                        </div>
                    </div>  
                </div>                    
            : 
                <div>
                Brak produktów w koszyku
                </div>
            }     
        </div>
    )
}

export default Cart
