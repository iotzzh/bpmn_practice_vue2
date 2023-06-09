/*
 * @Author: zzh
 * @Date: 2021-11-26 14:36:56
 * @LastEditors: zzh
 * @LastEditTime: 2021-11-26 15:53:46
 * @FilePath: \vue2-demo\src\bpmnComponents\utils\util.js
 * @Description: 请填写简介
 */
// util.js
const customElements = ['bpmn:Task'] // 自定义元素的类型
const customConfig = { // 自定义元素的配置(后面会用到)
    'bpmn:Task': {
        'url': 'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/rules.png',
        'attr': { x: 0, y: 0, width: 48, height: 48 },
    }
}

const hasLabelElements = ['bpmn:StartEvent', 'bpmn:EndEvent'] // 一开始就有label标签的元素类型

export { customElements, customConfig, hasLabelElements }