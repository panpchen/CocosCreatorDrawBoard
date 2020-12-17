// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {
  @property(cc.Node)
  shareUI: cc.Node = null;
  @property(cc.Node)
  topBtnLayers: cc.Node = null;
  @property(cc.Node)
  screenShot: cc.Node = null;

  private _screenshot = null;
  onLoad() {
    this._screenshot = this.screenShot.getComponent("Screenshot");
    this._screenshot.init(this);
  }

  showTopBtnLayer(isShow: boolean) {
    this.topBtnLayers.active = isShow;
  }
}
