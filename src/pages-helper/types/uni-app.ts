export interface UniButtonItem extends ObjectType {
  type?: "forward" | "back" | "share" | "favorite" | "home" | "menu" | "close" | "none";
  color?: string;
  background?: string;
  colorPressed?: string;
  float?: "left" | "right";
  fontWeight?: "normal" | "bold";
  fontSize?: string;
  fontSrc?: string;
  select?: boolean;
  text?: string;
  width?: string;
}
export interface UniSubNVueItem extends ObjectType {
  id?: string;
  path?: string;
  type?: "popup" | "navigationBar";
  style?: {
    position?: "static" | "absolute";
    dock?: "top" | "bottom" | "right" | "left";
    mask?: string;
    width?: string;
    height: string;
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    margin?: string | "auto" | "left" | "right" | "top" | "bottom";
    background?: string;
  };
}
export type UniAnimationType =
  | "slide-in-right"
  | "slide-in-left"
  | "slide-in-top"
  | "slide-in-bottom"
  | "pop-out"
  | "fade-out"
  | "zoom-in"
  | "zoom-fade-in"
  | "none";
export type UniUsingComponents = ObjectType<string>;
export interface UniTitleNView extends ObjectType {
  backgroundColor?: string;
  buttons?: UniButtonItem[];
  titleColor?: string;
  titleOverflow?: "clip" | "ellipsis";
  titleText?: string;
  titleSize?: string;
  type?: "default" | "transparent" | "float";
  tags?: ObjectType[];
  searchInput?: UniSearchInput;
  homeButton?: boolean;
  autoBackButton?: boolean;
  backButton?: boolean;
  backgroundImage?: string;
  backgroundRepeat?: "no-repeat" | "repeat" | "repeat-x" | "repeat-y";
  titleAlign?: "left" | "center" | "auto";
  blurEffect?: "dark" | "light" | "extralight" | "none";
  coverage?: string;
  splitLine?: boolean | null | undefined;
  subtitleColor?: string;
  subtitleSize?: string | "auto";
  subtitleOverflow?: "clip" | "ellipsis";
  subtitleText?: string;
  titleIcon?: string;
  titleIconRadius?: string;
}
export interface UniSearchInput extends ObjectType {
  autoFocus?: boolean;
  align?: "left" | "center" | "right";
  backgroundColor?: string;
  borderRadius?: string;
  placeholder?: string;
  placeholderColor?: string;
  disabled?: boolean;
}
export interface UniPagesConfigGlobalStyleAppPlus extends ObjectType {
  background?: string;
  titleNView?: UniTitleNView;
  subNVues?: UniSubNVueItem[];
  bounce?: string | "none";
  popGesture?: "close" | "none";
  softinputNavBar?: string | "auto" | "none";
  softinputMode?: "adjustResize" | "adjustPan";
  pullToRefresh?: object;
  scrollIndicator?: string | "none";
  animationType?: UniAnimationType;
  animationDuration?: number;
  SplitLineStyles?: {
    color?: string;
    height?: string;
  };
}
export interface UniPagesConfigGlobalStyleH5 extends ObjectType {
  titleNView?: {
    backgroundColor?: string;
    buttons?: UniButtonItem[];
    titleColor?: string;
    titleText?: string;
    titleSize?: string;
    type?: "transparent" | "default";
    searchInput?: UniSearchInput;
  } & ObjectType;
  pullToRefresh?: {
    color?: string;
    offset?: string;
  } & ObjectType;
}
export interface UniPagesConfigGlobalStyleMpAlipay extends ObjectType {
  allowsBounceVertical?: "YES" | "NO";
  titleImage?: string;
  transparentTitle?: "always" | "auto" | "none";
  titlePenetrate?: string | "YES" | "NO";
  showTitleLoading?: string | "YES" | "NO";
  backgroundImageUrl?: string;
  backgroundImageColor?: string;
  gestureBack?: string | "YES" | "NO";
  enableScrollBar?: string | "YES" | "NO";
}
export interface UniPagesConfigGlobalStyleMpWeixin extends ObjectType {
  homeButton?: boolean;
  backgroundColorTop?: string;
  backgroundColorBottom?: string;
  restartStrategy?: "homePage" | "homePageAndLatestPage";
  initialRenderingCache?: "static" | "dynamic";
  visualEffectInBackground?: "hidden" | "none";
  handleWebviewPreload?: "static" | "manual" | "auto";
}
export interface UniPagesConfigGlobalStyleMpBaidu extends ObjectType {
  textSizeAdjust?: "auto" | "none";
}
export interface UniPagesConfigGlobalStyleMpToutiao extends ObjectType {}
export interface UniPagesConfigGlobalStyleMpLark extends ObjectType {}
export interface UniPagesConfigGlobalStyleMpQq extends ObjectType {}
export interface UniPagesConfigGlobalStyleMpKuaishou extends ObjectType {}
export interface UniPagesConfigGlobalStyleMpJd extends ObjectType {}
export interface UniPagesStyleCommonType extends ObjectType {
  navigationBarBackgroundColor?: string;
  navigationBarTextStyle?: "black" | "white";
  navigationBarTitleText?: string;
  navigationStyle?: "default" | "custom";
  backgroundColor?: string;
  backgroundTextStyle?: "dark" | "light";
  enablePullDownRefresh?: boolean;
  onReachBottomDistance?: number;
  backgroundColorTop?: string;
  backgroundColorBottom?: string;
  titleImage?: string;
  transparentTitle?: string;
  titlePenetrate?: string;
  "app-plus"?: UniPagesConfigGlobalStyleAppPlus;
  h5?: UniPagesConfigGlobalStyleH5;
  "mp-alipay"?: UniPagesConfigGlobalStyleMpAlipay;
  "mp-weixin"?: UniPagesConfigGlobalStyleMpWeixin;
  "mp-baidu"?: UniPagesConfigGlobalStyleMpBaidu;
  "mp-toutiao"?: UniPagesConfigGlobalStyleMpToutiao;
  "mp-lark"?: UniPagesConfigGlobalStyleMpLark;
  "mp-qq"?: UniPagesConfigGlobalStyleMpQq;
  "mp-kuaishou"?: UniPagesConfigGlobalStyleMpKuaishou;
  "mp-jd"?: UniPagesConfigGlobalStyleMpJd;
  usingComponents?: UniUsingComponents;
  leftWindow?: boolean;
  topWindow?: boolean;
  rightWindow?: boolean;
  maxWidth?: number;
}
export interface UniPagesConfigEasycom extends ObjectType {
  autoscan: boolean;
  custom: ObjectType<string>;
}
export interface UniPagesConfigGlobalStyle extends UniPagesStyleCommonType {
  pageOrientation?: "portrait" | "landscape" | "auto";
  animationType?: UniAnimationType;
  animationDuration?: number;
  renderingMode?: string | "seperated";
  rpxCalcMaxDeviceWidth?: number;
  rpxCalcBaseDeviceWidth?: number;
  rpxCalcIncludeWidth?: number;
  dynamicRpx?: boolean;
}
export interface UniPagesPageStyleType extends UniPagesStyleCommonType {
  navigationBarShadow?: {
    colorType?: "grey" | "blue" | "green" | "orange" | "red" | "yellow" | string;
  };
  disableScroll?: boolean;
  disableSwipeBack?: boolean;
}
export interface UniPagesPageItem extends ObjectType {
  type: string;
  path: string;
  style?: ObjectType<UniPagesPageStyleType>;
  needLogin?: boolean;
}
export interface UniIconfontObject extends ObjectType {
  text?: string;
  color?: string;
  fontSize?: string;
  selectedText?: string;
  selectedColor?: string;
}
export interface UniPagesTabbarListItem extends ObjectType {
  text: string;
  pagePath: string;
  iconPath?: string;
  visible?: boolean;
  selectedIconPath?: string;
  iconfont?: UniIconfontObject;
}
export interface UniPagesTbbarMidButton extends ObjectType {
  width?: string;
  height?: string;
  text?: string;
  iconPath?: string;
  iconWidth?: string;
  backgroundImage?: string;
  iconfont?: UniIconfontObject;
}
export interface UniPagesTabbar extends ObjectType {
  color: string;
  selectedColor: string;
  backgroundColor: string;
  list?: UniPagesTabbarListItem[];
  borderStyle?: "black" | "white";
  blurEffect?: "dark" | "extralight" | "light" | "none";
  position?: "bottom" | "top";
  fontSize?: string;
  iconWidth?: string;
  spacing?: string;
  height?: string;
  midButton?: UniPagesTbbarMidButton;
  iconfontSrc?: string;
  backgroundImage?: string;
  backgroundRepeat?: "no-repeat" | "repeat" | "repeat-x" | "repeat-y";
  redDotColor?: string;
}
export interface UniPagesConditionListItem extends ObjectType {
  name: string;
  path: string;
  query?: string;
}
export interface UniPagesCondition extends ObjectType {
  current: number;
  list: UniPagesConditionListItem[];
}
export interface UniPagesSubPackageItem extends ObjectType {
  root: string;
  pages: UniPagesPageItem[];
}
export interface UniPagesPreloadRuleValue extends ObjectType {
  packages: Array<string | "__APP__">;
  network?: "all" | "wifi";
}
export interface UniPagesPreloadRule extends ObjectType<UniPagesPreloadRuleValue> {}
export interface UniPagesWorkers extends ObjectType {
  path: string;
  isSubpackage?: boolean;
}
export interface UniPagesWindow extends ObjectType {
  path?: string;
  style?: UniPagesPageStyleType;
  matchMedia?: { minWidth?: number };
}
export interface UniPagesConfig extends ObjectType {
  pages: UniPagesPageItem[];
  easycom?: UniPagesConfigEasycom;
  globalStyle?: UniPagesConfigGlobalStyle;
  tabBar?: UniPagesTabbar;
  condition?: UniPagesCondition;
  subPackages?: UniPagesSubPackageItem[];
  preloadRule?: UniPagesPreloadRule;
  workers?: string | UniPagesWorkers;
  leftWindow?: UniPagesWindow;
  topWindow?: UniPagesWindow;
  rightWindow?: UniPagesWindow;
  uniIdRouter?: ObjectType;
  entryPagePath?: string;
}
