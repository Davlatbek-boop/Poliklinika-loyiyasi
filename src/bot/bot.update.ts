import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';
import { BotService } from './bot.service';

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService){}
  @Start()
  async onStart(@Ctx() ctx: Context) {
    return this.botService.start(ctx)
  }
 
  @On('contact')
  async onContact(@Ctx() ctx: Context) {
    return this.botService.onContact(ctx)
  }

  @Command("stop")
  async onStop(@Ctx() ctx: Context){
    return this.botService.onStop(ctx)
  }

  @On('text')
  async onText(@Ctx() ctx: Context) {
    return this.botService.onText(ctx)
  }

  @On('message')
  async onMessage(@Ctx() ctx: Context) {
    return "Botga nagruzka qildiz"
  }
} 
