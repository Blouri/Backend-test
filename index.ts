import * as scalars from './scalars'
import { prisma } from './db.js'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer} from '@apollo/server/standalone';
import { gql } from 'graphql-tag';


( async function () {

    const typeDefs = gql`
    scalar DateTime
    
    type Country {
      id: String!
      name: String
      createdAt: DateTime!
      updatedAt: DateTime
      user: [User!]!
    }
  
    type Role {
      id: String!
      name: Enum_RoleName!
      createdAt: DateTime!
      user: [User!]!
    }
  
    type Session {
      id: String!
      sessionToken: String!
      userId: String!
      expiresAt: DateTime!
      createdAt: DateTime!
      user: User!
    }
  
    type User {
      id: String!
      email: String!
      emailVerified: DateTime
      termsAndConditionsAccepted: DateTime
      name: String
      image: String
      position: String
      createdAt: DateTime!
      updatedAt: DateTime
      roleId: String
      session: [Session!]!
      role: Role
      userMonitoring: [UserMonitoring!]!
      country: [Country!]!
    }
  
    type UserMonitoring {
      id: String!
      usage: Int!
      description: String!
      userId: String!
      createdAt: DateTime!
      user: User!
    }

    type UserMonitoringStats {
      user: User!
      monitoringCount: Int!
    }
  
    enum Enum_RoleName {
      Admin
      Manager
      User
    }

      type Query {
        allUsers: [User!]!
        userByEmail(email: String!): User
        allCountries: [Country!]!
        userMonitoringInRange(email: String!, startDate: DateTime!, endDate: DateTime!): [UserMonitoring]
        topUsersByMonitoring(startDate: DateTime!, endDate: DateTime!): [UserMonitoringStats]        
      }      
    `

    
    const resolvers = {
        Query: {        
          
            allUsers : async () => {
                return await prisma.user.findMany();
            },

            topUsersByMonitoring: async (_, { startDate, endDate }) => {
              const result = await prisma.$queryRaw`
                SELECT userId, COUNT(*) as monitoringCount
                FROM UserMonitoring
                WHERE createdAt BETWEEN ${startDate} AND ${endDate}
                GROUP BY userId
                ORDER BY monitoringCount DESC
                LIMIT 3
              `;
        
              // El resultado es un array de objetos con propiedades user y monitoringCount
              return result;
            },           

            

            userByEmail: async (_, { email }) => {
                return await prisma.user.findUnique({ where: { email } });
            },

            allCountries: async () => {
                return await prisma.country.findMany();
            },          
                       
            userMonitoringInRange: async (_, { email, startDate, endDate }) => {
              // Convert startDate and endDate to ISO-8601 strings
              const isoStartDate = new Date(startDate).toISOString();
              const isoEndDate = new Date(endDate).toISOString();
            
              // Obtener el ID del usuario basado en el correo electrónico
              const user = await prisma.user.findUnique({
                where: { email },
              });
            
              if (!user) {
                throw new Error("Usuario no encontrado");
              }
            
              // Obtener UserMonitoring en el rango de fechas
              const userMonitoringInRange = await prisma.userMonitoring.findMany({
                where: {
                  userId: user.id,
                  createdAt: {
                    gte: isoStartDate,
                    lte: isoEndDate,
                  },
                },              
                
              });
            
              return userMonitoringInRange;
            },



            

            
            

        },
        User: {
            session: async (parent) => prisma.user.findUnique({ where: { id: parent.id } }).Session(),
            role: async (parent) => prisma.user.findUnique({ where: { id: parent.id } }).Role(),
            userMonitoring: async (parent) => prisma.user.findUnique({ where: { id: parent.id } }).UserMonitoring(),
            country: async (parent) => prisma.user.findUnique({ where: { id: parent.id } }).Country(),
        }
    }

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        
    });

    const { url } = await startStandaloneServer(server, {
        listen: {port:4000}
    });

    console.log("Server is ready at " + url);
}());