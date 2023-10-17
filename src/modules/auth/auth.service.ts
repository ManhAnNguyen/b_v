import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { ILogin, IRegister } from './interface';
import { ACCESS_TOKEN, HASH_PWD, REFRESH_TOKEN } from 'src/common/utils/env';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  //findOne
  async findOne(username: string, checkAvailable: boolean) {
    const user = await this.userModel.findOne({
      username,
    });

    if (checkAvailable && !!user)
      throw new ConflictException(`${username} is not available`);

    if (!checkAvailable && !user)
      throw new NotFoundException(`${username} is not found`);

    if (!checkAvailable) return user;
  }

  //register
  async register({ username, password }: IRegister) {
    await this.findOne(username, true);
    const hashedPwd = bcrypt.hashSync(password, HASH_PWD);
    (await this.userModel.create({ username, password: hashedPwd })).save();
  }

  //login
  async login({ username, password }: ILogin) {
    const user = await this.findOne(username, false);
    const comparePwd = bcrypt.compareSync(password, user.password);

    if (!comparePwd)
      throw new UnauthorizedException('username or password is not correct');
    const infoUser = {
      user_id: user.id,
      username: user.username,
      role: user.role,
    };

    //create token and send to client
    const accessToken = this.jwtService.sign(infoUser, {
      secret: ACCESS_TOKEN,
    });

    //create refresh token and save in db and send to client via cookie
    const refreshToken = this.jwtService.sign(infoUser, {
      secret: REFRESH_TOKEN,
    });

    user.refreshToken = refreshToken;

    await this.userModel.findByIdAndUpdate(user.id, {
      refreshToken,
    });

    return { refreshToken, accessToken };
  }
}
