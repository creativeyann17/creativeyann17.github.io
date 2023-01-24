// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Article } = initSchema(schema);

export {
  Article
};