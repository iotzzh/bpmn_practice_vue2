<!--
 * @Author: zzh
 * @Date: 2021-11-11 13:17:31
 * @LastEditors: zzh
 * @LastEditTime: 2023-06-08 17:16:57
 * @FilePath: \bpmn_practice_vue2\src\App.vue
 * @Description: 请填写简介
-->
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="基础" name="1">
      <basic></basic>
    </el-tab-pane>

    <el-tab-pane label="带属性栏" name="2">
      <basicPannel></basicPannel>
    </el-tab-pane>

    <el-tab-pane label="只读" name="3">
      <onlyRead></onlyRead>
    </el-tab-pane>

    <el-tab-pane label="导入导出" name="4">
      <importAndExport></importAndExport>
    </el-tab-pane>

    <el-tab-pane label="事件" name="5">
      <event></event>
    </el-tab-pane>

    <el-tab-pane label="自定义工具栏（扩展）" name="6">
      <definePaletteUpdate></definePaletteUpdate>
    </el-tab-pane>

    <el-tab-pane label="自定义工具栏（覆盖）" name="7">
      <definePaletteCover></definePaletteCover>
    </el-tab-pane>

    <el-tab-pane label="自定义Renderer(扩展)" name="8">
      <defineRendererUpdate></defineRendererUpdate>
    </el-tab-pane>

    <el-tab-pane label="自定义Renderer(覆盖)" name="9">
      <defineRendererCover></defineRendererCover>
    </el-tab-pane>

    <!-- <el-tab-pane label="自定义ContextPad(扩展)" name="10">
      <defineContextPadUpdate></defineContextPadUpdate>
    </el-tab-pane>

    <el-tab-pane label="自定义ContextPad(覆盖)" name="11">
      <defineContextPadCover></defineContextPadCover>
    </el-tab-pane> -->

  </el-tabs>
</template>

<script>
import basic from "./bpmnComponents/basic.vue";
import basicPannel from "./bpmnComponents/basicPannel.vue";
import onlyRead from "./bpmnComponents/onlyRead.vue";
import importAndExport from "./bpmnComponents/importAndExport.vue";
import event from "./bpmnComponents/event.vue";
import definePaletteUpdate from "./bpmnComponents/definePaletteUpdate.vue";
import definePaletteCover from "./bpmnComponents/definePaletteCover.vue";
import defineRendererUpdate from './bpmnComponents/defineRendererUpdate.vue';
import defineRendererCover from './bpmnComponents/defineRendererUpdate.vue';
import defineContextPadCover from './bpmnComponents/defineContextPadCover.vue';
import defineContextPadUpdate from './bpmnComponents/defineContextPadUpdate.vue';

export default {
  components: {
    basic,
    basicPannel,
    onlyRead,
    importAndExport,
    event,
    definePaletteUpdate,
    definePaletteCover,
    defineRendererUpdate,
    defineRendererCover,
    defineContextPadUpdate,
    defineContextPadCover
  },
  data() {
    return {
      activeName: "9",
    };
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
