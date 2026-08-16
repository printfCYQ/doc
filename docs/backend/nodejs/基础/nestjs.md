# NestJS（企业级 Node 后端框架）

[Express](./express.md) 好用但太自由：路由、逻辑、数据库连接散落在各处，项目一大，新人接手要在文件间跳来跳去找"这个接口的业务到底在哪"。NestJS 反过来——它**强制你按约定分层**（Controller 管接口、Service 管逻辑、Module 管装配），还自带**依赖注入**，对象不用你 `new`，框架帮你"注射"进来。

打个比方：Express 是"空地让你随便盖房"；NestJS 是"精装楼盘 + 物业规范"——户型（Controller/Service）、电梯（DI）、门禁（Guard）都定好了，你只填家具，团队协作不会各盖各的。

> NestJS 底层默认还是 Express（也能换 Fastify），所以上篇的 Express 知识全用得上，只是写法被框架收编了。它要求 **TypeScript**。

---

## 1. 为什么又来一个框架

Express 的痛点：
- 没有标准的"分层的样子"，十个人写出十种结构。
- 没有依赖注入，到处 `new Service()`、手动传参，难测试、难替换。
- 装饰器、类型校验要自己拼。

NestJS 用 **装饰器 + 依赖注入 + 模块化** 一次性解决，且完全 TypeScript 原生。

---

## 2. 快速起步

```bash
npm i -g @nestjs/cli
nest new my-app        # 选 npm，生成标准骨架
cd my-app
npm run start:dev      # 热重载，默认跑在 http://localhost:3000
```

生成的关键目录：
```
src/
├── main.ts            # 入口：创建 app、监听端口
├── app.module.ts      # 根模块，把所有模块汇总
├── app.controller.ts  # 示例控制器（接口）
└── app.service.ts     # 示例服务（逻辑）
```

---

## 3. 三大核心：Module / Controller / Provider

这是 NestJS 的"三件套"，理解这三个就入门了。

```typescript
// user.service.ts —— 业务逻辑，用 @Injectable 标记为可被注入
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [{ id: 1, name: '小明' }];
  findAll() { return this.users; }
  findOne(id: number) { return this.users.find(u => u.id === id); }
}

// user.controller.ts —— 接口层，用 @Controller 标记路径
import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')                 // 路径前缀 /users
export class UserController {
  constructor(private userService: UserService) {}  // 依赖注入：框架自动传入实例

  @Get()                            // GET /users
  findAll() { return this.userService.findAll(); }

  @Get(':id')                       // GET /users/123
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}

// user.module.ts —— 把上面两个"装配"到一起
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

**依赖注入（DI）怎么理解**：你不在 Controller 里 `new UserService()`，而是在构造函数里"声明我要一个 UserService"，NestJS 看 `@Module` 里注册了 `UserService` 这个 Provider，就自动造好实例塞给你。好处：测试时你能轻松塞一个假 Service 进去。

最后在 `app.module.ts` 的 `imports` 里加上 `UserModule` 就生效。

---

## 4. 请求数据处理

```typescript
import { Get, Post, Body, Param, Query, Headers, HttpCode } from '@nestjs/common';

@Post()
@HttpCode(201)
create(@Body() body: any, @Headers('x-token') token: string) {
  // @Body() 取请求体，@Query() 取 ?x=1，@Param() 取路径参数，@Headers() 取请求头
  return { ...body, token };
}
```

---

## 5. DTO 与校验（class-validator）

别让脏数据进逻辑层。用 DTO（数据传输对象）定义"长什么样"，配合 `ValidationPipe` 自动校验：

```typescript
// dto/create-user.dto.ts
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString() @MinLength(2)
  name: string;

  @IsEmail()
  email: string;
}

// controller
@Post()
create(@Body() dto: CreateUserDto) {  // 类型不符会自动返回 400
  return this.userService.create(dto);
}
```

在 `main.ts` 全局开启：
```typescript
app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
```

---

## 6. 中间件 / 管道 / 守卫 / 拦截器 / 异常过滤器

这套是 NestJS 的"拦截链"，各管一段。一张表记清：

| 名字 | 在哪执行 | 干嘛 |
|---|---|---|
| Middleware | 路由前 | 最底层，能改 `req/res`（日志、CORS、解析） |
| Guard（守卫） | 路由前、鉴权 | 返回 `true/false` 决定放不放行（登录校验） |
| Interceptor（拦截器） | 前后都包 | 统一包装响应、记耗时、缓存 |
| Pipe（管道） | 进处理函数前 | 转换 / 校验参数（如上面的 ValidationPipe） |
| Exception Filter | 出错时 | 把异常转成统一错误响应 |

```typescript
// 一个鉴权守卫示例
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    if (!req.headers.authorization) throw new UnauthorizedException('未登录');
    return true;
  }
}

// 用在控制器或方法上
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {}
```

---

## 7. 连接数据库（以 TypeORM 为例）

NestJS 官方推荐 TypeORM / Prisma。给个 TypeORM 的 Entity（表结构）示例：

```typescript
// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

// user.module.ts 里注册
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

// service 里注入 Repository
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  findAll() { return this.repo.find(); }
}
```

---

## 8. 模块划分

NestJS 鼓励"按业务功能切模块"：`UserModule`、`OrderModule`、`AuthModule`……谁依赖谁就在 `imports` 里声明。根模块 `AppModule` 把大家汇总。这样大项目也不会糊成一团。

---

## 9. 项目结构（分层）

```
src/
├── main.ts
├── app.module.ts
├── users/
│   ├── user.module.ts
│   ├── user.controller.ts     # 接口
│   ├── user.service.ts        # 业务逻辑
│   ├── user.entity.ts         # 表结构（用 ORM 时）
│   └── dto/                   # 入参/出参定义
└── auth/
    ├── auth.module.ts
    ├── auth.guard.ts          # 守卫
    └── ...
```

口诀：**Controller 收请求 → Service 写逻辑 → Module 做装配 → DTO 管形状**。

---

## 10. 测试

NestJS 自带测试基建，天然好测（得益于依赖注入）：

```typescript
// user.service.spec.ts
it('findAll 应返回用户列表', async () => {
  const service = new UserService();
  expect(service.findAll()).toHaveLength(1);
});
```

跑 `npm run test` 即可。端到端测试用 `supertest` 起整个 app 打接口。

---

## 11. 实战：一个用户 CRUD 模块

核心四件套（省略 import，保持可读）：

```typescript
// dto
export class CreateUserDto {
  @IsString() @MinLength(2) name: string;
  @IsEmail() email: string;
}

// service
@Injectable()
export class UserService {
  private users: any[] = [];
  private seq = 1;
  create(dto: CreateUserDto) {
    const u = { id: this.seq++, ...dto };
    this.users.push(u); return u;
  }
  findAll() { return this.users; }
  findOne(id: number) { return this.users.find(u => u.id === id); }
  remove(id: number) { this.users = this.users.filter(u => u.id !== id); }
}

// controller
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post() @HttpCode(201) create(@Body() dto: CreateUserDto) { return this.userService.create(dto); }
  @Get() findAll() { return this.userService.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.userService.findOne(+id); }
  @Delete(':id') @HttpCode(204) remove(@Param('id') id: string) { this.userService.remove(+id); }
}

// module
@Module({ controllers: [UserController], providers: [UserService] })
export class UserModule {}
```

把 `UserModule` 加进 `AppModule.imports`，`POST/GET/GET :id/DELETE :id` 四个接口就齐了。

---

## 12. 常见坑

1. **Provider 没加 `@Injectable()`**：构造函数注入会报"无法解析依赖"。
2. **Controller/Provider 没在 `@Module` 注册**：Nest 启动时报"未被管控"/找不到。
3. **忘记 `app.useGlobalPipes`**：DTO 的 `@IsEmail` 等校验不生效，脏数据直接进逻辑。
4. **循环依赖**：A 注入 B、B 又注入 A。用 `forwardRef` 解，但更好是重构拆公共模块。
5. **装饰器在运行时才生效**：TypeScript 必须开 `experimentalDecorators`（Nest 脚手架默认开好），自己配 TS 时容易漏。
6. **以为 Nest 不是 Express**：底层仍是 Express，想用原生 Express 中间件（`app.use(...)`）照样能套。

---

## 13. 练习

1. 用 `@nestjs/cli` 新建项目，照第 3 节写一个 `UserModule` 并能 `GET /users` 返回数据。
2. 给创建接口加 `CreateUserDto` 校验（name 最少 2 字、email 必填且合法）。
3. 写一个 `AuthGuard`，让 `POST /users` 必须带 `Authorization` 头，否则 `401`。
4. 用 `ValidationPipe` 全局开启后，故意 POST 一个非法 email，确认返回 `400`。
5. 把用户数据从"内存数组"换成 TypeORM + SQLite（配置简单，零外部依赖），体会 Repository 写法。

---

## 速查

- 三件套：`@Controller`（接口）+ `@Injectable` 的 Service（逻辑）+ `@Module`（装配）
- 依赖注入：构造函数里"要一个"，框架自动造好塞给你，别自己 `new`
- 取数据：`@Param` / `@Query` / `@Body` / `@Headers`
- 校验：`class-validator` + 全局 `ValidationPipe`，用 DTO 约束入参
- 拦截链：Middleware → Guard → Interceptor → Pipe → 处理器 → Exception Filter
- 数据库：TypeORM（`@Entity` + `@InjectRepository`）或 Prisma
- 何时选它：团队协作、中大型、要强类型和规范；小脚本/原型用 Express 更轻

**路线回顾**：[Node 原生](./nodejs.md) 打地基 → [Express](./express.md) 写接口 → [NestJS](./nestjs.md) 上规模。三者不是替代关系，是按项目体量递进的工具箱。
