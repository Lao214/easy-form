<template>
  <div class="eva-container eva-container-interactive" :class="{ 'active': optionsIndex === optionKey }" @click="callBack">
    <label class="eva-label">
      <span v-if="attributes.require" class="eva-required">*</span>{{ attributes.label }}
    </label>
    <div class="radio-input-wrapper">
      <label v-for="(item,index4) in attributes.radioOptions" :key="'kk' + index4" class="label">
        <input :value="item.label" :name="'value-radio' + optionKey" :id="optionKey + '-' + index4" class="radio-input" type="radio" v-model="attributes.defaultLabel" @change="updateSelectedValue(item.valu, item.label)">
        <div class="radio-design"></div>
        <div class="label-text">{{ item.label }}</div>
      </label>
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
    updateSelectedValue(newValue, newLab) {
      this.attributes.defaultValue = newValue
      this.$set(this.attributes, 'defaultLabel', newLab);

      this.callBack()
    }
  }
}
</script>

<style scoped>
@import '../../assets/global.css';

/* MAIN */
/* =============================================== */
.label {
  display: flex;
  align-items: center;
  border-radius: .41rem;
  padding: .4rem 1rem ;
  margin: .2rem 0;
  cursor: pointer;
  transition: .3s;
}

.label:hover,
.label:focus-within,
.label:active {
  background: hsla(219, 55%, 80%, 0.293);
}

.radio-input {
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  height: 1px;
  opacity: 0;
  z-index: -1;
}

.radio-design {
  width: 1rem;
  height: 1rem;
  border-radius: 100px;
  background: linear-gradient(to right bottom, hsl(154, 77%, 64%), hsl(225, 97%, 62%));
  position: relative;
}

.radio-design::before {
  content: '';
  display: inline-block;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  background: hsl(0, 0%, 90%);
  transform: scale(1.1);
  transition: .3s;
}

.radio-input:checked+.radio-design::before {
  transform: scale(0);
}

.label-text {
  color: hsl(0, 0%, 60%);
  margin-left: 14px;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 900;
  transition: .3s;
}

.radio-input:checked~.label-text {
  color: hsl(0, 0%, 40%);
}

.radio-input-wrapper {
  -webkit-transform-style: preserve-3d;
  padding: 0 10px;
}
</style>