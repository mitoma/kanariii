# KanariIi のはじめかた

このドキュメントでは KanariIi のインストールの仕方から基本的な利用の仕方を説明します。

1. インストール
1. KanariIi 開発環境を開く
1. プログラミング
1. プログラムのデプロイ
1. 開発に便利な小技
    - 開発中のコードの確認
    - 変更のバージョン管理
    - プログラムのバックアップと復帰

## インストール

[KanariIi - Chrome ウェブストア](https://chrome.google.com/webstore/detail/kanariii/ophmonkcolbmbicbacadjdobmbpidaop) にアクセスし KanariIi をインストールします。

![show store](./image/install-show-store.png)

KanariIi のインストール時には複数のWebサイト情報の読み取り、変更の権限を要求されますが、ここで表示されるサイトはすべて kintone を提供しているサイトのドメインです。**Add extension** ボタンをクリックすることでインストールされます。

![show parmission](./image/install-permission.png)

インストールが正常に完了すると Chrome のブックマークバーの右側にズのようなアイコンがグレーアウトで表示されます。

![finish install](./image/install-finish.png)

## KanariIi 開発環境を開く

KanariIi をインストールすると、アプリ管理権限を持っているアプリにアクセスしたときに KANARIII ボタンが出現します。

![open button](./image/open-button.png)

このボタンを押すと KanariIi 開発環境が開きます

![open kanariii](./image/open-window.png)

## プログラミング

KanariIi ではプログラミングのエディタに [Blockly](https://developers.google.com/blockly) を採用しています。ブロックを組み立てることで kintone のカスタマイズを設計していきます。

ブロックは KanariIi 開発環境の左側のメニューをクリックすることで選択できます。 Kintone と書かれたボタンをクリックすると kintone 特有のブロックが表示されます。

![block tree](./image/programming-blocktree.png)

それでは試しにアプリのカスタマイズを作ってみましょう！
