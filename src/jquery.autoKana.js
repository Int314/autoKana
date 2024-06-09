import { hiraganaMap } from './hiraganaMap.js';
import { katakanaMap } from './katakanaMap.js';

(($) => {
  /**
   * 指定されたオプションに基づいて入力をかなに変換する関数
   * @param {string} input - 変換対象の入力
   * @param {boolean} katakana - カタカナに変換する場合はtrue
   * @returns {string} 変換されたかな
   */
  const convertToKana = (input, katakana) => {
    return katakana ? katakanaMap[input] || '' : hiraganaMap[input] || '';
  };

  /**
   * 文字がアルファベット（「-」を含む）かどうかを確認する関数
   * @param {string} char - 確認する文字
   * @returns {boolean} 文字がアルファベットならtrue、そうでなければfalse
   */
  const isAlphabet = (char) => /^[a-zA-Z-]$/.test(char);

  /**
   * 入力を自動的にふりがな（ひらがな・カタカナ）に変換するjQueryプラグイン
   * @param {string} name - 変換対象の入力要素のセレクタ
   * @param {string} furigana - 変換されたかなを出力する要素のセレクタ
   * @param {Object} passedOptions - 追加オプション
   */
  $.fn.autoKana = function (name, furigana, passedOptions) {
    const options = {
      katakana: false, // デフォルトはひらがな変換
      ...passedOptions
    };

    /** 蓄積された入力を保持する変数 */
    let accumulatedInput = '';
    /** 前回の文字を保持する変数 */
    let previousChar = '';

    $(name).on('keyup', function (e) {
      const inputChar = e.key.toLowerCase();

      // 入力が空の場合、出力をクリア
      if (!$(name).val()) {
        $(furigana).val('');
        accumulatedInput = '';
        previousChar = '';
        return;
      }

      // バックスペースの処理
      if (e.key === 'Backspace') {
        var currentValue = $(furigana).val();
        $(furigana).val(currentValue.slice(0, -1)); // 最後の文字を削除
        accumulatedInput = ''; // 蓄積された入力をリセット
        return;
      }

      // 特殊キーを無視
      if (e.ctrlKey || e.altKey || e.metaKey || !isAlphabet(inputChar)) return;

      // 「nn」を処理して「ん」を出力しリセット
      // 小さな「っ」と区別するため
      if (inputChar === 'n' && previousChar === 'n') {
        const convChar = options.katakana ? 'ン' : 'ん';
        $(furigana).val($(furigana).val() + convChar);
        accumulatedInput = '';
        previousChar = '';
        return;
      }

      // 同じアルファベットが連続した場合、小さな「っ」を追加
      if (inputChar === previousChar) {
        const convChar = options.katakana ? 'ッ' : 'っ';
        $(furigana).val($(furigana).val() + convChar);
        accumulatedInput = inputChar; // リセットして現在の文字を追加
      } else {
        accumulatedInput += inputChar;
      }

      // 変換処理
      const kana = convertToKana(accumulatedInput, options.katakana);
      if (kana) {
        $(furigana).val($(furigana).val() + kana);
        accumulatedInput = ''; // 変換後にリセット
        previousChar = '';
      } else {
        previousChar = inputChar; // 現在の文字を記憶
      }
    });
  };
})(jQuery);
