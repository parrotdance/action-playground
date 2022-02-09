# 在远程服务器上执行 shell 命令

## 代码示例
```yaml
steps:
  - name: Checkout repo
    uses: actions/checkout@v2

  - name: Execute remote script
    run: |
      touch id_rsa
      echo "${{ secrets.SERVER_PRIVATE_KEY }}" > id_rsa
      chmod 600 id_rsa
      ssh -i id_rsa -o StrictHostKeyChecking=no ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_IP }} "
      cd /home/${{ secrets.SERVER_USER }}/action-playground;
      ls > dirls;
      "
```

## 说明
1. 在 Checkout repo 阶段:
    1. 调用了[官方维护的 action](https://github.com/actions/checkout) `actions/checkout@v2`.
2. 在 Deploy to server 阶段:
    1. 创建了一个空文件 `id_rsa`
    2. 将[项目中配置的秘钥]()写入了该文件
    3. 将该文件的权限变更为 `600` (该步骤是必要的, 用于解决 ssh 连接对于秘钥文件安全性的警告).
    4. 使用 `ssh` 命令连接远程服务器并执行由 `""` 包裹的脚本.

其中使用到了两个 scp 命令的参数:
- `-i`: 指定一个 identity file, 用于在 ssh 连接过程中验证自己的身份.
- `-o`: 临时配置 ssh 连接的选项.

## 参考资料
- [ssh 命令手册](https://man7.org/linux/man-pages/man1/ssh.1.html)
- [ssh 连接防御机制及无口令登录方式](./ssh-connection.md)
