roulette.js
===========

roulette.js is a jQuery Plugin for roulette image.

### DEMO

http://demo.st-marron.info/roulette/sample/demo.html

===========
###　追記(by shigeXshige)

細かい処理についてはdemo.jsに直接コメントしております
必要であれば適宜修正してください

実装済
 ・前衛、後衛のバランス（ちゃんと3:2、2:3で配置される）
 ・一度選ばれたキャラはsetボタンを押すと、リストから除外される
 ・選ばれたキャラの名前出力（id名で出せます）
 ・前衛、または後衛キャラが少なくなった(1体以下の)際は再読み込みがかかる
 	・もし不要、別途修正するなら89行目辺りに分岐で処理を居れてます
  ・再読み込みが走るのでログが消えてしまいます。ご注意ください
 ・5体選出の時にキャラ被りなく選出される
 ・ボタンの連打押しエラーの対応、ルーレット開始からセットするまでスタートを押せないよう制御
