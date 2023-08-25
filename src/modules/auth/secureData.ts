import * as bcrypt from 'bcrypt';

export class SecureData {
  async hashData(data: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(data, salt);
  }
  async isHashDataMatch(data: string, hashData: string): Promise<boolean> {
    return await bcrypt.compare(data, hashData);
  }
}