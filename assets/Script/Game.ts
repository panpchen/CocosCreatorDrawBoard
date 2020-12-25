// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:

import ShareUI from "./ShareUI";

//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {
  @property(ShareUI)
  shareUI: ShareUI = null;
  @property(cc.Node)
  topBtnLayers: cc.Node = null;
  @property(cc.Node)
  screenShotNode: cc.Node = null;
  private _screenshot = null;
  public get screenshot() {
    return this._screenshot;
  }
  public static AssessStatisticsJson: string = null;
  onLoad() {
    // 关闭多点触控
    cc.macro.ENABLE_MULTI_TOUCH = false;

    this._screenshot = this.screenShotNode.getComponent("Screenshot");

    this.shareUI.node.active = false;
    this.shareUI.init(this);
    this.topBtnLayers.active = true;

    Game.AssessStatisticsJson = JSON.stringify(
      this.getParmFromURL(window.location.href)
    );
  }
  getParmFromURL(url: string) {
    // 先将字符串通过 split 方法，以 "?" 为分割符将其分割成数组；
    // 该数组有两个元素，第一个为空字符串，第二个为 url 参数字符串
    let arr = url.split("?");
    if (arr.length < 2) {
      cc.log("url缺少参数");
      return;
    }
    // 将参数字符串以 "&" 符号为分隔符进行分割
    let params = arr[1].split("&");
    // 定义一个数组用于存储参数
    let obj = {};
    // 通过循环将参数以键值对的形式存储在变量 obj 中
    for (let i = 0; i < params.length; i++) {
      let arr_params = params[i].split("=");
      obj[arr_params[0]] = arr_params[1];
    }
    return obj;
  }
  showTopBtnLayer(isShow: boolean) {
    this.topBtnLayers.active = isShow;
  }

  showShareUI() {
    if (this._screenshot) {
      this.showTopBtnLayer(false);
      this._screenshot.onScreenShot((base64, shotFrame) => {
        this.shareUI.showShotBg(base64, shotFrame);
        this.showTopBtnLayer(true);
        this.shareUI.node.active = true;
      });
    }
  }
}
