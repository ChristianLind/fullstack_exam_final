import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Tenant } from 'src/Entities/tenant';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signup_tenant(user: any) {
        return this.userService.create_tenant(user.username, user.password, user.email);
    }

    
    async signup_board_member(user: any) {
        // return this.usersService.create(user.username, user.password);
    }
    async signup(user: any) {
        return this.userService.create(user);
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findByUsername(username);

        if (user === null) {
            throw new NotFoundException("This user does not exist");
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (user && validPassword === true) {
        //const { password, ...result } = user;
        console.log("user found but wrong password", user);
        
        return user;
        }
        throw new UnauthorizedException("Wrong password");
    }

    async login(user: any) {
        //console.log(user);
        const payload = { 
            username: user.username, 
            id: user.id, 
            //tenantId: user.tenant.id
        };
        return {
            access_token: this.jwtService.sign(payload),
            tenant_name: Tenant.name.toString(),
        };
    }
}