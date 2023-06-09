<!--
 * @Author: zzh
 * @Date: 2021-11-25 10:30:14
 * @LastEditors: zzh
 * @LastEditTime: 2021-11-25 10:53:21
 * @FilePath: \vue2-demo\src\bpmnComponents\basicPannel.vue
 * @Description: 基础：左侧工具栏
-->

<template>
  <div id="app">
    <div class="container">
      <!-- 创建一个canvas画布 npmn-js是通过canvas实现绘图的，并设置ref让vue获取到element -->
      <div class="bpmn-canvas" ref="canvas"></div>

      <!-- 工具栏显示的地方 -->
      <div class="bpmn-js-properties-panel" id="js-properties-panel"></div>
    </div>
  </div>
</template>

<script>
import { template as bpmnTemplate } from "../bpmn/static";
import BpmnModeler from "bpmn-js/lib/Modeler";
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

        //添加控制板
        propertiesPanel: {
          parent: "#js-properties-panel",
        },
        
        additionalModules: [
          
          // 右边的工具栏以及节点
          propertiesProviderModule,
          propertiesPanelModule,
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

/* 右侧面板样式 */
.bpmn-js-properties-panel {
  position: absolute;
  top: 5px;
  right: 5px;
  /* width: 300px; */
}

.bpmn-js-properties-panel #camunda-id {
    width: 90%;
}

.bpmn-js-properties-panel #camunda-versionTag {
    width: 90%;
}

/* 移除广告图标 */
a[title="Powered by bpmn.io"] {
  display: none;
}
</style>

