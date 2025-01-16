import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity('productlogs')
export class ProductLog {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  log_id: number;

  @Field()
  @Column()
  action_type: string;

  @Field()
  @Column()
  product_name: string;

  @Field(type => Int, { nullable: true })
  @Column({ type: 'int', nullable: true })
  old_quantity: number;

  @Field(type => Int, { nullable: true })
  @Column({ type: 'int', nullable: true })
  new_quantity: number;

  @Field(type => GraphQLISODateTime, { nullable: true })
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
