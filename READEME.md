# x-accel-redirect 検証用リポジトリ
Nginx の X-Accel-Redirect を使って、保護されたコンテンツ(S3上)を配信する方法を検証するためのリポジトリ。

# セットアップとS3上のコンテンツの取得
各コンテナの起動(`docker-compose.yml`があるディレクトリにて)。
```zsh
% docker-compose up
```

`http://localhost:80/api/v1/image`にアクセスするとS3上のコンテンツが返却されるはず。
**＊必要な環境変数は聞いて下さい。**

# 参考サイト
- [DjangoでNginxのX-Accel-Redirectを使って、保護されたコンテンツを配信する方法](https://note.com/shimakaze_soft/n/nbeeeeeef6d8f)
- [【AWS S3】S3 Presigned URLの仕組みを調べてみた](https://qiita.com/tmiki/items/87697d3d3d5330c6fc08)
- [S3で有効期限付きのページを作る(node.js＋AWS＋S3)|おちゃカメラ。 ](https://photo-tea.com/p/s3-expires-page/)
- [NginxでS3をプロキシせざるを得ない時 | Development | Blog | Akari, Inc.](https://www.akariinc.com/ja/blog/development/nginx-proxy-s3)
- [アプリケーションで認証後にS3のコンテンツを返す](https://unching-star.hatenablog.jp/entry/20130222/1361521408)
- [networking - Docker Network Nginx Resolver - Stack Overflow](https://stackoverflow.com/questions/35744650/docker-network-nginx-resolver)
