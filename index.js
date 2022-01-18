import machineLiker from './src/machineLiker.js';

const main = new machineLiker({
  cookie: 'machineliker_session=fa2bce98884f29c01a0d1f6e65617399; _ga=GA1.2.1408828301.1642474421; _gid=GA1.2.745199730.1642474421; __gads=ID=73954ee302491617-2217d9dcffcf0085:T=1642474421:S=ALNI_MZEw860FZOfvMP2slm8EVz5OYB-qQ; __cf_bm=Leez6H2HlLRqLn1KLbxJBrpXoRjdpS_8R6e4rR6LEMk-1642474423-0-AU3M8y0PKLp0QLyqtrlLLFuetApAxgU59bMsmQPvFRsH77cQp/JFml4XnSY9njO/3j59/MPn8v9zLody8YeUSRLCxYiBlqznTxo+lmwiOBjqhRSWW0cMUazs7dcsBAG4Kg==; _gat_gtag_UA_177214317_1=1'
});

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const doSendLike = async () => {
  const postObjectId = await main.GetPostObjectID('4166256660064168');

  if (!postObjectId) {
    return {
      status: 'error',
      data: {
        message: 'Không tìm thấy Object ID'
      }
    };
  }

  const sendLikeResponse = await main.SendLiker(postObjectId);

  if (sendLikeResponse.status !== 'ok') {
    return {
      status: 'warning',
      data: sendLikeResponse.error
    };
  }

  return {
    status: 'ok',
    data: sendLikeResponse.info
  }
}

const start = async () => {
  while (true) {
    const { status, data } = await doSendLike();

    if (status == 'error') {
      console.log(data.message);
      break;
    } else if (status == 'warning') {
      if (data.type !== 'cooldown') {
        console.log(data);
        break;
      } else {
        console.log('cool down...');
      }
    } else if (status == 'ok') {
      console.log(data);
    }

    await sleep(660000); // 660 000 = 11 minutes
  }
}

start();