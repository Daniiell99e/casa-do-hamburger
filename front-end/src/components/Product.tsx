import { ShoppingBag } from "lucide-react";
import type { ProductType } from "../types/Product";
import { formatterPrice } from "../utils/formatterPrice";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const Product = ({id, name, description, price, img, setProducts}: ProductType) => {

  const {user} = useContext(UserContext);

  const handleDeleteProduct = async (id: string) => {
    try {

      if(!id) {
        console.log("ID não enviado");
        return;
      }
      const response = await fetch(`http://localhost:3000/delete-product/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if(!response.ok){
        console.log("Erro ao realizar requisição");
        return;
      }

      getProduct();

    } catch (error) {
      console.error(error);
      return;
    }
  }

  const getProduct = async () => {
    try {
      const response = await fetch("http://localhost:3000/get-products")
      if (!response.ok) {
        throw new Error("Não foi possível atualizar os produtos.");
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("A resposta do servidor não contém uma lista de produtos.");
      }
      setProducts(data);
    } catch (error) {
      console.error(error);
      return
    }
  };

  return (
    <div className="">
      <div className="flex gap-2">
        <img src={"./public/"+img} className="w-[100px] h-[83px] md:h-[166px] md:w-[200px]"/>
        <div className="flex flex-col w-full">
            <div className="flex justify-between items-center">
              <p className="text-sm md:text-lg uppercase font-bold">{name}</p>
              {user?.admin && (
              <div className="flex text-xs uppercase border-1 rounded-md items-center px-1 text-red-500 cursor-pointer" 
              onClick={()=> handleDeleteProduct(id)}>
                Deletar
              </div>
              )}
            </div>
            <p className="text-xs md:text-md flex-1 text-[#848484]">{description}</p>

            <div className="flex gap-2 justify-end items-center">
                <p className="text-sm text-[#F2DAAC]">{formatterPrice(price)}</p>
                <ShoppingBag size={18} className="cursor-pointer"/>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default Product;