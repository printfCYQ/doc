# 生成 package.json

```typescript
npm init -y
```

# 安装 axios

```typescript
yarn add axios
```

> package.json

```typescript
{
  "name": "XXXXX",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.27.2",
  }
}

```

# 封装 axios

> request.js

```typescript
import axios from "axios";

// uniapp 必须要设置adapter
axios.defaults.adapter = function(config) {
    return new Promise((resolve, reject) => {
        console.log(config)
        var settle = require('axios/lib/core/settle');
        var buildURL = require('axios/lib/helpers/buildURL');
        uni.request({
            method: config.method.toUpperCase(),
            url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
            header: config.headers,
            data: config.data,
            dataType: config.dataType,
            responseType: config.responseType,
            sslVerify: config.sslVerify,
            complete: function complete(response) {
                response = {
                    data: response.data,
                    status: response.statusCode,
                    errMsg: response.errMsg,
                    header: response.header,
                    config: config
                };

                settle(resolve, reject, response);
            }
        })
    })
}

const env = {
	'dev': 'https://xxxxxxx.com',
	'test': 'https://xxxxxxx.com',
	'beta': 'https://xxxxxxx.com',
	'prod': 'https://xxxxxxx.com',
}

const baseUrl = env.test
let request = axios.create({
	baseURL: baseUrl,
	timeout: 10000, //设置超时时间
})
//请求拦截
request.interceptors.request.use(
	function(config) {
		// console.log("请求之前的配置项：", config);
		config.url +=
			`?accessToken=${uni.getStorageSync("accessToken")}&reflashToken=${uni.getStorageSync("reflashToken")}&systemType=${uni.getStorageSync("systemType")}`
		return config;
	},
	function(error) {
		return Promise.reject(error);
	}
)

//响应拦截器
request.interceptors.response.use(
	function(response) {
		// console.log("响应拦截器响应的数据,", response);
		return response.data;
	},
	function(error) {
		return Promise.reject(error);
	}
);
export default request; //把request暴露出去

```

# api.js 封装

```typescript
import request from '@/utils/request.js'

const testPostUrl = 'xxxx'
const testGetUrl = 'xxxx'
export function testPost(data) {
	return request({
		url: testPostUrl,
		method: 'POST',
		data: data
	})
}

export function testGet(data) {
	return request({
		url: testGetUrl,
		method: 'GET',
		params: data
	})
}
```

# 调用

```typescript

<script>
  import { testPost, testGet } from '@/api/api.js'
	export default {
		name: 'axios',

		data() {
			return {}
		},
		
		methods: {
			async testGetFunction() {
				const data = await testGet()
				console.log(data);
			},

			getUserApproveListFun() {
				const params = {}
				getUserApproveList(params).then(data => {
					console.log(data);
				})
			},
		}
	}
</script>

			
```
