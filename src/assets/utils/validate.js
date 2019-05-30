/* eslint-disable */

/**
 * 表单验证工具类
 */

export function isvalidPositiveFloat(str) {
  // 正浮点数，不包括0
  const strRegex = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/
  return strRegex.test(str)
}

export function isvalidPositiveNumber(str) {
  // 正整数，不包括0
  const strRegex = /^[0-9]*[1-9][0-9]*$/
  return strRegex.test(str)
}

/* 合法手机号码 */
export function isvalidPhoneNumber(str) {
  const phoneRegex = /^1[34578]\d{9}$/
  return phoneRegex.test(str)
}

/* 四位数字*/
export function isvalidCode(str) {
  const codeRegex = /^\d{4}$/
  return codeRegex.test(str)
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
