const GetData = (url:string, custOptions?: {}): Promise<any> => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmMzNTc2YmI2MGQyNWZiYTI0NGZhYzQxMTA3MTRmNSIsInN1YiI6IjYzN2QzYTg4ZWZlMzdjMDBjNjI5MGFhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZUC5w26_CGHZ72gnYQZVfK30_7c1IR0zcnnyZvlu4RY'
        }
    };

    var newOptions = { ...options, ...custOptions };

    return fetch(url, newOptions)
    .then(res => res.json())
    // .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
}

export default GetData;