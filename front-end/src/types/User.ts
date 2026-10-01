export interface UserInterface {
    email: string;
    id: string;
    name: string;
    cep: string;
    admin: boolean;
};

export type UserContextType = {
    user: UserInterface | null;
    setUser: React.Dispatch<React.SetStateAction<null>>;
}