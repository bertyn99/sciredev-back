import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index({ unique: true })
  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  password: string;
}
