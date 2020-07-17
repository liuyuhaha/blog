//公共方法
//为表单添加提交事件
function serializeToJson(form) {
  const result = {};
  //jquery提供了一个方法获取表单数据 serializeArray
  //返回值是一个数组，数组内有多少个对象取决于表单有多少个表单控件
  //[{name:'email',value:'用户输入的值'},{name:'password',value:'用户输入的密码'}]
  const formlist = form.serializeArray();
  formlist.forEach((item) => {
    //result.email
    result[item.name] = item.value;
  });
  return result;
}
