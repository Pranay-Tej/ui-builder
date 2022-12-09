import { gql } from "graphql-request";

export const GetComponents = gql`
  query GetComponents {
    components {
      type
      id
    }
  }
`;
