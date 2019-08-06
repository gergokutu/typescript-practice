// src/users/entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsEmail, MinLength } from 'class-validator'
// we won't seen the password in the returned JSON
import { Exclude } from 'class-transformer'
import * as bcrypt from 'bcrypt'

// Validate:
// That the firstName and lastName are both strings, with minimum of two characters
// That the city is also a string and minimum three characters
// That the email address is a valid email address

@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MinLength(2)
  @Column('text', { nullable: false })
  firstName: string

  @IsString()
  @MinLength(2)
  @Column('text', { nullable: false })
  lastName: string

  @IsString()
  @IsEmail()
  @MinLength(3)
  @Column('text', { nullable: false })
  email: string

  @IsString()
  @Column('text')
  city: string

  @IsString()
  @MinLength(8)
  @Column('text', { nullable:true })
  @Exclude({ toPlainOnly: true })
  password: string

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }
}