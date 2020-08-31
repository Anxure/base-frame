import numeral from 'numeral'
import { SEX_STATUS } from '@/config/dict'
/**
 * 格式化金额显示（12333 => 12,333.00）
 * @param {Number} num - 金额
 * @param {String} prefixFlag - 显示前缀
 */
export const toThousandFilter = (num, prefixFlag = '') => {
  return `${prefixFlag ? prefixFlag + ' ' : ''}${numeral(num).format('0,0')}`;
}
export const sexFilter = (sex) => {
  return SEX_STATUS[sex]
}
