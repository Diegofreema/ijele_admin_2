import { Database } from './supabase';

export type MatchesType = Database['public']['Tables']['matches']['Row'];

export type ImageType = Database['public']['Tables']['images']['Row'];
export type VideoType = Database['public']['Tables']['videos']['Row'];
export type NewsType = Database['public']['Tables']['news']['Row'];
export type ProductType = Database['public']['Tables']['products']['Row'];
export type PlayersType =
  Database['public']['Tables']['players_statistics']['Row'];
export type MenType = Database['public']['Tables']['men']['Row'];
export type OrderType = Database['public']['Tables']['orders']['Row'];
export type OrderItemType = Database['public']['Tables']['order_items']['Row'];
export type MemberType = Database['public']['Tables']['users']['Row'];

export type PType = {
  description: string;
  id?: number;
  image_url: string;
  number_in_stock: number;
  price: number;
  product_name: string;
  category: string;
};
export type MatchResult = Database['public']['Enums']['RESULT'];
export type PositionEnum = Database['public']['Enums']['ROLE'];
export type CatType = Database['public']['Enums']['VIDEO_TYPE'];
export type DUTY = Database['public']['Enums']['DUTY'];

export type ORDER = {
  created_at: string | null;
  id: number;
  order_id: number | null;
  productId: any;
  quantity: number;
};
export type MatchType = {
  attendance: number;
  away_score: number;
  away_team: string;
  away_team_img: string;

  date_of_match: string;
  home_score: number;
  home_team: string;
  home_team_img: string;
  kick_off: string;
  match_result: MatchResult;
  ref_name: string;
  venue: string;
  league: string;
};

export type TypeMen = {
  age: string;
  bio: string;
  contract_end_date: string;
  contract_start_date: string;
  contract_type: string;
  first_name: string;
  height: string;
  image_url: string;
  injured: boolean;
  last_name: string;
  leave: boolean;
  jersey_number: number;
  lga: string;
  nationality: string;

  ROLE: PositionEnum;
  middle_name: string;
  skill_descriptions: string;
  wage_per_week: number;
  suspended: boolean;
  loan_away: boolean;
  loan_home: boolean;
  state_of_origin: string;
  weight: string;
  DUTY: DUTY;
};
