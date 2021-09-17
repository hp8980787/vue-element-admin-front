import request from '@/utils/request'
export function checkDomains() {
  return request({
    url: '/domains-check-expired-time',
    method: 'get',
    timeout: 60 * 1000 * 5
  })
}
