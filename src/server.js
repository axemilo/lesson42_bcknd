import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import sequelize from './database/db.js'
const users = [
  {
    user_id: 1,
    username: 'Kanye West',
    balance: 49,
  },
  {
    user_id: 2,
    username: 'Futaba Sakura',
    balance: 32,
  },
]

const typeDefs = `
  type Query {
    users: [User]
  }

  type User {
    userId: Int!,
    username: String!,
    balance: Int
  }

  type Games {
    gameId: Int!,
    game_name: String!,
    year: Int!,
    game_price: Int!
  }
  type Mutation {
    createUser(username: String, balance: Int): String!
    updateUser(userId: Int!, username: String!): String!
    deleteUser(userId: Int!): String!
  }
`

const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation: {
    createUser: async (root, body) => {
      const { username, balance } = body
      const newUser = {
        user_id: users.length + 1,
        username,
        balance,
      }
      users.push(newUser)
      return 'added'
    },
    updateUser: async (root, body) => {
      const { username, userId } = body
      const user = users.find((u) => u.user_id == userId)
      console.log(user)
      user.username = username
      return 'updated'
    },
    deleteUser: async (root, body) => {
      const { userId } = body
      const user = users.find((u) => (u.user_id = userId))
      users.splice(userId, 1)
      return 'deleted'
    },
  },
  User: {
    userId: (parent) => parent.user_id,
  },
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server)

console.log(`🚀 Server ready at ${url}`)

try {
  await sequelize.authenticate()
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}
