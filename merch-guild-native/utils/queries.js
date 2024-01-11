import { gql } from '@apollo/client';

export const GET_ME = gql`

query Me {
    me {
    _id
    username
  }
}
`;

export const GET_LISTING = gql`
query GetListing($have: [haveWant], $want: [haveWant]) {
  getListing(have: $have, want: $want) {
    _id
    user
    owner
    have {
      _id
      rarity
      name
      enchantments {
        property
        value
      }
    }
    want {
      _id
      rarity
      name
      enchantments {
        property
        value
      }
    }
    description
    createdAt
    ownership
    updatedAt
  }
}
`;