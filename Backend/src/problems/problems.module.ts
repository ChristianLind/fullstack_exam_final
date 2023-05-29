import { Module } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemsController } from './problems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from './entities/problem.entity';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/Entities/user.entity';
import { Tenant } from 'src/Entities/tenant';
import { AuthModule } from 'src/auth/auth.module'; 
import { BoardMember } from 'src/Entities/boardmember';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
    imports:[TypeOrmModule.forFeature([Problem, UserEntity, Tenant, BoardMember]), AuthModule, HttpModule],
    controllers: [ProblemsController],
    providers: [ProblemsService, UserService]
  })
  export class ProblemsModule {}