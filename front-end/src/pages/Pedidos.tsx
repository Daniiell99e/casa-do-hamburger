import { useState } from "react"
import CardPedido from "../components/CardPedido";

const Pedidos = () => {
    const [category, setCategory] = useState("Pendente");

      const handleChangeCategory = (newCategory: string) => {
    setCategory(newCategory)
  }

  const getCategoryClass = (categoryName: string) => {
  const elementoSelecionado = "flex border-1 border-[#F2DAAC] cursor-pointer font-bold text-sm md:text-md w-24 md:h-9 md:w-32 h-7 items-center justify-center rounded-md text-[#161410] bg-[#F2DAAC]"
  const elementoNaoSelecionado = "flex border-1 border-[#F2DAAC] cursor-pointer font-bold text-sm md:text-md w-24 md:h-9 md:w-32 h-7 items-center justify-center rounded-md text-[#F2DAAC] hover:text-[#161410] hover:bg-[#F2DAAC] bg-[#161410]"

    if(category === categoryName){
      return elementoSelecionado
    }else{
      return elementoNaoSelecionado
    }
  }

    return (
        <div className="mx-auto w-full px-3 text-white md:w-[737px] md:px-0">
            {/* {Categorias} */}
            <div className="flex gap-2 mt-1 md:my-3 mb-3">
            <div 
            className={getCategoryClass("Pendente")}
            onClick={() => handleChangeCategory("Pendente")}
            >
            Pendente
        </div>
        <div className={getCategoryClass("Retirado")}
        onClick={() => handleChangeCategory("Retirado")}>
          Retirado
        </div>
        <
          div className={getCategoryClass("Cancelado")}
          onClick={() => handleChangeCategory("Cancelado")}
          >
          Cancelado
        </div>
     </div>

        <div className="grid grid-cols-3 gap-2">
            <CardPedido id={2} name="Daniel" date="18/12/2027" orderTime="14:55" deliveredTime="15:30" total={124.75}/>
        </div>
      
    </div>
    )
}

export default Pedidos;