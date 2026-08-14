# 数组与链表

## 简介

本节介绍两种最基础的线性数据结构：数组（Array）与链表（LinkedList），对比其内存布局、随机访问、插入删除的时间复杂度，并实现常见操作与经典题型。

## 目录 / 章节

- 数组内存布局与随机访问 O(1)
- 动态数组扩容原理（ArrayList / Vector）
- 单链表、双链表、循环链表结构
- 链表指针操作与虚拟头节点技巧
- 常见题型：反转链表、合并有序链表、环检测
- 数组双指针：快慢指针、左右指针、滑动窗口

## 笔记正文

::: details 点击展开示例代码
```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head: ListNode) -> ListNode:
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev

def has_cycle(head: ListNode) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False

# 有序数组合并双指针
def merge_sorted(nums1, nums2):
    res = []
    i = j = 0
    while i < len(nums1) and j < len(nums2):
        if nums1[i] < nums2[j]:
            res.append(nums1[i]); i += 1
        else:
            res.append(nums2[j]); j += 1
    res.extend(nums1[i:])
    res.extend(nums2[j:])
    return res
```
:::
