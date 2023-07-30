import Axios from "../mainAction";

/**
 * 取得員工列表
 */
export const callGetStaffListData = (postData, req) => Axios('get', `GetRecords`, postData, req)

/**
 * 儲存員工資料
 */
export const callSaveStaffData = (postData) => Axios('post', `SaveRecords`, postData, {})