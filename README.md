# Casa do Hambúrguer

Projeto de estudos em desenvolvimento **full stack**. A aplicação simula uma hamburgueria: apresenta um cardápio por categoria, permite criar uma conta e entrar, e reúne interfaces de carrinho e acompanhamento de pedidos. O objetivo é praticar a integração entre React, uma API em Express e um banco PostgreSQL.

> O projeto ainda está em desenvolvimento. Algumas telas e ações são protótipos e não representam um fluxo de compra completo.

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Front-end | React, TypeScript, Vite, React Router, Tailwind CSS e Lucide React |
| Back-end | Node.js, Express, TypeScript, Prisma e PostgreSQL |
| Autenticação | bcrypt para senhas e JWT armazenado em cookie |

## Funcionalidades atuais

- Cardápio carregado da API, com filtros para hambúrgueres, bebidas e porções.
- Cadastro, login, consulta da sessão e logout.
- Cabeçalho adaptado ao usuário autenticado, com opções adicionais para administradores.
- Exclusão de produtos pela interface administrativa e pela API.
- Interface de carrinho com itens de exemplo.
- Página de pedidos com um pedido de exemplo e categorias de status.

O carrinho ainda não é persistido nem finaliza pedidos. A página de pedidos não consulta uma API e a mudança de status ainda não está conectada ao back-end. O modelo `CartItem` já existe no banco, mas não possui rotas próprias. Também não há rota para cadastrar ou editar produtos; os dados precisam ser inseridos diretamente no banco por enquanto.

## Estrutura do repositório

```text
.
├── back-end/
│   ├── index.ts              # Inicialização do servidor
│   ├── prisma/               # Esquema do banco e migrações
│   └── src/                  # Conexão, rotas, controladores e middleware
└── front-end/
    ├── public/               # Imagens dos produtos e logo
    └── src/
        ├── components/       # Componentes de interface
        ├── contexts/         # Estado do usuário
        ├── pages/            # Cardápio, login, cadastro e pedidos
        ├── types/            # Tipos TypeScript
        └── utils/            # Funções auxiliares
```

## Como executar localmente

Você precisa de Node.js, npm e PostgreSQL. Os exemplos abaixo usam npm; o repositório também contém arquivos `yarn.lock`. Execute os comandos a partir da raiz do projeto.

1. Crie um banco PostgreSQL e configure `back-end/.env`:

   ```dotenv
   DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO"
   JWT_SECRET="substitua-por-uma-chave-secreta"
   ```

2. Instale as dependências, aplique as migrações, gere o cliente Prisma e inicie a API:

   ```bash
   cd back-end
   npm install
   npx prisma migrate deploy
   npx prisma generate
   npm run dev
   ```

3. Em outro terminal, inicie a interface:

   ```bash
   cd front-end
   npm install
   npm run dev
   ```

A API usa `http://localhost:3000`. O front-end usa o endereço local exibido pelo Vite, normalmente `http://localhost:5173`. Essas URLs estão definidas diretamente no código para o ambiente local. As migrações criam a estrutura do banco, mas não inserem produtos; o cardápio precisa de registros na tabela `Product` para mostrar itens.

## Rotas disponíveis

| Método | Rota | Finalidade |
| --- | --- | --- |
| `POST` | `/register` | Cadastrar usuário |
| `POST` | `/login` | Autenticar e criar o cookie de sessão |
| `GET` | `/me` | Consultar o usuário autenticado |
| `POST` | `/logout` | Encerrar a sessão |
| `GET` | `/get-products` | Listar produtos |
| `DELETE` | `/delete-product/:id` | Excluir produto mediante autenticação |

No front-end, `/` mostra o cardápio, `/login` e `/register` exibem os formulários e `/pedidos` mostra a interface de pedidos. A rota de exclusão ainda requer revisão da checagem de administrador antes de ser usada como controle de acesso confiável.

## Comandos úteis

Na pasta `front-end`, `npm run build` compila a aplicação e `npm run lint` executa o ESLint. Na pasta `back-end`, `npm run dev` inicia o servidor com recarga automática. Ainda não há uma suíte de testes configurada para o back-end.
