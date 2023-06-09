/*
 * @Author: zzh
 * @Date: 2021-11-26 13:12:56
 * @LastEditors: zzh
 * @LastEditTime: 2021-11-26 15:48:54
 * @FilePath: \vue2-demo\src\customModeler\custom\CustomPalette.js
 * @Description: 请填写简介
 */
/**
 * A palette that allows you to create BPMN _and_ custom elements.
 */
 export default function PaletteProvider(palette, create, elementFactory, globalConnect) {
    this.create = create
    this.elementFactory = elementFactory
    this.globalConnect = globalConnect

    palette.registerProvider(this)
}

PaletteProvider.$inject = [
    'palette',
    'create',
    'elementFactory',
    'globalConnect'
]

PaletteProvider.prototype.getPaletteEntries = function(element) { // 此方法和上面案例的一样
    const {
        create,
        elementFactory
    } = this;

    function createTask() {
        return function(event) {
            const shape = elementFactory.createShape({
                type: 'bpmn:Task'
            });
            console.log(shape) // 只在拖动或者点击时触发
            create.start(event, shape);
        }
    }

    function createEndEvent() {
        return function(event) {
            const shape = elementFactory.createShape({
                type: 'bpmn:EndEvent'
            });
            console.log(shape) // 只在拖动或者点击时触发
            create.start(event, shape);
        }
    }

    return {
        'create.zzh-task': {
            group: 'model',
            className: 'icon-custom zzh-task',
            title: '创建一个类型为zzh-task的任务节点',
            action: {
                dragstart: createTask(),
                click: createTask()
            }
        },


        'create.zzh-end-event': {
            group: 'model',
            className: 'icon-custom zzh-end-event',
            title: '创建一个类型为zzh-end-event的任务节点',
            action: {
                dragstart: createEndEvent(),
                click: createEndEvent()
            }
        }
    }
}