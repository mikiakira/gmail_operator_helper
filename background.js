// background.js

// メニュー項目の定義
const menuItems = [
  { title: "未読のメールを検索", prefix: "is:unread" },
  { title: "件名に含まれる単語を指定", prefix: "subject:" },
  { title: "指定したラベルのメールを検索", prefix: "label:" },
  { title: "添付ファイルのあるメールを検索", prefix: "has:attachment" },
  { title: "送信者を指定", prefix: "from:" },
  { title: "受信者を指定", prefix: "to:" }
];

// Gmail のページでのみメニューを表示
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
      id: "gmail-search-helper",
      title: "Gmail 検索補助",
      contexts: ["all"],
      documentUrlPatterns: ["*://mail.google.com/mail/*"]
  });

  // 各メニュー項目を追加
  menuItems.forEach(item => {
      chrome.contextMenus.create({
          id: item.prefix,
          parentId: "gmail-search-helper",
          title: item.title,
          contexts: ["all"]
      });
  });
});

// メニュー項目が選択された際のアクション
chrome.contextMenus.onClicked.addListener((info, tab) => {
      const query = info.menuItemId;
      chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: setQueryInForm,
          args: [query]
      });
  //}
});

// フォームにクエリを設定する関数
function setQueryInForm(query) {
  document.querySelector('input[name="q"]').value = query;
}

