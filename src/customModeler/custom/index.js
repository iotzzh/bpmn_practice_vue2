/*
 * @Author: zzh
 * @Date: 2021-11-26 13:13:38
 * @LastEditors: zzh
 * @LastEditTime: 2021-11-26 15:38:11
 * @FilePath: \vue2-demo\src\customModeler\custom\index.js
 * @Description: 请填写简介
 */
// custom/index.js
import CustomPalette from './CustomPalette';
import CustomRenderer from './CustomRenderer'

export default {
    __init__: ['paletteProvider'],
    paletteProvider: ['type', CustomPalette],
    customRenderer: ['type', CustomRenderer]
}