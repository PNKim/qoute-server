import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor() {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_KEY;
    this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  // Method to interact with Supabase, e.g., fetching data
  async getData(tableName: string) {
    const { data, error } = await this.supabase.from(tableName).select('*');

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Other Supabase methods can be added here
}
