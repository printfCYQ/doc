# UIView 视图基础

## 简介

本节介绍 UIKit 中 UIView 的基础知识，包括视图层级结构、frame 与 bounds、常用属性、手势识别、自动布局（Auto Layout）锚点等。

## 目录 / 章节

- UIView 层级关系与 addSubview
- frame、bounds 与 center
- UIView 常用属性（backgroundColor、alpha、hidden 等）
- UIGestureRecognizer 手势识别
- Auto Layout 锚点（NSLayoutAnchor）
- 视图动画（UIView.animate）

## 笔记正文

::: details 点击展开示例代码
```swift
import UIKit

class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white

        let cardView = UIView()
        cardView.backgroundColor = .systemBlue
        cardView.layer.cornerRadius = 12
        cardView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(cardView)

        NSLayoutConstraint.activate([
            cardView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            cardView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            cardView.widthAnchor.constraint(equalToConstant: 200),
            cardView.heightAnchor.constraint(equalToConstant: 200)
        ])
    }
}
```
:::
