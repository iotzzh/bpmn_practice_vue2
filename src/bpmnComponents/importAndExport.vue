<!--
 * @Author: zzh
 * @Date: 2021-11-25 11:11:17
 * @LastEditors: zzh
 * @LastEditTime: 2021-11-25 15:28:58
 * @FilePath: \vue2-demo\src\bpmnComponents\importAndExport.vue
 * @Description: 新建导入导出
-->
<template>
  <div id="app">
    <div class="container">
      <div class="actions" style="padding-bottom: 10px">
        <el-button
          type="primary"
          size="mini"
          @click.passive="ceateBlankTemplate"
          >新建空白</el-button
        >
        <el-button type="primary" size="mini" @click.passive="createTemplate"
          >新建模板</el-button
        >
        <el-button type="primary" size="mini" @click.passive="openImportXml"
          >导入xml</el-button
        >
        <el-button type="primary" size="mini" @click.passive="exportBpmn"
          >导出bpmn</el-button
        >
        <el-button type="primary" size="mini" @click.passive="exportSvg"
          >导出svg</el-button
        >
        <el-button type="primary" size="mini" @click.passive="alertXml"
          >弹出xml</el-button
        >

        <el-button type="primary" size="mini" @click.passive="destroyBpmn"
          >销毁</el-button
        >
        <a hidden ref="downloadLink"></a>
      </div>
      <!-- 创建一个canvas画布 npmn-js是通过canvas实现绘图的，并设置ref让vue获取到element -->
      <div class="bpmn-canvas" ref="canvas"></div>
    </div>

    <el-dialog
      title="导入xml"
      :visible.sync="modal.show"
      :close="closeImportXml"
    >
      <el-input
        type="textarea"
        v-model="modal.content"
        :autosize="{ minRows: 5, maxRows: 10 }"
      ></el-input>
      <el-button @click="importXml" size="mini" style="float: right"
        >确定</el-button
      >
    </el-dialog>
  </div>
</template>

<script>
import { template as bpmnTemplate } from "../bpmn/static";
import { template as bpmnTemplate1 } from "../bpmn/static1";
import BpmnModeler from "bpmn-js/lib/Modeler";

export default {
  data() {
    return {
      bpmnModeler: null,
      canvas: null,
      bpmnTemplate: bpmnTemplate,
      modal: {
        show: false,
        content: "",
      },
    };
  },

  methods: {
    //#region 新建、销毁
    // 销毁
    async destroyBpmn() {
      this.bpmnModeler && this.bpmnModeler.destroy();
    },

    async init() {
      this.destroyBpmn();

      // 获取画布 element
      this.canvas = this.$refs.canvas;

      // 创建Bpmn对象
      this.bpmnModeler = new BpmnModeler({
        // 设置bpmn的绘图容器
        container: this.canvas,
      });
    },

    // 新建空白模板
    ceateBlankTemplate() {
      this.init();
      this.bpmnModeler.createDiagram();
    },

    async createTemplate() {
      this.init();

      await this.createNewDiagram(bpmnTemplate); //将 图转换成图显示出来
    },

    async createNewDiagram(bpmn) {
      try {
        // console.log(bpmn);
        const result = await this.bpmnModeler.importXML(bpmn);
        const { warnings } = result;
      } catch (err) {
        console.log(err.message, err.warnings);
      }
    },

    //#endregion

    //#region 导入
    openImportXml() {
      this.modal.show = true;
    },

    async importXml() {
      this.modal.show = false;
      await this.init();
      this.createNewDiagram(this.modal.content);
    },

    closeImportXml() {
      this.bpmnTemplate = bpmnTemplate;
      this.modal.show = false;
    },

    //#endregion

    //#region 导出
    // 导出svg格式
    exportSvg() {
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

    // 弹出xml
    alertXml() {
      this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
        if (!err) {
          this.$message.success({
            type: "success",
            message: xml,
            showClose: true,
          });
        }
      });
    },

    // 导出bpmn文件
    exportBpmn() {
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
    //#endregion
  },

  mounted() {
    // this.init();
  },
};
</script>

<style>
html,
body {
  margin: 0px;
  padding: 20px;
}

.el-dialog__header {
  text-align: center;
  font-size: 18px;
  font-weight: bolder;
  border-bottom: 1px solid black;
}

.container {
  width: 100%;
  height: 100%;
}

.bpmn-canvas {
  width: 100%;
  height: 760px;
  box-sizing: border-box;
  border: 1px solid #909090;
}

a[title="Powered by bpmn.io"] {
  display: none;
}
</style>
