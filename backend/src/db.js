const { Prisma } = require('prisma-binding')
const db = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.NODE_ENV === 'development' ? process.env.PRISMA_ENDPOINT_DEV : process.env.PRISMA_ENDPOINT, //'https://eu1.prisma.sh/erik-olsson-2ad37b/chat-backend/dev',
    secret: process.env.PRISMA_SECRET,
    debug: false,
})

module.exports = db