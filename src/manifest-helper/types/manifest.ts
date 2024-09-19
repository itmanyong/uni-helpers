export interface UniManifestNetworkTimeout extends ObjectType {
  request?: number;
  connectSocket?: number;
  uploadFile?: number;
  downloadFile?: number;
}
export interface UniManifestUniStatistics extends ObjectType {
  enable?: boolean;
}
export interface UniManifestAppModule extends ObjectType {
  Bluetooth?: ObjectType;
  Contacts?: ObjectType;
  Fingerprint?: ObjectType;
  iBeacon?: ObjectType;
  LivePusher?: ObjectType;
  Map?: ObjectType;
  Messaging?: ObjectType;
  OAuth?: ObjectType;
  Paymen?: ObjectType;
  Push?: ObjectType;
  Share?: ObjectType;
  Speech?: ObjectType;
  SQLite?: ObjectType;
  Statistic?: ObjectType;
  VideoPlayer?: ObjectType;
}
export interface UniManifestDistribute extends ObjectType {
  android?: ObjectType;
  ios?: ObjectType;
  sdkConfigs?: ObjectType;
  orientation?: [];
}
export interface UniManifestAppPlusSplashscreen extends ObjectType {
  alwaysShowBeforeRender?: boolean;
  autoclose?: boolean;
  waiting?: boolean;
}
export interface UniManifestAppPlus extends ObjectType {
  splashscreen?: UniManifestAppPlusSplashscreen;
  screenOrientation?: Array<"portrait-primary" | "portrait-secondary" | "landscape-primary" | "landscape-secondary">;
  modules?: UniManifestAppModule;
  distribute?: UniManifestDistribute;
  nvueCompiler?: string | "weex" | "unj-app";
  nvueStyleCompiler?: string | "weex" | "css";
  renderer?: string | "native";
  nvueLaunchMode?: string | "normal" | "fast";
  nvue?: { "flex-direction"?: "column" | "row" | "column-reverse" | "row-reverse" };
  optimization?: { subPackages?: boolean };
  runmode?: string | "normal" | "liberate";
  uniStatistics?: ObjectType;
  webView?: ObjectType;
}
export interface UniManifestH5 extends ObjectType {
  title?: string;
  templte?: string;
  router?: ObjectType;
  async?: ObjectType;
  devServer?: ObjectType;
  publicPath?: string;
  sdkConfigs?: string;
  optimization?: ObjectType;
  uniStatistics?: ObjectType;
}
export interface UniManifestQuickapp extends ObjectType {}
export interface UniManifestMpWeixin extends ObjectType {
  appid?: string;
  setting?: ObjectType;
  functionalPages?: boolean;
  requiredBackgroundModes?: Array<string>;
  plugins?: ObjectType;
  resizable?: boolean;
  navigateToMiniProgramAppIdList?: Array<string>;
  permission?: ObjectType;
  workers?: string;
  optimization?: ObjectType;
  cloudfunctionRoot?: string;
  uniStatistics?: ObjectType;
  scopedSlotsCompiler?: string;
  mergeVirtualHostAttributes?: boolean;
  slotMultipleInstance?: boolean;
  embeddedAppIdList?: Array<string>;
  requiredPrivateInfos?: Array<string>;
  lazyCodeLoading?: string;
}
export interface UniManifestMpAlipay extends ObjectType {
  plugins?: ObjectType;
  component2?: boolean;
  enableAppxNg?: boolean;
  axmlStrictCheck?: boolean;
  enableParallelLoader?: boolean;
  enableDistFileMinify?: boolean;
  uniStatistics?: ObjectType;
  scopedSlotsCompiler?: string;
  mergeVirtualHostAttributes?: boolean;
  slotMultipleInstance?: boolean;
  lazyCodeLoading?: string;
  styleIsolation?: string;
}
export interface UniManifestMpBaidu extends ObjectType {
  appid?: string;
  requiredBackgroundModes?: Array<string>;
  prefetches?: Array<string>;
  optimization?: ObjectType;
  uniStatistics?: ObjectType;
  scopedSlotsCompiler?: string;
  slotMultipleInstance?: boolean;
  dynamicLib?: ObjectType;
}
export interface UniManifestMpToutiao extends ObjectType {
  appid?: string;
  setting?: ObjectType;
  navigateToMiniProgramAppIdList?: Array<string>;
  uniStatistics?: ObjectType;
  scopedSlotsCompiler?: string;
  slotMultipleInstance?: boolean;
}
export interface UniManifestMpLark extends ObjectType {
  appid?: string;
  setting?: ObjectType;
  navigateToMiniProgramAppIdList?: Array<string>;
  uniStatistics?: ObjectType;
  scopedSlotsCompiler?: string;
  slotMultipleInstance?: boolean;
}
export interface UniManifestMpQq extends ObjectType {
  appid?: string;
  requiredBackgroundModes?: Array<string>;
  navigateToMiniProgramAppIdList?: Array<string>;
  permission?: ObjectType;
  workers?: string;
  groupIdList?: Array<string>;
  optimization?: ObjectType;
  uniStatistics?: ObjectType;
  scopedSlotsCompiler?: string;
  slotMultipleInstance?: boolean;
}
export interface UniManifestMpKuaishou extends ObjectType {
  appid?: string;
  optimization?: ObjectType;
  uniStatistics?: ObjectType;
  scopedSlotsCompiler?: string;
  slotMultipleInstance?: boolean;
}
export interface UniManifestHelperConfig extends ObjectType {
  name: string;
  appid: string;
  description?: string;
  locale?: string | "auto";
  versionName: string;
  versionCode: number;
  transformPx?: boolean;
  networkTimeout?: UniManifestNetworkTimeout;
  debug?: boolean;
  uniStatistics?: UniManifestUniStatistics;
  "app-plus"?: UniManifestAppPlus;
  h5?: UniManifestH5;
  quickapp?: UniManifestQuickapp;
  "mp-weixin"?: UniManifestMpWeixin;
  "mp-alipay"?: UniManifestMpAlipay;
  "mp-baidu"?: UniManifestMpBaidu;
  "mp-toutiao"?: UniManifestMpToutiao;
  "mp-lark"?: UniManifestMpLark;
  "mp-qq"?: UniManifestMpQq;
  "mp-kuaishou"?: UniManifestMpKuaishou;
}
