import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';
import dotenv from 'dotenv';
import { TypeInfo } from '.keystone/types';

dotenv.config();

export default withAuth(
  config<TypeInfo>({
    db: {
      provider: 'sqlite',
      url: process.env.DATABASE_URL as string,
    },
    lists,
    session,
    server: {
      cors: true,
    },
  })
);
