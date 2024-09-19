import type { UniManifestHelperConfig, ManifestHelperOptions } from "./types";

export const PKG_NAME = "manifest-helper";
export const PLUGIN_NAME = `uni-helper:${PKG_NAME}`;

export const PLUGIN_OPTIONS_DEFAULT: ManifestHelperOptions = {
  logLevel: "info",
  root: process.env.VITE_ROOT_DIR || process.cwd(),
  writeMode: "override",
  configDir: "./",
  outDir: "src",
  exclude: ["**/components/**", "**/helpers/**", "**/hooks/**"],
  onManifestBefore: null,
  onManifestAfter: null,
};

export const MANIFEST_CONFIG_DEFAULT: UniManifestHelperConfig = {
  name: "",
  appid: "",
  description: "",
  versionName: "0.0.1",
  versionCode: 1,
  transformPx: false,
  "app-plus": {
    usingComponents: true,
    nvueStyleCompiler: "uni-app",
    compilerVersion: 3,
    splashscreen: {
      alwaysShowBeforeRender: true,
      waiting: true,
      autoclose: true,
      delay: 0,
    },
    modules: {},
    distribute: {
      android: {
        permissions: [
          '<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>',
          '<uses-permission android:name="android.permission.VIBRATE"/>',
          '<uses-permission android:name="android.permission.READ_LOGS"/>',
          '<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>',
          '<uses-feature android:name="android.hardware.camera.autofocus"/>',
          '<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.CAMERA"/>',
          '<uses-permission android:name="android.permission.GET_ACCOUNTS"/>',
          '<uses-permission android:name="android.permission.READ_PHONE_STATE"/>',
          '<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>',
          '<uses-permission android:name="android.permission.WAKE_LOCK"/>',
          '<uses-permission android:name="android.permission.FLASHLIGHT"/>',
          '<uses-feature android:name="android.hardware.camera"/>',
          '<uses-permission android:name="android.permission.WRITE_SETTINGS"/>',
        ],
      },
      ios: {},
      sdkConfigs: {},
    },
  },
  quickapp: {},
  "mp-weixin": {
    appid: "",
    setting: {
      urlCheck: false,
    },
    usingComponents: true,
  },
  "mp-alipay": {
    usingComponents: true,
  },
  "mp-baidu": {
    usingComponents: true,
  },
  "mp-toutiao": {
    usingComponents: true,
  },
  uniStatistics: {
    enable: false,
  },
  vueVersion: "3",
};
