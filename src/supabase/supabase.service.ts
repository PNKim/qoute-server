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
  async getQoute(tableName: string, qoute: string) {
    const { data, error } = await this.supabase
      .from(tableName)
      .select('*')
      .order('id', { ascending: false })
      .ilike('qoute', `%${qoute}%`);

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

  async newQoute(tableName: string, userId: number, qoute: string) {
    const { data, error } = await this.supabase
      .from(tableName)
      .insert([{ userId: userId, qoute: qoute, vote: 0 }])
      .select();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async updateQoute(
    tableName: string,
    id: number,
    userId: number,
    qoute: string,
  ) {
    const { data, error } = await this.supabase
      .from(tableName)
      .update({ qoute: qoute })
      .eq('id', id)
      .eq('userId', userId)
      .select();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async updateQouteVote(tableName: string, id: number, vote: number) {
    const { data, error } = await this.supabase
      .from(tableName)
      .update({ vote: vote })
      .eq('id', id)
      .select();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async updateUserVote(tableName: string, id: number | null, userId: number) {
    const { data, error } = await this.supabase
      .from(tableName)
      .update({ qoute_vote: id })
      .eq('id', userId)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
