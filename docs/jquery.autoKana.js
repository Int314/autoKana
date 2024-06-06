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
   * ひらがなのマッピング
   */
  const hiraganaMap = {
    'a': 'あ', 'i': 'い', 'u': 'う', 'e': 'え', 'o': 'お',
    'ka': 'か', 'ki': 'き', 'ku': 'く', 'ke': 'け', 'ko': 'こ',
    'sa': 'さ', 'si': 'し', 'su': 'す', 'se': 'せ', 'so': 'そ',
    'ta': 'た', 'ti': 'ち', 'tu': 'つ', 'te': 'て', 'to': 'と',
    'na': 'な', 'ni': 'に', 'nu': 'ぬ', 'ne': 'ね', 'no': 'の',
    'ha': 'は', 'hi': 'ひ', 'fu': 'ふ', 'he': 'へ', 'ho': 'ほ',
    'ma': 'ま', 'mi': 'み', 'mu': 'む', 'me': 'め', 'mo': 'も',
    'ya': 'や', 'yu': 'ゆ', 'yo': 'よ',
    'ra': 'ら', 'ri': 'り', 'ru': 'る', 're': 'れ', 'ro': 'ろ',
    'wa': 'わ', 'wi': 'うぃ', 'we': 'うぇ', 'wo': 'を',
    'ga': 'が', 'gi': 'ぎ', 'gu': 'ぐ', 'ge': 'げ', 'go': 'ご',
    'za': 'ざ', 'ji': 'じ', 'zu': 'ず', 'ze': 'ぜ', 'zo': 'ぞ',
    'da': 'だ', 'di': 'ぢ', 'du': 'づ', 'de': 'で', 'do': 'ど',
    'ba': 'ば', 'bi': 'び', 'bu': 'ぶ', 'be': 'べ', 'bo': 'ぼ',
    'pa': 'ぱ', 'pi': 'ぴ', 'pu': 'ぷ', 'pe': 'ぺ', 'po': 'ぽ',
    'kya': 'きゃ', 'kyi': 'きぃ', 'kyu': 'きゅ', 'kye': 'きぇ', 'kyo': 'きょ',
    'sha': 'しゃ', 'shi': 'し', 'shu': 'しゅ', 'she': 'しぇ', 'sho': 'しょ',
    'sya': 'しゃ', 'syi': 'しぃ', 'syu': 'しゅ', 'sye': 'しぇ', 'syo': 'しょ',
    'cha': 'ちゃ', 'chi': 'ち', 'chu': 'ちゅ', 'che': 'ちぇ', 'cho': 'ちょ',
    'tya': 'ちゃ', 'tyi': 'ちぃ', 'tyu': 'ちゅ', 'tye': 'ちぇ', 'tyo': 'ちょ',
    'nya': 'にゃ', 'nyi': 'にぃ', 'nyu': 'にゅ', 'nye': 'にぇ', 'nyo': 'にょ',
    'hya': 'ひゃ', 'hyi': 'ひぃ', 'hyu': 'ひゅ', 'hye': 'ひぇ', 'hyo': 'ひょ',
    'mya': 'みゃ', 'myi': 'みぃ', 'myu': 'みゅ', 'mye': 'みぇ', 'myo': 'みょ',
    'rya': 'りゃ', 'ryi': 'りぃ', 'ryu': 'りゅ', 'rye': 'りぇ', 'ryo': 'りょ',
    'gya': 'ぎゃ', 'gyi': 'ぎぃ', 'gyu': 'ぎゅ', 'gye': 'ぎぇ', 'gyo': 'ぎょ',
    'ja': 'じゃ', 'ji': 'じ', 'ju': 'じゅ', 'je': 'じぇ', 'jo': 'じょ',
    'bya': 'びゃ', 'byi': 'びぃ', 'byu': 'びゅ', 'bye': 'びぇ', 'byo': 'びょ',
    'pya': 'ぴゃ', 'pyi': 'ぴぃ', 'pyu': 'ぴゅ', 'pye': 'ぴぇ', 'pyo': 'ぴょ',
    'fa': 'ふぁ', 'fi': 'ふぃ', 'fu': 'ふ', 'fe': 'ふぇ', 'fo': 'ふぉ',
    'va': 'ゔぁ', 'vi': 'ゔぃ', 'vu': 'ゔ', 've': 'ゔぇ', 'vo': 'ゔぉ',
    'kwa': 'くぁ', 'kwi': 'くぃ', 'kwu': 'くぅ', 'kwe': 'くぇ', 'kwo': 'くぉ',
    'gwa': 'ぐぁ', 'gwi': 'ぐぃ', 'gwu': 'ぐぅ', 'gwe': 'ぐぇ', 'gwo': 'ぐぉ',
    'tsa': 'つぁ', 'tsi': 'つぃ', 'tsu': 'つ', 'tse': 'つぇ', 'tso': 'つぉ',
    'la': 'ぁ', 'li': 'ぃ', 'lu': 'ぅ', 'le': 'ぇ', 'lo': 'ぉ',
    'ltu': 'っ',
    'lya': 'ゃ', 'lyu': 'ゅ', 'lye': 'ぇ', 'lyo': 'ょ',
    'xa': 'ぁ', 'xi': 'ぃ', 'xu': 'ぅ', 'xe': 'ぇ', 'xo': 'ぉ',
    'xya': 'ゃ', 'xyu': 'ゅ', 'xye': 'ぇ', 'xyo': 'ょ',
    'whi': 'うぃ', 'whe': 'うぇ', 'who': 'うぉ',
    'fwa': 'ふぁ', 'fwi': 'ふぃ', 'fwu': 'ふぅ', 'fwe': 'ふぇ', 'fwo': 'ふぉ',
    'swa': 'すぁ', 'swi': 'すぃ', 'swu': 'すぅ', 'swe': 'すぇ', 'swo': 'すぉ',
    'gwa': 'ぐぁ', 'gwi': 'ぐぃ', 'gwu': 'ぐぅ', 'gwe': 'ぐぇ', 'gwo': 'ぐぉ',
    'thi': 'てぃ', 'thu': 'てゅ', 'the': 'てぇ', 'tho': 'てょ',
    'twa': 'とぁ', 'twi': 'とぃ', 'twu': 'とぅ', 'twe': 'とぇ', 'two': 'とぉ',
    'dhi': 'でぃ', 'dhu': 'でゅ', 'dhe': 'でぇ',
    'dwa': 'どぁ', 'dwi': 'どぃ', 'dwu': 'どぅ', 'dwe': 'どぇ', 'dwo': 'どぉ',
    'qa': 'くぁ', 'qi': 'くぃ', 'qe': 'くぇ', 'qo': 'くぉ',
    'qyi': 'くぃ', 'qye': 'くぇ',
    'qwa': 'くゎ', 'qwi': 'くぃ', 'qwu': 'くぅ', 'qwe': 'くぇ', 'qwo': 'くぉ',
    '-': 'ー'
  };

  /**
   * カタカナのマッピング
   */
  const katakanaMap = {
    // TODO:カタカナのマッピングをここに追加
  };

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
        $(furigana).val($(furigana).val() + 'ん');
        accumulatedInput = '';
        previousChar = '';
        return;
      }

      // 同じアルファベットが連続した場合、小さな「っ」を追加
      if (inputChar === previousChar) {
        $(furigana).val($(furigana).val() + 'っ');
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
