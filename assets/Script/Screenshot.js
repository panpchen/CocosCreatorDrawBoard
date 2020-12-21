cc.Class({
  extends: cc.Component,

  onScreenShot(callback) {
    cc.director.once(cc.Director.EVENT_AFTER_DRAW, () => {
      const canvas = document.getElementById("GameCanvas");
      const base64 = canvas.toDataURL();

      const img = new Image();
      img.src = base64;

      const texture2d = new cc.Texture2D();
      texture2d.initWithElement(img);

      const spriteFrame = new cc.SpriteFrame();
      spriteFrame.setTexture(texture2d);

      callback && callback(base64, spriteFrame);
    });
  },
});
