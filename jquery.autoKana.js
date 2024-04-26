(function ($) {
    $.fn.autoKana = function (element1, element2, passedOptions) {
      var options = $.extend(
        {
          'katakana': false
        }, passedOptions);
  
      var accumulatedInput = ''; // これまでの入力を蓄積する変数
      var previousChar = ''; // 前回の文字を記憶する変数
  
      $(element1).on('keyup', function (e) {
        var inputChar = e.key.toLowerCase();
  
        console.log(accumulatedInput);
  
        // 入力が空の場合、出力をクリア
        if (!$(this).val()) {
          $(element2).val('');
          accumulatedInput = '';
          previousChar = '';
          return;
        }
  
        // バックスペースの処理
        if (e.key === 'Backspace') {
          var currentValue = $(element2).val();
          $(element2).val(currentValue.slice(0, -1)); // 末尾の1文字を削除
          accumulatedInput = ''; // 蓄積された入力をリセット
          return;
        }
  
        // 特殊キーの入力を無視する
        if (e.ctrlKey || e.altKey || e.metaKey || !isAlphabet(inputChar)) {
          return;
        }
  
        if (isAlphabet(inputChar)) {
          // 「nn」の場合、'ん' を出力してリセット
          if (inputChar === 'n' && previousChar === 'n') {
            $(element2).val($(element2).val() + 'ん');
            accumulatedInput = '';
            previousChar = '';
            return;
          }
  
          // 同じアルファベットが連続した場合、小さな「っ」を追加
          if (inputChar === previousChar) {
            $(element2).val($(element2).val() + 'っ');
            accumulatedInput = inputChar; // リセットして現在の文字を追加
          } else {
            accumulatedInput += inputChar;
          }
  
          var kana = convertToKana(accumulatedInput);
          if (kana) {
            $(element2).val($(element2).val() + kana);
            accumulatedInput = ''; // 変換後はリセット
            previousChar = '';
          } else {
            previousChar = inputChar; // 現在の文字を記憶
          }
  
        }
      });
  
      function convertToKana(input) {
        return kanaMap[input] || '';
      }
  
      function isAlphabet(char) {
        // return /^[a-zA-Z]$/.test(char);
        return /^[a-zA-Z-]$/.test(char); // 「-」を含む
      }
  
      var kanaMap = {
        'a': 'あ', 'i': 'い', 'u': 'う', 'e': 'え', 'o': 'お',
        'la': 'ぁ', 'li': 'ぃ', 'lu': 'ぅ', 'le': 'ぇ', 'lo': 'ぉ',
  
        'na': 'な', 'ni': 'に', 'nu': 'ぬ', 'ne': 'ね', 'no': 'の',
        'nya': 'にゃ', 'nyi': 'にぃ', 'nyu': 'にゅ', 'nye': 'にぇ', 'nyo': 'にょ',
        'yi': 'い', 'wu': 'う', 'xa': 'ぁ', 'xi': 'ぃ', 'xu': 'ぅ', 'xe': 'ぇ', 'xo': 'ぉ',
        'whu': 'う', 'lyi': 'ぃ', 'lye': 'ぇ',
        'ha': 'は', 'hi': 'ひ', 'hu': 'ふ', 'he': 'へ', 'ho': 'ほ',
        'hya': 'ひゃ', 'hyi': 'ひぃ', 'hyu': 'ひゅ', 'hye': 'ひぇ', 'hyo': 'ひょ',
        'ye': 'いぇ', 'fya': 'ふゃ', 'fyu': 'ふゅ', 'fyo': 'ふょ',
        'wha': 'うぁ', 'whi': 'うぃ', 'whe': 'うぇ', 'who': 'うぉ',
        'fwa': 'ふぁ', 'fwi': 'ふぃ', 'fwu': 'ふぅ', 'fwe': 'ふぇ', 'fwo': 'ふぉ',
        'fa': 'ふぁ', 'fi': 'ふぃ', 'fe': 'ふぇ', 'fo': 'ふぉ',
        'ka': 'か', 'ki': 'き', 'ku': 'く', 'ke': 'け', 'ko': 'こ',
        'kya': 'きゃ', 'kyi': 'きぃ', 'kyu': 'きゅ', 'kye': 'きぇ', 'kyo': 'きょ',
        'ca': 'か', 'cu': 'く', 'co': 'こ',
        'qu': 'く', 'qya': 'くゃ', 'qyu': 'くゅ', 'qyo': 'くょ',
        'lka': 'ヵ', 'lke': 'ヶ',
        'xka': 'ヵ', 'xke': 'ヶ', 'qwa': 'くぁ', 'qwi': 'くぃ', 'qwu': 'くぅ', 'qwe': 'くぇ', 'qwo': 'くぉ',
        'ga': 'が', 'gi': 'ぎ', 'gu': 'ぐ', 'ge': 'げ', 'go': 'ご',
        'gya': 'ぎゃ', 'gyi': 'ぎぃ', 'gyu': 'ぎゅ', 'gye': 'ぎぇ', 'gyo': 'ぎょ',
        'gwa': 'ぐぁ', 'gwi': 'ぐぃ', 'gwu': 'ぐぅ', 'gwe': 'ぐぇ', 'gwo': 'ぐぉ',
        'sa': 'さ', 'si': 'し', 'su': 'す', 'se': 'せ', 'so': 'そ',
        'sya': 'しゃ', 'syi': 'しぃ', 'syu': 'しゅ', 'sye': 'しぇ', 'syo': 'しょ',
        'sha': 'しゃ', 'shi': 'し', 'shu': 'しゅ', 'she': 'しぇ', 'sho': 'しょ',
        'ci': 'し', 'ce': 'せ',
        'swa': 'すぁ', 'swi': 'すぃ', 'swu': 'すぅ', 'swe': 'すぇ', 'swo': 'すぉ',
        'za': 'ざ', 'zi': 'じ', 'zu': 'ず', 'ze': 'ぜ', 'zo': 'ぞ',
        'zya': 'じゃ', 'zyi': 'じぃ', 'zyu': 'じゅ', 'zye': 'じぇ', 'zyo': 'じょ',
        'ja': 'じゃ', 'ji': 'じ', 'ju': 'じゅ', 'je': 'じぇ', 'jo': 'じょ',
        'jya': 'じゃ', 'jyi': 'じぃ', 'jyu': 'じゅ', 'jye': 'じぇ', 'jyo': 'じょ',
        'ta': 'た', 'ti': 'ち', 'tu': 'つ', 'te': 'て', 'to': 'と',
        'tya': 'ちゃ', 'tyi': 'ちぃ', 'tyu': 'ちゅ', 'tye': 'ちぇ', 'tyo': 'ちょ',
        'cha': 'ちゃ', 'chi': 'ち', 'chu': 'ちゅ', 'che': 'ちぇ', 'cho': 'ちょ',
        'tsa': 'つぁ', 'tsi': 'つぃ', 'tse': 'つぇ', 'tso': 'つぉ',
        'tha': 'てゃ', 'thi': 'てぃ', 'thu': 'てゅ', 'the': 'てぇ', 'tho': 'てょ',
        'twa': 'とぁ', 'twi': 'とぃ', 'twu': 'とぅ', 'twe': 'とぇ', 'two': 'とぉ',
        'da': 'だ', 'di': 'ぢ', 'du': 'づ', 'de': 'で', 'do': 'ど',
        'dya': 'ぢゃ', 'dyi': 'ぢぃ', 'dyu': 'ぢゅ', 'dye': 'ぢぇ', 'dyo': 'ぢょ',
        'dha': 'でゃ', 'dhi': 'でぃ', 'dhu': 'でゅ', 'dhe': 'でぇ', 'dho': 'でょ',
        'dwa': 'どぁ', 'dwi': 'どぃ', 'dwu': 'どぅ', 'dwe': 'どぇ', 'dwo': 'どぉ',
        'ra': 'ら', 'ri': 'り', 'ru': 'る', 're': 'れ', 'ro': 'ろ',
        'rya': 'りゃ', 'ryi': 'りぃ', 'ryu': 'りゅ', 'rye': 'りぇ', 'ryo': 'りょ',
        'wa': 'わ', 'wo': 'を', 'nn': 'ん',
        'lwa': 'ゎ', 'xwa': 'ゎ',
        'ltu': 'っ', 'xtu': 'っ', 'ltsu': 'っ',
        'fa': 'ふぁ', 'fi': 'ふぃ', 'fe': 'ふぇ', 'fo': 'ふぉ',
        'fya': 'ふゃ', 'fyu': 'ふゅ', 'fyo': 'ふょ',
        'fwi': 'ふぃ', 'fwu': 'ふぅ', 'fwe': 'ふぇ', 'fwo': 'ふぉ',
        'va': 'ヴぁ', 'vi': 'ヴぃ', 'vu': 'ヴ', 've': 'ヴぇ', 'vo': 'ヴぉ',
        'vya': 'ヴゃ', 'vyi': 'ヴぃ', 'vyu': 'ヴゅ', 'vye': 'ヴぇ', 'vyo': 'ヴょ',
        'pa': 'ぱ', 'pi': 'ぴ', 'pu': 'ぷ', 'pe': 'ぺ', 'po': 'ぽ',
        'pya': 'ぴゃ', 'pyi': 'ぴぃ', 'pyu': 'ぴゅ', 'pye': 'ぴぇ', 'pyo': 'ぴょ',
        'qa': 'くぁ', 'qi': 'くぃ', 'qe': 'くぇ', 'qo': 'くぉ',
        'qyi': 'くぃ', 'qye': 'くぇ',
        'qwa': 'くぁ', 'qwi': 'くぃ', 'qwu': 'くぅ', 'qwe': 'くぇ', 'qwo': 'くぉ',
        'ya': 'や', 'yu': 'ゆ', 'yo': 'よ', 'lya': 'ゃ', 'lyu': 'ゅ', 'lyo': 'ょ',
        'xya': 'ゃ', 'xyu': 'ゅ', 'xyo': 'ょ',
  
        '-': 'ー',
      };
  
    };
  })(jQuery);