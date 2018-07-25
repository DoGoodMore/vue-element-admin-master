//引入cookies存储的数据内容
import Cookies from 'js-cookie'

//定义tokenKey
const TokenKey = 'Admin-Token'

//定义获取cookies中的对应的token的方法
export function getToken() {
  return Cookies.get(TokenKey)
}

//定义并暴露获取对应token的方法
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

//定义删除对应cookies中token的方法
export function removeToken() {
  return Cookies.remove(TokenKey)
}
