import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './DTOs/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService : UserService,
        private readonly authService: AuthService
    ) {}

    //Gets all users
    @UseGuards(JwtAuthGuard)
    @Get()
    getUsers() {
        return this.userService.findAll();
    }

    //Gets a user by id
    @Get(':id')
    getBookingsByID(@Param('id') id : number) {
        return this.userService.findById(Number(id));
    }
    
    //creates user
    @Post()
    async createUser(@Body() createUser : UserDTO) : Promise<any> {
        const user = await this.userService.create(createUser);
        return this.authService.login(user);
    }
    
    //updates a user by id
    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() user : UserDTO) {
        return this.userService.update(id, user);
    }
    
    //deletes a user by id
    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        this.userService.delete(id);
    }
}