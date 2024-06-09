# autoKana

ふりがなを自動で入力するjQueryのプラグインです。

名前の入力に合わせてふりがな（ひらがな・カタカナ）を表示できます。

Macのライブ変換でも動作します。

![画面収録 2024-06-09 11 07 57](https://github.com/Int314/autoKana/assets/15305383/bafb94ba-64cb-47c8-809f-bc713a74381f)

## 使い方
`dist/jquery.autoKana.min.js`を読み込んで、第1引数に入力元、第2引数に出力先の要素を指定します。

```js
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="./dist/jquery.autoKana.min.js"></script>
  <script>
    $(document).ready(function () {
      $('#nameInput').autoKana('#nameInput', '#hiraganaOutput');
      $('#nameInput').autoKana('#nameInput', '#katakanaOutput', { katakana: true });
    });
  </script>
```

---
こちら（https://github.com/harisenbon/autokana）を参考にしました。
