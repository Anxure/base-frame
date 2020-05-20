/**
 * @Author: dww Chengdu r&d center
 * @Date: 2020-05-19 17:50:53
 * @desc 所有过滤器文件
 */
import numeral from 'numeral'

/**
 * 格式化金额显示（12333 => 12,333.00）
 * @param {Number} num - 金额
 * @param {String} prefixFlag - 显示前缀
 */
export const toThousandFilter = (num, prefixFlag = '') => {
  return `${prefixFlag ? prefixFlag + ' ' : ''}${numeral(num).format('0,0')}`;
}
export const sexFilter = (sex) => {
  return sex === 1 ? '男' : sex === 0 ? '女' : '未知'
}
