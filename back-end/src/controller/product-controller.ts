import type { Request, Response } from "express"
import { prisma } from "../db.js"

export const getProducts = async (request: Request, response: Response) => {
    try {
        const products = await prisma.product.findMany();

        if(products.length === 0){
            response.status(404).json({ message: "Não foram encontrados produtos"});
            return
        }
        
        response.json(products)
        
    } catch (error) {
        response.status(500).json({message: "Erro no servidor"});
        return;
    }
}

export const deleteProducts = async (request: Request, response: Response) => {
    try {
        const { users } = request;
        const { id }= request.params;

        if (users?.admin){
            response.status(400).json({ message: "Usuário não altenticado"});
            return;
        }

        if(!id){
            response.status(400).json({message: "ID não encontrado"});
            return;
        }

        const deletedProduct = await prisma.product.delete({
            where: {id: id},
        });

        if(!deleteProducts){
            response.status(404).json({message: "Erro ao deletar o produto"});
        }

        response.json(id)
    } catch (error: any) {
        if(error.code === "P2025"){
            response.json({message: "Produto não encontrado"});
            return;
        }
        response.status(500).json({message: "Erro no servidor"});
        return;
    }
}