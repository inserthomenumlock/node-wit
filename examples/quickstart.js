'use strict';

let Wit = null;
let interactive = null;
try {
  // if running from repo
  Wit = require('../').Wit;
  interactive = require('../').interactive;
} catch (e) {
  Wit = require('node-wit').Wit;
  interactive = require('node-wit').interactive;
}

const accessToken = (() => {
  if (process.argv.length !== 3) {
    console.log('usage: node examples/quickstart.js <wit-access-token>');
    process.exit(1);
  }
  return process.argv[2];
})();

// Quickstart example
// See https://wit.ai/ar7hur/quickstart

///////////////////////////////////////////////////////
const firstEntityValue = (entities, entity) => {
const val = entities && entities[entity] &&
Array.isArray(entities[entity]) &&
entities[entity].length > 0 &&
entities[entity][0].value;

if (!val) {
return null;
}
return typeof val === 'object' ? val.value : val;
};
if (!val) { return null; } return typeof val === 'object' ? val.value : val; };
// Our bot actions
const actions = {
// Our bot actions const actions = {
// Wit.ai 的 action 中，一定要實作的 send method，用來讓機器人說話
send(request, response) {
const {sessionId, context, entities} = request;
const {text, quickreplies} = response;
// find out user id
const recipientId = sessions[sessionId].fbid;
if (recipientId) {
// 這邊需要判斷要回傳的訊息是否為查詢結果
// 若 context 中帶有 newsResult 那就是要回傳查詢結果
// 因此就要呼叫 sendNewsMessagePromise() 來回傳 GenericMessage
if (context.newsResult) {
// fbBotUtil.sendNewsMessagePromise 這邊是 Messenger API 的相關實作
return fbBotUtil.sendNewsMessagePromise(recipientId, context.newsResult)
.then(() => null)
.catch((err) => {
console.error(
'Oops! An error occurred while forwarding the response to',
recipientId,
':',
err.stack || err
);
});
} else {
// 直接回傳普通文字
return fbBotUtil.sendTextMessagePromise(recipientId, text)
.then(() => null)
.catch((err) => {
console.error(
'Oops! An error occurred while forwarding the response to',
recipientId,
':',
err.stack || err
);
});
}
} else {
console.error('Oops! Couldn\'t find user for session:', sessionId);
// Giving the wheel back to our bot
return Promise.resolve()
}
},
// 我們自定義的 getNews action
getNews({context, entities}) {
return new Promise(function(resolve, reject) {
var search_query = firstEntityValue(entities, 'search_query')
if (search_query) {
// 這邊是去呼叫api
// fetchr 是我實作的一個小函式，利用 import.io 去抓 Yahoo news 的搜尋結果。
// 不是這篇重點我就先略過啦~
fetchr(search_query, function(data) {
context.newsResult = data;
console.log('context newsResult', context.newsResult);
delete context.missNews;
});
} else {
context.missNews = true;
delete context.newsResult;
}
return resolve(context);
});
},
};

////////////////////////////////////////////////////////



const client = new Wit({accessToken, actions});
interactive(client);
