import { useState } from "react";
import Input from "../components/Input";
import { Link } from "react-router";
import Button from "../components/Button";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [cep, setCep] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log({name, email, password, confirmPassword, cep});

    }

    return(
        <form className="flex h-screen justify-center bg-[#161410] items-center"
        onSubmit={handleSubmit}
        >
            <div className="flex gap-2 flex-col items-center justify-center">
                <Link to="/"><img src="./logo.png" alt="" className="mb-4" /></Link>
                
                <Input 
                    placeholder="Nome" type="text"
                    onChange={(e) => setName(e.target.value)}
                />

                <Input 
                    placeholder="Email" type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input 
                    placeholder="Senha" type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Input
                    placeholder="Confirme sua senha" type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Input 
                    placeholder="CEP" type="text"
                    onChange={(e) => setCep(e.target.value)}
                />
                
                <Button title="Criar conta" variant="default"/>
                <Link to="/login" className="w-full">
                    <Button title="Já tenho uma conta" variant="outline"/>
                </Link>
            </div>
        </form>
    );
};

export default Register;