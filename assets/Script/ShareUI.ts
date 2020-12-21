// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Game from "./Game";
import { SendMsg } from "./SendMsg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShareUI extends cc.Component {
  @property(cc.Sprite)
  shotBg: cc.Sprite = null;
  private _game: Game = null;
  private _base64: string = "";
  private _isDownloadScreenshot: boolean = false;
  init(game: Game) {
    this._game = game;
  }

  onUpload() {
    this._game.screenshot.onUpload();
    this.hide();
  }

  showShotBg(base64, shotFrame: cc.SpriteFrame) {
    this._base64 = base64;
    this.shotBg.spriteFrame = shotFrame;
  }

  onClickUpload() {
    if (!this._isDownloadScreenshot) {
      this._downloadFileToLocal();
      this._isDownloadScreenshot = true;
    }

    let input = document.createElement("input");
    input.type = "file";
    input.id = "file";
    input.style.visibility = "hidden";
    document.body.appendChild(input);

    const evt = new MouseEvent("click", {
      bubbles: false,
      cancelable: true,
      view: window,
    });
    input.dispatchEvent(evt);

    input.onchange = (event) => {
      const file = input.files[0];
      SendMsg.uploadFile(file);
      SendMsg.reqSaveAssessStatistics(Game.AssessStatisticsJson);
      this.hide();
      cc.error("open file", file);
    };
  }

  _downloadFileToLocal() {
    const save_link = document.createElementNS(
      "http://www.w3.org/1999/xhtml",
      "a"
    );
    save_link.href = this._base64.replace(
      /^data:image[^;]*/,
      "data:image/octet-stream"
    );
    save_link.download = `downloadFile.png`;

    const evt = new MouseEvent("click", {
      bubbles: false,
      cancelable: true,
      view: window,
    });
    save_link.dispatchEvent(evt);
  }

  hide() {
    this._isDownloadScreenshot = false;
    this._base64 = "";
    this.node.active = false;
  }
}
