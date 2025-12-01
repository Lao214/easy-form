<template>
  <div class="eva-container">
    <p class="eva-label">{{ attributes.label }}</p>
    <div class="eva-row">
      <div class="eva-col-half">
        <label class="eva-sub-label">{{ attributes.complexAttr[0].complexAttr }}</label>
        <input class="eva-input" @change="callBack" v-model="attributes.complexAttr[0].complexVal">
      </div>
      <div class="eva-col-half">
        <label class="eva-sub-label">{{ attributes.complexAttr[1].complexAttr }}</label>
        <input class="eva-input" @change="callBack" v-model="attributes.complexAttr[1].complexVal">
      </div>
      <div class="eva-col-half">
        <label class="eva-sub-label">{{ attributes.complexAttr[2].complexAttr }}</label>
        <input class="eva-input" @change="callBack" v-model="attributes.complexAttr[2].complexVal">
      </div>
      <div class="eva-col-half">
        <label class="eva-sub-label">{{ attributes.complexAttr[3].complexAttr }}</label>
        <input class="eva-input" @change="callBack" v-model="attributes.complexAttr[3].complexVal">
      </div>
      <div class="eva-col-full">
        <label class="eva-sub-label">{{ attributes.complexAttr[4].complexAttr }}</label>
        <input class="eva-input" @change="callBack" v-model="attributes.complexAttr[4].complexVal">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['optionKey','attributes'],
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
    }
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
  color: var(--label-color);
}
</style>