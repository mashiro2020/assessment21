'use strict';
const userNameInput = document.getElementById('user-name'); // 入力エリア
const assessmentButton = document.getElementById('assessment'); // 診断ボタン
const resultDivided = document.getElementById('result-area'); // 結果表示エリア
const tweetDivided = document.getElementById('tweet-area'); // ツイートボタン

/**
 * 指定した要素の子どもを全て削除する関数
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) { 
    while (element.firstChild) { // 指定した要素の子要素がある限りループ
        element.removeChild(element.firstChild); // 最初の子要素を削除
    }
}

// テキストフィールド上でEnterが押されたときにも診断する処理
userNameInput.onkeydown = event => {　// 同じ意味 → userNameInput.onkeydown = function(event) {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
}

// 診断ボタンが押されたときの処理
assessmentButton.onclick = () => { // アロー関数
    const userName = userNameInput.value; // ユーザー入力を取得
    if (userName.length === 0) { // 「userName === ''」でも可
        // 名前が空の時は処理を終了する
        return; // 入力が空だったら処理を中断
    }
    
    // ▼▼▼ 診断結果表示エリアの作成 ▼▼▼
    removeAllChildren(resultDivided); // 診断結果表示エリアの子要素をすべて削除
    const header = document.createElement('h3'); // h3タグを新しく作る
    header.innerText = '診断結果'; // h3タグにテキストを設定
    resultDivided.appendChild(header); // h3タグを診断結果表示エリアに追加

    const paragraph = document.createElement('p'); // pタグを新しく作る
    // assessment関数を実行して、pタグに診断結果を設定
    const result = assessment(userName);
    paragraph.innerText = result[0]; // resultは配列。0:診断結果文、1:画像表示のためのindex番号
    resultDivided.appendChild(paragraph); // pタグを診断結果表示エリアに追加

    const img = document.createElement('img');
    const index = result[1];
    img.setAttribute('src', images[index]);
    resultDivided.appendChild(img); // imgタグを診断結果表示エリアに追加

    // ▼▼▼ ツイートエリアの作成 ▼▼▼
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a'); // aタグを新しく作る
    // リンク先を作成
    const hrefValue = 
        'https://twitter.com/intent/tweet?button_hashtag=' + 
        encodeURIComponent('あなたのいいところ') +
        '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue); // リンク先を設定
    // widgets.jsがツイートボタンに変換するためのマーカー
    anchor.className = 'twitter-hashtag-button'; 
    anchor.setAttribute('data-text', result); // ツイート本文
    anchor.innerText = 'Tweet #あなたのいいところ'; // ボタンの表示内容
    tweetDivided.appendChild(anchor); // aタグをHTML上（ツイートエリア）に表示

    const script = document.createElement('script'); // scriptタグを新しく作る
    // 読み込むjsファイル（Twitterが提供しているwidgets.jsファイルを読み込む）
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script); // scriptタグをHTML上（ツイートエリア）に設置
}

const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

var img = [];
const images = [
    img[0] = 'onepiece01_luffy.png',
    img[1] = 'onepiece02_zoro_bandana.png',
    img[2] = 'onepiece03_nami.png',
    img[3] = 'onepiece04_usopp_sogeking.png',
    img[4] = 'onepiece05_sanji.png',
    img[5] = 'onepiece06_chopper.png',
    img[6] = 'onepiece07_robin.png',
    img[7] = 'onepiece08_franky.png',
    img[8] = 'onepiece09_brook.png',
    img[9] = 'onepiece10_jinbe.png',
    img[10] = 'onepiece11_arlong.png',
    img[11] = 'onepiece12_buggy.png',
    img[12] = 'onepiece13_crocodile.png',
    img[13] = 'onepiece14_enel.png',
    img[14] = 'onepiece15_lucci.png',
    img[15] = 'onepiece16_moria.png',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length; // 16で割った余りで、0~15の間の数値になる
    let result = answers[index];
    result = result.replaceAll('{userName}',userName); // {userName}をユーザーの名前に置き換える
    return [result, index]; // 診断結果 画像を表示させるためにindex番号が欲しい
}


// 「診断結果の文言の特定の部分を名前に置き換える処理」のテスト
console.assert(
    assessment('太郎') === 
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

// 「入力が同じ名前なら、同じ診断結果を出力する処理」のテスト
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら、同じ診断結果を出力する処理が正しくありません。'
);

console.log(assessment('真代'));
