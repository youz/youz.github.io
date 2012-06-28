("name" . "*scrap*")
("author" . "Yousuke Ushiki")
("url" . "http://github.com/youz/")
("description" . "趣味的xyzzy lisp")
(	"packages"
	(	("version" . "1.0.0")
		("file" . "oauth1.0.0.tgz")
		("src" . "http://dl.dropbox.com/u/215714/xyzzy/oauth1.0.0.tgz")
		("md5" . "24671116f5350e6ef86fd2222a1024ff")
		("time" . 3528893888)
		("name" . "xl-oauth")
		("category" "Network" "Libraries")
		("depends" "xml-http-request")
		("description" . "OAuth1.0 クライアントライブラリ for xyzzy
OAuth認証ヘッダの生成機能と、Webブラウザ経由でのアクセストークン取得機能を提供します。")
		("changes" . "2011/10/30: 1st release")
	)
	(	("version" . "1.1.3b")
		("file" . "xyttr.tgz")
		("src" . "http://dl.dropbox.com/u/215714/xyzzy/xyttr.tgz")
		("md5" . "37e591b2abcf21d2db3a4d3360fa8a8c")
		("time" . 3534577939)
		("name" . "xyttr")
		("category" "Network")
		("description" . "xyzzy上で動作するミニマムなtwitterクライアント")
		("depends" "xml-http-request" "json")
		("changes" . "2012/01/03:
* xyttr-listコマンドのリスト選択肢に自作リストを追加
* DMの削除に対応 (通常のツイートと同じくdキー)
* ~/.xyttr/config.l のサンプルを追加 (postbuf.l)")
	)
	(	("version" . "1.0.0")
		("file" . "ldrpin-mode1.0.0.tgz")
		("src" . "http://dl.dropbox.com/u/215714/xyzzy/ldrpin-mode1.0.0.tgz")
		("md5" . "c0d0bbecdca380375012a673046e99d4")
		("time" . 3528893888)
		("name" . "ldrpin-mode")
		("category" "Network")
		("description" . "Livedoor Readerのピンリストを表示します。")
		("depends" "xml-http-request" "json")
		("changes" . "2011/10/30: 1st release")
	)
	(	("version" . "1.1.0")
		("file" . "xl-rt.tgz")
		("src" . "http://dl.dropbox.com/u/215714/xyzzy/xl-rt.tgz")
		("md5" . "fe8362e5eece4ee4aef16c6240c95c9d")
		("time" . 3549411337)
		("name" . "xl-rt")
		("category" "Lisp" "Libraries" "Development")
		("description" . "sbcl付属のsb-rtをxyzzy lisp用に移植")
		("changes" . "
2012/06/23: 成功/失敗の表示とconditionの表示を改善

2011/10/30: 1st release")
	)
	(	("version" . "1.0.0")
		("file" . "coco-mode1.0.0.tgz")
		("src" . "http://dl.dropbox.com/u/215714/xyzzy/coco-mode1.0.0.tgz")
		("md5" . "b4571be10d2dfba8e397a7a3324b43e7")
		("time" . 3528935703)
		("name" . "coco-mode")
		("category" "Development" "Editing")
		("description" . "Coco用のメジャーモード")
		("changes" . "2011/10/30: 1st release")
	)
	(	("version" . "1.0.0")
		("file" . "coffee-mode1.0.0.tgz")
		("src" . "http://dl.dropbox.com/u/215714/xyzzy/coffee-mode1.0.0.tgz")
		("md5" . "d65453a757bbb68fc2f9eaedc00df70a")
		("time" . 3528935703)
		("name" . "coffee-mode")
		("category" "Development" "Editing")
		("description" . "CoffeeScript用のメジャーモード")
		("changes" . "2011/10/30: 1st release")
	)
	(	("version" . "1.0.1")
		("file" . "xl-growl")
		("src" . "http://dl.dropbox.com/u/215714/xyzzy/xl-growl.tgz")
		("md5" . "4a317ec484491ac7e69e61015b285c3c")
		("time" . 3533384527)
		("name" . "xl-growl")
		("category" "Network" "Libraries")
		("description" . "GNTP - Growl Network Transport Protocol による通信機能を提供します。")
		("changes" . "2011/12/20
notify-with-socket-callbackのコールバック引数省略時の不具合を修正")
	)
	(	("version" . "1.2.1")
		("file" . "xl-repl.tgz")
		("src" . "http://dl.dropbox.com/u/215714/xyzzy/xl-repl.tgz")
		("md5" . "dbd577879c7b031228135d82ba1aafba")
		("time" . 3549878326)
		("name" . "xl-repl")
		("category" "Lisp" "Development")
		("depends")
		("description" . "lisp-repl-mode for xyzzy")
		("changes" . "2012/06/28: ver. 1.2.1
======================
### 修正点

* referenceコマンド 表示機能強化
  - 説明文中のシンボルやseealso項目上でReturn もしくは
    左クリックすると該当記事にジャンプするように
  - Backspace, Alt+Leftで戻る / Alt+Rightで進む
  - j,k で1行スクロール
  - J,Kで記事移動 (:part or :ftsオプションを使用して複数記事表示時)

2012/06/23: ver. 1.2.0
======================
### 修正点

* Ctrl+Gで評価を中断した時に次のプロンプトが表示されない問題を修正
* ls系コマンドでシンボルが重複して表示される場合がある問題を修正

### 新機能 (REPLコマンド)
* reference -- リファレンス検索
* lscmd     -- コマンド名検索
* step      -- ステップ実行
* log       -- ログ取り用ユーティリティ
* calc      -- 電卓
* clip      -- 標準出力をクリップボードにコピー

詳細はREADME参照

2012/02/25: ver. 1.1.0
======================
### 新機能
* 標準出力と評価結果の表示にtext-attributeを適用
* *return-behavior*の値によってReturn押下時の挙動を切り替えられるように
* キーバインド追加

### 変更点
* 式途中/過去入力/過去評価結果の各表示位置でReturnを押した時の挙動をSLIME風に
* si:*trace-on-error* => t の時、*error-output*への出力を全て横取りしていたのを
   broadcastを使い、コピーを取得するように変更
* 入力履歴のキーバインドはM-n,M-pとし、C-n,C-pは*lisp-mode-map*のままにした

2012/02/20: ver. 1.0.1
======================
* 評価結果がnilの時に印字されない不具合を修正

2012/02/17: ver. 1.0.0
======================
### 新機能
* expandコマンド -- マクロフォームを展開して表示
* timeコマンド -- 処理時間を計測して表示

### 変更点
* ls系コマンドの表示で、カレントパッケージのシンボルにもパッケージ修飾子を付けるように変更
* ls系コマンドの表示で、関数/マクロは引数も表示するように変更
* 評価結果がprint-functionを持つ構造体の場合、format指示子~Aを使って印字するように変更

### 修正
* 評価結果が循環参照を含む場合に対応
* REPL変数 `/` の内容をCL仕様準拠に変更
* 評価結果表示の前にfresh-lineを行うように変更
")
	)
)
