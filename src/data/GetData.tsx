const apiKey = process.env.REACT_APP_API_KEY;
const bearerToken = process.env.REACT_APP_API_BEARER_TOKEN;

const GetData = (url:string, custOptions?: {}): Promise<any> => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + bearerToken
        }
    };

    var newOptions = { ...options, ...custOptions };

    return fetch(url, newOptions)
    .then(res => res.json())
    // .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
}

export default GetData;
