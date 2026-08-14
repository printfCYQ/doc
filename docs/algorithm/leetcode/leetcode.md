# LeetCode 简单题精选

## 简介

本节收录 LeetCode 简单难度的经典题目，每题包含题目描述、解题思路、复杂度分析与可运行代码实现，方便循序渐进地刷题。

## 目录 / 章节

- 1. 两数之和（Two Sum）
- 20. 有效的括号（Valid Parentheses）
- 21. 合并两个有序链表（Merge Two Sorted Lists）
- 70. 爬楼梯（Climbing Stairs）
- 104. 二叉树的最大深度（Maximum Depth of Binary Tree）
- 121. 买卖股票的最佳时机（Best Time to Buy and Sell Stock）

## 笔记正文

::: details 点击展开示例代码
```python
from typing import List, Optional

# 1. 两数之和 - 哈希表 O(n)
def two_sum(nums: List[int], target: int) -> List[int]:
    seen = {}
    for i, num in enumerate(nums):
        if target - num in seen:
            return [seen[target - num], i]
        seen[num] = i
    return []

# 20. 有效的括号 - 栈
def is_valid(s: str) -> bool:
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for ch in s:
        if ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
        else:
            stack.append(ch)
    return not stack

# 121. 买卖股票最佳时机 - 一次遍历
def max_profit(prices: List[int]) -> int:
    min_price = float('inf')
    profit = 0
    for p in prices:
        min_price = min(min_price, p)
        profit = max(profit, p - min_price)
    return profit
```
:::
