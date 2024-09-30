import { Controller, Get, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config({path: '.dev.env'})


@ApiTags("/api/user")
@Controller('/api/user')
export class UserController {
    @Get('/profile')
    async getUserProfile() {
        const data = process.env.ENVIRONMENT
        console.log(data)
        return {message: "Not yet built"}
    }

    @Patch('/profile')
    async editUserProfile() {
        return {message: "Not yet available"}
    }
}
