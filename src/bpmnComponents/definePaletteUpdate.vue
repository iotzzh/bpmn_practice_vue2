<!--
 * @Author: zzh
 * @Date: 2021-11-25 17:24:33
 * @LastEditors: zzh
 * @LastEditTime: 2021-11-26 11:02:52
 * @FilePath: \vue2-demo\src\bpmnComponents\definePaletteUpdate.vue
 * @Description: 自定义面板 : 在`bpmn.js`默认提供的`Palette`上进行修改(或者新增新的项)
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
import { template as bpmnTemplate } from "../bpmn/static";
import BpmnModeler from "bpmn-js/lib/Modeler";
import customModule from "../custom";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
import propertiesPanelModule from "bpmn-js-properties-panel"; // 右侧工具栏

export default {
  data() {
    return {
      bpmnModeler: null,
      canvas: null,
      bpmnTemplate: bpmnTemplate,
    };
  },

  methods: {
    // 初始化方法
    async init() {
      // 获取画布 element
      this.canvas = this.$refs.canvas;

      // 创建Bpmn对象
      this.bpmnModeler = new BpmnModeler({
        // 设置bpmn的绘图容器
        container: this.canvas,

        additionalModules: [
          // 左边工具栏以及节点
          propertiesProviderModule,
          // 自定义的节点
          customModule,
        ],
      });

      await this.createNewDiagram(this.bpmnTemplate); // 将图转换成图显示出来
    },

    async createNewDiagram(bpmn) {
      // 将字符串转换成图显示出来;
      this.bpmnModeler.importXML(bpmn, (err) => {
        if (err) {
          this.$Message.error("打开模型出错,请确认该模型符合Bpmn2.0规范");
        }
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
html,
body {
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