import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';

export class SecureData {
  async hashData(data: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(data, salt);
  }
  async isHashDataMatch(data: string, userWithHashedPwd: User): Promise<boolean> {
    let result:any ;
    if (userWithHashedPwd === null ) {
      result = false;
    }else{
      result = await bcrypt.compare(data, userWithHashedPwd.password);
    }    
    return result
  }
}