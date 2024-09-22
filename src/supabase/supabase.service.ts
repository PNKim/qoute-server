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

  async register(tableName: string, username: string, password: string) {
    const { data, error } = await this.supabase
      .from(tableName)
      .insert([{ username: username, password: password }])
      .select();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async login(tableName: string, username: string) {
    const { data, error } = await this.supabase
      .from(tableName)
      .select('*')
      .eq('username', username);

    if (error || !data[0]) {
      throw new Error(error.message);
    }

    return data[0];
  }
  // Other Supabase methods can be added here
}
