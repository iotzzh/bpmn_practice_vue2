/*
 * @Author: zzh
 * @Date: 2021-11-25 17:23:50
 * @LastEditors: zzh
 * @LastEditTime: 2021-11-26 14:50:43
 * @FilePath: \vue2-demo\src\custom\index.js
 * @Description: 请填写简介
 */
// custom/index.js
import CustomPalette from './CustomPalette'
import CustomRenderer from './CustomRenderer'

export default {
    __init__: ['customPalette', 'customRenderer'],
    customPalette: ['type', CustomPalette],
    customRenderer: ['type', CustomRenderer]
}