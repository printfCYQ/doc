# Shader 基础

## 简介

本节介绍 Metal Shader 基础，包括 MSL 语法、顶点着色器（Vertex）、片元着色器（Fragment）、渲染管线配置、纹理采样与基础图形绘制。

## 目录 / 章节

- Metal 设备（MTLDevice）与命令队列
- 渲染管线（MTLRenderPipelineState）
- 顶点缓冲与 Uniform 数据传递
- 顶点着色器与坐标变换
- 片元着色器与颜色输出
- 纹理（MTLTexture）创建与采样

## 笔记正文

::: details 点击展开示例代码
```metal
#include <metal_stdlib>
using namespace metal;

struct VertexIn {
    float2 position [[attribute(0)]];
    float4 color    [[attribute(1)]];
};

struct VertexOut {
    float4 position [[position]];
    float4 color;
};

vertex VertexOut vertex_main(VertexIn in [[stage_in]]) {
    VertexOut out;
    out.position = float4(in.position, 0.0, 1.0);
    out.color = in.color;
    return out;
}

fragment float4 fragment_main(VertexOut in [[stage_in]]) {
    return in.color;
}
```
:::
