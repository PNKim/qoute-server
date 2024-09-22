import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { QouteService } from './qoute.service';
import { AuthGuard } from 'src/middleware/jwt-auth-guard';

@Controller('qoute')
export class QouteController {
  constructor(private readonly qouteService: QouteService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getQoute(@Query() query: any, @Res() res: Response) {
    const { qoute } = query;
    try {
      const data = await this.qouteService.getQoute(qoute);
      return res.status(200).json({ qoutes: data });
    } catch {
      return res.status(404).json({ message: 'Not Found' });
    }
  }

  @UseGuards(AuthGuard)
  @Post()
  async newQoute(@Body() body: any, @Res() res: Response) {
    const { userId, qoute } = body;
    try {
      await this.qouteService.newQoute(userId, qoute);
      return res.status(200).json({ message: 'Add new Qoute' });
    } catch {
      return res.status(404).json({ message: 'Not Found' });
    }
  }

  @UseGuards(AuthGuard)
  @Put()
  async updateQoute(@Body() body: any, @Res() res: Response) {
    const { id, userId, qoute } = body;
    try {
      await this.qouteService.updateQoute(id, userId, qoute);
      return res.status(200).json({ message: 'Update Qoute' });
    } catch {
      return res.status(404).json({ message: 'Not Found' });
    }
  }

  @UseGuards(AuthGuard)
  @Put('vote')
  async updateQouteVote(@Body() body: any, @Res() res: Response) {
    const { id, vote } = body;
    try {
      await this.qouteService.updateQouteVote(id, vote);
      return res.status(200).json({ message: 'Update Qoute' });
    } catch {
      return res.status(404).json({ message: 'Not Found' });
    }
  }

  @UseGuards(AuthGuard)
  @Put('uservote')
  async updateUserVote(@Body() body: any, @Res() res: Response) {
    const { userId, id } = body;
    try {
      await this.qouteService.updateUserVote(userId, id);
      return res.status(200).json({ message: 'Update Qoute' });
    } catch {
      return res.status(404).json({ message: 'Not Found' });
    }
  }
}
