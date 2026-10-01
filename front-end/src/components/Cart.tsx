import { X } from 'lucide-react';
import Button from './Button';
import CartItem from './CartItem';

type CartTypeProps = {
    setShowCart: React.Dispatch<React.SetStateAction<boolean>>
    showCart: boolean
}

const Cart = ({setShowCart, showCart}: CartTypeProps) => {
    return (
        <div className="flex flex-col bg-[#F2DAAC] absolute right-0 h-screen w-[375px] p-5">
            <div className="flex justify-between font-bold">
                <div className='cursor-pointer' onClick={() => setShowCart(!showCart)}><X /></div>
                <p className="uppercase">Meu carrinho</p>
            </div>

            <div className='flex-1 mt-10 flex flex-col gap-2'>
                <CartItem/>
                <CartItem/>
            </div>

            <div>
                <Button title='Finalizar pedido'/>
            </div>
            
        </div>
    )
}

export default Cart