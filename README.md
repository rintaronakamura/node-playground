# node.js 検証用リポジトリ
## 検証項目一覧
- Nginx の X-Accel-Redirect を使って、保護されたコンテンツ(S3上)を配信する方法
- cluster モジュールの動作確認
- インメモリキャッシュの動作確認

## セットアップ
各コンテナの起動(`docker-compose.yml`があるディレクトリにて)。
```zsh
% docker-compose up
```

## 検証操作
### Nginx の X-Accel-Redirect を使って、保護されたコンテンツ(S3上)を配信する方法
`http://localhost:80/api/v1/image`にアクセスするとS3上のコンテンツが返却されるはず。
**＊実施前に環境変数の定義が必要です。**

### cluster モジュールの動作確認
node を実行すると検証環境の PC に合わせてプロセスが fork される。
```zsh
node     | Master
node     | Master : Cluster Fork 0
node     | Master : Cluster Fork 1
node     | [1] [PID 13] Worker
node     | [2] [PID 19] Worker
```

API を呼び出すと交互にプロセスが反応する。
```zsh
[1] [PID 13] Request
[2] [PID 19] Request
```

### インメモリキャッシュの動作確認
cluster化された環境で動作させるとどうなるのかを検証。
クライアントとして [3rd-Eden / memcached](https://github.com/3rd-Eden/memcached) を利用。
結果、プロセス間でキャッシュしたデータを共有できた。
```zsh
node         | [1] [PID 16] Request
node         | get data = undefined
node         | set location value.
node         | set success!

node         | [1] [PID 16] Request
node         | get data = back_graund1.jpg

node         | [2] [PID 22] Request
node         | get data = back_graund1.jpg

node         | [1] [PID 16] Request
node         | get data = back_graund1.jpg
```

## 参考サイト
### Nginx の X-Accel-Redirect を使って、保護されたコンテンツ(S3上)を配信する方法
- [DjangoでNginxのX-Accel-Redirectを使って、保護されたコンテンツを配信する方法](https://note.com/shimakaze_soft/n/nbeeeeeef6d8f)
- [【AWS S3】S3 Presigned URLの仕組みを調べてみた](https://qiita.com/tmiki/items/87697d3d3d5330c6fc08)
- [S3で有効期限付きのページを作る(node.js＋AWS＋S3)|おちゃカメラ。 ](https://photo-tea.com/p/s3-expires-page/)
- [NginxでS3をプロキシせざるを得ない時 | Development | Blog | Akari, Inc.](https://www.akariinc.com/ja/blog/development/nginx-proxy-s3)
- [アプリケーションで認証後にS3のコンテンツを返す](https://unching-star.hatenablog.jp/entry/20130222/1361521408)
- [networking - Docker Network Nginx Resolver - Stack Overflow](https://stackoverflow.com/questions/35744650/docker-network-nginx-resolver)

### cluster モジュールの動作確認
- [Node.js の Cluster モジュールを使って Express サーバを並列化する - Corredor](http://neos21.hatenablog.com/entry/2019/04/18/080000)

### インメモリキャッシュの動作確認
- [使った node.js ライブラリ – メモリキャッシュ周り比較 « Ooharabucyou](https://www.bucyou.net/blog/1224)
- [Webアプリケーションにおける正しいキャッシュ戦略 - Sansan Builders Box](https://buildersbox.corp-sansan.com/entry/2019/03/25/150000)
- [Webアプリケーションにおけるキャッシュ戦略の比較 - kenju's blog](https://itiskj.hatenablog.com/entry/2017/08/18/000000)
- [第1回　memcachedの基本：memcachedを知り尽くす｜gihyo.jp … 技術評論社](https://gihyo.jp/dev/feature/01/memcached/0001)
- [memcached, Redis 何をどう使う - 補習ほぼ確](https://ave-h.hateblo.jp/entry/2018/08/09/234051)
- [3rd-Eden / memcached](https://github.com/3rd-Eden/memcached)
