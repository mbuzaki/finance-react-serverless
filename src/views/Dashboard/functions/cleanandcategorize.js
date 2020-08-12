import { API } from 'aws-amplify';

export default function cleanandcategorize() {
    const data = {
      key: 'hur'
    }
    API.post('cleanandcategorizeapi', '/cleanandcategorize', data).then(res => {
      console.log(res);
    })
}
