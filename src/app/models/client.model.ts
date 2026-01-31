export enum Tier {
  PLATINUM = "Platinum",
  GOLD = "Gold",
  SILVER= "Silver",
  BRONZE = "Bronze"
}

export interface Client {
  clientId: string;
  name?: string;
  tier: Tier;
  country: string;
}
