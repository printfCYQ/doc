# Android 基础入门

## 简介

本节介绍 Android 开发基础知识，包括 Activity 生命周期、布局文件、Jetpack Compose 声明式 UI、Intent 通信、ViewModel 状态管理等。

## 目录 / 章节

- Activity 与 Fragment 生命周期
- XML 布局与 ViewBinding
- Jetpack Compose 基础（Composable、Modifier）
- Intent 与页面跳转
- ViewModel 与 StateFlow
- RecyclerView / LazyColumn 列表

## 笔记正文

::: details 点击展开示例代码
```kotlin
package com.example.demo

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

class CounterVM : ViewModel() {
    private val _count = MutableStateFlow(0)
    val count: StateFlow<Int> = _count
    fun increment() { _count.value++ }
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                val vm: CounterVM = viewModel()
                val count by vm.count.collectAsState()
                Column(
                    modifier = Modifier.fillMaxSize().padding(16.dp),
                    verticalArrangement = Arrangement.Center,
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text("Count: $count", style = MaterialTheme.typography.headlineMedium)
                    Spacer(Modifier.height(16.dp))
                    Button(onClick = { vm.increment() }) { Text("Increment") }
                }
            }
        }
    }
}
```
:::
