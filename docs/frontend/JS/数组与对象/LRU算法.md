# LRU算法

[leetcode-面试题 16.25. LRU 缓存](https://leetcode.cn/problems/lru-cache-lcci/description/)

> LRU算法是一种常见的缓存淘汰算法，它的基本逻辑是：
> 
> 1.  将缓存中的数据按照访问时间排序，最近被访问的数据排在前面，最久未被访问的数据排在后面。
> 2.  当缓存命中（即需要的数据已经在缓存中）时，将该数据移动到队列头部。
> 3.  当缓存未命中（即需要的数据不在缓存中）时，有以下两种情况：
> 
> -   如果缓存未满，直接将新的数据插入到队列头部。
> -   如果缓存已满，则删除队列尾部的数据，然后将新的数据插入到队列头部。
> 
> 通过这种逻辑，LRU算法可以保证缓存中保留的是最近被使用过的数据，从而提高了缓存命中率。
```javascript
class LRUCache {
  #map;
  #length; // 最大长度
  constructor(length) {
    this.#map = new Map()
    this.#length = length
  }

  get(key) {
    if (!this.#map.has(key)) {
      return
    }
    const value = this.#map.get(key);
    // 将调用的放到最后一个。
    this.#map.delete(key);
    this.#map.set(key, value);
    return value
  }
  set(key, value) {
    if (this.#map.has(key)) {
      this.#map.delete(key)
    }
    this.#map.set(key, value)
    // 超出最大长度。删掉第一个
    if (this.#map.size > this.#length) {
      const firstKey = this.#map.keys().next().value
      this.#map.delete(firstKey)
    }
    console.log(this.#map);
  }
}

const catchList = new LRUCache(3)

catchList.set('a', 1)
catchList.set('b', 2)
catchList.set('c', 3)
catchList.set('d', 4)

console.log(catchList.get('a'));
```
