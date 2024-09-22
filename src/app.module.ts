import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { QouteController } from './qoute/qoute.controller';
import { QouteService } from './qoute/qoute.service';

@Module({
  imports: [
    SupabaseModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '600s' },
    }),
  ],
  controllers: [AppController, AuthenticationController, QouteController],
  providers: [AppService, AuthenticationService, QouteService],
})
export class AppModule {}
