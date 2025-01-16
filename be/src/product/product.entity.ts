import { Field, InputType, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Entity, Column, PrimaryColumn } from 'typeorm';

export enum ProductTag {
  HealthAndWellness = "Health & Wellness",
  EducationAndLearning = "Education & Learning",
  SportsAndRecreation = "Sports & Recreation",
  ClothingAndApparel = "Clothing & Apparel",
  PersonalCare = "Personal Care",
  FoodAndBeverages = "Food & Beverages",
  FurnitureAndBedding = "Furniture & Bedding",
  ToysAndGames = "Toys & Games",
  ArtAndCraftSupplies = "Art & Craft Supplies",
  SafetyAndSecurity = "Safety & Security",
  HygieneAndSanitation = "Hygiene & Sanitation",
  FurnitureAndStorage = "Furniture & Storage",
  EventsAndCelebrations = "Events & Celebrations",
  VolunteerAndDonation = "Volunteer & Donation",
  TechnologyAndLearningTools = "Technology & Learning Tools"
}

registerEnumType(ProductTag, {
  name: 'ProductTag',
})

@InputType('ProductInput')
@ObjectType('ProductObject')
@Entity('products')
export class Product {
  @Field()
  @PrimaryColumn()
  name: string;

  @Field(type => Int)
  @Column({ type: 'integer' })
  price: number;

  @Field(type => Int)
  @Column({ type: 'integer' })
  quantity: number;

  @Field()
  @Column()
  description: string;

  @Field(type => ProductTag)
  @Column()
  tag: ProductTag;

  @Field({ nullable: true })
  @Column()
  link: string;
}
