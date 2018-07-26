// translate router.meta.title, be used in breadcrumb sidebar tagsview
//翻译对应的路由生成子菜单的翻译对象读取方法
export function generateTitle(title) {
  //该方法传入一个菜单项目中的title属性
  //再通过读取对应的翻译对象中的对应route中的对应属性获取到对应的翻译后的值
  const hasKey = this.$te('route.' + title)
  //并将对应后的值保存在变量translatedTitle中
  const translatedTitle = this.$t('route.' + title) // $t :this method from vue-i18n, inject in @/lang/index.js
  //如果存在对应的属性那么久返回对应属性所定义好的值
  if (hasKey) {
    return translatedTitle
  }
  //如果没有对应的属性值 那么就将传入的形参返回
  return title
}
