# Boilerplate NestJS

Boilerplate feito por minha autoria para criar facilmente novos projetos pessoais, além é claro, de auxiliar qualquer um que queira aprender sobre NestJS =).

Primeiro, instale as dependências do projeto:
`yarn install`

Inicie o Docker com `docker-compose up` para gerar as instâncias do PostgreSQL e Redis (Sinta-se a vontade para alterar o nome da instância como as credenciais de acesso).

Execute `yarn prisma migrate dev` para criar os esquemas no banco de dados.

Inicie o projeto com `yarn start:dev`

Para visualizar a documentação, acesse [http://localhost:3000/docs](http://localhost:3000/docs)

A chave privada e a chave pública foram geradas em RSA e convertidas para base64.

## Utilitários:
[https://cryptotools.net/rsagen](https://cryptotools.net/rsagen)
[https://www.base64encode.org/](https://www.base64encode.org/)
