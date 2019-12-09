# KanariIi のはじめかた

このドキュメントでは KanariIi のインストールの仕方から基本的な利用の仕方を説明します。

- [インストール](#インストール)
- [KanariIi 開発環境を開く](#KanariIi_開発環境を開く)
- [プログラミング](#プログラミング)
- プログラムのデプロイ
- 開発に便利な小技
    - 開発中のコードの確認
    - 変更のバージョン管理
    - プログラムのバックアップと復帰

## インストール

[KanariIi - Chrome ウェブストア](https://chrome.google.com/webstore/detail/kanariii/ophmonkcolbmbicbacadjdobmbpidaop) にアクセスし KanariIi をインストールします。

<img src="./image/install-show-store.png" width="600"/>

KanariIi のインストール時には複数のWebサイト情報の読み取り、変更の権限を要求されますが、ここで表示されるサイトはすべて kintone を提供しているサイトのドメインです。**Add extension** ボタンをクリックすることでインストールされます。

<img src="./image/install-permission.png" width="400"/>

インストールが正常に完了すると Chrome のブックマークバーの右側にズのようなアイコンがグレーアウトで表示されます。

<img src="./image/install-finish.png" width="300"/>

## KanariIi_開発環境を開く

KanariIi をインストールすると、アプリ管理権限を持っているアプリにアクセスしたときに KANARIII ボタンが出現します。

<img src="./image/open-button.png" width="400"/>

このボタンを押すと KanariIi 開発環境が開きます

<img src="./image/open-window.png" width="600"/>

## プログラミング

KanariIi ではプログラミングのエディタに [Blockly](https://developers.google.com/blockly) を採用しています。ブロックを組み立てることで kintone のカスタマイズを設計していきます。

ブロックは KanariIi 開発環境の左側のメニューをクリックすることで選択できます。 Kintone と書かれたボタンをクリックすると kintone 特有のブロックが表示されます。

<img src="./image/programming-blocktree.png" width="200"/>

それでは試しにアプリのカスタマイズを作ってみましょう！