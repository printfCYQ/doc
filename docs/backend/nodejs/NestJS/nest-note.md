# NestJS 学习笔记

```typescript
pnpm i -g @nestjs/cli
nest -v
```
```typescript
nest new vue3-message-board-serve
cd vue3-message-board-serve
npm run start:dev
```
```typescript
nest g app admin
nest g app client
cd apps

rm -rf vue3-message-board-serve
```
```typescript
nest start -w admin
nest start -w client
```
```typescript
nest g lib db
```
```typescript
pnpm install --save @nestjs/typeorm typeorm mysql2
```
```typescript
nest g mo -p client modules/user
nest g co -p client modules/user
nest g s -p client modules/user
```
---

## 部署

```vue
cd /www/wwwroot/vue3-message-board-serve/dist/apps/client/apps/client/src
```
```vue
pm2 start main.js --name 'vue3-message-board'
```
```vue

```
