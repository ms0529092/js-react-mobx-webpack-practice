import { action, configure } from 'mobx'

class StoreAction {
    constructor(){
        this.initState = {};
    }

    @action updatedData = (dataKey, val) => {
        this[dataKey] = val
    }

    @action assignData = (obj) => {
        Object.assign(this, obj)
    }

    @action paramsUpDate = (dataKey, val) => {
        const params = { ...this.params, [dataKey]: val };
        this.assignData({ params });
    }

    @action paramsAssign = (obj) => {
        const params = { ...this.params, ...obj }
        this.assignData({ params })
    }

}

export default StoreAction;