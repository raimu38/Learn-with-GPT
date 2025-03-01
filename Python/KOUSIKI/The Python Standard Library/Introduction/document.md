以下は、提供された「Introduction」ページの内容の日本語訳です。

---

# はじめに

Python Language Reference が Python 言語の正確な構文と意味論を記述しているのに対し、このライブラリリファレンスマニュアルは、Python に同梱されている標準ライブラリについて記述しています。また、Python のディストリビューションに一般的に含まれるオプションのコンポーネントについても説明しています。

Python の標準ライブラリは非常に充実しており、以下に示すような長大な目次が示す通り、幅広い機能を提供します。ライブラリには、C 言語で実装され、ファイル入出力など Python プログラマーには通常アクセスできないシステム機能へアクセスするための組み込みモジュールと、日常的なプログラミングで生じる多くの問題に対する標準化された解決策を提供する Python 実装のモジュールの両方が含まれています。これらのモジュールの中には、プラットフォーム固有の実装を抽象化し、プラットフォームに依存しない API を提供することで、Python プログラムの移植性を高めるために設計されたものもあります。

Windows 用の Python インストーラには通常、標準ライブラリ全体が含まれ、さらに多くの追加コンポーネントが同梱されていることが多いです。一方、Unix 系 OS では、Python は通常複数のパッケージとして提供されるため、オペレーティングシステムに付属のパッケージングツールを用いて、オプションのコンポーネントの一部または全部を取得する必要がある場合があります。

また、標準ライブラリに加えて、個々のプログラムやモジュールからパッケージ、あるいはアプリケーション開発フレームワークに至るまで、何十万ものコンポーネントが Python Package Index から入手可能です。

---

## 目次（一部抜粋）

- **Introduction**
  - 利用可能なコンポーネントに関する注意事項
- **組み込み関数**
- **組み込み定数**
- **サイトモジュールで追加される定数**
- **組み込み型**
  - 真理値判定、ブール演算、比較
  - 数値型（int、float、complex など）
  - ブール型（bool）
  - イテレータ型
  - シーケンス型（list、tuple、range）
  - 文字列型（str）
  - バイナリシーケンス型（bytes、bytearray、memoryview）
  - セット型（set、frozenset）
  - マッピング型（dict）
  - コンテキストマネージャ型
  - 型注釈型（Generic Alias、Union など）
  - その他の組み込み型
  - 特殊属性、整数の文字列変換の長さ制限
- **組み込み例外**
  - 例外コンテキスト、組み込み例外の継承、例外階層、警告、例外グループ
- **テキスト処理サービス**
  - string、re（正規表現）、difflib、textwrap、unicodedata、stringprep、readline、rlcompleter
- **バイナリデータサービス**
  - struct、codecs
- **データ型**
  - datetime、zoneinfo、calendar、collections、heapq、bisect、array、weakref、types、copy、pprint、reprlib、enum、graphlib
- **数値・数学モジュール**
  - numbers、math、cmath、decimal、fractions、random、statistics
- **関数型プログラミングモジュール**
  - itertools、functools、operator
- **ファイルおよびディレクトリアクセス**
  - pathlib、os.path、stat、filecmp、tempfile、glob、fnmatch、linecache、shutil
- **データ永続性**
  - pickle、copyreg、shelve、marshal、dbm、sqlite3
- **データ圧縮・アーカイブ**
  - zlib、gzip、bz2、lzma、zipfile、tarfile
- **ファイルフォーマット**
  - csv、configparser、tomllib、netrc、plistlib
- **暗号サービス**
  - hashlib、hmac、secrets
- **一般的な OS サービス**
  - os、io、time、logging、platform、errno、ctypes
- **コマンドラインインタフェースライブラリ**
  - argparse、optparse、getpass、fileinput、curses など
- **並列実行**
  - threading、multiprocessing、concurrent.futures、subprocess、sched、queue、contextvars、\_thread
- **ネットワーキングとプロセス間通信**
  - asyncio、socket、ssl、select、selectors、signal、mmap
- **インターネットデータ処理**
  - email、json、mailbox、mimetypes、base64、binascii、quopri
- **構造化マークアップ処理ツール**
  - html、html.parser、html.entities
- **XML 処理モジュール**
  - xml.etree.ElementTree、xml.dom、xml.sax など
- **インターネットプロトコル関連**
  - webbrowser、wsgiref、urllib、http、ftplib、poplib、imaplib、smtplib、uuid、socketserver、http.server、http.cookies、http.cookiejar、xmlrpc、ipaddress
- **マルチメディアサービス**
  - wave、colorsys
- **国際化**
  - gettext、locale
- **プログラムフレームワーク**
  - turtle、cmd、shlex
- **Tk を用いたグラフィカルユーザーインタフェース**
  - tkinter、tkinter.ttk など、IDLE も含む
- **開発ツール**
  - typing、pydoc、doctest、unittest、test など
- **デバッグとプロファイリング**
  - bdb、faulthandler、pdb、timeit、trace、tracemalloc
- **ソフトウェアパッケージングと配布**
  - ensurepip、venv、zipapp
- **Python ランタイムサービス**
  - sys、sys.monitoring、sysconfig、builtins、**main**、warnings、dataclasses、contextlib、abc、atexit、traceback、**future**、gc、inspect、site
- **カスタム Python インタプリタ**
  - code、codeop
- **モジュールのインポート**
  - zipimport、pkgutil、modulefinder、runpy、importlib、importlib.resources、importlib.metadata
- **Python 言語サービス**
  - ast、symtable、token、keyword、tokenize、tabnanny、pyclbr、py_compile、compileall、dis、pickletools
- **MS Windows 専用サービス**
  - msvcrt、winreg、winsound
- **Unix 専用サービス**
  - posix、pwd、grp、termios、tty、pty、fcntl、resource、syslog

---

## 標準ライブラリについて

Python 標準ライブラリは、システムレベルの機能（ファイル入出力、OS インタフェースなど）にアクセスするための組み込みモジュールや、日常のプログラミングでよく用いられる問題の解決策を提供するモジュールから構成されています。これらにより、プログラマーはプラットフォーム固有の処理に煩わされることなく、移植性の高いコードを書くことができます。

また、Windows 用の Python インストーラには標準ライブラリ全体が同梱されるのに対し、Unix 系 OS ではパッケージ管理システムを用いて必要なコンポーネントを追加することが一般的です。さらに、Python Package Index には、数十万を超える個別のモジュールやパッケージ、アプリケーション開発フレームワークなど、豊富な追加コンポーネントが公開されています。

---

以上が、Python 標準ライブラリの概要および紹介の日本語訳です。
