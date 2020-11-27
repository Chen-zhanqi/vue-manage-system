import request from '../utils/request';

// export const fetchData = query => {
//     return request({
//         url: './table.json',
//         method: 'get',
//         params: query
//     });
// };
// 筛选房源列表
export const fetchData = query => {
    return request({
        url: 'http://127.0.0.1:5000/admOperation/houseLists',
        method: 'get',
        params: query
    });
};

// 获取房源详情
export const getHouseInfo = house_id => {
    return request({
        url: 'http://127.0.0.1:5000/admOperation/houseInfo',
        method: 'get',
        params: {'house_id': house_id}
    })
};

// 用户列表
export const getUserList = query => {
    return request({
        url: 'http://127.0.0.1:5000/admOperation/userInfo',
        method: 'get',
        params: query
    })
};
// 用户详情
export const getUserInfo = user_id => {
    return request({
        url: 'http://127.0.0.1:5000/admOperation/userInfo',
        method: 'get',
        params: {'user_id': user_id}
    })
};
// 用户预览
export const getUserView = viewquery  => {
    return request({
        url: 'http://127.0.0.1:5000/admOperation/userView',
        method: 'get',
        params: viewquery
    })
};
