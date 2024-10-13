# Boilerplate NestJS

First install project dependencies:
`yarn install`

Start docker with `docker-compose up` to generate Postgre and Redis instances.

Execute `yarn prisma migrate dev` to create the schemas on Database.

Start the project with `yarn start:dev`

To view documentation, use [http://localhost:3000/docs](http://localhost:3000/docs)

The private and public key was generated in RSA and converted to base64.

## Utils:

https://cryptotools.net/rsagen

https://www.base64encode.org/