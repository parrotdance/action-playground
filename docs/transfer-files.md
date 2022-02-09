# 传输文件到远程服务器

## 代码示例
> [完整的 workflow 文件](../.github/workflows/main.yml)
```yaml
- steps:
  - name: Checkout repo
    uses: actions/checkout@v2

  - name: Deploy to server
    run: |
      touch id_rsa
      echo "${{ secrets.SERVER_PRIVATE_KEY }}" > id_rsa
      chmod 600 id_rsa
      scp -i id_rsa -o StrictHostKeyChecking=no -r ./* ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_IP }}:/home/${{ secrets.SERVER_USER }}/action-playground
```

## 说明
1. 在 Checkout repo 阶段:
    1. 调用了[官方的维护的 action](https://github.com/actions/checkout) `actions/checkout@v2`.
2. 在 Deploy to server 阶段:
    1. 创建了一个空文件 `id_rsa`
    2. 将[项目中配置的秘钥](./sensitive-infomation-in-repo.md)写入了该文件
    3. 将该文件的权限变更为 `600` (该步骤是必要的, 用于解决 ssh 连接对于秘钥文件安全性的警告).
    4. 使用 `scp` 命令传输文件.

其中使用到了三个 scp 命令的参数:
- `-i`: 指定一个 identity file, 用于在 ssh 连接过程中验证自己的身份.
- `-o`: 临时配置 ssh 连接的选项.
- `-r`: 递归处理所有目录及目录下的文件.

## 参考资料
- [scp 命令手册](https://man7.org/linux/man-pages/man1/scp.1.html)
- [ssh 连接防御机制及无口令登录方式](./ssh-connection.md)

