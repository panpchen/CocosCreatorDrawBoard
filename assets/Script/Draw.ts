// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { DrawManager, PenType } from "./DrawManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Node)
  board: cc.Node = null;
  @property
  penWidth: number = 10;
  @property
  rubberWidth: number = 10;

  private drawManager: DrawManager;

  start() {
    this.drawManager = new DrawManager();
    this.drawManager.init(this.board);
    this.onPen();
    this.node.addChild(this.drawManager.drawNode);
  }

  onEraser(e, str) {
    if (str === "clear") {
      this.drawManager.setStrokeColor(new cc.Color(0, 0, 0, 0));
      this.drawManager.clear();
    } else {
      this.drawManager.setLineWidth(this.rubberWidth);
      this.drawManager.setStrokeColor(new cc.Color(0, 0, 0, 0));
    }
  }

  onPen() {
    this.drawManager.setLineWidth(this.penWidth);
    this.drawManager.setStrokeColor(new cc.Color(200, 0, 200, 255));
  }
}
