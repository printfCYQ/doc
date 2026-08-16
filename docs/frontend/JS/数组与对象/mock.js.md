# mock.js

-   文档来源:`[https://www.bilibili.com/video/BV17W4y1e7T8/](https://www.bilibili.com/video/BV17W4y1e7T8/)`

#### 1.环境搭建

-   官网: `[http://mockjs.com/](http://mockjs.com/)`
-   vue create mockdemo
-   安装: `npm install mockjs`
-   npm i axios

  

```javascript
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

const Mock = require("mockjs")
console.log(Mock);
```

  

#### 2.Mock语法规范

Mock.js 的语法规范包括两部分：

1.  数据模板定义规范（Data Template Definition，DTD）
2.  数据占位符定义规范（Data Placeholder Definition，DPD)

##### 数据模板定义规范 DTD

**数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：**

  

```javascript
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value
```

  

**注意：**

-   *属性名* 和 *生成规则* 之间用竖线 `|` 分隔。
-   *生成规则* 是可选的。
-   *生成规则* 有 7 种格式：

1.  `'name|min-max': value`
2.  `'name|count': value`
3.  `'name|min-max.dmin-dmax': value`
4.  `'name|min-max.dcount': value`
5.  `'name|count.dmin-dmax': value`
6.  `'name|count.dcount': value`
7.  `'name|+step': value`

-   **生成规则 的 含义 需要依赖 属性值的类型 才能确定。**
-   *属性值* 中可以含有 `@占位符`。
-   *属性值* 还指定了最终值的初始值和类型。

  

**生成规则和示例：**

  

-   属性值是字符串 **String**

1.  `'name|min-max': string`  
    通过重复 `string` 生成一个字符串，重复次数大于等于 `min`，小于等于 `max`。
2.  `'name|count': string`  
    通过重复 `string` 生成一个字符串，重复次数等于 `count`。

  

-   属性值是数字 **Number**

1.  `'name|+1': number`  
    属性值自动加 1，初始值为 `number`。
2.  `'name|min-max': number`  
    生成一个大于等于 `min`、小于等于 `max` 的整数，属性值 `number` 只是用来确定类型。
3.  `'name|min-max.dmin-dmax': number`  
    生成一个浮点数，整数部分大于等于 `min`、小于等于 `max`，小数部分保留 `dmin` 到 `dmax` 位

  

```javascript
Mock.mock({
    'number1|1-100.1-10': 1,
    'number2|123.1-10': 1,
    'number3|123.3': 1,
    'number4|123.10': 1.123
})
// =>
{
    "number1": 12.92,
    "number2": 123.51,
    "number3": 123.777,
    "number4": 123.1231091814
}
```

  

-   属性值是布尔型 **Boolean**

1.  `'name|1': boolean`  
    随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。
2.  `'name|min-max': value`  
    随机生成一个布尔值，值为 `value` 的概率是 `min / (min + max)`，值为 `!value` 的概率是 `max / (min + max)`。

  

-   属性值是对象 **Object**

1.  `'name|count': object`  
    从属性值 `object` 中随机选取 `count` 个属性。
2.  `'name|min-max': object`  
    从属性值 `object` 中随机选取 `min` 到 `max` 个属性。

  

-   属性值是数组 **Array**

1.  `'name|1': array`  
    从属性值 `array` 中随机选取 1 个元素，作为最终值。
2.  `'name|+1': array`  
    从属性值 `array` 中顺序选取 1 个元素，作为最终值。
3.  `'name|min-max': array`  
    通过重复属性值 `array` 生成一个新数组，重复次数大于等于 `min`，小于等于 `max`。
4.  `'name|count': array`  
    通过重复属性值 `array` 生成一个新数组，重复次数为 `count`。

  

-   属性值是函数 **Function**

1.  `'name': function`  
    执行函数 `function`，取其返回值作为最终的属性值，函数的上下文为属性 `'name'` 所在的对象。

-   属性值是正则表达式 **RegExp**

1.  `'name': regexp`  
    根据正则表达式 `regexp` 反向生成可以匹配它的字符串。用于生成自定义格式的字符串

```javascript
Mock.mock({
    'regexp1': /[a-z][A-Z][0-9]/,
    'regexp2': /\w\W\s\S\d\D/,
    'regexp3': /\d{5,10}/
})
// =>
{
    "regexp1": "pJ7",
    "regexp2": "F)\fp1G",
    "regexp3": "561659409"
}
```

##### 数据占位符定义规范 DPD

*占位符* 只是在属性值字符串中占个位置，并不出现在最终的属性值中。

*占位符* 的格式为:

```javascript
@占位符
@占位符(参数 [, 参数])
```

**注意：**

1.  用 `@` 来标识其后的字符串是 *占位符*。
2.  *占位符* 引用的是 `Mock.Random` 中的方法。
3.  通过 `Mock.Random.extend()` 来扩展自定义占位符。
4.  *占位符* 也可以引用 *数据模板* 中的属性。
5.  *占位符* 会优先引用 *数据模板* 中的属性。
6.  *占位符* 支持 *相对路径* 和 *绝对路径*。

```javascript
Mock.mock({
    name: {
        first: '@email',
        middle: '@phone',
        last: '@LAST',
        full: '@first @middle @last'
    }
})
// =>
{
    "name": {
        "first": "111@qq.com",
        "middle": "17316601234",
        "last": "Lopez",
        "full": "Charles Brenda Lopez"
    }
}
```

#### 3.模拟GET请求

```javascript
import axios from "axios";
import Mock from "mockjs";
const Random = Mock.Random;

var { userdata } = Mock.mock({
  "userdata|1-10": [
    {
      "id|+1": 1,
      name: "@cname()",
      address: "@city(true)",
      email: "@email(163.com)"
    },
  ],
});

Mock.mock("/user/list", "get", () => {
  return {
    code: 200,
    message: "查询用户信息成功",
    data: userdata,
  };
});

var { newList } = Mock.mock({
  "newList|20-30": [
    {
      id: "@increment(1)",
      title: "@ctitle()",
      date: "@date(yyyy-MM-dd hh:mm:ss)",
      info: "@cparagraph(5,10)",
      avatar: Random.image('200x100', '#00405d', '#FFF', 'Mock.js'),
      pic: "@image('300x200')"
    },
  ],
});

Mock.mock("/api/movie", "get", () => {
  return {
    status: 200,
    message: "获取电影列表成功！",
    total: newList.length,
    data: newList,
  };
});

const btn = () => {
  axios.get("/api/movie").then((res) => {
    console.log(res.data);
  });
};
```

#### 4.模拟POST请求

```javascript
// 模拟post请求
let { newData } = Mock.mock({
  "newData|1-3": [
    {
      "company|1": ["CSDN", "阿里巴巴", "腾讯", "百度", "华为"],
      "companyDescription": "@cparagraph(4)",
      "logo": function () {
        return Random.image("36x36", "#d8d8d8", "#000", "png", "Logo");
      },
      "city|1": "长沙市岳麓区",
      "positionTitle|+1": [
        "Java开发工程师",
        "Python开发工程师",
        "前端开发工程师",
        "产品经理",
        "UI设计师",
        "IOS研发工程师",
        "安卓研发工程师",
      ],
      // 薪资
      "salaryRange|1": ["5k-8k", "10k-15k", "15k-20k"],
      // 工作年限
      "workTime|2-10": 2,
      // 招聘人数
      "recruitNumber|1-5": 1,
      // 学历
      "degree|1": ["本科", "硕士", "博士"],
      // 上架时间
      "launchTime": '@date("yyyy-MM-dd")',
      // 职位描述
      "jobDescription": "@word(20)",
    },
  ],
});

Mock.mock("/api/user", "post", (data) => {
  console.log(data);
  return {
    status: 200,
    message: "我是post请求",
    data: newData,
  };
});

const btn = () => {
  // axios.get("/api/movie").then((res) => {
  //   console.log(res.data);
  // });
  axios.post("/api/user", {name: "邱淑贞", age: 18}).then((res) => {
    console.log(res.data);
  });
};
```

#### 5.模拟PUT与DELETE（不常用）

```javascript
// 模拟 put 请求
Mock.mock("/api/user/put", "put", (data) => {
  return {
    status: 200,
    message: "我是put请求",
    data: data.body
  }
})

const btn2 = () => {
  axios.put("/api/user/put", {name: 222}).then(res => {
    console.log(res.data.data);
  })
}

// 模拟 delete 请求
Mock.mock(/\/api\/user/, "delete", () => {
   return {
    status: 200,
    message: "我是delete请求",
    data: 123
  }
})

const btn3 = () => {
  axios.delete("/api/user/10").then(res => {
    console.log(res.data);
  })
}
```

#### 6.配合fastmock使用，效率高高哦

`https://www.fastmock.site/#/`
