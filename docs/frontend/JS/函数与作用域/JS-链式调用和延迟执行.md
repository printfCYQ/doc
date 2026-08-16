# JS-链式调用和延迟执行

```javascript
function arrange(name) {

  const tasks = []

  tasks.push(() => { console.log(`${name} is notified`) })

  function wait(time) {
    tasks.push(() => new Promise((resolve) => setTimeout(resolve, time * 1000)))
    return this
  }
  function doSometing(taskName) {
    tasks.push(() => { console.log(`Start to ${taskName}`) })
    return this
  }

  function waitFirst(time) {
    tasks.unshift(() => new Promise((resolve) => setTimeout(resolve, time * 1000)))
    return this
  }

  async function execute() {
    for (let t of tasks) {
      await t()
    }
      this
  }

  return {
    wait,
    do: doSometing,
    waitFirst,
    execute
  }
}

arrange('William').wait(5).do('commit').waitFirst(3).execute()
// 等待3秒
// William is notified
// 等待5秒
// Start to commit
```
