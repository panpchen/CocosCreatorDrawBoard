// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Game from "./Game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShareUI extends cc.Component {
  @property(cc.Sprite)
  shotBg: cc.Sprite = null;

  private _game: Game = null;
  init(game: Game) {
    this._game = game;
  }

  onUpload() {
    this._game.screenshot.onUpload();
    this.hide();
  }

  showShotBg(shotFrame: cc.SpriteFrame) {
    this.shotBg.spriteFrame = shotFrame;
  }

  hide() {
    this.node.active = false;
  }
}
