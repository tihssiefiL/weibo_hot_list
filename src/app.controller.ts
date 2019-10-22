import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  async getHotList(): Promise<any> {
    return await this.appService.getHotList();
  }
  @Get("detail")
  async getHotDetail(): Promise<any> {
    const url = "";
    return await this.appService.getHotDetail(url);
  }
}
