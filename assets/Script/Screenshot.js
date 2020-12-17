const { SendMsg } = require("./SendMsg");

cc.Class({
  extends: cc.Component,
  properties: {
    game: null,
  },
  init(game) {
    this.game = game;
  },
  screenShot() {
    this.game.showTopBtnLayer(false);

    cc.director.once(cc.Director.EVENT_AFTER_DRAW, () => {
      let canvas = document.getElementById("GameCanvas");
      let str = canvas.toDataURL();
      let div = document.createElement("div");
      let img = new Image();
      div.style.position = "absolute";
      div.setAttribute("z-index", "90");
      img.src = str;
      div.appendChild(img);

      const data = str.replace(/^data:image[^;]*/, "data:image/octet-stream");
      const save_link = document.createElementNS(
        "http://www.w3.org/1999/xhtml",
        "a"
      );
      save_link.href = data;
      save_link.download = `downloadFile.png`;

      const evt = new MouseEvent("click", {
        bubbles: false,
        cancelable: true,
        view: window,
      });
      if (save_link.dispatchEvent(evt)) {
        this.game.showTopBtnLayer(true);
      }
    });
  },

  onUpload() {
    let input = document.createElement("input");
    input.type = "file";
    input.id = "file";
    const evt = new MouseEvent("click", {
      bubbles: false,
      cancelable: true,
      view: window,
    });
    input.dispatchEvent(evt);
    input.onchange = (event) => {
      const file = input.files[0];
      SendMsg.uploadFile(file);
      cc.error("open file window", file);
    };

    input.style.visibility = "hidden";
    input.setAttribute("z-index", "90");
    document.body.appendChild(input);
  },
});
