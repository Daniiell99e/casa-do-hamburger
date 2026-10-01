import { useEffect, useState } from "react";
import Product from "../components/Product";
import type { ProductType } from "../types/Product";

const Home = () => {
  const [category, setCategory] = useState("Hamburger");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loadError, setLoadError] = useState("");

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

  const filteredProduct = products.filter((product) => {
    return product.category === category;
  })
  useEffect(() => {
  const getProduct = async () => {
    try {
      const response = await fetch("http://localhost:3000/get-products")
      if (!response.ok) {
        throw new Error("Não foi possível carregar os produtos.");
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("A resposta do servidor não contém uma lista de produtos.");
      }
      setProducts(data);
    } catch (error) {
      console.error(error);
      setLoadError(error instanceof Error ? error.message : "Erro ao carregar os produtos.");
      return
    }
  };
    getProduct();
  }, []);
  
  return (
    <div className="mx-auto w-full px-3 text-white md:w-[737px] md:px-0">
     <div className="flex gap-2 my-1 md:my-3">
        <div 
        className={getCategoryClass("Hamburger")}
        onClick={() => handleChangeCategory("Hamburger")}
        >
          Hamburger
        </div>
        <div className={getCategoryClass("Bebida")}
        onClick={() => handleChangeCategory("Bebida")}>
          Bebidas
        </div>
        <
          div className={getCategoryClass("Porção")}
          onClick={() => handleChangeCategory("Porção")}
          >
          Poções
        </div>
     </div>

      <p className="mb-2 uppercase font-bold text-[#F2DAAC] mt-2">{category}</p>
      <div className="flex flex-col gap-2 md:gap-3">
        {loadError && <p role="alert">{loadError}</p>}
        {filteredProduct.map(product => (
          <Product 
            id={product.id} 
            description={product.description} 
            name={product.name} 
            img={product.img} 
            price={product.price}
            category={product.category}
            key={product.id}
            setProducts={setProducts}
          />
        ))}
        {!loadError && filteredProduct.length === 0 && <p>Não há produtos desta categoria</p>}
      </div>
     
      
    </div>
  );
};

export default Home;
