# 动态规划与图论

## 简介

本节介绍进阶算法中的动态规划（DP）与图论核心内容，包括 DP 的状态定义与转移方程、背包问题系列，以及图的存储、BFS/DFS、最短路、最小生成树等经典算法。

## 目录 / 章节

- 动态规划思想：最优子结构、重叠子问题
- 线性 DP：LIS 最长递增子序列、LCS 最长公共子序列
- 背包 DP：01 背包、完全背包、多重背包
- 区间 DP、树形 DP、状态压缩 DP 简介
- 图存储：邻接矩阵、邻接表
- 最短路：Dijkstra、Floyd、Bellman-Ford
- 最小生成树：Prim、Kruskal

## 笔记正文

::: details 点击展开示例代码
```python
from typing import List
from collections import defaultdict
import heapq

# LIS 最长递增子序列 O(n log n)
def length_of_lis(nums: List[int]) -> int:
    tails = []
    for num in nums:
        l, r = 0, len(tails)
        while l < r:
            mid = (l + r) // 2
            if tails[mid] < num:
                l = mid + 1
            else:
                r = mid
        if l == len(tails):
            tails.append(num)
        else:
            tails[l] = num
    return len(tails)

# 01 背包：weights, values, capacity -> 最大价值
def knapsack_01(weights: List[int], values: List[int], cap: int) -> int:
    n = len(weights)
    dp = [0] * (cap + 1)
    for i in range(n):
        for j in range(cap, weights[i] - 1, -1):
            dp[j] = max(dp[j], dp[j - weights[i]] + values[i])
    return dp[cap]

# Dijkstra 单源最短路
def dijkstra(graph: dict, start: int, n: int) -> List[int]:
    dist = [float('inf')] * n
    dist[start] = 0
    pq = [(0, start)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))
    return dist
```
:::
