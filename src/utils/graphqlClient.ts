import { BASE_URL } from "@/constants/app.constants";
import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(BASE_URL);
