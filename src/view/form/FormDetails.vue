<template>
  <div class="body">
    <el-row>
      <el-col :span="4">
        <div style="height: 95vh;background-color: #d3cfdd79;padding: 11px;overflow-y: scroll;">
              <div class="MenuNodeTitle"> Basic Element</div>
              <div class="MenuBtn" @click="addBasicComponents('Heading','Heading','subHeader')"> <i class="fa fa-header" /> Heading</div>
              <div class="MenuBtn" @click="addBasicComponents('SortText','Your Question','please input your answer in here')"> <i class="fa fa-text-width" /> Sort Text</div>
              <div class="MenuBtn" @click="addBasicComponents('LongText','Your Question','please input your answer in here')"> <i class="fa fa-text-height" /> Long Text</div>
              <div class="MenuBtn" @click="addRadio('eRadio','Your Question','value-2')"> <i class="fa fa-dot-circle-o" /> Radio</div>
              <div class="MenuBtn"> <i class="fa fa-check-square" /> CheckBox</div>
              <div class="MenuBtn"> <i class="fa fa-minus" /> Divider</div>
              <div class="MenuBtn"> <i class="fa fa-star-half-o" /> Score</div>
              <div class="MenuBtn"> <i class="fa fa-map-marker" /> Address</div>
              <div class="MenuBtn"> <i class="fa fa-file-image-o" /> Picture</div>
              <div class="MenuBtn"> <i class="fa fa-calendar" /> Date</div>
              <div class="MenuBtn"> <i class="fa fa-calendar-o" /> DateTime</div>
              <div class="MenuBtn"> <i class="fa fa-caret-square-o-down" /> Selector</div>
              <div class="MenuBtn"> <i class="fa fa-toggle-off" /> Switch</div>
              <el-divider></el-divider>
              <div class="MenuNodeTitle"> Complex Element</div>
              <div class="MenuBtn"> <i class="fa fa-play-circle"/> Video</div>
              <div class="MenuBtn"> <i class="fa fa-sliders"/> Slider</div>
              <div class="MenuBtn"> <i class="fa fa-list"/> List</div>
              <div class="MenuBtn"> <i class="fa fa-list-ol"/> Ordered List</div>
              <div class="MenuBtn"> <i class="fa fa-table"/> Table</div>
              <div class="MenuBtn"> <i class="fa fa-question"/> Yes/No Question</div>
              <el-divider></el-divider>
              <div class="MenuNodeTitle"> Chart Element</div>
              <div class="MenuBtn"> <i class="fa fa-area-chart"/> Area Chart</div>
              <div class="MenuBtn"> <i class="fa fa-bar-chart"/> Bar Chart</div>
              <div class="MenuBtn"> <i class="fa fa-line-chart"/> Line Chart</div>
              <div class="MenuBtn"> <i class="fa fa-pie-chart"/> Pie Chart</div>
              <el-divider></el-divider>
              <div class="MenuNodeTitle"> Business Icon Element</div>
              <div class="MenuBtn"> <i class="fa fa-apple"/> Apple</div>
              <div class="MenuBtn"> <i class="fa fa-twitter"/> Twitter</div>
              <el-divider></el-divider>
        </div>
      </el-col>
      <el-col :span="13">
        <div style="height: 95vh;background-color: #a7ce74;padding: 11px;overflow-y: scroll;">
          <div class="adaptive-div">
            <div>
              <component v-for="(item, index) in items" :key="index" :is="item.component" :attributes="item.attributes" :option-key="index" @callBack="callBack"/>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div style="height: 95vh;background-color: #85848779;padding: 11px;overflow-y: scroll;">
          <div class="opName">
            组件名：{{ this.optionsName }}
            <el-divider></el-divider>
          </div>
          <div class="opInputs">
            组件Key: 
            <input class="opInput" @input="changeKey(optionsKey)" v-model="optionsKey" >
          </div>
          <div class="opInputs">
            组件Label: 
            <input class="opInput" @input="changeLabel(optionsLabel)" v-model="optionsLabel" >
          </div>
          <div class="opInputs">
            组件默认值: 
            <input class="opInput" @input="changeDefaultValue(optionsDefaultValue)" v-model="optionsDefaultValue" >
          </div>
          <div class="opName" v-show="optionsRadio.length > 0">
              选项：
              <el-divider></el-divider>
              <div v-for="(item,index) in optionsRadio" :key="index" style="display: flex;margin-bottom: 7px;font-size: 12px;">
                <label style="line-height: 40px">Label：</label>
                <input class="opInput" v-model="item.radioLabel" style="margin-right: 4px;">
                <label style="line-height: 40px">Value：</label>
                <input class="opInput" v-model="item.radioValue" >
              </div>
              <div style="background: #a7ce74;border-top:4px #222222 solid;" @click="">
                <i class="el-icon-plus"></i>
              </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Heading from '@/components/formElement/Heading.vue'
import SortText from '@/components/formElement/SortText.vue'
import LongText from '@/components/formElement/LongText.vue'
import eRadio from '@/components/formElement/ERadio.vue'

export default {
  components: {
    Heading,
    SortText,
    LongText,
    eRadio
  },
  data() {
    return {
      items: [],
      optionsIndex: '',
      optionsKey: '',
      optionsName: '',
      optionsLabel: '',
      optionsDefaultValue: '',
      optionsRadio: []
    }
  },
  methods: {
    addRadio(name, label, defaultValue) {
      var date = new Date().getTime()
      this.items.push({
        component: name,
        attributes: {
          label: label,
          defaultValue: defaultValue,
          key: 'easy' + date,
          radioOptions: [
            {
              radioLabel: 'CLOUDS',
              radioValue: 'value-2'
            },
            {
              radioLabel: 'EARTH',
              radioValue: 'value-3'
            },
            {
              radioLabel: 'WATER',
              radioValue: 'value-4'
            }
          ]
        }
      })
    },
    addBasicComponents(name, label, defaultValue) {
      var date = new Date().getTime()
      this.items.push({
        component: name,
        attributes: {
          label: label,
          defaultValue: defaultValue,
          key: 'easy' + date,
        }
      })
    },
    callBack(key) {
      console.log(key)
      this.optionsIndex = key
      this.optionsName = this.items[key].component
      this.optionsLabel = this.items[key].attributes.label
      this.optionsDefaultValue = this.items[key].attributes.defaultValue
      this.optionsKey = this.items[key].attributes.key
      if(this.items[key].attributes.radioOptions) {
        this.optionsRadio = this.items[key].attributes.radioOptions
      }
    },
    changeKey(newValue) {
      this.items[this.optionsIndex].attributes.key = newValue
    },
    changeLabel(newValue) {
      this.items[this.optionsIndex].attributes.label = newValue
    },
    changeDefaultValue(newValue) {
      this.items[this.optionsIndex].attributes.defaultValue = newValue
    }
  }
}
</script>

<style scoped>
  .adaptive-div {
    width: 80%; /* 将宽度设置为100%以占据父容器的全部宽度 */
    background-color: #fefefe; /* 设置背景颜色 */
    max-width: 1200px;
    min-height: 400px;
    border-radius: 10px;
    margin: 0 auto;
    padding: 14px;
  }
 .fa{ 
    border: 2px solid #2c3e50;
    width: 27px;
    height: 27px;
    text-align: center;line-height: 27px;
 }
.body {
  background-color: #83bbe86a;
  /* height: 100vh; */
}
.MenuBtn{
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  font-weight: 500;
  text-align: start;
  padding-left: 29px;
}
.MenuBtn:hover { /* background-color: #d3cfdd79; */
  background-color: #0f35546a;
  border-radius: 5px;
}

.MenuNodeTitle {
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  font-weight: 500;
  text-align: start;
  padding-left: 27px;
  margin-bottom: 10px;
}

.opName {
  font-size: 20px;
  font-weight: 600;
}
.opInputs {
  display: flex;
  flex-wrap: wrap;
  font-weight: 600;
  margin:14px 4px;
}
.opInput {
  width: 100%;
  height: 34px;
  border-radius: 4px;
  border: #2c3e50 2px solid;
  background-color: #2c3e5000;
}
</style>