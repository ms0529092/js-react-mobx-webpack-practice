import axios from "axios";
import { config } from '../config'

const serverPath = config.url()

const instance = axios.create({
    baseURL: serverPath,
    headers: { 
        'Content-Type': 'application/json; charset=UTF-8',
        Accept: 'application/json;',
    },
    timeout: 30000
});

// 攔截 request 統一處理
instance.interceptors.request.use(
    function(config){
        return config
    },
    function(error){
        return Promise.reject(error)
    }
)

// 攔截 response 統一處理
instance.interceptors.response.use(
    function(response){
        return response.data
    },
    function(error){
        return Promise.reject(error)
    }
)


function Axios(method, url, data = null, config){
    method = method.toLowerCase();

    switch(method){
        case 'get':
            return instance.get(url, { params:data })
        break;
        case 'post':
            return instance.post(url, data, config)
        break;
        default:
            console.log(`出錯了起檢查`)
            return false;
    }
}

export default Axios;