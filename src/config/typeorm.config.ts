import { Injectable } from '@nestjs/common'
import * as dotenv from 'dotenv'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { join } from 'path'
import * as fs from 'fs/promises';

dotenv.config({path: '.development.env'})


@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
    config: TypeOrmModuleOptions
    private database = process.env.ENVIRONMENT === 'production' ? 
                            process.env.PROD_DB :
                            process.env.DEV_DB
    async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        let aivenCloudCertificate = await fs.readFile('aiven_credentials.txt', {encoding: 'utf-8'});
        
        let data = await fs.readFile('credentials.json', {encoding: 'utf-8'})
        
        let creds = new Object(JSON.parse(data))
        
        return {
            type: 'postgres',
            ...creds,
            database: this.database,
            ssl: {
                rejectUnauthorized: true,
                ca: aivenCloudCertificate
            }, 
            entities: [join(__dirname, '..', 'entities', '*.entity.{ts,js}')],
            // entities: [User, Profile],
            synchronize: process.env.ENVIRONMENT == 'prod' ? false : true,
            autoLoadEntities: true
        }
    }
}