import { Link, useLocation } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { LogOut, ShoppingCart, Box, LayoutDashboard, Plus } from 'lucide-react';
import Cart from "./Cart";

const Header = () => {
  const [showCart, setshowCart] = useState<boolean>(false);
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

  const handleAuthUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/me", {
        credentials: "include",
      });

      if(response.status !== 200){
        console.log("Deu ruim");
        return;
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
      return;
    }
  }
  useEffect(() => {
    handleAuthUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        credentials: "include",
        method: "POST",
      });

      if(!response.ok){
        console.log("Não deu certo")
        return
      }
      setUser(null);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  const getNavItemClass = (path: string) => {
    const baseClass = "flex w-[35px] h-[35px] rounded-md border-1 items-center justify-center cursor-pointer"
    if(location.pathname === path ){
      return `${baseClass} text-[#161410] bg-[#F2DAAC]`;
    }else{
      return baseClass;
    }
  }
  return (
    <div className="bg-[#161410]">
      {showCart && <Cart setShowCart={setshowCart} showCart={showCart}/>}
      
      <div className="w-full md:w-[737px] p-3 md:-0 mx-auto flex items-center justify-between">
        <Link to="/home"><img src="./public/logo.png" alt="" /></Link>

        
          

          {user ? (
            <div className="flex items-center gap-8  text-white">

              {user.admin && (
                <div className="md:flex hidden items-center gap-2 text-[#F2DDAC]">
                <Link to="/">
                  <div className={getNavItemClass("/")}>
                    <Box size={18}/>
                  </div>
                </Link>
                <Link to="/pedidos">
                  <div className={getNavItemClass("/pedidos")}>
                    <LayoutDashboard size={18}/>
                  </div>
                </Link>
                <Link to="/home">
                  <div className={getNavItemClass("/home")}>
                    <Plus size={18}/>
                  </div>
                </Link>
              </div>
              )}

              
              <div className="relative cursor-pointer">
                <ShoppingCart size={18} onClick={() => setshowCart(!showCart)}/>
                <p className="absolute -top-4 -right-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#F2DAAC] text-[#161410]">1</p>
              </div>
              
              <div className="flex items-center gap-2">
                <p>{user?.name}</p> <LogOut size={18} className="cursor-pointer" onClick={() => handleLogout()}/>
              </div>
             </div>
          ): (
            <Link to="/login">
              <div className="bg-[#F2DAAC] w-[130px] h-[35px] flex items-center justify-center rounded-sm cursor-pointer">
                Entrar
              </div>
          </Link>
          )}
          
        
      </div>
    </div>
  );
};

export default Header;
