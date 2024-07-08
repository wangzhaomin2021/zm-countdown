### Readme

#### 简介

Countdown 类是一个简单的倒计时工具，用于在 TypeScript 项目中实现倒计时功能。

#### 安装

通过 npm 或 yarn 安装：

```bash
npm install zm-countdown
```

或

```bash
yarn add zm-countdown
```

#### 使用方法

1. 导入 Countdown 类。

```typescript
import Countdown from "zm-countdown";
```

2. 创建 Countdown 实例，并传入倒计时时间和其他可选参数。

```typescript
const countdown = new Countdown({
  countdown: 1000 * 60 * 60, // 设置倒计时时间为1小时
  finishedCallback: () => {
    console.log("倒计时结束");
  },
  tick: () => {
    console.log("剩余时间：", countdown.time);
  },
});
```

3. 开始倒计时。

```typescript
countdown.start();
```

4. 暂停倒计时。

```typescript
countdown.pause();
```

5. 恢复倒计时。

```typescript
countdown.resume();
```

6. 结束倒计时。

```typescript
countdown.end();
```

7. 重置倒计时。

```typescript
countdown.reset();
```

8. 获取剩余时间。

```typescript
console.log("剩余时间：", countdown.restTime);
```

9. 获取倒计时状态。

```typescript
console.log("倒计时状态：", countdown.state);
```

10. 获取剩余时间信息。

```typescript
console.log("剩余时间信息：", countdown.time);
```

以上是 Countdown 类的详细使用方法和示例，希望对你有所帮助。
