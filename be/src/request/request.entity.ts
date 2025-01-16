import { Field, GraphQLISODateTime, InputType, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum RequestType {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
};

registerEnumType(RequestType, {
  name: 'RequestType',
});

@InputType('RequestInput')
@ObjectType('RequestObject')
@Entity('requests')
export class Request {
  @Field(type => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  request_id: number

  @Field(type => RequestType, { nullable: true })
  @Column({ type: 'enum', enum: RequestType, default: RequestType.pending })
  status: RequestType;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  product: string;

  @Field(type => Int)
  @Column({ type: 'integer' })
  price: number;
  
  @Field(type => Int)
  @Column({ type: 'integer' })
  quantity: number;
  
  @Field(type => GraphQLISODateTime, { nullable: true })
  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  request_time: Date;

  @Field(type => GraphQLISODateTime, { nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  response_time: Date;
}
