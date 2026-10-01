import type { Request, Response } from "express";
import { prisma } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      response
        .status(400)
        .json({ message: "E-mail e senha são obrigatorios." });
      return;
    }

    const users = await prisma.users.findFirst({
      where: { email },
    });

    if (!users) {
      response.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    const match = await bcrypt.compare(password, users?.password);

    if (!match) {
      response.status(401).json({ message: "Usuario não encotrado" });
      return;
    }

    const userInfos = {
      id: users.id,
      name: users.name,
      email: users.email,
      cep: users.cep,
      admin: users.admin,
    };

    if (!process.env.JWT_SECRET) {
      return;
    }

    const token = jwt.sign(userInfos, process.env.JWT_SECRET);

    response.cookie("user", token, {
      maxAge: 18000000,
    });

    response.status(200).json(userInfos);
  } catch (error) {
    response.status(500).json({ message: "Erro no servidor" });
    return;
  }
};

export const register = async (resquest: Request, response: Response) => {
  try {
    const { name, email, password, cep } = resquest.body;

    if (!name || !email || !password || !cep) {
      response
        .status(400)
        .json({ message: "Todas as informações são obrigatorias" });
      return;
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.users.findFirst({
      where: { email: email },
    });

    if (user?.email) {
      response.status(409).json({ message: "Email já cadastrado" });
      return;
    }

    const newUser = await prisma.users.create({
      data: { name: name, email: email, password: hash, cep: cep },
    });

    response.status(201).json(newUser);
  } catch (error) {
    response.status(500).json({ message: "Erro no servidor" });
  }
};

export const auth = async (request: Request, response: Response) => {
  const token = request.cookies.user;

  try {
    const { user } = request;
    response.status(200).json(user);
  } catch (error) {
    response.status(500).json({ message: "Erro no servidor" });
    return;
  }
};

export const logout = async (request: Request, response: Response) => {
  const { user } = request.cookies;

  if (user) {
    response.clearCookie("user");
    response.json({ message: "Usuario deslogado" });
  }

  console.log(user);
};
