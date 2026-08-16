# HarmonyOS 第一课

## 01.【习题】运行Hello World工程

> 判断题
> 
> 1. DevEco Studio是开发HarmonyOS应用的一站式集成开发环境。
> 
> 正确(True)
> 
> 2. main\_pages.json存放页面page路径配置信息。
> 
> 正确(True)
> 单选题
> 
> 1. 在stage模型中，下列配置文件属于AppScope文件夹的是？
> 
> app.json5
> 多选题
> 
> 1. 如何在DevEco Studio中创建新项目？
> 
> B. 如果已打开项目，从DevEco Studio菜单选择'file>new>Create Project'
> 
> C. 如果第一次打开DevEco Studio，在欢迎页点击“Create new Project”
> 
> 2. module.json5配置文件中，包含了以下哪些信息？
> 
> A. ability的相关配置信息
> 
> B. 模块名
> 
> D. 模块类型



## 02.【习题】ArkTS基础知识

> 判断题
> 
> 1. 循环渲染ForEach可以从数据源中迭代获取数据，并为每个数组项创建相应的组件。
> 
> 正确(True)
> 
> 2. @Link变量不能在组件内部进行初始化。
> 
> 正确(True)
> 单选题
> 
> 1. 用哪一种装饰器修饰的struct表示该结构体具有组件化能力？
> 
> A. @Component
> 
> 2\. 用哪一种装饰器修饰的自定义组件可作为页面入口组件？
> 
> B. @Entry
> 多选题
> 
> 1. 下面哪些函数是自定义组件的生命周期函数？
> 
> A. aboutToAppear
> 
> B. aboutToDisappear
> 
> C. onPageShow
> 
> D. onPageHide
> 
> E. onBackPress
> 
> 2. 下面哪些装饰器可以用于管理自定义组件中变量的状态？
> 
> C. @State
> 
> D. @Link



## 03.【习题】应用程序框架

> 判断题
> 
> 1. 一个应用只能有一个UIAbility。
> 
> 错误(False)
> 
> 2. 创建的Empty Ability模板工程，初始会生成一个UIAbility文件。
> 
> 正确(True)
> 
> 3. 每调用一次router.pushUrl()方法，页面路由栈数量均会加1。
> 
> 错误(False)
> 单选题
> 
> 1. API9及以上，router.pushUrl()方法，默认的跳转页面使用的模式是哪一种？
> 
> A. standard
> 
> 2. UIAbility启动模式需要在module.json5文件中配置哪个字段？
> 
> C. launchType
> 多选题
> 
> 1\. API9及以上，router.pushUrl()方法的mode参数可以配置为以下哪几种跳转页面使用的模式？
> 
> A. Standard
> 
> B. Single
> 
> 2. UIAbility的生命周期有哪几个状态？
> 
> A. Create
> 
> C. Foreground
> 
> D. Background
> 
> F. Destroy
> 
> 3. UIAbility有哪几种的启动模式？
> 
> A. multiton
> 
> B. singleton
> 
> C. specified



## 04.【习题】构建漂亮的页面

> 判断题
> 
> 1. 在Column容器中的子组件默认是按照从上到下的垂直方向布局的，其主轴的方向是垂直方向，在Row容器中的组件默认是按照从左到右的水平方向布局的，其主轴的方向是水平方向。
> 
> 正确(True)
> 
> 2. List容器可以沿水平方向排列，也可以沿垂直方向排列。
> 
> 正确(True)
> 
> 3. 当Tabs组件的参数barPosition为BarPosition.End时，页签位于页面底部。
> 
> 错误(False)
> 
> 4. Resource是资源引用类型，用于设置组件属性的值，可以定义组件的颜色、文本大小、组件大小等属性。
> 
> 正确(True)
> 单选题
> 
> 1. 使用TextInput完成一个密码输入框，推荐设置type属性为下面哪个值？
> 
> B. InputType.Password
> 
> 2. 使用Image加载网络图片，需要以下那种权限？
> 
> B. ohos.permission.INTERNET
> 
> 3. 下面哪个组件层次结构是错误的？
> 
> C. Grid>Row>GridItem
> 多选题
> 
> 1. Row容器的主轴是水平方向，交叉轴是垂直方向，其参数类型为VerticalAlign （垂直对齐），VerticalAlign 定义了以下几种类型？
> 
> A. Top
> 
> B. Bottom
> 
> E. Center
> 
> 2. 下面哪些组件是容器组件？
> 
> B. Row
> 
> C. Column
> 
> 3. 关于Tabs组件页签的位置设置，下面描述正确的是？
> 
> A. 当barPosition为Start（默认值），vertical属性为false时（默认值），页签位于容器顶部。
> 
> B. 当barPosition为Start（默认值） ，vertical属性为true时，页签位于容器左侧。
> 
> C. 当barPosition为End ，vertical属性为false（默认值）时，页签位于容器底部。
> 
> D. 当barPosition为End ，vertical属性为true时，页签位于容器右侧。



## 05.【习题】构建更加丰富的页面

> 判断题
> 
> 1. @State修饰的属性不允许在本地进行初始化。
> 
> 错误(False)
> 
> 2. @CustomDialog装饰器用于装饰自定义弹窗组件，使得弹窗可以自定义内容及样式。
> 
> 正确(True)
> 
> 3. 将Video组件的controls属性设置为false时，不会显示控制视频播放的控制栏。
> 
> 正确(True)
> 
> 4. @Prop修饰的属性值发生变化时，此状态变化不会传递到其父组件。
> 
> 正确(True)
> 单选题
> 
> 1. 使用Video组件播放网络视频时，需要以下哪种权限？
> 
> B. ohos.permission.INTERNET
> 
> 2. 下列哪种组合方式可以实现子组件从父子组件单向状态同步。
> 
> C. @State和@Prop
> 多选题
> 
> 1. 下列哪些状态装饰器修饰的属性必须在本地进行初始化。
> 
> A. @State
> 
> D. @Provide
> 
> 2. ArkUI提供了下面哪些弹窗功能。
> 
> A. AlertDialog
> 
> B. TextPickerDialog
> 
> C. DatePickerDialog
> 
> D. @CustomDialog
> 
> E. TimePickerDialog



## 06.【习题】属性动画

> 判断题
> 
> 1. 属性动画中产生动画的属性可以在任意位置声明。
> 
> 错误(False)
> 
> 2. 属性动画中改变属性时需触发UI状态更新。
> 
> 正确(True)
> 单选题
> 
> 1. 属性animation可以在哪些组件中使用？
> 
> C. 基础组件和容器组件
> 
> 2. 属性动画中如何设置反向播放？
> 
> D. PlayMode.Reverse
> 
> 3. 下面哪种情况不会回调onFinish函数？
> 
> C. iterations设置为 -1
> 
> 4. 属性动画中关于animation参数说法错误的是？
> 
> B. 参数delay不能大于duration
> 多选题
> 
> 1. 属性动画支持哪些属性？
> 
> A. width
> 
> B. rotate
> 
> C. opacity
> 
> D. scale
> 
> 2. 属性动画中animation的参数有哪些？
> 
> A. playMode
> 
> B. curve
> 
> C. delay
> 
> D. onFinish



## 07.【习题】从网络获取数据

> 判断题
> 
> 1. 在http模块中，多个请求可以使用同一个httpRequest对象，httpRequest对象可以复用。
> 
> 错误(False)
> 
> 2. 使用http模块发起网络请求后，可以使用destroy方法中断网络请求。
> 
> 正确(True)
> 
> 3. Web组件onConfirm(callback: (event?: { url: string; message: string; result: JsResult }) => boolean)事件，返回false时候触发网页默认弹窗。
> 
> 正确(True)
> 单选题
> 
> 1. 使用http发起网络请求，需要以下哪种权限？
> 
> B. ohos.permission.INTERNET
> 
> 2. 向服务器提交表单数据，以下哪种请求方式比较合适？
> 
> B. RequestMethod.POST
> 
> 3. 下列关于Web组件的属性，描述错误的是？
> 
> C. javaScriptAccess设置是否允许执行JavaScript脚本，默认不允许执行。
> 
> 4. 关于请求返回的响应码ResponseCode，下列描述错误的是？
> 
> D. ResponseCode.GONE的值为404，表示客户端请求的资源已经不存在。
> 多选题
> 
> 1. Web组件支持下列哪些属性或事件？
> 
> A. fileAccess(fileAccess: boolean)
> 
> B. javaScriptAccess(javaScriptAccess: boolean)
> 
> D. onConfirm(callback: (event?: { url: string; message: string; result: JsResult }) => boolean)
> 
> 2. 关于http模块描述正确的是？
> 
> A. http请求支持get、post、put等常用的请求方式。
> 
> B. 可以使用on('headersReceive')订阅请求响应头。
> 
> C. post请求的参数可以在extraData中指定。
> 
> D. 执行createHttp成功后，返回一个httpRequest对象，里面包括request、destroy、on和off方法。
> 
> 3. 关于Web组件描述正确的是？
> 
> A. Web组件是提供具有网页显示能力的一种组件。
> 
> B. Web组件传入的地址可以是本地资源也可以是网络资源。
> 
> C. WebController可以控制Web组件的各种行为，例如网页的前进、后退等功能。
> 
> D. 当访问在线网页时，需添加网络权限。



## 08.【习题】保存应用数据

> 判断题
> 
> 1\. 首选项是关系型数据库。
> 
> 错误(False)
> 
> 2. 应用中涉及到Student信息，如包含姓名，性别，年龄，身高等信息可以用首选项来存储。
> 
> 错误(False)
> 
> 3. 同一应用或进程中每个文件仅存在一个Preferences实例。
> 
> 正确(True)
> 单选题
> 
> 1. 使用首选项要导入的包是哪个？
> 
> B. @ohos.data.preferences
> 
> 2. 首选项的数据持久化后是放在哪里？
> 
> C. 文件中
> 
> 3. 下面哪个接口不是首选项提供的API接口？
> 
> B. update()
> 多选题
> 
> 1. HarmonyOS提供的数据管理的方式都有哪些？
> 
> A. 首选项
> 
> B. 分布式数据服务
> 
> C. 关系数据库
> 
> D. 分布式数据对象
> 
> 2. 下面说法正确的有？
> 
> B. 首选项以Key-Value形式存取数据
> 
> C. 首选项存储数据数量建议不超过1万条
> 
> D. 首选项的key为String类型



## 09.【习题】给应用添加通知和提醒

> 判断题
> 
> 1. 构造进度条模板通知，name字段当前需要固定配置为downloadTemplate。
> 
> 正确(True)
> 
> 2. 给通知设置分发时间，需要设置showDeliveryTime为false。
> 
> 误(False)
> 
> 3. OpenHarmony提供后台代理提醒功能，在应用退居后台或退出后，计时和提醒通知功能被系统后台代理接管。
> 
> 错正确(True)
> 单选题
> 
> 1. 将通道设置为下面哪个类型，可以显示横幅通知？
> 
> A. SlotType.SOCIAL\_COMMUNICATION
> 
> 2. 下列哪个是从API 9 开始支持的后台代理提醒功能模块。
> 
> A. @ohos.reminderAgentManager
> 多选题
> 
> 1. 下面哪些方法可以移除通知？
> 
> A. cancel
> 
> B. cancelAll
> 
> 2. 后台代理提醒业务分为哪几种类型。
> 
> A. 倒计时类
> 
> B. 日历类
> 
> C. 闹钟类



## 10.【习题】一次开发，多端部署

> 单选题
> 
> 1. “一多”推荐在应用开发过程中使用如下的“三层工程结构”，以下关于“三层工程结构”说法错误的是：
> 
> **A. common层不可分割，需编译成一个HAR包，可以被products和features依赖，也可以反向依赖**
> 
> B. 各个feature高内聚、低耦合、可定制，供产品灵活部署
> 
> C. 开发阶段应考虑不同类型设备间最大程度的复用代码，以减少开发及后续维护的工作量
> 
> D. products层各个子目录各自编译为一个Entry类型的HAP包，作为应用主入口，products层不可以横向调用
> 
> 2. 关于自适应布局，以下说法错误的是：
> 
> A. 拉伸能力是指容器组件尺寸发生变化时，增加或减小的空间全部分配给容器组件内指定区域
> 
> B. 占比能力是指子组件的宽高按照预设的比例，随父容器组件发生变化
> 
> **C. 隐藏能力按照布局优先级大小，从大到小依次隐藏，直到容器能够完整显示剩余元素**
> 
> D. 延伸能力是指容器组件内的子组件，按照其在列表中的先后顺序，随容器组件尺寸变化显示或隐藏
> 多选题
> 
> 1. 一多”有两种开发模型，开发者可以从应用UX设计及应用功能两个维度，结合具体的业务场景，考虑选择哪种开发模型。以下说法正确的是：
> 
> **A. 开发模型1是指不同类型的设备上按照一定的工程结构组织方式，通过一次编译生成相同的HAP（或HAP组合）**
> 
> **B. 开发模型2是指不同类型的设备上按照一定的工程结构组织方式，通过一次编译生成不同的HAP（或HAP组合）**
> 
> **C. 对于相同泛类的设备，优先选择开发模型1，对于不同泛类设备，优先选择开发模型2**
> 
> D. 对于相同泛类的设备，优先选择开发模型2，对于不同泛类设备，优先选择开发模型1
> 
> 2. 关于响应式布局，说法正确的有：
> 
> **A. 将窗口宽度划分为不同的范围（即断点），监听窗口尺寸变化，当断点改变时同步调整页面布局**
> 
> **B. 媒体查询支持监听窗口宽度、横竖屏、深浅色、设备类型等多种媒体特征，当媒体特征发生改变时同步调整页面布局**
> 
> **C. 栅格组件将其所在的区域划分为有规律的多列，通过调整不同断点下的栅格组件的参数以及其子组件占据的列数等，实现不同的布局效果**
> 
> D. 一般来说，页面的断点和栅格都是固定的，开发者不能去修改这些属性参数
> 
> 3. HarmomyOS通过SysCap机制（SystemCapability，即系统能力）将 API 与设备解耦，从而让开发者在开发应用时，更少的关心设备能力，从而达到应用多端部署的目的，以下关于系统能力，说法正确的有：
> 
> **A. 系统能力集是操作系统中每一个相对独立的特性，如蓝牙，WIFI，NFC，摄像头等，都是系统能力之一**
> 
> **B. 支持能力集是描述当前设备能够支持的哪些功能**
> 
> **C. 要求能力集是描述当前应用，具有哪些能力**
> 
> **D. 在编码阶段，开发者可以通过canIUse接口，判断目标设备是否支持某系统能力，进而执行不同的业务逻辑**



## 11.【习题】HarmonyOS应用/元服务上架

> 判断题
> 
> 1. 元服务发布的国家与地区仅限于“中国大陆”
> 
> 正确(True)
> 
> 2. 编译打包的软件包存放在项目目录build > outputs > default下
> 
> 正确(True)
> 单选题
> 
> 1. 创建应用时，应用包名需要和app.json5或者config.json文件中哪个字段保持一致？
> 
> C. bundleName
> 
> 2. 发布应用时需要创建证书，证书类型选择什么类型？
> 
> B. 发布证书
> 
> 3. 发布应用时需要创建Profile时，类型选择什么类型？
> 
> B. 发布
> 
> 4. 上传发布软件包时，软件包的格式是什么？
> 
> B. .app
> 
> 5. 发布后的应用可以在哪里获取？
> 
> A. 华为应用市场



# 主题课
