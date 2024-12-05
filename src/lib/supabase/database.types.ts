export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          created_at: string
        }
        Insert: {
          id: string
          username?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          created_at?: string
        }
      }
      game_results: {
        Row: {
          id: string
          user_id: string
          completed_at: string
          time_taken: number
          puzzle_id: string
          moves_taken: number
        }
        Insert: {
          id?: string
          user_id: string
          completed_at?: string
          time_taken: number
          puzzle_id: string
          moves_taken: number
        }
        Update: {
          id?: string
          user_id?: string
          completed_at?: string
          time_taken?: number
          puzzle_id?: string
          moves_taken?: number
        }
      }
    }
  }
} 