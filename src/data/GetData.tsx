const GetData = (url:string, custOptions?: {}): Promise<any> => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer '
        }
    };

    var newOptions = { ...options, ...custOptions };

    return fetch(url, newOptions)
    .then(res => res.json())
    // .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
}

export default GetData;
