<!--
 * @Author: zzh
 * @Date: 2021-11-25 10:57:28
 * @LastEditors: zzh
 * @LastEditTime: 2021-11-25 10:58:33
 * @FilePath: \vue2-demo\src\bpmnComponents\onlyRead.vue
 * @Description: 只读
-->
<!--
 * @Author: zzh
 * @Date: 2021-11-25 10:05:32
 * @LastEditors: zzh
 * @LastEditTime: 2021-11-25 10:27:14
 * @FilePath: \vue2-demo\src\bpmnComponents\basic.vue
 * @Description: 基础使用
-->
<template>
  <div id="app">
    <div class="container">
      <!-- 创建一个canvas画布 npmn-js是通过canvas实现绘图的，并设置ref让vue获取到element -->
      <div class="bpmn-canvas" ref="canvas"></div>
    </div>
  </div>
</template>

<script>
import { template as bpmnTemplate } from '../bpmn/static'
import BpmnViewer from 'bpmn-js/lib/Viewer'

export default {
  data() {
    return {
      bpmnViewer: null,
      canvas: null,
      bpmnTemplate: bpmnTemplate
    };
  },

  methods: {
    // 初始化方法
    async init() {
      // 获取画布 element
      this.canvas = this.$refs.canvas;

      // 创建Bpmn对象
      this.bpmnViewer = new BpmnViewer({
        // 设置bpmn的绘图容器
        container: this.canvas,
        keyboard: {
            bindTo: window
        },
      });

      await this.createNewDiagram(this.bpmnTemplate); // 将图转换成图显示出来
    },

    async createNewDiagram(bpmn) {
      // 将字符串转换成图显示出来;
      this.bpmnViewer.importXML(bpmn, err => {
        if (err) {
          this.$Message.error("打开模型出错,请确认该模型符合Bpmn2.0规范");
        }
      });
    },
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
html, body {
    margin: 0px;
    padding: 20px;
}

.container {
    width: 100%;
    height: 100%;
}

.bpmn-canvas {
  width: 100%;
  height: 800px;
  box-sizing: border-box;
  border: 1px solid #909090;
}

a[title="Powered by bpmn.io"] {
    display: none;
}
</style>
