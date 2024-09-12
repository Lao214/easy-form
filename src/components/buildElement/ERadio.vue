<template>
  <div class="componentBorder">
    <p style=" padding: 0px 16px;font-weight: 700"><span v-if="attributes.require" style="color: red;">*</span>{{ attributes.label }}</p>
    <div class="radio-input-wrapper">
      <label v-for="(item,index) in attributes.radioOptions" :key="index" :for="optionKey + '-' + index" class="label">
        <input :value="item.label" :name="'value-radio' + optionKey" :id="optionKey + '-' + index" class="radio-input" type="radio" v-model="attributes.defaultValue" @change="updateSelectedValue(item.valu, item.label)">
        <div class="radio-design"></div>
        <div class="label-text">{{ item.label }}</div>
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
    updateSelectedValue(newValue, newLab) {
      this.callBack()
      this.attributes.defaultValue = newValue
      this.attributes.defaultLabel = newLab
      console.log(this.attributes)
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
  margin: .7rem 0px;
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

/* 设置-webkit-transform-style为preserve-3d */
.radio-input-wrapper {
  -webkit-transform-style: preserve-3d;
}

/* 或者设置-webkit-backface-visibility为hidden */
.radio-input-wrapper {
  -webkit-backface-visibility: hidden;
}
</style>