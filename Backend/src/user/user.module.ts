import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../Entities/user.entity';
import { Tenant } from 'src/Entities/tenant';
import { BoardMember } from 'src/Entities/boardmember';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity, Tenant, BoardMember])],
    controllers: [UserController],
    providers: [UserService, AuthService, JwtService],
    exports: [UserService]
})

export class UserModule {}