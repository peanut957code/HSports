import { createI18n } from 'vue-i18n'   //引入vue-i18n组件
import en_US from "./en-US/index";
import zh_CN from "./zh-CN/index";

const messages = {
    'zh': zh_CN,  // 中文语言包
    'vi': en_US,  // 英文语言包
}
const localeData = {
    messages,
    legacy: false, // composition API
    locale: localStorage.getItem('language') || 'vi', 
}
// localStorage.getItem('language') || 
// setup i18n instance with glob

const i18n = createI18n(localeData);

// 切换语言的方法
const changeLanguage = (lang) => {
    i18n.global.locale = lang; // 修改当前语言
    localStorage.setItem('language', lang); // 存储到 localStorage，刷新后保持语言选择
}

export default i18n;
export { changeLanguage };
// export default createI18n(localeData);