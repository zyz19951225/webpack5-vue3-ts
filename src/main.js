
// 引入 Css 资源，Webpack才会对其打包
import "./css/index.css";
import "./less/index.less";
import "./sass/index.sass";
import "./css/iconfont.css"
import { sum } from "./js/math";

console.log("hello main");
console.log(sum(1, 2, 3, 4, 5));
