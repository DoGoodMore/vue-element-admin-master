//引入vue核心库
import Vue from 'vue'
//引入vue 国际化翻译插件核心库
import VueI18n from 'vue-i18n'
//引入cookies
import Cookies from 'js-cookie'

//引入element-ui框架内部内置的一些常用的翻译语句插件对象
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'


//引入对应的暴露的英文的翻译对象(即通过不同的对象的属性值 来达到不同语言的不同输出内容)
import enLocale from './en'
import zhLocale from './zh'

//声明使用翻译插件
Vue.use(VueI18n)

//定义最后使用的翻译使用对象
//通过...运算符将其合并到一个对象中
const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}

//暴露vue il18 实例对象
const i18n = new VueI18n({
  // set locale
  // options: en or zh
  //通过读取cookies存储的对应的语言来设置默认显示的语言
  //如果没有在cookies中读取到对应的默认语言选择项 那么久默认显示英文
  locale: Cookies.get('language') || 'en',
  // set locale messages
  //传入上诉定义的翻译对象为配置的翻译读取属性值的配置项中
  messages
})
//最后暴露对应的il18n实例对象
export default i18n
