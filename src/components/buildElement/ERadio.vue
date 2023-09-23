<template>
  <div class="componentBorder" style="">
    <p style=" padding: 0px 16px;font-weight: 700">{{ attributes.label }}</p>
    <div class="radio-input-wrapper">
      <label v-for="(item,index) in attributes.radioOptions" :key="index" class="label">
        <input :value="item.radioValue" :name="'value-radio' + optionKey" :id="optionKey + '-' + index" class="radio-input" type="radio" v-model="attributes.defaultValue" @change="updateSelectedValue(item.radioValue)">
        <div class="radio-design"></div>
        <div class="label-text">{{ item.radioLabel }}</div>
      </label>
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
  methods: {
    callBack() {
      this.$emit('callBack', this.optionKey)
    },
    updateSelectedValue() {
      this.callBack()
    }
  }
}
</script>

<style scoped>
.componentBorder {
  width: 100%;
  /* border: 2px solid #2c3e50; */
  padding: 8px 0px;
  border-radius: 4px;
  margin: 14px 0px;
  text-align: start;
}

.componentBorder:hover {
  /* border: 2px solid #2881da; */
}


/* MAIN */
/* =============================================== */
.label {
  display: flex;
  align-items: center;
  border-radius: 100px;
  padding: 14px 16px;
  margin: 5px 0;
  cursor: pointer;
  transition: .3s;
}

.label:hover,
.label:focus-within,
.label:active {
  background: hsla(0, 0%, 80%, .14);
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
  width: 22px;
  height: 22px;
  border-radius: 100px;
  background: linear-gradient(to right bottom, hsl(154, 97%, 62%), hsl(225, 97%, 62%));
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

/* 设置-webkit-transform-style为preserve-3d */
.radio-input-wrapper {
  -webkit-transform-style: preserve-3d;
}

/* 或者设置-webkit-backface-visibility为hidden */
.radio-input-wrapper {
  -webkit-backface-visibility: hidden;
}
</style>