import machineLiker from './src/machineLiker.js';

const main = new machineLiker({
  cookie: 'machineliker_session=76207f3b5b4e40345b2d30f71d4da555; _ga=GA1.2.203201194.1642321571; _gid=GA1.2.1026187671.1642321571; __gads=ID=aa48d6cf9a99d25a-223ed80ce8cf009f:T=1642321571:S=ALNI_MaPcruIhhp2eLOu6Hp5QAlkM022FA; __cf_bm=ZfoiTAGKD5O4PYsHs4lEe4ACYN8HZMvnlOn2ZH..3KE-1642321575-0-AQAKcL+3dhzu0kgRhvy9c2bv/oFTBSh0nvahn/4kSZHHcygKGr0vdwALcv3+IvrmQKMzssQGTAsT/UR5/WeyxORDyyErxMli2GM6qGUrJTM5jTwZHyVUyc/Z5Iag1PIpAw=='
});

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const doSendLike = async () => {
  const postObjectId = await main.GetPostObjectID('4166256660064168');

  if(!postObjectId) {
    return {
      status: 'error',
      data: {
        message: 'Không tìm thấy Object ID'
      }
    };
  }

  const sendLikeResponse = await main.SendLiker(postObjectId);
  
  if(sendLikeResponse.status !== 'ok') {
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

while (true) {
  const { status, data } = await doSendLike();

  if(status == 'error') {
    console.log(data.message);
    break;
  } else if(status == 'warning') {
    if(data.type !== 'cooldown') {
      console.log(data);
      break;
    } else {
      console.log('cool down...');
    }
  } else if(status == 'ok') {
    console.log(data);
  }

  await sleep(660000); // 660 000 = 11 minutes
}