<template>
  <div class="componentBorder" style="" @click="callBack">
    <p style=" padding: 0px 16px;font-weight: 700">{{ attributes.label }}</p>
    <ul class="unstyled centered">
      <li v-for="(item,index) in attributes.radioOptions" :key="index" style="margin:10px;">
        <input class="styled-checkbox" :id="'styled-checkbox-' + index" type="checkbox" @change="updateSelectedValue(item.radioValue)" :value="item.radioValue" v-model="attributes.defaultValue">
        <label :for="'styled-checkbox-' + index">{{ item.radioLabel }}</label>
      </li>
    </ul>
    <!-- <button @click="showSelectedOptions">显示选中的选项</button> -->
  </div>
</template>

<script>
export default {
  props: ['optionKey','attributes'],
  data() {
    return {
      selectedOptions: []
    }
  },
  methods: {
    callBack() {
      this.$emit('callBack', this.optionKey)
    },
    updateSelectedValue(newValue) {
      // this.attributes.defaultValue = newValue
      console.log(newValue)
      this.callBack()
    },
    showSelectedOptions() {
      console.log(this.attributes.defaultValue)
    }
  }
}
</script>

<style scoped>
.componentBorder {
  width: 100%;
  border: 2px solid #2c3e50;
  padding: 8px 0px;
  border-radius: 4px;
  margin: 14px 0px;
  text-align: start;
}

.componentBorder:hover {
  border: 2px solid #2881da;
}

.styled-checkbox {
  position: absolute;
  opacity: 0;
}
.styled-checkbox + label {
  position: relative;
  cursor: pointer;
  padding: 0;
}
.styled-checkbox + label:before {
  content: "";
  margin-right: 10px;
  display: inline-block;
  vertical-align: text-top;
  width: 20px;
  height: 20px;
  background: #e7e7e7;
}
.styled-checkbox:hover + label:before {
  background: #f35429;
}
.styled-checkbox:focus + label:before {
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
}
.styled-checkbox:checked + label:before {
  background: #f35429;
}
.styled-checkbox:disabled + label {
  color: #b8b8b8;
  cursor: auto;
}
.styled-checkbox:disabled + label:before {
  box-shadow: none;
  background: #ddd;
}
.styled-checkbox:checked + label:after {
  content: "";
  position: absolute;
  left: 5px;
  top: 9px;
  background: white;
  width: 2px;
  height: 2px;
  box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white, 4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;
  transform: rotate(45deg);
}

.unstyled {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.centered {
  width: 300px;
  margin: 0px 0px 0px 20px;
}
</style>