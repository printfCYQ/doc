# 数据结构

数据结构就是"怎么把数据摆好，方便增删查改"。算法解决问题靠脑子，数据结构是解决问题的"架子"——同样的活，用数组和用哈希表，速度能差出几个数量级。

打个比方：数据是你的一堆书。摆成一排书架（数组）找第 5 本很快，但中间插一本要把后面全挪；摆成链表（每本书夹张纸条指向下一本）插入方便，但找第 5 本得从头数；按分类贴标签放（哈希表）几乎瞬间找到，但得有张目录表。选哪种，看你要"常查"还是"常插"。

这篇把面试和实战最高频的结构讲透，每个都给**时间复杂度**和**Python 可跑代码**。图论算法（最短路、DP）我放到[进阶算法](../advance/advance.md)，这里只讲"图的存法和遍历"。

---

## 一、数组（Array）

一块**连续内存**，按下标直接定位。

- **随机访问 O(1)**：`a[5]` 直接算地址取到，这是数组最大优势
- **插入/删除 O(n)**：中间插一个，后面全体后移；删一个，前面补位
- **越界是头号 bug**：下标超出长度就崩（Python 抛 IndexError，C 直接乱写内存）

### 动态数组（ArrayList / Vector）
静态数组长度固定，不够用怎么办？动态数组**满了就申请一块更大的（通常翻倍），把旧数据搬过去**。所以 `append` 均摊 O(1)（偶尔一次 O(n) 搬家，摊到每次就便宜了）。

```python
# 自己撸个迷你动态数组，体会扩容
class DynArray:
    def __init__(self):
        self.data = [None] * 2; self.size = 0; self.cap = 2
    def append(self, x):
        if self.size == self.cap:           # 满了，翻倍搬家
            self.cap *= 2
            new = [None] * self.cap
            for i in range(self.size): new[i] = self.data[i]
            self.data = new
        self.data[self.size] = x; self.size += 1
```

### 二维数组
`matrix[i][j]`。注意有的语言是"数组的数组"（每行可不等长），内存不一定连续。

---

## 二、链表（Linked List）

节点串起来，**每个节点存值 + 指向下一个的指针**。内存不连续，靠指针连。

- **单链表**：只有一个 `next`
- **双链表**：有 `prev` 和 `next`，能双向走（LRU 缓存常用）
- **循环链表**：尾连回头

### 链表 vs 数组

| | 数组 | 链表 |
|---|------|------|
| 随机访问 | O(1) | O(n)（得从头数） |
| 头部插入/删除 | O(n) | O(1) |
| 尾部插入（已知尾） | 均摊 O(1) | O(1) |
| 内存 | 连续，可能浪费 | 零散，每个节点多存指针 |

### 两个必会技巧
**虚拟头节点（dummy）**：处理"删头节点"时要特判，加个假头节点统一逻辑，省心。
**双指针**：快慢指针测环、左右指针夹逼、滑动窗口。

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val; self.next = next

def reverse_list(head: ListNode) -> ListNode:
    prev, curr = None, head
    while curr:
        nxt = curr.next; curr.next = prev
        prev = curr; curr = nxt
    return prev

def has_cycle(head: ListNode) -> bool:        # 快慢指针，相遇即有环
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
        if slow is fast: return True
    return False

def merge_sorted(a, b):                        # 双指针合并两个有序链表
    dummy = ListNode(); tail = dummy
    while a and b:
        if a.val < b.val: tail.next, a = a, a.next
        else:            tail.next, b = b, b.next
        tail = tail.next
    tail.next = a or b
    return dummy.next
```

---

## 三、栈（Stack）

**后进先出（LIFO）**——叠盘子，最后放的先拿。

- 操作：`push`（压）、`pop`（弹）、`peek`（看顶不弹），都 O(1)
- 本质：函数调用就用栈（每次调用压栈帧，[操作系统](../../basic/os/os.md)里讲过）

### 经典用法
**括号匹配**：遇左括号压栈，遇右括号看栈顶是否配对。
**表达式求值**：中缀转后缀再用栈算。
**撤销（Undo）**：操作历史压栈，撤销就 pop。

```python
def is_valid(s: str) -> bool:
    pair = {')':'(', ']':'[', '}':'{'}
    st = []
    for c in s:
        if c in '([{': st.append(c)
        elif not st or st.pop() != pair[c]: return False
    return not st
```

---

## 四、队列（Queue）

**先进先出（FIFO）**——排队买票，先来的先走。

- `enqueue`（入队） / `dequeue`（出队），都 O(1)
- **循环队列**：用数组实现时，头尾指针绕圈复用空间，避免"假溢出"
- **双端队列（deque）**：两头都能进能出（Python `collections.deque`），滑动窗口神器
- **优先队列（Priority Queue）**：按优先级出队，底层是**堆**（见第七节）

### 用两个栈实现队列（经典面试题）
一个栈负责进，一个栈负责出；出栈空了就把进栈全倒过来。

```python
from collections import deque
q = deque()
q.append(1); q.append(2)     # 入队
q.popleft()                  # 出队（O(1)）
q.appendleft(0)              # 双端：队首插入
```

---

## 五、哈希表（Hash Table）

**用"键"直接算出"位置"，理想 O(1) 查/插/删**。字典、Map、缓存、去重、计数全靠它。

### 原理
`hash(key) → 数组下标`。但不同 key 可能算出同一位置（**哈希冲突**），两种解法：
- **链地址法**：冲突的位置挂一条链表（Java 8 的 HashMap 链表转红黑树）
- **开放寻址法**：冲突就往后找空位

### 关键参数
- **负载因子（load factor）= 元素数 / 桶数**。太大冲突多、太小便浪费。超过阈值就**扩容 rehash**（重新算位置搬家）。
- 好哈希函数要"散布均匀"，别都挤一块。

```python
# Python dict 本身就是哈希表，下面演示手动计数（面试常让写）
from collections import Counter
cnt = Counter("abracadabra")        # {'a':5, 'b':2, 'r':2, 'c':1, 'd':1}
print(cnt.most_common(2))           # [('a', 5), ('b', 2)]

# 手写最小哈希表骨架（链地址法思路）
class MiniMap:
    def __init__(self, n=8):
        self.buckets = [[] for _ in range(n)]
    def _idx(self, k): return hash(k) % len(self.buckets)
    def put(self, k, v):
        b = self.buckets[self._idx(k)]
        for i, (kk, _) in enumerate(b):
            if kk == k: b[i] = (k, v); return
        b.append((k, v))
    def get(self, k):
        for kk, v in self.buckets[self._idx(k)]:
            if kk == k: return v
        return None
```

---

## 六、二叉树与二叉搜索树（BST）

### 二叉树
每个节点最多俩孩子（左、右）。三种遍历：
- **前序**（根左右）、**中序**（左根右）、**后序**（左右根）—— 递归三行搞定
- **层序**：用队列一层层扫（BFS）

```python
def inorder(root):
    if root:
        inorder(root.left); print(root.val); inorder(root.right)

def level_order(root):
    if not root: return
    q = deque([root])
    while q:
        node = q.popleft(); print(node.val)
        if node.left: q.append(node.left)
        if node.right: q.append(node.right)
```

### 二叉搜索树（BST）
**左子树全比根小、右子树全比根大**。于是查找、插入、删除都 O(log n)（树平衡时）。
- 查找：比根大走右、比根小走左
- 中序遍历 BST 得到**有序序列**——这是它最有用的性质
- **退化风险**：如果插入有序数据，BST 退化成链表（O(n)）。解决办法是**平衡树**（AVL 树、红黑树，自动旋转保持平衡）。Java 的 `TreeMap`、C++ 的 `map` 就是红黑树。

---

## 七、堆（Heap）/ 优先队列

**完全二叉树，父节点恒优于子节点**。分大顶堆（父最大）和小顶堆（父最小）。

- 用**数组**存：节点 i 的左孩子是 `2i+1`、右孩子 `2i+2`、父是 `(i-1)//2`
- 插入：放末尾再**上浮（sift up）**；取顶：换末尾再**下沉（sift down）**，都 O(log n)
- 建堆 O(n)（不是 O(n log n)，从最后一个非叶子往上沉）

### 经典用法
- **Top K 问题**：海量数据找最大的 K 个，用小顶堆（O(n log K)）
- **堆排序**：原地排序 O(n log n)
- **优先队列**：任务调度按优先级

```python
import heapq
nums = [5, 2, 8, 1, 9]
heapq.heapify(nums)          # 原地建小顶堆 O(n)
heapq.heappush(nums, 3)      # 插入 O(log n)
print(heapq.heappop(nums))   # 弹出最小 O(log n)

# Top K 最大：用大小为 K 的小顶堆
def top_k(arr, k):
    h = []
    for x in arr:
        heapq.heappush(h, x)
        if len(h) > k: heapq.heappop(h)
    return sorted(h, reverse=True)
```

---

## 八、Trie 字典树（前缀树）

专门存**字符串集合**，按字符分层建树。适合**前缀匹配、自动补全、敏感词过滤**。

```python
class Trie:
    def __init__(self): self.children = {}; self.is_end = False
    def insert(self, w):
        node = self
        for c in w: node = node.children.setdefault(c, Trie())
        node.is_end = True
    def starts_with(self, p):     # 是否有人以 p 为前缀
        node = self
        for c in p:
            if c not in node.children: return False
            node = node.children[c]
        return True
```

---

## 九、并查集（Union-Find / Disjoint Set）

管"谁和谁是一伙的"。两个操作：
- `find(x)`：找 x 的老大（根）
- `union(a, b)`：把 a、b 两伙合并

**路径压缩**（find 时顺手把节点直接挂到根上）让近乎 O(1)。用来数**连通分量、岛屿数量、朋友圈**。

```python
class UF:
    def __init__(self, n): self.p = list(range(n))
    def find(self, x):
        if self.p[x] != x: self.p[x] = self.find(self.p[x])  # 路径压缩
        return self.p[x]
    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra != rb: self.p[ra] = rb; return True
        return False   # 已连通
```

---

## 十、图（Graph）

图就是"点 + 边"。分**有向/无向**、**带权/不带权**。

### 两种存法
- **邻接矩阵**：`matrix[i][j]` 表 i、j 是否相连。查边 O(1)，但占 O(V²) 空间，稀疏图浪费。
- **邻接表**：每个点存它的邻居列表。省空间 O(V+E)，查边 O(度)。

### 两种遍历
- **DFS（深度优先）**：一条路走到黑，递归/栈。适合"找路径、连通性、拓扑排序"。
- **BFS（广度优先）**：一层层扩，队列。适合"最短路径（无权图）、层序"。

```python
def bfs(graph, start):
    seen, q = {start}, deque([start])
    while q:
        v = q.popleft(); print(v)
        for nxt in graph[v]:
            if nxt not in seen: seen.add(nxt); q.append(nxt)

def dfs(graph, v, seen=None):
    seen = seen or set(); seen.add(v); print(v)
    for nxt in graph[v]:
        if nxt not in seen: dfs(graph, nxt, seen)
```

> 图上的"硬算法"（Dijkstra 最短路、Floyd、最小生成树、拓扑排序、DP）放在[进阶算法](../advance/advance.md)，这里只讲怎么存和怎么走。

---

## 十一、各结构操作复杂度速查

| 结构 | 访问 | 搜索 | 插入 | 删除 | 备注 |
|------|------|------|------|------|------|
| 数组 | O(1) | O(n) | O(n) | O(n) | 尾部插入均摊 O(1) |
| 链表 | O(n) | O(n) | O(1)* | O(1)* | *已知节点时 |
| 栈 / 队列 | — | — | O(1) | O(1) | 仅端点 |
| 哈希表（均摊） | — | O(1) | O(1) | O(1) | 冲突多退化 |
| BST（平衡） | O(log n) | O(log n) | O(log n) | O(log n) | 退化成链表则 O(n) |
| 堆 | O(1)顶 | O(n) | O(log n) | O(log n)顶 | |
| Trie | — | O(L) | O(L) | O(L) | L=串长 |
| 并查集 | — | O(α(n)) | O(α(n)) | — | α 近乎常数 |
| 图邻接表 | — | O(V+E)遍历 | — | — | |

---

## 十二、怎么选数据结构

- 要**按位置快速取** → 数组
- 要**频繁头尾增删** → 链表 / deque
- 要**"最后进先出/先进先出"** → 栈 / 队列
- 要**"按 key 极速查/计数/去重"** → 哈希表
- 要**取最大/最小或 Top K** → 堆
- 要**有序且频繁查找** → 平衡 BST（或干脆排序数组 + 二分）
- 要**前缀/自动补全** → Trie
- 要**动态连通性** → 并查集
- 要**关系网络/路径** → 图

---

## 十三、新手最常踩的坑

1. **数组越界**：循环条件 `<=` 写成 `<` 或反过来，下标算错。
2. **链表改指针丢引用**：`curr = curr.next` 前没存下一个，链表断掉。反转、删除必先用临时变量存 `next`。
3. **用链表做随机访问**：`get(i)` 要 O(n)，别在链表上疯狂按索引取。
4. **哈希表当数组用**：哈希表无序，别指望遍历顺序和插入顺序一致（要顺序用 `OrderedDict` / Python 3.7+ dict 保插入序，但别依赖）。
5. **忘记负载因子/扩容**：自己写哈希表不扩容，冲突爆炸变 O(n)。
6. **BST 退化**：插入有序数据不旋转，退化成链表。需要平衡就上红黑树/AVL。
7. **堆的"第 K 大"用反堆**：找 K 个最大要用**小顶堆**（不是大顶堆），弹出的是当前最小的，留大的。
8. **DFS 不标记 visited**：图有环，不标记会无限递归。
9. **把栈/队列想成数组索引**：用数组手写队列不维护头指针，出队后空间没复用（用循环队列）。

---

## 十四、练习

1. 用链表实现 `reverse_list` 后，再写一个**递归版**反转，体会栈的本质。
2. 用栈把一个十进制数转成二进制（不断取余压栈，再弹出）。
3. 给定数组，用哈希表 O(n) 时间找出"和为 target 的两个数"（即[LeetCode 两数之和](../leetcode/leetcode.md)）。
4. 用堆实现"数据流中维护中位数"（提示：一个大顶堆 + 一个小顶堆）。
5. 写一个函数判断二叉树是否对称（递归 + 双指针，左右子树镜像比较）。
6. 用并查集解决"给你若干边，问图里有几个连通块"。

---

## 十五、速查口诀

- 数组连续查 O(1)，插删费劲；链表反之，插删 O(1) 但查慢
- 栈 LIFO（叠盘子），队列 FIFO（排队）；双端队列两头通
- 哈希表靠 hash 定位，冲突用链表/开放寻址，负载因子触发扩容
- BST 左小右大，中序即有序；不平衡会退化成链表
- 堆是优先队列，Top K 用小顶堆
- Trie 管前缀，并查集管连通，图用邻接表省空间
- 选结构看操作：查快用数组/哈希，有序用 BST，极值用堆

---

## 十六、学习路线

1. 数组 + 链表（本章一、二，最基础）
2. 栈 + 队列（三、四）
3. 哈希表（五，实战最高频）
4. 堆（七，Top K/调度）
5. 树：二叉树遍历 → BST（六）
6. Trie + 并查集（八、九，特定场景）
7. 图表示 + DFS/BFS（十）
8. 刷题巩固 → [LeetCode 简单题精选](../leetcode/leetcode.md)
9. 进阶算法（DP、图论最短路等）→ [进阶算法](../advance/advance.md)

> 联动：[操作系统](../../basic/os/os.md)的栈帧和递归、[设计模式](../../basic/design-pattern/design-pattern.md)的迭代器模式都和这里的数据结构交叉；图上的算法见[进阶算法](../advance/advance.md)。
