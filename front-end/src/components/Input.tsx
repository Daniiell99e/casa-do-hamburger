const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    return(
        <input
        {...props}
        className="w-[350px] py-[11px] text-xs px-2 outline-none rounded-md bg-white text-[#32343E] placeholder-[#32343E]"/>
    );
};

export default Input;