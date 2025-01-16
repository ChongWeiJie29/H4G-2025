export enum ProductTag {
  HealthAndWellness = "HealthAndWellness",
  EducationAndLearning = "EducationAndLearning",
  SportsAndRecreation = "SportsAndRecreation",
  ClothingAndApparel = "ClothingAndApparel",
  PersonalCare = "PersonalCare",
  FoodAndBeverages = "FoodAndBeverages",
  FurnitureAndBedding = "FurnitureAndBedding",
  ToysAndGames = "ToysAndGames",
  ArtAndCraftSupplies = "ArtAndCraftSupplies",
  SafetyAndSecurity = "SafetyAndSecurity",
  HygieneAndSanitation = "HygieneAndSanitation",
  FurnitureAndStorage = "FurnitureAndStorage",
  EventsAndCelebrations = "EventsAndCelebrations",
  VolunteerAndDonation = "VolunteerAndDonation",
  TechnologyAndLearningTools = "TechnologyAndLearningTools"
}

export enum ProductTagPlaceholders {
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

export interface Product {
  name: string;
  tag: string;
  link: string;
  price: number;
  quantity: number;
  description: string;
}

