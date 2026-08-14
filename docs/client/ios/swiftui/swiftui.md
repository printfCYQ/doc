# SwiftUI 基础入门

## 简介

本节介绍 SwiftUI 声明式 UI 框架的基础，包括常用视图控件、布局栈（VStack/HStack/ZStack）、状态管理（@State、@Binding、@Observable）等。

## 目录 / 章节

- 常用视图（Text、Image、Button、List）
- 布局容器（VStack、HStack、ZStack）
- @State 与 @Binding
- @Observable 与 MVVM
- NavigationStack 导航
- 自定义修饰符（ViewModifier）

## 笔记正文

::: details 点击展开示例代码
```swift
import SwiftUI

@Observable
class CounterViewModel {
    var count: Int = 0
    func increment() { count += 1 }
}

struct CounterView: View {
    @State private var vm = CounterViewModel()

    var body: some View {
        VStack(spacing: 16) {
            Text("Count: \(vm.count)")
                .font(.title)
            Button(action: vm.increment) {
                Label("Increment", systemImage: "plus.circle")
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}

#Preview {
    CounterView()
}
```
:::
