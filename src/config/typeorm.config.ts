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
        console.log(process.env.ENVIRONMENT)
        const certificatePath = join(__dirname, '..', '..', 'aiven_credentials.txt')
        // const path = join(__dirname, '..', '..')
        // const items = await fs.readdir(path, { withFileTypes: true });
        // const result = items.map(item => {
        //     // Prefix folder names with a slash
        //     return item.isDirectory() ? `${item.name}/` : item.name;
        // });
        // console.log(result)
        let aivenCloudCertificate = await fs.readFile(certificatePath, {encoding: 'utf-8'});
       
        const credentialPath = join(__dirname, '..', '..', 'credentials.json'); 
        let data = await fs.readFile(credentialPath, {encoding: 'utf-8'})

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