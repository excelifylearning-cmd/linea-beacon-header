export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          parent_id: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_id?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_id?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          is_archived: boolean | null
          last_message_at: string | null
          order_id: string | null
          participant_ids: string[]
          type: Database["public"]["Enums"]["conversation_type"] | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_archived?: boolean | null
          last_message_at?: string | null
          order_id?: string | null
          participant_ids: string[]
          type?: Database["public"]["Enums"]["conversation_type"] | null
        }
        Update: {
          created_at?: string
          id?: string
          is_archived?: boolean | null
          last_message_at?: string | null
          order_id?: string | null
          participant_ids?: string[]
          type?: Database["public"]["Enums"]["conversation_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          created_at: string
          gig_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          gig_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          gig_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_gig_id_fkey"
            columns: ["gig_id"]
            isOneToOne: false
            referencedRelation: "gigs"
            referencedColumns: ["id"]
          },
        ]
      }
      follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: []
      }
      gig_faqs: {
        Row: {
          answer: string
          created_at: string
          display_order: number | null
          gig_id: string
          id: string
          question: string
        }
        Insert: {
          answer: string
          created_at?: string
          display_order?: number | null
          gig_id: string
          id?: string
          question: string
        }
        Update: {
          answer?: string
          created_at?: string
          display_order?: number | null
          gig_id?: string
          id?: string
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "gig_faqs_gig_id_fkey"
            columns: ["gig_id"]
            isOneToOne: false
            referencedRelation: "gigs"
            referencedColumns: ["id"]
          },
        ]
      }
      gig_gallery: {
        Row: {
          created_at: string
          display_order: number | null
          gig_id: string
          id: string
          is_cover: boolean | null
          media_type: string
          thumbnail_url: string | null
          title: string | null
          url: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          gig_id: string
          id?: string
          is_cover?: boolean | null
          media_type: string
          thumbnail_url?: string | null
          title?: string | null
          url: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          gig_id?: string
          id?: string
          is_cover?: boolean | null
          media_type?: string
          thumbnail_url?: string | null
          title?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "gig_gallery_gig_id_fkey"
            columns: ["gig_id"]
            isOneToOne: false
            referencedRelation: "gigs"
            referencedColumns: ["id"]
          },
        ]
      }
      gig_packages: {
        Row: {
          created_at: string
          delivery_days: number
          description: string | null
          features: Json | null
          gig_id: string
          id: string
          name: string
          price_points: number
          revision_count: number | null
          tier: Database["public"]["Enums"]["package_tier"]
        }
        Insert: {
          created_at?: string
          delivery_days: number
          description?: string | null
          features?: Json | null
          gig_id: string
          id?: string
          name: string
          price_points: number
          revision_count?: number | null
          tier: Database["public"]["Enums"]["package_tier"]
        }
        Update: {
          created_at?: string
          delivery_days?: number
          description?: string | null
          features?: Json | null
          gig_id?: string
          id?: string
          name?: string
          price_points?: number
          revision_count?: number | null
          tier?: Database["public"]["Enums"]["package_tier"]
        }
        Relationships: [
          {
            foreignKeyName: "gig_packages_gig_id_fkey"
            columns: ["gig_id"]
            isOneToOne: false
            referencedRelation: "gigs"
            referencedColumns: ["id"]
          },
        ]
      }
      gig_requirements: {
        Row: {
          created_at: string
          display_order: number | null
          gig_id: string
          id: string
          input_type: string
          is_required: boolean | null
          options: Json | null
          question: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          gig_id: string
          id?: string
          input_type: string
          is_required?: boolean | null
          options?: Json | null
          question: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          gig_id?: string
          id?: string
          input_type?: string
          is_required?: boolean | null
          options?: Json | null
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "gig_requirements_gig_id_fkey"
            columns: ["gig_id"]
            isOneToOne: false
            referencedRelation: "gigs"
            referencedColumns: ["id"]
          },
        ]
      }
      gig_tags: {
        Row: {
          gig_id: string
          tag: string
        }
        Insert: {
          gig_id: string
          tag: string
        }
        Update: {
          gig_id?: string
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "gig_tags_gig_id_fkey"
            columns: ["gig_id"]
            isOneToOne: false
            referencedRelation: "gigs"
            referencedColumns: ["id"]
          },
        ]
      }
      gigs: {
        Row: {
          base_price_points: number
          category_id: string | null
          created_at: string
          delivery_days: number | null
          description: string | null
          featured_until: string | null
          gig_type: Database["public"]["Enums"]["gig_type"] | null
          id: string
          is_featured: boolean | null
          max_orders_queue: number | null
          order_count: number | null
          rating_avg: number | null
          rating_count: number | null
          revision_count: number | null
          seller_id: string
          seo_description: string | null
          seo_title: string | null
          short_description: string | null
          skill_ids: string[] | null
          slug: string
          status: Database["public"]["Enums"]["gig_status"] | null
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          base_price_points?: number
          category_id?: string | null
          created_at?: string
          delivery_days?: number | null
          description?: string | null
          featured_until?: string | null
          gig_type?: Database["public"]["Enums"]["gig_type"] | null
          id?: string
          is_featured?: boolean | null
          max_orders_queue?: number | null
          order_count?: number | null
          rating_avg?: number | null
          rating_count?: number | null
          revision_count?: number | null
          seller_id: string
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          skill_ids?: string[] | null
          slug: string
          status?: Database["public"]["Enums"]["gig_status"] | null
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          base_price_points?: number
          category_id?: string | null
          created_at?: string
          delivery_days?: number | null
          description?: string | null
          featured_until?: string | null
          gig_type?: Database["public"]["Enums"]["gig_type"] | null
          id?: string
          is_featured?: boolean | null
          max_orders_queue?: number | null
          order_count?: number | null
          rating_avg?: number | null
          rating_count?: number | null
          revision_count?: number | null
          seller_id?: string
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          skill_ids?: string[] | null
          slug?: string
          status?: Database["public"]["Enums"]["gig_status"] | null
          title?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "gigs_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          attachments: Json | null
          content: string | null
          content_type: string | null
          conversation_id: string
          created_at: string
          id: string
          is_edited: boolean | null
          is_read: boolean | null
          reply_to_id: string | null
          sender_id: string
          updated_at: string
        }
        Insert: {
          attachments?: Json | null
          content?: string | null
          content_type?: string | null
          conversation_id: string
          created_at?: string
          id?: string
          is_edited?: boolean | null
          is_read?: boolean | null
          reply_to_id?: string | null
          sender_id: string
          updated_at?: string
        }
        Update: {
          attachments?: Json | null
          content?: string | null
          content_type?: string | null
          conversation_id?: string
          created_at?: string
          id?: string
          is_edited?: boolean | null
          is_read?: boolean | null
          reply_to_id?: string | null
          sender_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          id: string
          is_read: boolean | null
          message: string | null
          metadata: Json | null
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string | null
          metadata?: Json | null
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string | null
          metadata?: Json | null
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      order_deliverables: {
        Row: {
          created_at: string
          files: Json | null
          id: string
          message: string | null
          order_id: string
          status: string | null
          submitted_by: string
        }
        Insert: {
          created_at?: string
          files?: Json | null
          id?: string
          message?: string | null
          order_id: string
          status?: string | null
          submitted_by: string
        }
        Update: {
          created_at?: string
          files?: Json | null
          id?: string
          message?: string | null
          order_id?: string
          status?: string | null
          submitted_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_deliverables_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_revisions: {
        Row: {
          created_at: string
          deliverable_id: string | null
          id: string
          order_id: string
          reason: string
          requested_by: string
          status: string | null
        }
        Insert: {
          created_at?: string
          deliverable_id?: string | null
          id?: string
          order_id: string
          reason: string
          requested_by: string
          status?: string | null
        }
        Update: {
          created_at?: string
          deliverable_id?: string | null
          id?: string
          order_id?: string
          reason?: string
          requested_by?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_revisions_deliverable_id_fkey"
            columns: ["deliverable_id"]
            isOneToOne: false
            referencedRelation: "order_deliverables"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_revisions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_timeline: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          event_type: string
          id: string
          metadata: Json | null
          order_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          order_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          order_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_timeline_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          buyer_id: string
          buyer_notes: string | null
          completed_at: string | null
          created_at: string
          delivered_at: string | null
          due_date: string | null
          gig_id: string
          id: string
          order_number: string
          package_id: string | null
          points_in_escrow: number | null
          requirements_submitted: Json | null
          seller_id: string
          seller_notes: string | null
          status: Database["public"]["Enums"]["order_status"] | null
          total_points: number
          updated_at: string
        }
        Insert: {
          buyer_id: string
          buyer_notes?: string | null
          completed_at?: string | null
          created_at?: string
          delivered_at?: string | null
          due_date?: string | null
          gig_id: string
          id?: string
          order_number: string
          package_id?: string | null
          points_in_escrow?: number | null
          requirements_submitted?: Json | null
          seller_id: string
          seller_notes?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          total_points: number
          updated_at?: string
        }
        Update: {
          buyer_id?: string
          buyer_notes?: string | null
          completed_at?: string | null
          created_at?: string
          delivered_at?: string | null
          due_date?: string | null
          gig_id?: string
          id?: string
          order_number?: string
          package_id?: string | null
          points_in_escrow?: number | null
          requirements_submitted?: Json | null
          seller_id?: string
          seller_notes?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          total_points?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_gig_id_fkey"
            columns: ["gig_id"]
            isOneToOne: false
            referencedRelation: "gigs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "gig_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          date_of_birth: string | null
          display_name: string | null
          gender: string | null
          graduation_year: number | null
          id: string
          is_student: boolean | null
          is_verified: boolean | null
          language: string | null
          location: string | null
          skill_points_balance: number | null
          social_links: Json | null
          timezone: string | null
          university_name: string | null
          updated_at: string
          username: string | null
          verification_tier: string | null
          website_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          date_of_birth?: string | null
          display_name?: string | null
          gender?: string | null
          graduation_year?: number | null
          id: string
          is_student?: boolean | null
          is_verified?: boolean | null
          language?: string | null
          location?: string | null
          skill_points_balance?: number | null
          social_links?: Json | null
          timezone?: string | null
          university_name?: string | null
          updated_at?: string
          username?: string | null
          verification_tier?: string | null
          website_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          date_of_birth?: string | null
          display_name?: string | null
          gender?: string | null
          graduation_year?: number | null
          id?: string
          is_student?: boolean | null
          is_verified?: boolean | null
          language?: string | null
          location?: string | null
          skill_points_balance?: number | null
          social_links?: Json | null
          timezone?: string | null
          university_name?: string | null
          updated_at?: string
          username?: string | null
          verification_tier?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          communication_rating: number | null
          content: string | null
          created_at: string
          helpful_count: number | null
          id: string
          is_public: boolean | null
          order_id: string
          quality_rating: number | null
          rating: number
          reviewee_id: string
          reviewer_id: string
          title: string | null
          value_rating: number | null
        }
        Insert: {
          communication_rating?: number | null
          content?: string | null
          created_at?: string
          helpful_count?: number | null
          id?: string
          is_public?: boolean | null
          order_id: string
          quality_rating?: number | null
          rating: number
          reviewee_id: string
          reviewer_id: string
          title?: string | null
          value_rating?: number | null
        }
        Update: {
          communication_rating?: number | null
          content?: string | null
          created_at?: string
          helpful_count?: number | null
          id?: string
          is_public?: boolean | null
          order_id?: string
          quality_rating?: number | null
          rating?: number
          reviewee_id?: string
          reviewer_id?: string
          title?: string | null
          value_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_endorsements: {
        Row: {
          created_at: string
          endorser_id: string
          id: string
          message: string | null
          user_skill_id: string
        }
        Insert: {
          created_at?: string
          endorser_id: string
          id?: string
          message?: string | null
          user_skill_id: string
        }
        Update: {
          created_at?: string
          endorser_id?: string
          id?: string
          message?: string | null
          user_skill_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_endorsements_user_skill_id_fkey"
            columns: ["user_skill_id"]
            isOneToOne: false
            referencedRelation: "user_skills"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_point_transactions: {
        Row: {
          amount: number
          balance_after: number
          created_at: string
          description: string | null
          id: string
          metadata: Json | null
          source_id: string | null
          source_type: string | null
          status: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
        }
        Insert: {
          amount: number
          balance_after: number
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          source_id?: string | null
          source_type?: string | null
          status?: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
        }
        Update: {
          amount?: number
          balance_after?: number
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          source_id?: string | null
          source_type?: string | null
          status?: string | null
          type?: Database["public"]["Enums"]["transaction_type"]
          user_id?: string
        }
        Relationships: []
      }
      skill_point_wallets: {
        Row: {
          available_balance: number | null
          created_at: string
          last_transaction_at: string | null
          lifetime_earned: number | null
          lifetime_spent: number | null
          pending_balance: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          available_balance?: number | null
          created_at?: string
          last_transaction_at?: string | null
          lifetime_earned?: number | null
          lifetime_spent?: number | null
          pending_balance?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          available_balance?: number | null
          created_at?: string
          last_transaction_at?: string | null
          lifetime_earned?: number | null
          lifetime_spent?: number | null
          pending_balance?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category_id: string
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_verified: boolean | null
          name: string
          popularity_score: number | null
          slug: string
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_verified?: boolean | null
          name: string
          popularity_score?: number | null
          slug: string
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_verified?: boolean | null
          name?: string
          popularity_score?: number | null
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "skills_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activity_logs: {
        Row: {
          action_type: string
          created_at: string
          entity_id: string | null
          entity_type: string | null
          id: string
          ip_address: unknown
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_devices: {
        Row: {
          browser: string | null
          created_at: string
          device_fingerprint: string
          device_name: string | null
          device_type: string | null
          id: string
          is_trusted: boolean | null
          last_used_at: string | null
          os: string | null
          user_id: string
        }
        Insert: {
          browser?: string | null
          created_at?: string
          device_fingerprint: string
          device_name?: string | null
          device_type?: string | null
          id?: string
          is_trusted?: boolean | null
          last_used_at?: string | null
          os?: string | null
          user_id: string
        }
        Update: {
          browser?: string | null
          created_at?: string
          device_fingerprint?: string
          device_name?: string | null
          device_type?: string | null
          id?: string
          is_trusted?: boolean | null
          last_used_at?: string | null
          os?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string
          device_info: Json | null
          expires_at: string | null
          id: string
          ip_address: unknown
          is_current: boolean | null
          last_active_at: string | null
          location_data: Json | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          device_info?: Json | null
          expires_at?: string | null
          id?: string
          ip_address?: unknown
          is_current?: boolean | null
          last_active_at?: string | null
          location_data?: Json | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          device_info?: Json | null
          expires_at?: string | null
          id?: string
          ip_address?: unknown
          is_current?: boolean | null
          last_active_at?: string | null
          location_data?: Json | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          created_at: string
          currency: string | null
          language: string | null
          notification_preferences: Json | null
          privacy_settings: Json | null
          theme: string | null
          two_factor_enabled: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          currency?: string | null
          language?: string | null
          notification_preferences?: Json | null
          privacy_settings?: Json | null
          theme?: string | null
          two_factor_enabled?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          currency?: string | null
          language?: string | null
          notification_preferences?: Json | null
          privacy_settings?: Json | null
          theme?: string | null
          two_factor_enabled?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_skills: {
        Row: {
          created_at: string
          description: string | null
          elo_rating: number | null
          id: string
          is_offering: boolean | null
          is_seeking: boolean | null
          mastery_level: Database["public"]["Enums"]["mastery_level"] | null
          skill_id: string
          total_exchanges: number | null
          updated_at: string
          user_id: string
          years_experience: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          elo_rating?: number | null
          id?: string
          is_offering?: boolean | null
          is_seeking?: boolean | null
          mastery_level?: Database["public"]["Enums"]["mastery_level"] | null
          skill_id: string
          total_exchanges?: number | null
          updated_at?: string
          user_id: string
          years_experience?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          elo_rating?: number | null
          id?: string
          is_offering?: boolean | null
          is_seeking?: boolean | null
          mastery_level?: Database["public"]["Enums"]["mastery_level"] | null
          skill_id?: string
          total_exchanges?: number | null
          updated_at?: string
          user_id?: string
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      conversation_type: "order" | "inquiry" | "support"
      gig_status: "draft" | "active" | "paused" | "archived"
      gig_type:
        | "standard"
        | "auction"
        | "subscription"
        | "consultation"
        | "flash"
        | "rental"
      mastery_level:
        | "beginner"
        | "intermediate"
        | "advanced"
        | "expert"
        | "master"
      order_status:
        | "pending"
        | "accepted"
        | "in_progress"
        | "delivered"
        | "revision"
        | "completed"
        | "cancelled"
        | "disputed"
      package_tier: "basic" | "standard" | "premium"
      transaction_type:
        | "earn"
        | "spend"
        | "transfer"
        | "purchase"
        | "withdrawal"
        | "refund"
        | "bonus"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      conversation_type: ["order", "inquiry", "support"],
      gig_status: ["draft", "active", "paused", "archived"],
      gig_type: [
        "standard",
        "auction",
        "subscription",
        "consultation",
        "flash",
        "rental",
      ],
      mastery_level: [
        "beginner",
        "intermediate",
        "advanced",
        "expert",
        "master",
      ],
      order_status: [
        "pending",
        "accepted",
        "in_progress",
        "delivered",
        "revision",
        "completed",
        "cancelled",
        "disputed",
      ],
      package_tier: ["basic", "standard", "premium"],
      transaction_type: [
        "earn",
        "spend",
        "transfer",
        "purchase",
        "withdrawal",
        "refund",
        "bonus",
      ],
    },
  },
} as const
