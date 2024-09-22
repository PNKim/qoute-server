import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class AuthenticationService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async register(username: string, password: string) {
    try {
      const users = await this.supabaseService.register(
        'users_qoute',
        username,
        password,
      ); // Fetch data from the 'users' table
      return users; // Return the data fetched
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message); // Handle any errors
    }
  }

  async login(username: string) {
    try {
      const users = await this.supabaseService.login('users_qoute', username); // Fetch data from the 'users' table
      return users; // Return the data fetched
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message); // Handle any errors
    }
  }
}
