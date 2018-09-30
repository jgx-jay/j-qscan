const CONST = {
  INDEX_LOGIN_BTN: {
    name: '首页登录按钮',
    xpath: '//android.widget.Button[@resource-id="com.tencent.mm:id/dbe"]',
    action: 'click'
  },
  USE_USER_AND_PASSWORD: {
    name: '使用账号密码',
    xpath: '//android.widget.Button[@resource-id="com.tencent.mm:id/c5p"]',
    action: 'click'
  },
  USERNAME_INPUT: {
    name: '账号输入框',
    xpath:
      '//android.widget.EditText[@resource-id="com.tencent.mm:id/jd"][@password="false"]',
    action: 'input'
  },
  PASSWORD_INPUT: {
    name: '密码输入框',
    xpath:
      '//android.widget.EditText[@resource-id="com.tencent.mm:id/jd"][@password="true"]',
    action: 'input'
  },
  DO_LOGIN_BTN: {
    name: '登录',
    xpath: '//android.widget.Button[@resource-id="com.tencent.mm:id/c5q"]',
    action: 'click'
  },
  AB_YES: {
    name: '通讯录弹窗',
    xpath: '//android.widget.Button[@resource-id="com.tencent.mm:id/apj"]',
    action: 'click'
  },
  TAB_1: {
    name: 'tab: 微信',
    xpath:
      '//android.widget.RelativeLayout[@resource-id="com.tencent.mm:id/bg"]/android.widget.LinearLayout[1]/android.widget.RelativeLayout[1]',
    action: 'click'
  },
  TAB_4: {
    name: 'tab: 我',
    xpath:
      '//android.widget.RelativeLayout[@resource-id="com.tencent.mm:id/bg"]/android.widget.LinearLayout[1]/android.widget.RelativeLayout[4]',
    action: ''
  },
  WX_USERNAME: {
    name: '微信号',
    xpath: '//android.widget.TextView[@resource-id="com.tencent.mm:id/cl8"]',
    action: ''
  },
  THE_MORE_BTN: {
    name: '右上角加号',
    xpath: '//android.widget.RelativeLayout[@content-desc="更多功能按钮"]',
    action: 'click'
  },
  THE_SCAN_BTN: {
    name: '扫一扫',
    xpath:
      '//android.widget.LinearLayout[@resource-id="com.tencent.mm:id/jm"][@index=2]',
    action: 'click'
  },
  IDE_AFTER_SCAN: {
    name: 'ide扫码后确认',
    xpath: '//android.view.View[@content-desc="确认登录"]',
    action: 'click'
  },
  MP_AFTER_SCAN: {
    name: 'mp扫码后确认',
    xpath: '//android.view.View[@index=2]',
    action: 'click'
  }
};

module.exports = {
  CONST,
  loginActions: [
    CONST.INDEX_LOGIN_BTN,
    CONST.USE_USER_AND_PASSWORD,
    CONST.USERNAME_INPUT,
    CONST.PASSWORD_INPUT,
    CONST.DO_LOGIN_BTN,
    CONST.AB_YES
  ],
  scanActions: [CONST.THE_MORE_BTN, CONST.THE_SCAN_BTN],
  ideActions: [CONST.IDE_AFTER_SCAN],
  wxActions: [CONST.MP_AFTER_SCAN]
};
