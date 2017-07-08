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
// Wit.ai �� action ���A�@�w�n��@�� send method�A�Ψ��������H����
send(request, response) {
const {sessionId, context, entities} = request;
const {text, quickreplies} = response;
// find out user id
const recipientId = sessions[sessionId].fbid;
if (recipientId) {
// �o��ݭn�P�_�n�^�Ǫ��T���O�_���d�ߵ��G
// �Y context ���a�� newsResult ���N�O�n�^�Ǭd�ߵ��G
// �]���N�n�I�s sendNewsMessagePromise() �Ӧ^�� GenericMessage
if (context.newsResult) {
// fbBotUtil.sendNewsMessagePromise �o��O Messenger API ��������@
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
// �����^�Ǵ��q��r
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
// �ڭ̦۩w�q�� getNews action
getNews({context, entities}) {
return new Promise(function(resolve, reject) {
var search_query = firstEntityValue(entities, 'search_query')
if (search_query) {
// �o��O�h�I�sapi
// fetchr �O�ڹ�@���@�Ӥp�禡�A�Q�� import.io �h�� Yahoo news ���j�M���G�C
// ���O�o�g���I�ڴN�����L��~
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
