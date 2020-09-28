import gql from 'graphql-tag';

const typeDefs = gql`
    extend type Mutation{
        isLoggedin:Boolean!,   
    }   
`;

export default typeDefs;