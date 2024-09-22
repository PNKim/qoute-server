import { Injectable } from '@nestjs/common';
import { SupabaseService } from './supabase/supabase.service';

@Injectable()
export class AppService {
  constructor(private readonly supabaseService: SupabaseService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async fetchUsers() {
    try {
      const users = await this.supabaseService.getData('products'); // Fetch data from the 'users' table
      return users; // Return the data fetched
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message); // Handle any errors
    }
  }
}
