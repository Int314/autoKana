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
    'a': 'ア', 'i': 'イ', 'u': 'ウ', 'e': 'エ', 'o': 'オ',
    'ka': 'カ', 'ki': 'キ', 'ku': 'ク', 'ke': 'ケ', 'ko': 'コ',
    'sa': 'サ', 'si': 'シ', 'su': 'ス', 'se': 'セ', 'so': 'ソ',
    'ta': 'タ', 'ti': 'チ', 'tu': 'ツ', 'te': 'テ', 'to': 'ト',
    'na': 'ナ', 'ni': 'ニ', 'nu': 'ヌ', 'ne': 'ネ', 'no': 'ノ',
    'ha': 'ハ', 'hi': 'ヒ', 'fu': 'フ', 'he': 'ヘ', 'ho': 'ホ',
    'ma': 'マ', 'mi': 'ミ', 'mu': 'ム', 'me': 'メ', 'mo': 'モ',
    'ya': 'ヤ', 'yu': 'ユ', 'yo': 'ヨ',
    'ra': 'ラ', 'ri': 'リ', 'ru': 'ル', 're': 'レ', 'ro': 'ロ',
    'wa': 'ワ', 'wi': 'ウィ', 'we': 'ウェ', 'wo': 'ヲ',
    'ga': 'ガ', 'gi': 'ギ', 'gu': 'グ', 'ge': 'ゲ', 'go': 'ゴ',
    'za': 'ザ', 'ji': 'ジ', 'zu': 'ズ', 'ze': 'ゼ', 'zo': 'ゾ',
    'da': 'ダ', 'di': 'ヂ', 'du': 'ヅ', 'de': 'デ', 'do': 'ド',
    'ba': 'バ', 'bi': 'ビ', 'bu': 'ブ', 'be': 'ベ', 'bo': 'ボ',
    'pa': 'パ', 'pi': 'ピ', 'pu': 'プ', 'pe': 'ペ', 'po': 'ポ',
    'kya': 'キャ', 'kyi': 'キィ', 'kyu': 'キュ', 'kye': 'キェ', 'kyo': 'キョ',
    'sha': 'シャ', 'shi': 'シ', 'shu': 'シュ', 'she': 'シェ', 'sho': 'ショ',
    'sya': 'シャ', 'syi': 'シィ', 'syu': 'シュ', 'sye': 'シェ', 'syo': 'ショ',
    'cha': 'チャ', 'chi': 'チ', 'chu': 'チュ', 'che': 'チェ', 'cho': 'チョ',
    'tya': 'チャ', 'tyi': 'チィ', 'tyu': 'チュ', 'tye': 'チェ', 'tyo': 'チョ',
    'nya': 'ニャ', 'nyi': 'ニィ', 'nyu': 'ニュ', 'nye': 'ニェ', 'nyo': 'ニョ',
    'hya': 'ヒャ', 'hyi': 'ヒィ', 'hyu': 'ヒュ', 'hye': 'ヒェ', 'hyo': 'ヒョ',
    'mya': 'ミャ', 'myi': 'ミィ', 'myu': 'ミュ', 'mye': 'ミェ', 'myo': 'ミョ',
    'rya': 'リャ', 'ryi': 'リィ', 'ryu': 'リュ', 'rye': 'リェ', 'ryo': 'リョ',
    'gya': 'ギャ', 'gyi': 'ギィ', 'gyu': 'ギュ', 'gye': 'ギェ', 'gyo': 'ギョ',
    'ja': 'ジャ', 'ji': 'ジ', 'ju': 'ジュ', 'je': 'ジェ', 'jo': 'ジョ',
    'bya': 'ビャ', 'byi': 'ビィ', 'byu': 'ビュ', 'bye': 'ビェ', 'byo': 'ビョ',
    'pya': 'ピャ', 'pyi': 'ピィ', 'pyu': 'ピュ', 'pye': 'ピェ', 'pyo': 'ピョ',
    'fa': 'ファ', 'fi': 'フィ', 'fu': 'フ', 'fe': 'フェ', 'fo': 'フォ',
    'va': 'ヴァ', 'vi': 'ヴィ', 'vu': 'ヴ', 've': 'ヴェ', 'vo': 'ヴォ',
    'kwa': 'クァ', 'kwi': 'クィ', 'kwu': 'クゥ', 'kwe': 'クェ', 'kwo': 'クォ',
    'gwa': 'グァ', 'gwi': 'グィ', 'gwu': 'グゥ', 'gwe': 'グェ', 'gwo': 'グォ',
    'tsa': 'ツァ', 'tsi': 'ツィ', 'tsu': 'ツ', 'tse': 'ツェ', 'tso': 'ツォ',
    'la': 'ァ', 'li': 'ィ', 'lu': 'ゥ', 'le': 'ェ', 'lo': 'ォ',
    'ltu': 'ッ',
    'lya': 'ャ', 'lyu': 'ュ', 'lye': 'ェ', 'lyo': 'ョ',
    'xa': 'ァ', 'xi': 'ィ', 'xu': 'ゥ', 'xe': 'ェ', 'xo': 'ォ',
    'xya': 'ャ', 'xyu': 'ュ', 'xye': 'ェ', 'xyo': 'ョ',
    'whi': 'ウィ', 'whe': 'ウェ', 'who': 'ウォ',
    'fwa': 'ファ', 'fwi': 'フィ', 'fwu': 'フゥ', 'fwe': 'フェ', 'fwo': 'フォ',
    'swa': 'スァ', 'swi': 'スィ', 'swu': 'スゥ', 'swe': 'スェ', 'swo': 'スォ',
    'gwa': 'グァ', 'gwi': 'グィ', 'gwu': 'グゥ', 'gwe': 'グェ', 'gwo': 'グォ',
    'thi': 'ティ', 'thu': 'テュ', 'the': 'テェ', 'tho': 'テョ',
    'twa': 'トァ', 'twi': 'トィ', 'twu': 'トゥ', 'twe': 'トェ', 'two': 'トォ',
    'dhi': 'ディ', 'dhu': 'デュ', 'dhe': 'デェ',
    'dwa': 'ドァ', 'dwi': 'ドィ', 'dwu': 'ドゥ', 'dwe': 'ドェ', 'dwo': 'ドォ',
    'qa': 'クァ', 'qi': 'クィ', 'qe': 'クェ', 'qo': 'クォ',
    'qyi': 'クィ', 'qye': 'クェ',
    'qwa': 'クヮ', 'qwi': 'クィ', 'qwu': 'クゥ', 'qwe': 'クェ', 'qwo': 'クォ',
    '-': 'ー'
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
