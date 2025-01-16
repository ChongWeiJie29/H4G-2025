export enum ProductTag {
  Electronics = "Electronics",
  Clothing = "Clothing",
  HomeAppliances = "Home Appliances",
  Beauty = "Beauty",
  Books = "Books",
  Sports = "Sports",
  FoodAndBeverages = "Food & Beverages",
  HealthAndWellness = "Health & Wellness",
  ToysAndGames = "Toys & Games",
  Automotive = "Automotive",
  Furniture = "Furniture",
  OfficeSupplies = "Office Supplies",
  Music = "Music",
  ArtAndCrafts = "Art & Crafts",
  PetSupplies = "Pet Supplies",
  Jewelry = "Jewelry",
  BabyProducts = "Baby Products",
}

export interface Product {
  name: string;
  tag: string;
  link: string;
  price: number;
  quantity: number;
  description: string;
}

