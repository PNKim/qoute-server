import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class QouteService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getQoute(qoute: string) {
    const qoutes = await this.supabaseService.getQoute('qoutes', qoute);
    return qoutes; // Return the users to the client
  }

  async newQoute(userId: number, qoute: string) {
    const qoutes = await this.supabaseService.newQoute('qoutes', userId, qoute);
    return qoutes; // Return the users to the client
  }

  async updateQoute(id: number, userId: number, qoute: string) {
    const qoutes = await this.supabaseService.updateQoute(
      'qoutes',
      id,
      userId,
      qoute,
    );
    return qoutes;
  }

  async updateQouteVote(id: number, vote: number) {
    const qoutes = await this.supabaseService.updateQouteVote(
      'qoutes',
      id,
      vote,
    );
    return qoutes;
  }

  async updateUserVote(userId: number, id: number | null) {
    const qoutes = await this.supabaseService.updateUserVote(
      'users_qoute',
      id,
      userId,
    );
    return qoutes;
  }
}
