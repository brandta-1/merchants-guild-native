import { gql } from '@apollo/client';

export const LOGIN_USER = gql`

mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const SET_USER = gql`

mutation SetUser($username: String!, $password: String!) {
  setUser(username: $username, password: $password) {
    token
    user {
      _id
      username
    }
  }
}


 `;

export const SET_LISTING = gql`
 mutation SetListing($have: [haveWant], $want: [haveWant], $owner: String, $description: String) {
    setListing(have: $have, want: $want, owner: $owner, description: $description){
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
        updatedAt
    }
}
 
 `;

export const DELETE_LISTING = gql`
    mutation DeleteListing($listing: ID) {
        deleteListing(listing: $listing) {
            _id
        }
    }
 `;



