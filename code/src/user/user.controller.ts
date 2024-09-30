import { Controller, Get, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("user")
@Controller('user')
export class UserController {
    @Get('/profile')
    async getUserProfile() {
        return {message: "Not yet built"}
    }

    @Patch('/profile')
    async editUserProfile() {
        return {message: "Not yet available"}
    }
}
