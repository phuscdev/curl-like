import machineLiker from './src/machineLiker.js';

const main = new machineLiker({
  cookie: 'machineliker_session=e4c95b2c46a6e5fc0c805afad2249512; _ga=GA1.2.1833870732.1642389416; _gid=GA1.2.1593031150.1642389417; __gads=ID=fec9a708555d327a-22ba52bff9cf00aa:T=1642389415:S=ALNI_MZvp_Qela8P1YzLWel-FWxwDU9jLA; __cf_bm=SIVKgO1Ux9KNtNbkj_fjJYj3a1QovLuTGdmGp0epAM4-1642389419-0-AUSSkzc1XFgnf9zFhKsSkoz1E3ZcLjf2mMuaAmg8YOsZK/YnYVsGEFsXZV2cbwkfVWNzsCp3yMX3W7/C6Ny4VQWmXRqctCxB5IApjW5Tajoez2FFVJ/cjf2rL/xsnWZggQ=='
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