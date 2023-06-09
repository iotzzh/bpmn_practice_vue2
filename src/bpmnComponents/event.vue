<!--
 * @Author: zzh
 * @Date: 2021-11-25 15:38:20
 * @LastEditors: zzh
 * @LastEditTime: 2021-11-25 16:34:15
 * @FilePath: \vue2-demo\src\bpmnComponents\event.vue
 * @Description: 事件
-->
<template>
  <div id="app">
    <div class="container">
      <el-row :gutter="10">
        <el-col :span="16">
          <!-- 创建一个canvas画布 npmn-js是通过canvas实现绘图的，并设置ref让vue获取到element -->
          <div class="bpmn-canvas" ref="canvas"></div>
        </el-col>
        <el-col :span="8">
          <div
            style="
              width: 100%;
              height: 800px;
              overflow: auto;
              border: 1px solid #909090;
              box-sizing: border-box;
              white-space: pre-line;
              padding: 0px 10px;
              word-break: break-all;
            "
          >
            {{ log }}
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { template as bpmnTemplate } from "../bpmn/static";
import BpmnModeler from "bpmn-js/lib/Modeler";

export default {
  data() {
    return {
      bpmnModeler: null,
      canvas: null,
      bpmnTemplate: bpmnTemplate,
      log: "log: \n",
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
      });

      this.addModelerListener();
      this.addEventBusListener();

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

    // 监听modeler并绑定事件
    addModelerListener() {
      const bpmnjs = this.bpmnModeler;
      const that = this;
      // 这里我是用了一个forEach给modeler上添加要绑定的事件
      const events = [
        "shape.added",
        "shape.move.end",
        "shape.removed",
        "connect.end",
        "connect.move",
      ];
      events.forEach(function (event) {
        that.bpmnModeler.on(event, (e) => {
          that.log =
            that.log +
            `event: ${JSON.stringify(event)}:: \n e: ${JSON.stringify(e)} \n\n`;
          var elementRegistry = bpmnjs.get("elementRegistry");
          var shape = e.element ? elementRegistry.get(e.element.id) : e.shape;
          that.log = that.log + `shape::\n ${JSON.stringify(shape)} \n\n`;
        });
      });
    },

    // 监听element并绑定事件
    addEventBusListener() {
      let that = this;
      const eventBus = this.bpmnModeler.get("eventBus"); // 需要使用eventBus
      const eventTypes = ["element.click", "element.changed"]; // 需要监听的事件集合
      eventTypes.forEach(function (eventType) {
        eventBus.on(eventType, function (e) {
          if (!e || e.element.type == "bpmn:Process") return; // 这里我的根元素是bpmn:Process
          that.log = that.log + `name: ${e.gfx.textContent}, id: ${e.element.id} \n\n`;
        });
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