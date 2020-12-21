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
      cc.log(xhr.readyState, xhr.status, xhr.statusText);
      if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
        cc.log(xhr.response);
      }
    };
    // xhr.responseType = "json";
    xhr.addEventListener("load", (evt) => {
      cc.log(evt);
      successCallback && successCallback(xhr.response);
    });
    xhr.addEventListener("error", (evt) => {
      cc.error(evt);
      errorCallback && errorCallback(evt);
    });
    xhr.addEventListener("timeout", (evt) => {
      cc.error(evt);
      errorCallback && errorCallback(evt);
    });
    // xhr.addEventListener("abort", (evt) => {
    //     cc.error(evt);
    // });
    // xhr.addEventListener("progress", (evt) => {
    //     cc.error(evt);
    // });
    xhr.open(method, url, true);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    // xhr.setRequestHeader(
    //   "Authorization",
    //   `eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MDgzNDgyMTcsInN1YiI6IntcImlkXCI6MSxcInVzZXJuYW1lXCI6XCJhZG1pblwiLFwibmlja25hbWVcIjpcImFkbWluXCIsXCJ0b2tlblwiOm51bGwsXCJvc1wiOm51bGwsXCJicm93c2VyXCI6bnVsbCxcImxvZ2luTG9jYXRpb25cIjpudWxsLFwiaXBhZGRyXCI6bnVsbCxcImxvZ2luVGltZVwiOm51bGwsXCJleHBpcmVUaW1lXCI6bnVsbH0iLCJjcmVhdGVkIjoxNjA4MDg5MDE3ODM2fQ.iCzkV2FyMbFfn1Pwi0FDF2NJrD-TnaEFht5k6CHvBPGFtwL0ljBQp4i4bQxjn6jVjUjRnbVtiPAUdqvU5nSDHw`
    // );
    xhr.setRequestHeader("contentType", "false");
    xhr.setRequestHeader("mimeType", "multipart/form-data");
    if (!data) {
      xhr.send();
    } else {
      xhr.send(data);
    }
  }
}
