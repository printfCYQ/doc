# 音视频采集

## 简介

本节介绍使用 AVFoundation 进行音视频采集，包括 AVCaptureSession 配置、摄像头与麦克风权限、预览层（AVCaptureVideoPreviewLayer）、输出文件等。

## 目录 / 章节

- AVCaptureSession 会话配置
- 获取摄像头与麦克风设备
- AVCaptureVideoPreviewLayer 预览画面
- AVCaptureMovieFileOutput 录制视频
- 拍照输出（AVCapturePhotoOutput）
- 权限申请与中断处理

## 笔记正文

::: details 点击展开示例代码
```swift
import AVFoundation
import UIKit

class CameraViewController: UIViewController {
    private let session = AVCaptureSession()
    private var previewLayer: AVCaptureVideoPreviewLayer!

    override func viewDidLoad() {
        super.viewDidLoad()
        session.sessionPreset = .photo

        guard let device = AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: .back),
              let input = try? AVCaptureDeviceInput(device: device),
              session.canAddInput(input) else { return }
        session.addInput(input)

        previewLayer = AVCaptureVideoPreviewLayer(session: session)
        previewLayer.frame = view.bounds
        view.layer.addSublayer(previewLayer)

        DispatchQueue.global().async {
            self.session.startRunning()
        }
    }
}
```
:::
