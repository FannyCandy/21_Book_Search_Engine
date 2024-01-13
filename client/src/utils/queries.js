import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            bookCount
            saveBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

// queries.js: This will hold the query GET_ME, which will execute the me query set up using Apollo Server.

