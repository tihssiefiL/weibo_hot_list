import { Injectable, HttpService } from "@nestjs/common";
import { parse } from "node-html-parser";
@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {
  }
  getHello(): string {
    return "Hello World!";
  }
  async getDocument(url) {
    let document = null;
    await this.httpService
      .get(url)
      .toPromise()
      .then(res => {
        document = parse(res.data);
      })
      .catch(err => {
        throw err;
      });
    return document;
  }
  async getHotList() {
    const HTMLElement = await this.getDocument("https://s.weibo.com/top/summary?cate=realtimehot");
    const tops = HTMLElement.querySelector(".list_a").querySelectorAll("li");
    let counter = 0;
    let data = [];
    tops.map(top => {
      const index = counter++;
      const url =
        "https://s.weibo.com" + top.querySelector("a").attributes.href; //热搜链接
      const content = top.querySelector("a").querySelector("span").firstChild
        .rawText; //热搜内容
      const number = top
        .querySelector("a")
        .querySelector("span")
        .text.split(content)[1]; //热搜热度
      const img =  top
        .querySelector("a")
        .querySelector("span")
        .querySelector("img"); //热搜图片
      const icon = top.querySelector("a").querySelector("i"); //热搜ICON
      const topObj = {
        index,
        content,
        url,
        img: img ? "https:" + img.attributes.src : null,
        icon: icon ? icon.classNames[0] + " " + icon.classNames[1] : null
      };
      // console.log(topObj);
      // console.log("----------------------------------------------------");
      data.push(topObj)
    });
    return data
  }
  async getHotDetail(url) {//热搜详情
    const HTMLElement = await this.getDocument(url);
    return 1;
  }
}
