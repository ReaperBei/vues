// 账号
let codeReg = /^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]{6,20}$/;
// 电话
let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
// 必须为数字
let numberReg = /^\d+$|^\d+[.]?\d+$/;
// 正整数
const inPoint = /^[1-9]\d*$/
// 限制字符2-20
let character =  /^[A-Za-z0-9\u4e00-\u9fa5·]{2,20}$/;
// 空格
let blank = /^\s+|\s+$/
//路径
let valieDataUrl =  /^[\/\da-zA-Z]+[?/**]$/;
// 密码
let passwordReg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/;
// 联系人
let contactsReg = /^[\u0391-\uFFE5A-Za-z]+$/;
// 身份证
let IdentityReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
// 邮箱
let mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
// 验证版本号
var reg = /^(?!0\.0\.0)(\d|[1-9]\d+)\.(\d|[1-9]\d+)\.(\d|[1-9]\d+)$/;
let FormValidate = (function () {
  function FormValidate () {}
  // From表单验证规则  可用于公用的校验部分
  FormValidate.Form = function () {
    return {
      // 账号的验证规则
      validateCode (rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入账号'))
        }
        if (!codeReg.test(value)) {
          callback(new Error('账号必须为6-20位字母和数字组合'))
        } else {
          callback()
        }
      },
      // 路径的验证规则
      validUrl(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入内容'))
        }
        if(blank.test(value)){
          return callback(new Error('不能输入空格'))
        }
        if (!valieDataUrl.test(value)) {
          callback(new Error('输入路径不正确'))
        } else {
          callback()
        }
      },
      // 限制中文字符2-20且不能输入空格
      validateCharacter (rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入内容'))
        }
        if(blank.test(value)){
          return callback(new Error('不能输入空格'))
        }
        if (!character.test(value)) {
          callback(new Error('输入内容只能是2-20中文字符,不能有特殊符号'))
        } else {
          callback()
        }
      },
      // 正整数
      valiminPoint(rule, value, callback){
         if (!value) {
          return callback(new Error('请输入内容'))
        }
        if (!inPoint.test(value)) {
          callback(new Error('请输入数字且只能是正整数'))
        } else {
           callback()
        }
      },
      // 只能数字的验证
      validateNumber (rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入内容'))
        }
        if(blank.test(value)){
          return callback(new Error('不能输入空格'))
        }
        if (!numberReg.test(value)) {
          callback(new Error('请输入正确数字'))
        } else {
          callback()
        }
      },
      // 身份证的验证
      validateIdentity (rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入身份证'))
        }
        if(blank.test(value)){
          return callback(new Error('不能输入空格'))
        }
        if (!IdentityReg.test(value)) {
          callback(new Error('请输入正确的身份证'))
        } else {
          callback()
        }
      },
      // 密码的验证
      validatePsdReg (rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入密码'))
        }
        if (!passwordReg.test(value)) {
          callback(new Error('6-20位英文字母,数字或者符号(除空格),且字母,数字和标点符号至少包含两种'))
        } else {
          callback()
        }
      },
      // 联系人
      validateContacts (rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入内容'))
        }
        if (!contactsReg.test(value)) {
          callback(new Error('输入内容不可输入特殊字符'))
        } else {
          callback()
        }
      },
       // 邮箱
       validateEmail (rule, value, callback) {
        if (!value) {
          return callback(new Error('邮箱不能为空'))
        }
        if (!mailReg.test(value)) {
          callback(new Error('请输入正确的邮箱格式'))
        } else {
          callback()
        }
      },
      // 电话号码的验证
      validatePhone (rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入手机号码'))
        }
        if (!phoneReg.test(value)) {
          callback(new Error('手机格式不正确'))
        } else {
          callback()
        }
      }
    }
  }

  return FormValidate
}())
exports.FormValidate = FormValidate