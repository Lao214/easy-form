<template>
  <div class="eva-container eva-container-interactive" :class="{ 'active': optionsIndex === optionKey }" @click="callBack">
    <label class="eva-label">
      <span v-if="attributes.require" class="eva-required">*</span>{{ attributes.label }}
    </label>
    <div class="checkbox-input-wrapper">
      <label v-for="(item, index) in attributes.radioOptions" :key="index" :for="'checkbox-' + optionKey + '-' + index" class="label">
        <input 
          class="checkbox-input" 
          :id="'checkbox-' + optionKey + '-' + index" 
          type="checkbox" 
          :checked="isSelected(item.label)" 
          @change="updateSelectedValue(item.label, item.valu)" 
          :value="item.label" 
          :disabled="isCheckboxDisabled(item.label)" 
        >
        <div class="checkbox-design"></div>
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
  props: ['optionKey', 'attributes', 'optionsIndex'],
  data() {
    return {
      selectedOptions: {}, // 用来存储选中的复选框
      selectedValu: []
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
    updateSelectedValue(label, valu) {
      // 更新选中状态
      if (this.selectedOptions[label]) {
        // 如果当前已选中，取消选中
        this.$set(this.selectedOptions, label, false)

        // 从 selectedValu 中移除 valu
        const index = this.selectedValu.indexOf(valu)
        if (index > -1) {
          this.selectedValu.splice(index, 1)
        }
      } else {
        // 如果当前未选中，且未达到最大选择限制
        if (Object.values(this.selectedOptions).filter(Boolean).length >= this.attributes.max) {
          return; // 达到最大选择限制，禁止选择
        }

        // 设置为选中状态
        this.$set(this.selectedOptions, label, true)

        // 将 valu 添加到 selectedValu
        this.selectedValu.push(valu)
      }

      // 同步到外部组件
      this.$emit('update:optionsDefaultValue', Object.keys(this.selectedOptions).filter(label => this.selectedOptions[label]))
      // this.$emit('update:optionsDefaultValue', this.selectedValu)

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
@import '../../assets/global.css';

/* Match radio button style */
.label {
  display: flex;
  align-items: center;
  border-radius: .41rem;
  padding: .4rem 1rem;
  margin: .2rem 0;
  cursor: pointer;
  transition: .3s;
}

.label:hover,
.label:focus-within,
.label:active {
  background: hsla(219, 55%, 80%, 0.293);
}

.checkbox-input {
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  height: 1px;
  opacity: 0;
  z-index: -1;
}

/* Square checkbox design instead of circle */
.checkbox-design {
  width: 1rem;
  height: 1rem;
  border-radius: 0.2rem; /* Slightly rounded corners for checkbox */
  background: linear-gradient(to right bottom, hsl(154, 77%, 64%), hsl(225, 97%, 62%));
  position: relative;
}

.checkbox-design::before {
  content: '';
  display: inline-block;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  background: hsl(0, 0%, 90%);
  transform: scale(1.1);
  transition: .3s;
}

.checkbox-input:checked+.checkbox-design::before {
  transform: scale(0);
}

/* Checkmark for checked state */
.checkbox-input:checked+.checkbox-design::after {
  content: '';
  position: absolute;
  left: 0.35rem;
  top: 0.15rem;
  width: 0.25rem;
  height: 0.5rem;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
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

.checkbox-input:checked~.label-text {
  color: hsl(0, 0%, 40%);
}

.checkbox-input:disabled~.label-text {
  color: #b8b8b8;
  cursor: auto;
}

.checkbox-input-wrapper {
  -webkit-transform-style: preserve-3d;
  padding: 0 10px;
}

input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>