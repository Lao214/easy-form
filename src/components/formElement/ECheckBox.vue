<template>
  <div class="componentBorder" :class="{ active: optionsIndex === optionKey }" @click="callBack">
    <p style="padding: 0px 16px; font-weight: 700">
      <span v-if="attributes.require" style="color: red;">*</span>{{ attributes.label }}
    </p>
    <ul class="unstyled centered">
      <li v-for="(item, index) in attributes.radioOptions" :key="index" style="margin:10px;">
        <input 
          class="styled-checkbox" 
          :id="'styled-checkbox-' + optionKey + '-' + index" 
          type="checkbox" 
          :checked="isSelected(item.label)" 
          @change="updateSelectedValue(item.label)" 
          :value="item.label" 
          :disabled="isCheckboxDisabled(item.label)" 
        >
        <label :for="'styled-checkbox-' + optionKey + '-' + index">{{ item.label }}</label>
      </li>
    </ul>
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
  props: ['optionKey', 'attributes', 'optionsIndex'],
  data() {
    return {
      selectedOptions: {} // 用来存储选中的复选框
    }
  },
  watch: {
    'attributes.defaultLabel': {
      handler(newLabels) {
        // 清空现有选中的选项
        this.selectedOptions = {};
        // 将新的选中的选项标记为已选中
        newLabels.forEach(label => {
          this.$set(this.selectedOptions, label, true);
        });
      },
      deep: true,
    }
  },
  computed: {
    remainingSelection() {
      const selectedCount = Object.values(this.selectedOptions).filter(Boolean).length;
      return this.attributes.max - selectedCount;
    },
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
    updateSelectedValue(label) {
      // 更新选中状态
      if (this.selectedOptions[label]) {
        this.$set(this.selectedOptions, label, false)
      } else {
        if (Object.values(this.selectedOptions).filter(Boolean).length >= this.attributes.max) {
          return; // 达到最大选择限制，禁止选择
        }
        this.$set(this.selectedOptions, label, true)
      }

      // 同步到外部组件
      this.$emit('update:defaultLabel', Object.keys(this.selectedOptions).filter(label => this.selectedOptions[label]));

      this.callBack();
    },
    isCheckboxDisabled(value) {
      const selectedCount = Object.values(this.selectedOptions).filter(Boolean).length;
      return selectedCount >= this.attributes.max && !this.selectedOptions[value];
    },
    isSelected(label) {
      return this.selectedOptions[label] || false;
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
  margin: .7rem 0px;
  text-align: start;
  cursor: pointer;
}

.active {
  border:2px solid #ea5524;
}

.componentBorder:hover {
  border:2px solid #ea5524;
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
  background: linear-gradient(to right bottom, hsl(154, 77%, 64%), hsl(225, 97%, 62%));
}
.styled-checkbox:focus + label:before {
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
}
.styled-checkbox:checked + label:before {
  background: linear-gradient(to right bottom, hsl(154, 77%, 64%), hsl(225, 97%, 62%));
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
  width: 91%;
  margin: 0px 0px 0px 20px;
  font-weight: 900;
}

/* 设置-webkit-transform-style为preserve-3d */
input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
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
</style>