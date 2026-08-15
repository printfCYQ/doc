# Java 学习笔记（新手版）

这是一份写给第一次接触 Java 的人的笔记。Java 是门老牌语言，岗位多、生态大，但刚上手时概念确实多：JDK、JVM、类、对象、接口、集合……容易一头雾水。

这份笔记的思路是先让你能跑起来、能写能改，再慢慢讲清楚背后的概念。所有代码都是可以直接复制运行的，建议边看边敲。

---

## 第 0 章：Java 到底是什么

一句话：Java 是一门"一次编写，到处运行"的编程语言。你写的 `.java` 源码会被编译成 `.class` 字节码，然后交给 JVM（Java 虚拟机）去执行。因为各平台都有对应的 JVM，所以同一份字节码能在 Windows、macOS、Linux 上跑，不用改代码。

几个常被混在一起的词：

- **JDK（Java Development Kit）**：开发工具包，写 Java 必须装。里面包含 JRE 和编译器 `javac`。
- **JRE（Java Runtime Environment）**：运行环境，只跑 Java 程序用。
- **JVM（Java Virtual Machine）**：虚拟机，真正执行字节码的地方。平时说"Java 慢/快""GC"基本都在说 JVM。

和别的语言的区别大概感受一下：C++ 直接编译成机器码、贴近硬件但容易写崩；Python 边解释边跑、写起来爽但性能一般；Java 折中——编译成字节码由 JVM 跑，有自动内存管理（GC），安全性和跨平台都强，所以企业后台用得特别多。

---

## 第 1 章：环境搭建

### 装 JDK

去 Adoptium（temurin）或 Oracle 官网下对应系统的 JDK 17（目前主流稳定版，LTS）。装完打开终端验证：

```bash
java -version
javac -version
```

两个都能打印出版本号就算装好了。mac 上用 Homebrew 更省事：`brew install openjdk@17`。

### 装 IDE

写 Java 一般用 IntelliJ IDEA（社区版免费就够用）。它帮你管理项目、补全代码、一键运行，比记事本敲命令舒服太多。

### 第一个程序

新建文件 `Hello.java`：

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("你好，Java");
    }
}
```

注意类名 `Hello` 必须和文件名 `Hello.java` 一模一样，首字母大写是约定。运行方式有两种：

命令行编译运行：

```bash
javac Hello.java   # 生成 Hello.class
java Hello         # 运行，打印"你好，Java"
```

在 IDEA 里直接右键 `main` 方法点运行就行，不用记命令。

`main` 方法是程序的入口，`String[] args` 是命令行参数，`System.out.println` 就是打印一行并换行。

---

## 第 2 章：基础语法

### 变量与八种基本类型

Java 是强类型语言，变量得先声明类型才能用。

```java
int age = 18;              // 整数，4 字节，范围约 -21亿~21亿
long big = 10000000000L;   // 长整数，末尾加 L
double price = 9.9;        // 小数，双精度
float f = 3.14f;           // 单精度，末尾加 f
boolean ok = true;         // 布尔，只有 true / false
char c = 'A';              // 单个字符，用单引号
byte b = 1;                // 字节，1 字节
short s = 100;             // 短整型，2 字节
```

除了这八个基本类型，其他都是"引用类型"，比如 `String`、数组、你自己写的类。引用类型存的是地址，默认值是 `null`（空）。

### 类型转换

```java
int a = 10;
double d = a;        // 自动转：小范围转大范围，没问题
int x = (int) 3.9;   // 强制转：会丢精度，x 变成 3

String s = "123";
int n = Integer.parseInt(s);   // 字符串转整数
String s2 = String.valueOf(456);  // 数字转字符串
```

### 运算符

```java
int sum = 1 + 2;
int mod = 10 % 3;     // 取余，结果 1
boolean t = (a > 0) && (b < 5);   // 逻辑与，短路
int y = (a > 0) ? 1 : 0;          // 三元运算符：条件 ? 真值 : 假值
a++;                 // 自增，等价于 a = a + 1
```

`&&` 和 `&` 的区别：`&&` 前面为假就不看后面了（短路），更安全也更常用。

---

## 第 3 章：流程控制

### 条件

```java
int score = 85;
if (score >= 90) {
    System.out.println("优秀");
} else if (score >= 60) {
    System.out.println("及格");
} else {
    System.out.println("不及格");
}

// switch：多分支，JDK 7+ 支持 String，JDK 14+ 支持箭头语法
switch (score / 10) {
    case 10:
    case 9:
        System.out.println("优秀");
        break;
    case 8:
    case 7:
        System.out.println("良好");
        break;
    default:
        System.out.println("其他");
}
```

`break` 别忘了，否则会"穿透"执行下一个 case。

### 循环

```java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}

int j = 0;
while (j < 5) {
    System.out.println(j);
    j++;
}

// 增强 for：遍历数组或集合，最常用
int[] nums = {1, 2, 3};
for (int n : nums) {
    System.out.println(n);
}
```

`break` 跳出循环，`continue` 跳过本次循环剩下部分。

练一把：用循环打印 1 到 100 里所有能被 3 整除的数。

---

## 第 4 章：数组与字符串

### 数组

数组是固定长度、同类型的容器。

```java
int[] arr = new int[3];   // 长度 3，默认值是 0
arr[0] = 10;
int[] b = {1, 2, 3};      // 直接初始化
System.out.println(arr.length);  // 长度
```

数组长度定下就改不了。要动态增删得用后面讲的集合（`ArrayList`）。数组下标从 0 开始，访问 `arr[3]` 会抛 `ArrayIndexOutOfBoundsException`。

### 字符串 String

字符串在 Java 里有点特殊：它是引用类型，但写法像基本类型；而且**不可变**——每次"修改"其实是生成了新字符串。

```java
String s = "hello";
String s2 = s + " world";     // 生成新字符串，原 s 不变
System.out.println(s.equals(s2));  // false，比较内容用 equals
System.out.println(s == s2);       // 可能为 false，== 比的是地址，别用

// 常用方法
s.length();        // 长度
s.charAt(0);       // 取第 0 个字符 'h'
s.substring(1, 3); // 截取 "el"
s.contains("ell"); // 是否包含
s.toUpperCase();   // 转大写
```

拼接很多字符串时用 `StringBuilder`，性能比 `+` 好：

```java
StringBuilder sb = new StringBuilder();
sb.append("a").append("b").append("c");
String result = sb.toString();   // "abc"
```

`==` 和 `equals` 是最容易踩的坑：基本类型用 `==` 比值，引用类型用 `equals` 比值、用 `==` 比是不是同一个对象。字符串比较永远用 `equals`。

---

## 第 5 章：面向对象（重点）

Java 是纯面向对象语言，这块是核心。

### 类与对象

类像图纸，对象是按图纸造出来的实物。

```java
public class Person {
    String name;     // 字段（属性）
    int age;

    void sayHi() {    // 方法（行为）
        System.out.println("我是 " + name);
    }
}

// 使用
Person p = new Person();   // new 出对象
p.name = "小明";
p.sayHi();
```

`new` 是在内存里真正创建对象，`p` 只是个指向它的引用。

### 构造方法

创建对象时自动调用，用来初始化。名字和类名一样，没有返回值。

```java
public class Person {
    String name;
    int age;

    public Person(String name, int age) {   // 构造方法
        this.name = name;   // this 指当前对象，区分同名的参数和字段
        this.age = age;
    }
}
Person p = new Person("小明", 18);
```

不写构造方法时 Java 会送一个无参的；一旦你写了带参的，默认的就没了。

### 封装

把字段藏起来，只通过方法访问，避免被乱改。用 `private` + getter/setter：

```java
public class Person {
    private int age;

    public int getAge() { return age; }

    public void setAge(int age) {
        if (age < 0) throw new IllegalArgumentException("年龄不能负");
        this.age = age;
    }
}
```

### 继承

子类复用父类的代码，用 `extends`。

```java
public class Student extends Person {
    String school;

    @Override
    void sayHi() {    // 重写父类方法
        System.out.println("我是学生 " + name);
    }
}
```

`@Override` 不是必须，但写上编译器会帮你检查有没有真的重写对。Java 只支持单继承（一个类只能有一个直接父类）。

### 多态

父类引用指向子类对象，调用方法时实际跑的是子类的版本：

```java
Person p = new Student();   // 父类引用，子类对象
p.sayHi();                  // 输出"我是学生..."
```

多态的意义是"写代码时面向父类/接口，运行时才决定具体行为"，这是解耦的关键。

### 抽象类与接口

```java
abstract class Animal {        // 抽象类：不能 new，可含抽象方法
    abstract void sound();
}

interface Flyable {            // 接口：只有方法签名（Java 8 起可有默认实现）
    void fly();
}
```

区别：抽象类是一个"is-a"的关系、能存字段、单继承；接口是"能做什么"的能力、一个类能实现多个接口。现在写代码一般优先用接口。

### 修饰符速查

| 修饰符 | 同类 | 同包 | 子类 | 任意 |
|---|---|---|---|---|
| `private` | ✅ | | | |
| 默认（不写） | ✅ | ✅ | | |
| `protected` | ✅ | ✅ | ✅ | |
| `public` | ✅ | ✅ | ✅ | ✅ |

`static` 表示属于类而不是对象（工具方法、常量用它）；`final` 表示不可变（类不能被继承、方法不能被重写、变量不能改值）。

练一把：写一个 `Circle` 类，字段 `radius`，方法 `area()` 返回面积，`getPerimeter()` 返回周长。

---

## 第 6 章：常用类

### Object 与 equals / hashCode

所有类都间接继承自 `Object`。它的 `equals` 默认比地址（和 `==` 一样），所以你自己的类如果要比"内容相等"，得重写：

```java
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof Person p)) return false;
    return age == p.age && name.equals(p.name);
}
```

一般 `equals` 改了，`hashCode` 也得一起改（用在 HashSet/HashMap 里），IDEA 能自动生成。

### 包装类

基本类型对应的对象形式：`int`→`Integer`、`double`→`Double` 等。自动装箱拆箱让你混用：

```java
Integer a = 10;      // 自动装箱：基本类型 → 对象
int b = a;           // 自动拆箱：对象 → 基本类型
```

注意 `Integer` 缓存了 -128~127，这个区间里 `Integer.valueOf(100) == Integer.valueOf(100)` 为 true，超出就为 false——比较还是用 `equals` 最稳。

### 枚举

一组固定常量，比乱用字符串安全：

```java
enum Season { SPRING, SUMMER, AUTUMN, WINTER }
Season s = Season.SUMMER;
```

---

## 第 7 章：异常

程序出错时 Java 会抛出异常，你不处理程序就中断。

```java
try {
    int x = 1 / 0;
} catch (ArithmeticException e) {
    System.out.println("出错了：" + e.getMessage());
} finally {
    System.out.println("不管怎样都会执行");   // 常用来关资源
}
```

- `throw`：手动抛异常 `throw new RuntimeException("参数错误");`
- `throws`：方法声明"我可能抛这个异常，调用者自己处理"
- 自己写业务异常就继承 `Exception` 或 `RuntimeException`（后者不用强制 try-catch，更省事）

`finally` 里记得在 JDK 7+ 优先用 try-with-resources 自动关资源：

```java
try (BufferedReader br = new BufferedReader(new FileReader("a.txt"))) {
    // 用完自动关闭，不用手写 finally
}
```

---

## 第 8 章：集合框架（重点）

数组长度固定，集合可以动态增删。核心三大接口：

| 接口 | 特点 | 常用实现 |
|---|---|---|
| `List` | 有序、可重复 | `ArrayList`（查快改慢）、`LinkedList`（改快查慢） |
| `Set` | 无序、不重复 | `HashSet`、`TreeSet`（可排序） |
| `Map` | 键值对 | `HashMap`（最常用）、`TreeMap` |

```java
// List
List<String> list = new ArrayList<>();
list.add("a");
list.add("b");
list.get(0);          // "a"
list.forEach(System.out::println);

// Set：自动去重
Set<Integer> set = new HashSet<>();
set.add(1); set.add(1);   // 还是只有一个 1

// Map
Map<String, Integer> map = new HashMap<>();
map.put("age", 18);
int age = map.get("age");
```

`ArrayList` 底层是数组，查第 i 个快，中间插入要搬数据所以慢；`HashMap` 底层是数组+链表+红黑树，靠 `hashCode` 定位，理想情况增删查都是 O(1)。

遍历 Map：

```java
for (Map.Entry<String, Integer> e : map.entrySet()) {
    System.out.println(e.getKey() + "=" + e.getValue());
}
```

练一把：用 `HashMap` 统计一段文字里每个字符出现的次数。

---

## 第 9 章：泛型

集合后面那个 `<String>` 就是泛型，作用是编译期就管住类型，避免往 `List<String>` 里塞错东西：

```java
List<String> list = new ArrayList<>();
// list.add(123);   编译就报错，不用等到运行才发现
```

自己写方法也能用：

```java
static <T> T first(List<T> list) {
    return list.isEmpty() ? null : list.get(0);
}
```

---

## 第 10 章：常用工具

### 日期时间（java.time，JDK 8 引入，推荐）

老的 `Date`/`Calendar` 设计混乱，新项目直接用 `java.time`：

```java
LocalDate d = LocalDate.now();          // 年月日
LocalDateTime dt = LocalDateTime.now(); // 年月日时分秒
LocalDate tomorrow = d.plusDays(1);
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd");
String s = d.format(fmt);
```

### Optional

用来优雅地处理"可能为空"的情况，少写 `if (x != null)`：

```java
Optional<String> opt = Optional.ofNullable(getName());
String name = opt.orElse("匿名");   // 为空就用默认值
```

### Math

```java
Math.max(1, 2);
Math.random();      // 0~1 随机数
Math.round(3.6);    // 四舍五入
```

---

## 第 11 章：IO 与文件

读写字面和文件：

```java
// 写文件
Files.writeString(Path.of("a.txt"), "hello");
// 读文件
String content = Files.readString(Path.of("a.txt"));
```

传统方式是字节流 `InputStream`/`OutputStream` 和字符流 `Reader`/`Writer`，概念多但底层。日常小文件用 `java.nio.file.Files` 一行搞定就够了；大文件或网络流才需要碰流那套。

---

## 第 12 章：并发入门

Java 天生支持多线程。最基础的写法：

```java
Thread t = new Thread(() -> {
    System.out.println("在子线程跑");
});
t.start();   // 启动，别直接调 run()
```

`Runnable` 是"要执行的任务"，`Thread` 是"执行任务的载体"。也可以用线程池，避免频繁创建销毁线程：

```java
ExecutorService pool = Executors.newFixedThreadPool(4);
pool.submit(() -> System.out.println("任务"));
pool.shutdown();
```

多线程会碰到的核心问题是"多个线程改同一份数据"。两个保命工具：

- `synchronized`：给代码块或方法加锁，同一时刻只有一个线程能进。
- `volatile`：保证变量修改对所有线程立即可见（但不能保证原子性）。

```java
private int count = 0;
public synchronized void add() { count++; }
```

并发水深，新手先理解"共享变量 + 锁"这个基本矛盾即可，深入部分放后面再学。

---

## 第 13 章：JVM 与 GC（概念了解）

<details>
<summary>点开看：JVM 内存和垃圾回收是怎么回事</summary>

JVM 把内存分成几块，新手只要认识两个：

- **堆（Heap）**：所有 `new` 出来的对象都在这里，是 GC 的主战场。
- **栈（Stack）**：每个线程私有的，存局部变量和方法调用。

垃圾回收（GC）就是 JVM 自动找出"没人再用的对象"并回收内存，所以 Java 一般不用手动 `free`。判断"没人用"的经典思路是可达性分析：从一堆根对象（如栈里的变量）出发能摸到的对象算活着，摸不到的就是垃圾。

常见 GC 像 G1、ZGC 在不断演进，目标是停顿更短。新手阶段知道"Java 有自动 GC、对象放堆里、内存不够会 OOM（内存溢出）"就够，调优是进阶话题。

</details>

---

## 第 14 章：Java 8 以后的新特性

这些是现在写 Java 的基本功，早点熟悉：

```java
// Lambda：把"行为"当参数传，代替啰嗦的匿名类
list.forEach(x -> System.out.println(x));

// Stream：像流水线一样处理集合
List<Integer> r = list.stream()
    .filter(x -> x > 0)        // 过滤
    .map(x -> x * 2)           // 转换
    .collect(Collectors.toList());

// var：让编译器推断类型（JDK 10+）
var s = "hello";               // 类型推断为 String

// record：一行搞定不可变数据类（JDK 14+）
record Point(int x, int y) {}
Point p = new Point(1, 2);

// switch 表达式（JDK 14+）
int n = switch (score / 10) {
    case 10, 9 -> 1;
    case 8 -> 2;
    default -> 0;
};

// 文本块：多行字符串（JDK 15+）
String json = """
    {
      "name": "小明"
    }
    """;
```

`Stream` 一开始不习惯很正常，它就是"集合的函数式写法"，多写几次就顺了。

---

## 第 15 章：构建工具（概念）

真正项目不会手动 `javac`，而是用构建工具管依赖、编译、打包：

- **Maven**：用 `pom.xml` 声明依赖，命令 `mvn clean package` 打出 jar。
- **Gradle**：用 `build.gradle`，Kotlin/DSL 写法，更快更灵活。

新手先在 IDEA 里建个 Maven 项目，体验"加一个依赖坐标 → 自动下载 → 直接 `import` 用"的流程就懂了。比如要用 Google 的 Gson 解析 JSON，加一段依赖坐标，不用自己下 jar 包。

---

## 第 16 章：实战——控制台学生管理

把前面知识串起来，写一个能增删查的学生管理（控制台版）：

```java
import java.util.*;

class Student {
    int id;
    String name;
    Student(int id, String name) { this.id = id; this.name = name; }
}

public class StudentManager {
    static List<Student> students = new ArrayList<>();
    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        while (true) {
            System.out.println("1.添加 2.列表 3.删除 0.退出");
            int op = sc.nextInt();
            if (op == 0) break;
            if (op == 1) {
                System.out.print("id: "); int id = sc.nextInt();
                System.out.print("name: "); String name = sc.next();
                students.add(new Student(id, name));
            } else if (op == 2) {
                students.forEach(s -> System.out.println(s.id + " " + s.name));
            } else if (op == 3) {
                System.out.print("删除id: "); int id = sc.nextInt();
                students.removeIf(s -> s.id == id);
            }
        }
    }
}
```

这段代码用到了类、集合、循环、条件、Lambda，是检验前面学得扎不扎实的好练习。想再进一步可以加"按 id 查找""按名字排序""存到文件"。

---

## 第 17 章：新手最常踩的坑

1. **文件名和 public 类名不一致**：`public class Hello` 必须放在 `Hello.java` 里。
2. **`==` 比字符串**：字符串内容比较永远用 `equals`，`==` 比的是不是同一个对象。
3. **空指针 NullPointerException**：调用 `null` 的方法或字段必炸。用前先判空，或用 `Optional`。
4. **数组越界**：下标从 0 开始，最大是 `length - 1`。
5. **`switch` 漏写 `break`**：会穿透执行下面的 case。
6. **`static` 误用**：静态方法里不能直接用非静态字段，得先 `new` 对象。
7. **Chinese 乱码**：文件编码和终端不一致时出现，统一用 UTF-8。
8. **`equals` 前不判空**：`name.equals("x")` 若 `name` 为 null 会炸，写成 `"x".equals(name)` 更安全。

---

## 第 18 章：新手最常问的 10 个问题

1. **学 Java 要先学算法吗？** 不用，先跑通语法和面向对象，算法后面补。
2. **JDK 装哪个版本？** 现在主流是 17（LTS），新项目直接上。
3. **IDEA 社区版够吗？** 学习完全够，企业版多了 Spring 全家桶集成。
4. **`int` 和 `Integer` 选哪个？** 普通计算用 `int`，放集合里必须是 `Integer`（泛型不支持基本类型）。
5. **接口和抽象类怎么选？** 描述"能力/契约"用接口，复用代码且有"父子"关系用抽象类；优先接口。
6. **`ArrayList` 和 `LinkedList` 怎么选？** 大多用 `ArrayList`；频繁在头部插入删除才考虑 `LinkedList`。
7. **`HashMap` 为什么快？** 靠 `hashCode` 直接定位桶，理想 O(1)；键对象要正确实现 `equals`/`hashCode`。
8. **`String` 为什么不可变？** 为了安全（类加载、哈希缓存）和线程安全，拼接请用 `StringBuilder`。
9. **异常要全 catch 吗？** 不该吞掉，能处理就处理，处理不了就往外抛。
10. **学到哪算入门？** 能独立写出[第 16 章](#第-16-章-实战——控制台学生管理)那种小程序、理解面向对象三件套（封装/继承/多态）、会用集合和 Stream，就算入门了。

---

## 学习路线图（先看后看）

1. 环境搭建 + Hello World（[第 1 章](#第-1-章-环境搭建)）
2. 变量、类型、流程控制（第 2、3 章）
3. 数组、字符串（[第 4 章](#第-4-章-数组与字符串)）
4. 面向对象：类/对象/构造/封装/继承/多态/接口（[第 5 章](#第-5-章-面向对象-重点)，最重要）
5. 异常、常用类、集合、泛型（第 6、7、8、9 章）
6. 日期、IO、并发入门（第 10、11、12 章）
7. Java 8+ 新特性、构建工具（第 14、15 章）
8. 实战项目 + JVM/GC 概念（第 13、16 章）
9. 之后深入：JVM 调优、并发编程、Spring 框架、MySQL 联动（见本站数据库笔记）

---

## 速查口诀

- 文件名 = public 类名
- 比内容用 `equals`，比地址才用 `==`
- 对象放堆、局部放栈，没人用就 GC
- 单继承、多接口，面向接口写代码
- 查多用 `ArrayList`，去重用 `Set`，键值对用 `Map`
- 字符串别 `+` 到底，多了换 `StringBuilder`
- 多线程改共享数据，记得加锁（`synchronized`）
