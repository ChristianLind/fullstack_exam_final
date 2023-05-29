import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult } from 'typeorm';
import { DeleteResult } from 'typeorm';
import { UserEntity } from '../Entities/user.entity';
import { UserDTO } from './DTOs/user.dto';
import { Tenant } from 'src/Entities/tenant';
import { BoardMember } from 'src/Entities/boardmember';
import * as bcrypt from 'bcrypt';

//update "any" til "userentity"
export type User = any;

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(Tenant) private tenantRepository: Repository<Tenant>,
    @InjectRepository(BoardMember) private boardMemberRepository: Repository<BoardMember>) {}

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find()
    }

    async findById(id: number): Promise<UserEntity> {
        return await this.userRepository.findOneBy({id: id});
    }

    async findOne(username: string): Promise<UserEntity> {
        const result = await this.userRepository.findOne({where: {username: username}, relations: {tenant: true}});
        
        return result;
    }

    async findByUsername(username: string): Promise<UserEntity> {
        return await this.userRepository.findOneBy({username: username});
    }

    // async create(user: UserDTO) : Promise<UserEntity> {
    //     const newUser = user;
    //     const hash = await bcrypt.hash(user.password, 10);
    //     newUser.password = hash
    //     return await this.userRepository.save(newUser)
    // }

    async create(user: UserDTO): Promise<UserEntity> {
        const newUser = user;
      
        // Verify that the password is provided
        if (user.password) {
          const hash = await bcrypt.hash(user.password, 10);
          newUser.password = hash;
        } else {
          throw new Error('Password is required.');
        }
      
        return await this.userRepository.save(newUser);
      }
      

    async update(id: number, newProfile: UserDTO) : Promise<UpdateResult> {
        return await this.userRepository.update(id, newProfile);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id)
    }

    async create_tenant(username: string, password: string, email: string) : Promise<Tenant> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user: User = { username, password: hashedPassword };
        
        const savedUser = await this.userRepository.save(user);
        const tenant = { email, user: savedUser }
        const savedTenant = await this.tenantRepository.save(tenant);

        return savedTenant;
    }



    async findRole(id: number) : Promise<User> {
        const user: User = {id};

        const result = await this.tenantRepository.findOne({ 
            where: 
            {
                id: user.id
            }, relations: {
                user: true
            }
        });
        console.log("result", result);
        return result;
    }

    async create_boardMember(username: string, password: string, email: string, phone: string) : Promise<BoardMember> {
        const user: User = {username, password, phone};
        
        const savedUser = await this.userRepository.save(user);
        const boardMember = { email, user: savedUser }
        const savedBoardMember = await this.boardMemberRepository.save(boardMember);

        return savedBoardMember;
    }
}