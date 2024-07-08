export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      cart: {
        Row: {
          id: number;
          productId: number | null;
          quantity: number | null;
          userId: string | null;
        };
        Insert: {
          id?: number;
          productId?: number | null;
          quantity?: number | null;
          userId?: string | null;
        };
        Update: {
          id?: number;
          productId?: number | null;
          quantity?: number | null;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'cart_productId_products_id_fk';
            columns: ['productId'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_userId_users_user_id_fk';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          },
        ];
      };
      favorite: {
        Row: {
          id: number;
          productId: number | null;
          userId: string | null;
        };
        Insert: {
          id: number;
          productId?: number | null;
          userId?: string | null;
        };
        Update: {
          id?: number;
          productId?: number | null;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'favorite_productId_products_id_fk';
            columns: ['productId'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'favorite_userId_users_user_id_fk';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          },
        ];
      };
      images: {
        Row: {
          created_at: string | null;
          id: number;
          image_url: string;
        };
        Insert: {
          created_at?: string | null;
          id: number;
          image_url: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          image_url?: string;
        };
        Relationships: [];
      };
      loaned_in: {
        Row: {
          club_id: number | null;
          created_at: string | null;
          from: string | null;
          id: number;
          player_id: number | null;
          to: string | null;
          wage_paidby_external_club: number | null;
          wage_paidby_ijele: number | null;
        };
        Insert: {
          club_id?: number | null;
          created_at?: string | null;
          from?: string | null;
          id: number;
          player_id?: number | null;
          to?: string | null;
          wage_paidby_external_club?: number | null;
          wage_paidby_ijele?: number | null;
        };
        Update: {
          club_id?: number | null;
          created_at?: string | null;
          from?: string | null;
          id?: number;
          player_id?: number | null;
          to?: string | null;
          wage_paidby_external_club?: number | null;
          wage_paidby_ijele?: number | null;
        };
        Relationships: [];
      };
      loaned_out: {
        Row: {
          club_id: number | null;
          created_at: string | null;
          from: string | null;
          id: number;
          player_id: number | null;
          to: string | null;
          wage_paidby_external_club: number | null;
          wage_paidby_ijele: number | null;
        };
        Insert: {
          club_id?: number | null;
          created_at?: string | null;
          from?: string | null;
          id: number;
          player_id?: number | null;
          to?: string | null;
          wage_paidby_external_club?: number | null;
          wage_paidby_ijele?: number | null;
        };
        Update: {
          club_id?: number | null;
          created_at?: string | null;
          from?: string | null;
          id?: number;
          player_id?: number | null;
          to?: string | null;
          wage_paidby_external_club?: number | null;
          wage_paidby_ijele?: number | null;
        };
        Relationships: [];
      };
      matches: {
        Row: {
          attendance: number | null;
          away_score: number;
          away_team: string | null;
          away_team_image: string;
          created_at: string | null;
          date_of_match: string;
          home_score: number;
          home_team: string;
          home_team_img: string;
          id: number;
          kick_off: string;
          league: string;
          ref_name: string | null;
          RESULT: Database['public']['Enums']['RESULT'] | null;
          venue: string;
        };
        Insert: {
          attendance?: number | null;
          away_score: number;
          away_team?: string | null;
          away_team_image: string;
          created_at?: string | null;
          date_of_match: string;
          home_score: number;
          home_team: string;
          home_team_img: string;
          id: number;
          kick_off: string;
          league: string;
          ref_name?: string | null;
          RESULT?: Database['public']['Enums']['RESULT'] | null;
          venue: string;
        };
        Update: {
          attendance?: number | null;
          away_score?: number;
          away_team?: string | null;
          away_team_image?: string;
          created_at?: string | null;
          date_of_match?: string;
          home_score?: number;
          home_team?: string;
          home_team_img?: string;
          id?: number;
          kick_off?: string;
          league?: string;
          ref_name?: string | null;
          RESULT?: Database['public']['Enums']['RESULT'] | null;
          venue?: string;
        };
        Relationships: [];
      };
      men: {
        Row: {
          age: string;
          bio: string | null;
          contract_end_date: string;
          contract_start_date: string;
          contract_type: string | null;
          created_at: string | null;
          DUTY: Database['public']['Enums']['DUTY'] | null;
          first_name: string;
          height: string;
          id: number;
          image_url: string;
          injured: boolean | null;
          jersey_number: number;
          last_name: string;
          leave: boolean | null;
          lga: string;
          loan_away: boolean | null;
          loan_home: boolean | null;
          middle_name: string | null;
          nationality: string;
          ROLE: Database['public']['Enums']['ROLE'] | null;
          skill_descriptions: string | null;
          state_of_origin: string;
          suspended: boolean | null;
          wage_per_week: number;
          weight: string;
        };
        Insert: {
          age: string;
          bio?: string | null;
          contract_end_date: string;
          contract_start_date: string;
          contract_type?: string | null;
          created_at?: string | null;
          DUTY?: Database['public']['Enums']['DUTY'] | null;
          first_name: string;
          height: string;
          id: number;
          image_url: string;
          injured?: boolean | null;
          jersey_number: number;
          last_name: string;
          leave?: boolean | null;
          lga: string;
          loan_away?: boolean | null;
          loan_home?: boolean | null;
          middle_name?: string | null;
          nationality: string;
          ROLE?: Database['public']['Enums']['ROLE'] | null;
          skill_descriptions?: string | null;
          state_of_origin: string;
          suspended?: boolean | null;
          wage_per_week: number;
          weight: string;
        };
        Update: {
          age?: string;
          bio?: string | null;
          contract_end_date?: string;
          contract_start_date?: string;
          contract_type?: string | null;
          created_at?: string | null;
          DUTY?: Database['public']['Enums']['DUTY'] | null;
          first_name?: string;
          height?: string;
          id?: number;
          image_url?: string;
          injured?: boolean | null;
          jersey_number?: number;
          last_name?: string;
          leave?: boolean | null;
          lga?: string;
          loan_away?: boolean | null;
          loan_home?: boolean | null;
          middle_name?: string | null;
          nationality?: string;
          ROLE?: Database['public']['Enums']['ROLE'] | null;
          skill_descriptions?: string | null;
          state_of_origin?: string;
          suspended?: boolean | null;
          wage_per_week?: number;
          weight?: string;
        };
        Relationships: [];
      };
      news: {
        Row: {
          author_name: string | null;
          category: string | null;
          created_at: string | null;
          id: number;
          image_url: string | null;
          news: string;
          title: string;
        };
        Insert: {
          author_name?: string | null;
          category?: string | null;
          created_at?: string | null;
          id: number;
          image_url?: string | null;
          news: string;
          title: string;
        };
        Update: {
          author_name?: string | null;
          category?: string | null;
          created_at?: string | null;
          id?: number;
          image_url?: string | null;
          news?: string;
          title?: string;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          created_at: string | null;
          id: number;
          order_id: number | null;
          productId: number | null;
          quantity: number;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          order_id?: number | null;
          productId?: number | null;
          quantity: number;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          order_id?: number | null;
          productId?: number | null;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'order_items_order_id_orders_id_fk';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_productId_products_id_fk';
            columns: ['productId'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
        ];
      };
      orders: {
        Row: {
          created_at: string | null;
          customer_id: string;
          id: number;
          order_date: string;
          order_id: string;
          status: Database['public']['Enums']['order_status'] | null;
          total_amount: number;
        };
        Insert: {
          created_at?: string | null;
          customer_id: string;
          id?: number;
          order_date?: string;
          order_id?: string;
          status?: Database['public']['Enums']['order_status'] | null;
          total_amount: number;
        };
        Update: {
          created_at?: string | null;
          customer_id?: string;
          id?: number;
          order_date?: string;
          order_id?: string;
          status?: Database['public']['Enums']['order_status'] | null;
          total_amount?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'orders_customer_id_users_user_id_fk';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          },
        ];
      };
      players_statistics: {
        Row: {
          appearance: number | null;
          assists: number | null;
          created_at: string | null;
          goals: number | null;
          id: number;
          name: string | null;
          player_id: number;
          red_cards: number | null;
          year: string | null;
          yellow_cards: number | null;
        };
        Insert: {
          appearance?: number | null;
          assists?: number | null;
          created_at?: string | null;
          goals?: number | null;
          id: number;
          name?: string | null;
          player_id: number;
          red_cards?: number | null;
          year?: string | null;
          yellow_cards?: number | null;
        };
        Update: {
          appearance?: number | null;
          assists?: number | null;
          created_at?: string | null;
          goals?: number | null;
          id?: number;
          name?: string | null;
          player_id?: number;
          red_cards?: number | null;
          year?: string | null;
          yellow_cards?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'players_statistics_player_id_men_id_fk';
            columns: ['player_id'];
            isOneToOne: false;
            referencedRelation: 'men';
            referencedColumns: ['id'];
          },
        ];
      };
      products: {
        Row: {
          category: string;
          created_at: string | null;
          description: string;
          id: number;
          image_url: string;
          number_in_stock: number | null;
          price: number;
          product_name: string;
        };
        Insert: {
          category: string;
          created_at?: string | null;
          description?: string;
          id?: number;
          image_url: string;
          number_in_stock?: number | null;
          price: number;
          product_name: string;
        };
        Update: {
          category?: string;
          created_at?: string | null;
          description?: string;
          id?: number;
          image_url?: string;
          number_in_stock?: number | null;
          price?: number;
          product_name?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          created_at: string | null;
          dateOfBirth: string | null;
          duration: string | null;
          email: string;
          first_name: string;
          gender: string;
          id: number;
          img_url: string | null;
          last_name: string;
          middle_name: string | null;
          password: string;
          phoneNumber: string | null;
          salutation: string | null;
          title: string | null;
          type: Database['public']['Enums']['memberType'] | null;
          user_id: string;
          userId: string;
          verified: boolean | null;
        };
        Insert: {
          created_at?: string | null;
          dateOfBirth?: string | null;
          duration?: string | null;
          email?: string;
          first_name?: string;
          gender?: string;
          id?: number;
          img_url?: string | null;
          last_name?: string;
          middle_name?: string | null;
          password?: string;
          phoneNumber?: string | null;
          salutation?: string | null;
          title?: string | null;
          type?: Database['public']['Enums']['memberType'] | null;
          user_id?: string;
          userId?: string;
          verified?: boolean | null;
        };
        Update: {
          created_at?: string | null;
          dateOfBirth?: string | null;
          duration?: string | null;
          email?: string;
          first_name?: string;
          gender?: string;
          id?: number;
          img_url?: string | null;
          last_name?: string;
          middle_name?: string | null;
          password?: string;
          phoneNumber?: string | null;
          salutation?: string | null;
          title?: string | null;
          type?: Database['public']['Enums']['memberType'] | null;
          user_id?: string;
          userId?: string;
          verified?: boolean | null;
        };
        Relationships: [];
      };
      videos: {
        Row: {
          caption: string | null;
          created_at: string | null;
          id: number;
          VIDEO_TYPE: Database['public']['Enums']['VIDEO_TYPE'] | null;
        };
        Insert: {
          caption?: string | null;
          created_at?: string | null;
          id: number;
          VIDEO_TYPE?: Database['public']['Enums']['VIDEO_TYPE'] | null;
        };
        Update: {
          caption?: string | null;
          created_at?: string | null;
          id?: number;
          VIDEO_TYPE?: Database['public']['Enums']['VIDEO_TYPE'] | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      DUTY:
        | 'captain'
        | 'assistant captain'
        | 'head coach'
        | 'assistant coach'
        | 'technical coach'
        | 'goalkeeper coach'
        | 'set piece coach'
        | 'regular';
      memberType:
        | 'regular'
        | 'honorary-board-membership'
        | 'honorary-president'
        | 'life'
        | 'annual';
      order_status: 'pending' | 'completed' | 'canceled';
      RESULT:
        | 'win'
        | 'loss'
        | 'draw'
        | 'abandoned'
        | 'upcoming'
        | 'live'
        | 'postponed';
      ROLE: 'forward' | 'midfielder' | 'defender' | 'goalkeeper' | 'coach';
      VIDEO_TYPE: 'first team' | 'academy' | 'press conference';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;
