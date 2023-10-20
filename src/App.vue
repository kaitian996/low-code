<template>
  <div class="view" @click.stop="selectedSche = {}">
    <!--  -->
    <div class="header">
      <el-button type="primary">出码</el-button>
    </div>
    <!--  -->
    <div class="box">
      <div class="left-editor">
        <div class="schema-block" v-for="item in schema" :key="item.group">
          <div class="schema-title">
            {{ item.group }}
          </div>
          <div class="schema-components">
            <div class="schema-item" v-for="target in item.components" :key="target.code" draggable="true"
              @dragstart="(e: DragEvent) => onDrag(e, target)">
              {{ target.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="content-editor">
        <template v-for="item in pageSchema" :key="item.uuid">
          <!-- 页面容器 -->
          <component @click.stop="clickSche(item)" :class="selectedSche.uuid === item.uuid ? 'schema-selected' : ''"
            :is="item.code" :style="item.style" @dragover="onDragOver" @drop.stop="(e: DragEvent) => onDrop(e, item)">
            <template v-for="item2 in item.children" :key="item2.uuid">
              <!-- 页面的一层子 -->
              <component @click.stop="clickSche(item2)" :class="selectedSche.uuid === item2.uuid ? 'schema-selected' : ''"
                :is="item2.code" :src="item2.props?.src || ''" :style="item2.style" @dragover="onDragOver"
                @drop.stop="(e: DragEvent) => onDrop(e, item2)">
                <template v-if="item2.text">
                  {{ item2.text }}
                </template>
                <template v-for="item3 in item2.children" :key="item3.uuid">
                  <!-- 页面的二层子 -->
                  <component @click.stop="clickSche(item3)"
                    :class="selectedSche.uuid === item3.uuid ? 'schema-selected' : ''" :is="item3.code"
                    :src="item3.props?.src || ''" :style="item3.style" @dragover="onDragOver"
                    @drop.stop="(e: DragEvent) => onDrop(e, item3)">
                    <template v-if="item3.text">
                      {{ item3.text }}
                    </template>
                    <template v-for="item4 in item3.children" :key="item3.uuid">
                      <!-- 页面的三层子 -->
                      <component @click.stop="clickSche(item4)"
                        :class="selectedSche.uuid === item4.uuid ? 'schema-selected' : ''" :is="item4.code"
                        :src="item4.props?.src || ''" :style="item4.style" @dragover="onDragOver"
                        @drop.stop="(e: DragEvent) => onDrop(e, item4)">
                        <template v-if="item4.text">
                          {{ item4.text }}
                        </template>
                      </component>
                    </template>
                  </component>
                </template>
              </component>
            </template>
          </component>
        </template>
      </div>
      <div class="right-editor">

      </div>
    </div>
  </div>
</template>
 
 
<script lang='ts' setup>
import { schema } from './index';
import { ref, watch } from 'vue'
// 开始拖拽的元素
const dragSche = ref<typeof schema[0]['components'][0]>()
// 点击选择
const selectedSche = ref<typeof schema[0]['components'][0]>({})
const clickSche = (sche: any) => {
  selectedSche.value = sche
}
const onDrag = (e: DragEvent, sche: typeof schema[0]['components'][0]) => {
  console.log('拖动', sche);
  dragSche.value = sche
}
const onDragOver = (e: DragEvent) => {
  e.preventDefault()
  e.dataTransfer.dropEffect = "move";
  console.log("over");
}
const onDrop = (e: DragEvent, parent: any) => {
  e.preventDefault()
  let contaner = null
  let dropElement = null
  // 这个元素是否能放置
  if (parent.drop) {
    console.log('放置', parent);
    uuid++
    dropElement = {
      uuid,
      parent,
      children: [],
      ...dragSche.value
    }
    parent.children.push(dropElement)
    contaner = parent
    console.log("放置完成", parent);
  } else {
    // 找到最上面一个能放置的父元素
    let top = parent.parent
    while (!top.drop) top = top.parent
    console.log('当前元素不可放置，放置上层最近的可放置的元素', top);
    uuid++
    dropElement = {
      uuid,
      parent,
      children: [],
      ...dragSche.value
    }
    top.children.push(dropElement)
    console.log("放置完成", top);
    contaner = top
    top = null
  }
  if (contaner) {
    switch (contaner.code) {
      case 'div':
        if (contaner.parent) {
          // 去除默认的样式
          contaner.style = {}
          contaner.text = ''
        }
        break;

      default:
        break;
    }
  }
  clickSche(dropElement)
  dragSche.value = undefined
  dropElement = null
}
let uuid = 0
const pageSchema = ref([{
  name: "页面容器",
  code: "div",
  props: {},
  uuid: 0,
  parent: null,
  drop: true,
  style: {
    width: "calc(100% - 2px)",
    height: "calc(100% - 2px)",
  },
  children: []
}])

</script>
 
<style scoped>
.view {
  width: 100%;
  height: 100vh;
  background-color: #edeff3;
}

.header {
  display: flex;
  align-items: center;
  background-color: #fff;
  height: 50px;
  box-sizing: border-box;
  padding-left: 20px;
}

.box {
  margin-top: 1px;
  height: calc(100% - 51px);
  display: flex;
}

.left-editor {
  height: 100%;
  width: 250px;
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
}

.schema-block {
  margin-top: 10px;
}

.schema-title {
  font-family: PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: rgba(0, 0, 0, .6);
  line-height: 20px;
}

.schema-components {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}

.schema-item {
  width: 110%;
  margin: 5px 5px 0 0;
  width: 110px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: 12px;
  color: #171a1d;
  letter-spacing: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
  border: 1px solid #e5e6e8;
  border-radius: 6px;
  cursor: pointer;
}

.schema-item:hover {
  color: #0089ff;
  border-color: #0089ff;
}

.content-editor {
  flex: 1;
  background-color: #fff;
  margin: 16px;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 5px;
}

.schema-selected {
  border: 1px solid #006cff !important;
}

.right-editor {
  width: 300px;
  height: 100%;
  background-color: #fff;
}
</style>