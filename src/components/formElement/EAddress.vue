<template>
  <div class="eva-container eva-container-interactive" :class="{ 'active': optionsIndex === optionKey }" @click="callBack">
    <p class="eva-label">
      <span v-if="attributes.require" class="eva-required">*</span>{{ attributes.label }}
    </p>
    <div class="eva-row" style="flex-wrap: wrap;">
      <div class="eva-col-half">
        <label class="eva-sub-label">{{ attributes.complexAttr[0].complexAttr }}</label>
        <input class="eva-input" v-model="attributes.complexAttr[0].complexVal">
      </div>
      <div class="eva-col-half">
        <label class="eva-sub-label">{{ attributes.complexAttr[1].complexAttr }}</label>
        <input class="eva-input" v-model="attributes.complexAttr[1].complexVal">
      </div>
      <div class="eva-col-half">
        <label class="eva-sub-label">{{ attributes.complexAttr[2].complexAttr }}</label>
        <input class="eva-input" v-model="attributes.complexAttr[2].complexVal">
      </div>
      <div class="eva-col-half">
        <label class="eva-sub-label">{{ attributes.complexAttr[3].complexAttr }}</label>
        <input class="eva-input" v-model="attributes.complexAttr[3].complexVal">
      </div>
      <div class="eva-col-full">
        <label class="eva-sub-label">{{ attributes.complexAttr[4].complexAttr }}</label>
        <input class="eva-input" style="width: 95%;" v-model="attributes.complexAttr[4].complexVal">
      </div>
    </div>
    <span v-show="optionKey === optionsIndex" class="eva-btn-float eva-btn-copy" @click.stop="copyThis()">
      <i class="el-icon-document-copy"></i>
    </span>
    <span v-show="optionKey === optionsIndex" class="eva-btn-float eva-btn-delete" @click.stop="delThis()">
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
  created() {
    // console.log(this.attributes.complexAttr[0].complexAttr1)
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

<style scoped>
@import '../../assets/global.css';

.eva-col-half {
  width: 50%;
  display: flex;
  flex-wrap: wrap;
}

.eva-col-full {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.eva-sub-label {
  margin-left: 9px;
  margin-bottom: 1px;
  font-weight: 600;
  width: 90%;
  font-size: 12px;
}
</style>