<template>
  <div class="componentBorder" :class="optionsIndex === optionKey ? 'active' : ''" @click="callBack">
    <p style=" padding: 0px 16px;font-weight: 700"><span v-if="attributes.require" style="color: red;">*</span>{{ attributes.label }}</p>
    <el-rate :max="attributes.max" v-model="attributes.defaultValue" :icons="attributes.radioOptions" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" style="margin:10px 20px;"></el-rate>
    <span v-show="optionKey === optionsIndex" class="floating-btn" @click="copyThis()">
      <i class="el-icon-document-copy"></i>
    </span>
    <span v-show="optionKey === optionsIndex" class="floating-del-btn" @click="delThis()">
      <i class="el-icon-delete"></i>
    </span>
 </div>
</template>

<script>
export default {
  props: ['optionKey','attributes','optionsIndex'],
  data() {
    return {

    }
  },
  methods: {
    callBack() {
      this.$emit('callBack', this.optionKey)
    },
    delThis() {
      this.$emit('delThis', this.optionKey)
    },
    copyThis() {
      this.$emit('copyThis', this.optionKey)
    },
  }
}
</script>

<style>
.componentBorder {
  width: 100%;
  border: 2px solid #2c3e50;
  padding: 8px 0px;
  border-radius: 4px;
  margin: .7rem 0px;
  text-align: start;
  cursor: pointer;
  position: relative;
}

.active {
  border:2px solid #ea5524;
}

.componentBorder:hover {
  border:2px solid #ea5524;
}

.floating-del-btn {
    position: absolute;
    right: -2.3rem;
    top: 2.4rem;
    width: 2rem;
    height: 2rem;
    background: #c91414;
    color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.floating-btn {
    position: absolute;
    right: -2.3rem;
    top: 0;
    width: 2rem;
    height: 2rem;
    background: #383333;
    color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 自定义el-rate图标大小 */
.el-rate .el-rate__item i{
  font-size: 24px; /* 调整图标的大小为24像素，根据需要进行调整 */
}

</style>