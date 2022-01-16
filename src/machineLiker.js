import request from './request.js';
import { parse } from 'node-html-parser';
import qs from 'qs';

export default class {
  /**
   * Url get data
   */
  url = 'https://www.machine-liker.com';

  /**
   * Api url
   */
  api_url = this.url+'/api';

  user_cookie = null;

  constructor({ cookie }) {
    this.user_cookie = cookie;
  }

  GetPostObjectID(id) {
    const response = request(`${this.url}/send-reactions/?post_id=${id}`, {
      method: 'GET',
      headers: {
        cookie: this.user_cookie
      } 
    })

    const handle = (data) => {
      const html = parse(data);
      const selection = html.querySelector('input[name="object_id"]');

      if(selection !== null) {
        const ObjectID = selection.getAttribute('value');
        return ObjectID;
      } else {
        return false;
      }
    }

    return response
    .then(handle)
    .catch(error => console.log(error))
  }

  SendLiker(ObjectId) {
    const response = request(`${this.api_url}/send-reactions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        cookie: this.user_cookie
      },
      data: qs.stringify({
        object_id: ObjectId,
        reactions: '1', // 1,2,16,4,3,7,8
        limit: 150
      })
    })

    return response
    .then(data => data)
    .catch(error => console.log(error))
  }
}