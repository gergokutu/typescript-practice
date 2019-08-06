// src/users/entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsEmail, MinLength } from 'class-validator'

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
  @Column('text', {nullable:false})
  firstName: string

  @IsString()
  @MinLength(2)
  @Column('text', {nullable:false})
  lastName: string

  @IsString()
  @MinLength(3)
  @Column('text', {nullable:false})
  email: string

  @IsEmail()
  @Column('text')
  city: string
}