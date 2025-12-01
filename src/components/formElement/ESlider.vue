<template>
  <div class="eva-container eva-container-interactive" :class="{ 'active': optionsIndex === optionKey }" @click="callBack">
    <div class="eva-row">
      <label class="eva-label">
        <span v-if="attributes.require" class="eva-required">*</span>{{ attributes.label }}
      </label>
      <input ref="rangeInput" class="sliderInput" type="range" v-model="attributes.defaultValue" :min="attributes.min" :max="attributes.max" :step="attributes.step" />
      <span class="sliderNum">{{ attributes.defaultValue }}</span>
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
  watch: {
    sliderValue(newValue) {
      this.$refs.rangeInput.style.backgroundSize = newValue + '% 100%';
    },
  },
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
};
</script>

<style scoped>
@import '../../assets/global.css';

.sliderNum{
  /* line-height: 50px; */
  width: 60px;
  margin-left: 10px;
  line-height: 44px;
  background: #2c3e50;
  color: white;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}


input[type="range"] { 
    /* margin: auto; */
    -webkit-appearance: none;
    position: relative;
    overflow: hidden;
    height: 40px;
    width: 80%;
    cursor: pointer;
    border-radius: 0; /* iOS */
}

::-webkit-slider-runnable-track {
    background: #ddd;
}

/*
 * 1. Set to 0 width and remove border for a slider without a thumb
 * 2. Shadow is negative the full width of the input and has a spread 
 *    of the width of the input.
 */
::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px; /* 1 */
    height: 40px;
    background: #fff;
    box-shadow: -700px 0 0 700px #2c3e50; /* 2 */
    border: 2px solid #999; /* 1 */
}

::-moz-range-track {
    height: 40px;
    background: #ddd;
}

::-moz-range-thumb {
    background: #fff;
    height: 40px;
    width: 20px;
    border: 3px solid #999;
    border-radius: 0 !important;
    box-shadow: -200px 0 0 200px dodgerblue;
    box-sizing: border-box;
}

::-ms-fill-lower { 
    background: dodgerblue;
}

::-ms-thumb { 
    background: #fff;
    border: 2px solid #999;
    height: 40px;
    width: 20px;
    box-sizing: border-box;
}

::-ms-ticks-after { 
    display: none; 
}

::-ms-ticks-before { 
    display: none; 
}

::-ms-track { 
    background: #ddd;
    color: transparent;
    height: 40px;
    border: none;
}

::-ms-tooltip { 
    display: none;
}
</style>
