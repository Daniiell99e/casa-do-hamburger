import { User, CalendarFold, Clock} from 'lucide-react';

type CardPedidoType = {
    id: number;
    name: string;
    date: string;
    orderTime: string;
    deliveredTime?: string;
    total: number
};


const CardPedido = ({id, name, date, orderTime, deliveredTime, total}: CardPedidoType) => {
    return(
            <div className=" bg-[#F2DAAC] p-2 rounded-md text-[#32343E]">
                <div className="flex justify-between">
                    <p className='font-bold'>#{id}</p>
                    <select name="" id="" className="font-bold">
                        <option value="" defaultChecked disabled>Pendente</option>
                        <option value="">Retirado</option>
                        <option value="">Cancelado</option>
                    </select>
                </div>
                <div className="flex flex-col mt-2 gap-2">
                    <div className="flex gap-2 items-center">
                        <User size={16}/>
                        <p className="text-xs">{name}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <CalendarFold size={16}/>
                        <p className="text-xs">{date}</p>
                    </div>

                    <div className="flex gap-4 items-center">
                        <div className="flex gap-2 items-center">
                            <Clock size={16}/>
                            <p className="text-sm">{orderTime}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Clock size={16}/>
                            <p className="text-sm">{deliveredTime ? deliveredTime : "-"}</p>
                        </div>
                    </div>
                    <div className="h-[2px] w-full bg-[#32343E] mt-1"></div>
                    <p className="text-right font-bold text-lg">R${total}</p>
                </div>
            </div>
    )
}

export default CardPedido;