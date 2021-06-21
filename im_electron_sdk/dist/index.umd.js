(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('path')) :
  typeof define === 'function' && define.amd ? define(['path'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rem = factory(global.path$1));
}(this, (function (path$1) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var path__default = /*#__PURE__*/_interopDefaultLegacy(path$1);

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var CONSOLETAG = "IM_ELECTRON_SDK:";

  var path = require('path');

  var os = require('os');

  var ref$1 = require('ref-napi');

  var ffipaths = {
    "linux": path.resolve(__dirname, '../src/lib/linux/lib/libImSDK.so')
  };

  function getFFIPath() {
    var res = "";
    var platform = os.platform().toLocaleLowerCase();

    switch (platform) {
      case 'linux':
        res = ffipaths[platform];
        break;
    }

    if (!res) {
      throw new Error("tencent im sdk not support ".concat(platform, " os now."));
    }

    return res;
  }

  function nodeStrigToCString(str) {
    var buffer = Buffer.from(str);
    return ref$1.readCString(buffer, 0);
  }

  var ffi = require('ffi-napi');

  var ref = require('ref-napi');

  var ffiPath = getFFIPath();
  var Imsdklib = ffi.Library(ffiPath, {
    "TIMGetSDKVersion": [ref.types["char"], []],
    "TIMInit": [ref.types["int"], [ref.types.uint64, ref.types.CString]],
    "TIMLogin": [ref.types["int"], [ref.types.CString, ref.types.CString, 'pointer', ref.types.CString]]
  });

  var AdvanceMessageManage = function AdvanceMessageManage(config) {
    _classCallCheck(this, AdvanceMessageManage);

    this._sdkconfig = config;
  };

  var ConversationManager = function ConversationManager(config) {
    _classCallCheck(this, ConversationManager);

    this._sdkconfig = config;
  };

  var FriendshipManager = function FriendshipManager(config) {
    _classCallCheck(this, FriendshipManager);

    this._sdkconfig = config;
  };

  var GroupManager = function GroupManager(config) {
    _classCallCheck(this, GroupManager);

    this._sdkconfig = config;
  };

  var TimbaseManager = /*#__PURE__*/function () {
    function TimbaseManager(config) {
      _classCallCheck(this, TimbaseManager);

      this._sdkconfig = config;
    }
    /**
     * sdk初始化
     */


    _createClass(TimbaseManager, [{
      key: "initSDK",
      value: function initSDK() {
        var sdkconfig = JSON.stringify({
          "sdk_config_log_file_path": path__default['default'].resolve(__dirname, '../sdk-log/'),
          "sdk_config_config_file_path": path__default['default'].resolve(__dirname, '../sdk-config/')
        });
        return this._sdkconfig.Imsdklib.TIMInit(this._sdkconfig.sdkappid, nodeStrigToCString(sdkconfig));
      }
    }]);

    return TimbaseManager;
  }();

  var TIM = /*#__PURE__*/function () {
    function TIM(config) {
      _classCallCheck(this, TIM);

      _defineProperty(this, "_sdkconfig", {
        sdkappid: 0,
        consoleTag: CONSOLETAG,
        Imsdklib: Imsdklib
      });

      this._sdkconfig.sdkappid = config.sdkappid;
      this._advanceMessageManager = new AdvanceMessageManage(this._sdkconfig);
      this._conversationManager = new ConversationManager(this._sdkconfig);
      this._friendshipManager = new FriendshipManager(this._sdkconfig);
      this._groupManager = new GroupManager(this._sdkconfig);
      this._timbaseManager = new TimbaseManager(this._sdkconfig);
    }

    _createClass(TIM, [{
      key: "getTimbaseManager",
      value: function getTimbaseManager() {
        return this._timbaseManager;
      }
    }, {
      key: "getAdvanceMessageManager",
      value: function getAdvanceMessageManager() {
        return this._advanceMessageManager;
      }
    }, {
      key: "getConversationManager",
      value: function getConversationManager() {
        return this._conversationManager;
      }
    }, {
      key: "getFriendshipManager",
      value: function getFriendshipManager() {
        return this._friendshipManager;
      }
    }, {
      key: "getGroupManager",
      value: function getGroupManager() {
        return this._groupManager;
      }
    }]);

    return TIM;
  }();

  return TIM;

})));
