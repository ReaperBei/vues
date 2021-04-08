import request from '@/utils/request'
import { data } from 'autoprefixer'
export function fetchList(params) {
    return request({
        url: '/et/v1/etEquityDividend/queryPage',
        method: 'post',
        params: params
    })
}
