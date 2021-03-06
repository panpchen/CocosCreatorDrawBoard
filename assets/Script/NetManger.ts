// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

export class NetManager {
  static send(
    url: string,
    method: string,
    data = null,
    successCallback = null,
    errorCallback = null
  ) {
    cc.log("请求数据", url, method, data);
    let xhr = cc.loader.getXMLHttpRequest();
    xhr.timeout = 3000;
    xhr.onreadystatechange = function () {
      cc.log("连接状态：", xhr.readyState, xhr.status, xhr.statusText);
      if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
        const response = JSON.parse(xhr.response);
        if (response["code"] == 500) {
          errorCallback && errorCallback(response["msg"]);
        } else if (response["code"] == 200) {
          successCallback && successCallback(response["data"]);
        }
      }
    };
    xhr.addEventListener("load", (evt) => {
      cc.log(evt);
    });
    xhr.addEventListener("error", (evt) => {
      cc.error(evt);
    });
    xhr.addEventListener("timeout", (evt) => {
      cc.error(evt);
    });
    // xhr.addEventListener("abort", (evt) => {
    //     cc.error(evt);
    // });
    // xhr.addEventListener("progress", (evt) => {
    //     cc.error(evt);
    // });
    xhr.open(method, url, true);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("contentType", "false");
    xhr.setRequestHeader("mimeType", "multipart/form-data");
    if (!data) {
      xhr.send();
    } else {
      xhr.send(data);
    }
  }
}
