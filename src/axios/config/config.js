
const url = `${location.protocol}//${window.location.host}`;
const apiPrefixPath = 'api/Record';

window.apiPrefixPath = apiPrefixPath

const config = {
    env:apiPrefixPath,
    apiPrefixPath:`/${apiPrefixPath}`,
    url:()=> url + config.apiPrefixPath
}

export { config };