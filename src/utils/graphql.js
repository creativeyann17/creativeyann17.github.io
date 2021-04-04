import { GraphQLClient } from 'graphql-request';
import { buildAPIRequestUrl } from './index';

const graphQLClient = new GraphQLClient(buildAPIRequestUrl('/graphql'));

export default graphQLClient;
