import {ChevronLeft, ChevronRight, Trash } from 'lucide-react';

const CartItem = () => {
    return(
        <div className='flex gap-3 items-center'>
                    <img src="../public/duplo-da-casa.png" alt="duplo-da-casa" className='w-[100px] rounded-md' />
                    <div className='flex-1'>
                        <p className='upparcase font-bold'>DUPLO DA CASA</p>
                        <p className='font-bold text-[#848484]'>R$28,90</p>
                        <div className='flex gap-4 mt-2'>
                            <ChevronLeft className='cursor-pointer p-1 rounded-md bg-[#C92A0E] text-white' size={25} />
                                <p className='font-bold'>1</p>
                            <ChevronRight className='cursor-pointer p-1 rounded-md bg-[#C92A0E] text-white' size={25}/>
                        </div>
                    </div>
                    <div>
                        <Trash className='cursor-pointer' size={18}/>
                    </div>
        </div>
    )
}

export default CartItem;