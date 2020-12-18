const { default: Game } = require("./Game");
const { SendMsg } = require("./SendMsg");

cc.Class({
  extends: cc.Component,
  properties: {
    _game: null,
    _base64: -1,
  },
  init(game) {
    this._game = game;
  },
  onScreenShot(callback) {
    cc.director.once(cc.Director.EVENT_AFTER_DRAW, () => {
      const canvas = document.getElementById("GameCanvas");
      this._base64 = canvas.toDataURL();

      const img = new Image();
      img.src = this._base64;

      const texture2d = new cc.Texture2D();
      texture2d.initWithElement(img);

      const spriteFrame = new cc.SpriteFrame();
      spriteFrame.setTexture(texture2d);

      callback && callback(spriteFrame);
    });
  },
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
  },
  onUpload() {
    this._downloadFileToLocal();

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
      cc.error("open file window", file);
    };
  },
});
