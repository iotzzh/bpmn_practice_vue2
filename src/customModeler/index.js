/*
 * @Author: zzh
 * @Date: 2021-11-26 13:11:29
 * @LastEditors: zzh
 * @LastEditTime: 2021-11-26 13:14:12
 * @FilePath: \vue2-demo\src\customModeler\index.js
 * @Description: 请填写简介
 */
import Modeler from 'bpmn-js/lib/Modeler'

import inherits from 'inherits'

import CustomModule from './custom'

export default function CustomModeler(options) {
    Modeler.call(this, options)

    this._customElements = []
}

inherits(CustomModeler, Modeler)

CustomModeler.prototype._modules = [].concat(
    CustomModeler.prototype._modules, [
        CustomModule
    ]
)