import { useState } from "react";
import Input from "../components/Input";
import { Link } from "react-router";
import Button from "../components/Button";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(email);
        console.log(password);
    }

    return(
        <form className="flex h-screen justify-center bg-[#161410] items-center"
        onSubmit={handleSubmit}
        >
            <div className="flex gap-2 flex-col items-center justify-center">
                <Link to="/"><img src="./logo.png" alt="" className="mb-4" /></Link>
                
                <Input 
                    placeholder="E-mail" type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                    placeholder="Senha" type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button title="Login" variant="default"/>
                <Link to="/register" className="w-full">
                    <Button title="Não tenho uma conta" variant="outline"/>
                </Link>
                
            </div>
        </form>
    );
};

export default Login;