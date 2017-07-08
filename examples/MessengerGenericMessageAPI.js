exports.sendNewsMessagePromise = (id, res) => {
  const resData = res.extractorData.data[0].group;
  const newResults = resData.map(function(item) {
  return {
    title: item.titleText[0].text,
      buttons: [{
        type: "web_url",
        url: item.titleLink[0].href,
        title: '看詳情',
      }]
    };
});
	
const Result = [];
for (let i = 0; i < 3; i++) {
  Result.push(newResults[Math.floor(Math.random()*10)]);
}

  messageData = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": Result
      }
    }
  };

  const body = JSON.stringify({
    recipient: { id },
    message: messageData,
  });
  const qs = 'access_token=' + encodeURIComponent(token);
  return fetch('https://graph.facebook.com/v2.6/me/messages?' + qs, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body,
  })
  .then(rsp => rsp.json())
  .then(json => {
    if (json.error && json.error.message) {
      throw new Error(json.error.message);
    }
    return json;
  });
}

exports.sendTextMessagePromise = (id, text) => {
  const body = JSON.stringify({
    recipient: { id },
    message: { text },
  });
  const qs = 'access_token=' + encodeURIComponent(token);
  return fetch('https://graph.facebook.com/v2.6/me/messages?' + qs, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body,
  })
  .then(rsp => rsp.json())
  .then(json => {
    if (json.error && json.error.message) {
      throw new Error(json.error.message);
    }
    return json;
  });
};