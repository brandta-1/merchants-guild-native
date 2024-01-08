const { gql } = require('apollo-server-express');

const typeDefs = gql`

scalar Date

type User {
        _id: ID!
        username: String!
    }

    type Listing {
    _id: ID
    user: ID
    owner: String
    ownership: Boolean
    have: [Item]
    want: [Item]
    description: String
    createdAt: Date,
    updatedAt: Date
}

type Item {
    _id: ID!
    rarity: String
    name: String
    enchantments: [Enchantment]
}

type Enchantment {
    property: String
    value: Float
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    getListing(have: [haveWant], want: [haveWant]): [Listing]
}

type Mutation {

    setUser(username: String!, password: String!): Auth

    login(username: String!, password: String!): Auth

    setListing( have: [haveWant], want: [haveWant], owner: String, description: String): Listing
    
    deleteListing(listing: ID): Listing
}

input haveWant {
    name: String,
    rarity: String,
    enchantments: [enchantments]
}

input enchantments {
    property: String,
    value: Float
}
`;

module.exports = typeDefs;