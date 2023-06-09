<!--
 * @Author: zzh
 * @Date: 2021-11-25 10:06:02
 * @LastEditors: zzh
 * @LastEditTime: 2021-11-25 12:51:09
 * @FilePath: \vue2-demo\src\bpmnComponents\origin.vue
 * @Description: 请填写简介
-->
<template>
  <div id="app">
    <div class="container bpmn-color">
      <!-- 创建一个canvas画布 npmn-js是通过canvas实现绘图的，并设置ref让vue获取到element -->
      <div class="bpmn-canvas" ref="canvas"></div>

      <!-- 工具栏显示的地方 -->
      <!-- <div class="bpmn-js-properties-panel" id="js-properties-panel"></div> -->

      <!-- 把操作按钮写在这里面 -->
      <!-- <div class="action">
        <el-upload action class="upload-demo" :before-upload="openBpmn">
          <el-button icon="el-icon-folder-opened"></el-button>
        </el-upload>
        <el-button class="new" icon="el-icon-circle-plus" @click="newDiagram"></el-button>
        <el-button icon="el-icon-download" @click="downloadBpmn"></el-button>
        <el-button icon="el-icon-picture" @click="downloadSvg"></el-button>

        <a hidden ref="downloadLink"></a>
      </div> -->
    </div>
  </div>
</template>

<script>
import { template as bpmnTemplate } from './bpmn/static'
import BpmnModeler from "bpmn-js/lib/Modeler";
// 工具栏相关
// import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
// import propertiesPanelModule from "bpmn-js-properties-panel";
// import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";

export default {
  data() {
    return {
      bpmnModeler: null,
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
      this.bpmnModeler = new BpmnModeler({
        // 设置bpmn的绘图容器
        container: this.canvas,

        // 加入工具栏支持
        // propertiesPanel: {
        //   parent: "#js-properties-panel"
        // },

        // additionalModules: [propertiesProviderModule, propertiesPanelModule],
        // moddleExtensions: {
        //   camunda: camundaModdleDescriptor
        // }
      });

      await this.createNewDiagram(this.bpmnTemplate); // 将图转换成图显示出来
    },

    async createNewDiagram(bpmn) {
      // 将字符串转换成图显示出来;
      this.bpmnModeler.importXML(bpmn, err => {
        if (err) {
          this.$Message.error("打开模型出错,请确认该模型符合Bpmn2.0规范");
        }
      });
    },




    newDiagram() {
      this.createNewDiagram(this.bpmnTemplate);
    },

    downloadBpmn() {
      this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
        if (!err) {
          console.log(xml);
          // 获取文件名
          const name = `${this.getFilename(xml)}.bpmn`;
          // 将文件名以及数据交给下载方法
          this.download({ name: name, data: xml });
        }
      });
    },
    downloadSvg() {
      this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
        if (!err) {
          // 获取文件名
          const name = `${this.getFilename(xml)}.svg`;

          // 从建模器画布中提取svg图形标签
          let context = "";
          const djsGroupAll = this.$refs.canvas.querySelectorAll(".djs-group");
          for (let item of djsGroupAll) {
            context += item.innerHTML;
          }
          // 获取svg的基本数据，长宽高
          const viewport = this.$refs.canvas
            .querySelector(".viewport")
            .getBBox();

          // 将标签和数据拼接成一个完整正常的svg图形
          const svg = `
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="${viewport.width}"
              height="${viewport.height}"
              viewBox="${viewport.x} ${viewport.y} ${viewport.width} ${viewport.height}"
              version="1.1"
              >
              ${context}
            </svg>
          `;
          // 将文件名以及数据交给下载方法
          this.download({ name: name, data: svg });
        }
      });
    },

    openBpmn(file) {
      const reader = new FileReader();
      // 读取File对象中的文本信息，编码格式为UTF-8
      reader.readAsText(file, "utf-8");
      reader.onload = () => {
        //读取完毕后将文本信息导入到Bpmn建模器
        this.createNewDiagram(reader.result);
      };
      return false;
    },

    getFilename(xml) {
      let start = xml.indexOf("process");
      let filename = xml.substr(start, xml.indexOf(">"));
      filename = filename.substr(filename.indexOf("id") + 4);
      filename = filename.substr(0, filename.indexOf('"'));
      return filename;
    },

    download({ name = "diagram.bpmn", data }) {
      // 这里就获取到了之前设置的隐藏链接
      const downloadLink = this.$refs.downloadLink;
      // 把输就转换为URI，下载要用到的
      const encodedData = encodeURIComponent(data);

      if (data) {
        // 将数据给到链接
        downloadLink.href =
          "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
        // 设置文件名
        downloadLink.download = name;
        // 触发点击事件开始下载
        downloadLink.click();
      }
    },
  },
  mounted() {
    this.init();
  }
};
</script>

<style>

.bpmn-canvas {
  width: 100%;
  height: 100vh;
}

.action {
  position: fixed;
  bottom: 10px;
  left: 10px;
  display: flex;
}
.upload-demo {
  margin-right: 10px;
}

.bpmn-js-properties-panel {
  position: absolute;
  top: 0;
  right: 0px;
  width: 300px;
}

.bpmn-color .bpmn-icon-start-event-none:before {
  color: #12c2e9;
}
.bpmn-color .bpmn-icon-task:before {
  color: #c471ed;
}
.bpmn-color .bpmn-icon-end-event-none:before {
  color: #f64f59;
}
</style>
