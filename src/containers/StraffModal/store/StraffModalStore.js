import { action, computed, extendObservable, toJS } from 'mobx'

import StoreAction from 'storeAction';
import { resIsOk } from 'helpers'
import { callGetStaffListData, callSaveStaffData } from 'api'
import { message } from 'antd';
import dayjs from 'dayjs';


const initState = {
    isFetching: false,
    saveIsFetching:false,
    // didInvalidate: true,
    list: [],
    params:[],
}

const api = {
    list:callGetStaffListData,
    updated:callSaveStaffData,
}

class StraffModalStore extends StoreAction {
    constructor(){
        super();
        this.initState = initState;
        this.api = api;
        extendObservable(this, initState)

    }

    @action addData = () => {
        const params = [...this.params]
        const addItem = {
            Name: '',
            DateOfBirth: dayjs(),
            Salary: 0,
            Address: ''
        }
        
        params.unshift(addItem);
        params.map((item, index)=> {item.key = index; return item});

        this.assignData({
            list:params,
            params:params
        })
    }

    @action getList = async (e) => {
        if (e) {
            e.preventDefault()
        }

        this.assignData({
            isFetching: true
        });

        const res = await this.api.list()

        if(resIsOk(res)){
            const data = res.Data.map((item, index)=> {item.key = index; return item});

            this.assignData({
                isFetching:false,
                list:data,
                params:data
            })
        } else {
            message.error(res.Msg);
        }
    }

    @action saveData = async (e) => {
        if (e) {
            e.preventDefault()
        }

        const postData = this.postData        
        this.assignData({
            saveIsFetching: true
        });

        const res = await this.api.updated(postData);

        if(resIsOk(res)){
            this.assignData({
                saveIsFetching: false
            });
            this.getList();
        } else {
            message.error(res.Msg);
        }

    }

    @action changeValue = (index, val, name) => {
        const params = [...this.params].map(item => toJS(item))

        params[index][name] = val;
        console.log(index)
        console.log(name);
        console.log(val)
        console.log(params);
        this.assignData({
            params: params
        });
    }

    @computed get postData(){
        const params = [...this.params].map((item)=> {delete item.key; return item });

        return params;
    }
}

const store = new StraffModalStore();
export default store;