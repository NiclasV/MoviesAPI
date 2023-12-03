const bearerToken = process.env.REACT_APP_API_BEARER_TOKEN;

const GetData = (url:string, customOptions?: {}): Promise<any> => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + bearerToken
        }
    };

    var newOptions = { ...options, ...customOptions };

    return fetch(url, newOptions)
    .then(res => res.json())
    .catch(err => console.error('error:' + err));
}

export default GetData;
