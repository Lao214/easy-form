<template>
  <div class="body">
    <el-row>
      <el-col :span="4">
        <div style="height: 95vh;background-color: #d3cfdd79;padding: 11px;overflow-y: scroll;">
          <div class="checkbox-wrapper-10">
            <input checked="" type="checkbox" id="cb5" class="tgl tgl-flip" v-model="isChecked">
            <label for="cb5" data-tg-on="组件" data-tg-off="功能" class="tgl-btn"></label>
          </div>
          <div v-show="!isChecked" style="padding: 10px;">
            <div class="MenuBtn" style="margin:20px auto;" @click="gotoRelease()"> <i class="fa fa-send" /> Release</div>
            <!-- <div class="MenuBtn"> <i class="fa fa-lightbulb-o" /> Logic</div> -->
            <div class="MenuBtn" style="margin:20px auto;"> <i class="fa fa-meh-o" /> Feedback</div>
            <div class="MenuBtn" style="margin:20px auto;"> <i class="fa fa-table" /> Data Sheets</div>
            <div class="MenuBtn" style="margin:20px auto;"> <i class="fa fa-bar-chart" /> Data Chart</div>
            <div class="MenuBtn" style="margin:20px auto;"> <i class="fa fa-mobile" /> Mobile Preview</div>
          </div>
          <div v-show="isChecked">
            <div class="MenuNodeTitle"> Basic Element </div>
            <div class="MenuBtn" @click="addBasicComponents('Heading','Heading','subHeader')"> <i class="fa fa-header" /> Heading</div>
            <div class="MenuBtn" @click="addBasicComponents('eDescription','Description','write something please')"> <i class="fa fa-file-text-o" /> Description</div>
            <div class="MenuBtn" @click="addBasicComponents('SortText','Your Question','please input your answer in here')"> <i class="fa fa-text-width" /> Sort Text</div>
            <div class="MenuBtn" @click="addBasicComponents('LongText','Your Question','please input your answer in here')"> <i class="fa fa-text-height" /> Long Text</div>
            <div class="MenuBtn" @click="addRadio('eRadio','Your Question','value-2')"> <i class="fa fa-dot-circle-o" /> Radio</div>
            <div class="MenuBtn" @click="addRadio('eCheckBox','Your Question', ['value-1','value-2'])"> <i class="fa fa-check-square" /> CheckBox</div>
            <div class="MenuBtn" @click="addBasicComponents('eDivider','divider2023', '#a7ce74')"> <i class="fa fa-minus" /> Divider</div>
            <div class="MenuBtn" @click="addStar('eStar','Your Question', 0)"> <i class="fa fa-star-half-o" /> Score</div>
            <div class="MenuBtn" @click="addComplexComponents('eAddress','address','',addressArray)"> <i class="fa fa-map-marker" /> Address</div>
            <div class="MenuBtn" @click="addBasicComponents('ePicture','picture','https://cdn.pixabay.com/photo/2013/03/06/01/01/water-90781_1280.jpg')"> <i class="fa fa-file-image-o" /> Picture</div>
            <div class="MenuBtn" @click="addBasicComponents('eDate','date','2018-10-10')"> <i class="fa fa-calendar" /> Date</div>
            <!-- <div class="MenuBtn"> <i class="fa fa-calendar-o" /> DateTime</div> -->
            <div class="MenuBtn" @click="addRadio('eSelector','Your Question','value-2')"> <i class="fa fa-caret-square-o-down" /> Selector</div>
            <!-- <div class="MenuBtn"> <i class="fa fa-toggle-off" /> Switch</div> -->
            <!-- <div class="MenuBtn"> <i class="fa fa-envelope-o" /> Email</div> -->
            <el-divider></el-divider>
            <div class="MenuNodeTitle"> Complex Element</div>
            <!-- <div class="MenuBtn"> <i class="fa fa-play-circle"/> Video</div> -->
            <div class="MenuBtn" @click="addSlider('eSlider','Slider',0)"> <i class="fa fa-sliders"/> Slider</div>
            <!-- <div class="MenuBtn"> <i class="fa fa-list"/> List</div>
            <div class="MenuBtn"> <i class="fa fa-list-ol"/> Ordered List</div>
            <div class="MenuBtn"> <i class="fa fa-table"/> Table</div>
            <div class="MenuBtn"> <i class="fa fa-question"/> Yes/No Question</div> -->
            <!-- <el-divider></el-divider>
            <div class="MenuNodeTitle"> Chart Element</div>
            <div class="MenuBtn"> <i class="fa fa-area-chart"/> Area Chart</div>
            <div class="MenuBtn"> <i class="fa fa-bar-chart"/> Bar Chart</div>
            <div class="MenuBtn"> <i class="fa fa-line-chart"/> Line Chart</div>
            <div class="MenuBtn"> <i class="fa fa-pie-chart"/> Pie Chart</div>
            <el-divider></el-divider>
            <div class="MenuNodeTitle"> Business Icon Element</div>
            <div class="MenuBtn"> <i class="fa fa-apple"/> Apple</div>
            <div class="MenuBtn"> <i class="fa fa-twitter"/> Twitter</div>
            <el-divider></el-divider> -->
          </div>
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
          <div class="opInputs">
            <el-button @click="saveForm()" style="width: 100%;font-weight: 700;" type="success">SAVE</el-button>
          </div>
          <div v-show="isChecked">
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
              <input v-show="optionsName != 'eCheckBox'" class="opInput" @input="changeDefaultValue(optionsDefaultValue)" v-model="optionsDefaultValue" >
              <el-select v-show="optionsName === 'eCheckBox'" style="width: 100%;color: #2c3e50;" @change="changeDefaultValue(optionsDefaultValue)" v-model="optionsDefaultValue" multiple placeholder="请选择">
                <el-option v-for="item in optionsRadio" :key="item.radioValue" :label="item.radioLabel" :value="item.radioValue">
                </el-option>
              </el-select>
            </div>
            <div class="opInputs">
              组件最大值: 
              <input class="opInput" placeholder="请输入整数" @input="changeMaxValue(optionsMaxValue)" v-model="optionsMaxValue" >
            </div>
            <div class="opInputs">
              组件最小值: 
              <input class="opInput" placeholder="请输入整数" @input="changeMinValue(optionsMinValue)" v-model="optionsMinValue" >
            </div>
            <div class="opInputs" v-show="optionsStepValue">
              组件步值: 
              <input class="opInput" placeholder="请输入整数" @input="changeStepValue(optionsStepValue)" v-model="optionsStepValue" >
            </div>
            <div class="opInputs">
              <el-button @click="delComponents()" style="width: 100%;" type="danger"><i class="el-icon-delete"></i></el-button>
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
              <div style="background: #a7ce74;border-top:4px #222222 solid;cursor: pointer;" @click="addRadioOptions()">
                <i class="el-icon-plus"></i>
              </div>
            </div>
            <div class="opName" v-show="optionsAttr.length > 0">
              选项：
              <el-divider></el-divider>
              <div v-for="(item,index) in optionsAttr" :key="index" style="display: flex;margin-bottom: 7px;font-size: 12px;">
                <label style="line-height: 40px">Label：</label>
                <input class="opInput" v-model="item.complexAttr" style="margin-right: 4px;">
                <label style="line-height: 40px">Value：</label>
                <input class="opInput" v-model="item.complexVal" >
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>


    <el-dialog title="删除" :visible.sync="dialogVisible" width="60%">
      <span style="font-size: 20px;font-weight: 700;">是否确认删除第 {{ optionsIndex+1 }} 个组件，组件Key值为 {{ optionsKey }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelCom()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Heading from '@/components/formElement/Heading.vue'
import SortText from '@/components/formElement/SortText.vue'
import LongText from '@/components/formElement/LongText.vue'
import eRadio from '@/components/formElement/ERadio.vue'
import eCheckBox from '@/components/formElement/ECheckBox.vue'
import eDivider from '@/components/formElement/EasyDivider.vue'
import eStar from '@/components/formElement/EStar.vue'
import eAddress from '@/components/formElement/EAddress.vue'
import ePicture from '@/components/formElement/EPicture.vue'
import eDate from '@/components/formElement/EDate.vue'
import eSelector from '@/components/formElement/ESelector.vue'
import eSlider from '@/components/formElement/ESlider.vue'
import eDescription from '@/components/formElement/EDescription.vue'
import formApi from '@/api/formApi'

export default {
  components: {
    Heading,
    SortText,
    LongText,
    eRadio,
    eCheckBox,
    eDivider,
    eStar,
    eAddress,
    ePicture,
    eDate,
    eSelector,
    eSlider,
    eDescription
  },
  data() {
    return {
      one: {},
      isChecked: true,
      items: [],
      optionsIndex: '',
      optionsKey: '',
      optionsName: '',
      optionsLabel: '',
      optionsDefaultValue: '',
      optionsMaxValue: '',
      optionsMinValue: '',
      optionsStepValue: '',
      optionsRadio: [],
      optionsAttr: [],
      dialogVisible: false,
      addressArray: [
        {
          'complexAttr':'国家/地区',
          'complexVal': '中国',
        },
        {
          'complexAttr': '省市',
          'complexVal': '广西',
        },
        {
          'complexAttr': '城市',
          'complexVal': '柳州',
        },
        {
          'complexAttr': '区/县',
          'complexVal': '城中区',
        },
        {
          'complexAttr': '详细地址',
          'complexVal': '广西科技大学',
        }
      ]
    }
  },
  created() {
    this.getFormByKey()
  },
  methods: {
    gotoRelease() {
      this.$router.push({ path: '/release', query: { key: this.$route.query.key } })
    },
    getFormByKey() {
      formApi.getFormByKey(this.$route.query.key).then(res => {
         if(res.data.code === 200) {
          this.one = res.data.data.one
          if(res.data.data.one.formItems) {
            this.items = JSON.parse(res.data.data.one.formItems)
          }
         }
      })
    },
    saveForm() {
      const bForm = {
        formKey: this.$route.query.key,
        formItems: JSON.stringify(this.items)
      }
      formApi.updateForm(bForm).then(res => {
        if(res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        }
      })
    },
    delComponents() {
      if(!this.optionsKey) {
        this.$message({
          type: 'info',
          message: '请选择一个组件'
        })
      } else if (this.optionsKey) {
         this.dialogVisible = true
      }
    },
    confirmDelCom() {
      this.items.splice(this.optionsIndex,1)
      this.optionsIndex = ''
      this.optionsKey = ''
      this.optionsName = '',
      this.optionsLabel = '',
      this.optionsDefaultValue = '',
      this.optionsMaxValue = '',
      this.optionsMinValue = '',
      this.optionsStepValue = '',
      this.optionsRadio = [],
      this.optionsAttr = [],
      this.dialogVisible = false
    },
    addRadioOptions() {
      if(this.optionsKey) {
        var length = this.items[this.optionsIndex].attributes.radioOptions.length + 1
        this.items[this.optionsIndex].attributes.radioOptions.push({
          radioLabel: 'HELLO',
          radioValue: 'value' + '-' + length
        })
      }
    },
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
              radioValue: 'value-1'
            },
            {
              radioLabel: 'EARTH',
              radioValue: 'value-2'
            },
            {
              radioLabel: 'WATER',
              radioValue: 'value-3'
            }
          ]
        }
      })
    },
    addStar(name, label, defaultValue) {
      var date = new Date().getTime()
      this.items.push({
        component: name,
        attributes: {
          label: label,
          defaultValue: defaultValue,
          key: 'easy' + date,
          max: 5,
        }
      })
    },
    addSlider(name, label, defaultValue) {
      var date = new Date().getTime()
      this.items.push({
        component: name,
        attributes: {
          label: label,
          defaultValue: defaultValue,
          key: 'easy' + date,
          max: 100,
          min: 0,
          step: 1
        }
      })
    },
    addComplexComponents(name, label, defaultValue,complexAttr) {
      var date = new Date().getTime()
      this.items.push({
        component: name,
        attributes: {
          label: label,
          defaultValue: defaultValue,
          key: 'easy' + date,
          complexAttr: complexAttr
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
      if(this.items[key].attributes.max) {
        this.optionsMaxValue = this.items[key].attributes.max
      } else {
        this.optionsMaxValue = 0
      }
      if(this.items[key].attributes.min) {
        this.optionsMinValue = this.items[key].attributes.min
      } else {
        this.optionsMinValue = 0
      }
      if(this.items[key].attributes.step) {
        this.optionsStepValue = this.items[key].attributes.step
      } else {
        this.optionsStepValue = 0
      }
      if(this.items[key].attributes.radioOptions) {
        this.optionsRadio = this.items[key].attributes.radioOptions
      } else if (!this.items[key].attributes.radioOptions) {
        this.optionsRadio = []
      }
      if(this.items[key].attributes.complexAttr) {
        this.optionsAttr = this.items[key].attributes.complexAttr
      } else if (!this.items[key].attributes.complexAttr) {
        this.optionsAttr = []
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
    },
    changeMaxValue(newValue) {
      if(newValue) {
        var newNum = parseInt(newValue)
      } else {
        var newNum = 0
      }
      if(newNum > 20) {
        if(this.optionsName === 'eStar') {
          newNum = 20
          this.$message({
            type: 'info',
            message: '最大可设为20'
          })
        }
      }
      this.items[this.optionsIndex].attributes.max = newNum
    },
    changeMinValue(newValue) {
      if(newValue) {
        var newNum = parseInt(newValue)
      } else {
        var newNum = 0
      }
      this.items[this.optionsIndex].attributes.min = newNum
    },
    changeStepValue(newValue) {
      if(newValue) {
        var newNum = parseInt(newValue)
      } else {
        var newNum = 1
      }
      if(newNum < 1) {
          newNum = 1
          this.$message({
            type: 'info',
            message: '最小可设为1'
        })
      }
      this.items[this.optionsIndex].attributes.step = newNum
    }
  }
}
</script>

<style lang="scss" scoped>
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


.checkbox-wrapper-10 .tgl {
  display: none;
}

.checkbox-wrapper-10 .tgl,
  .checkbox-wrapper-10 .tgl:after,
  .checkbox-wrapper-10 .tgl:before,
  .checkbox-wrapper-10 .tgl *,
  .checkbox-wrapper-10 .tgl *:after,
  .checkbox-wrapper-10 .tgl *:before,
  .checkbox-wrapper-10 .tgl + .tgl-btn {
  box-sizing: border-box;
}

.checkbox-wrapper-10 .tgl::-moz-selection,
  .checkbox-wrapper-10 .tgl:after::-moz-selection,
  .checkbox-wrapper-10 .tgl:before::-moz-selection,
  .checkbox-wrapper-10 .tgl *::-moz-selection,
  .checkbox-wrapper-10 .tgl *:after::-moz-selection,
  .checkbox-wrapper-10 .tgl *:before::-moz-selection,
  .checkbox-wrapper-10 .tgl + .tgl-btn::-moz-selection,
  .checkbox-wrapper-10 .tgl::selection,
  .checkbox-wrapper-10 .tgl:after::selection,
  .checkbox-wrapper-10 .tgl:before::selection,
  .checkbox-wrapper-10 .tgl *::selection,
  .checkbox-wrapper-10 .tgl *:after::selection,
  .checkbox-wrapper-10 .tgl *:before::selection,
  .checkbox-wrapper-10 .tgl + .tgl-btn::selection {
  background: none;
}

.checkbox-wrapper-10 .tgl + .tgl-btn {
  outline: 0;
  display: block;
  width: 7em;
  height: 2em;
  position: relative;
  left: 20%;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.checkbox-wrapper-10 .tgl + .tgl-btn:after,
  .checkbox-wrapper-10 .tgl + .tgl-btn:before {
  position: relative;
  display: block;
  content: "";
  width: 50%;
  height: 100%;
}

.checkbox-wrapper-10 .tgl + .tgl-btn:after {
  left: 0;
}

.checkbox-wrapper-10 .tgl + .tgl-btn:before {
  display: none;
}

.checkbox-wrapper-10 .tgl:checked + .tgl-btn:after {
  left: 50%;
}

.checkbox-wrapper-10 .tgl-flip + .tgl-btn {
  padding: 2px;
  transition: all 0.2s ease;
  font-family: sans-serif;
  perspective: 100px;
}

.checkbox-wrapper-10 .tgl-flip + .tgl-btn:after,
  .checkbox-wrapper-10 .tgl-flip + .tgl-btn:before {
  display: inline-block;
  transition: all 0.4s ease;
  width: 100%;
  text-align: center;
  position: absolute;
  line-height: 2em;
  font-weight: bold;
  color: #fff;
  top: 0;
  left: 0;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 4px;
}

.checkbox-wrapper-10 .tgl-flip + .tgl-btn:after {
  content: attr(data-tg-on);
  background: #96cb6f;
  transform: rotateY(-180deg);
}

.checkbox-wrapper-10 .tgl-flip + .tgl-btn:before {
  background: #cd961f;
  content: attr(data-tg-off);
}

.checkbox-wrapper-10 .tgl-flip + .tgl-btn:active:before {
  transform: rotateY(-20deg);
}

.checkbox-wrapper-10 .tgl-flip:checked + .tgl-btn:before {
  transform: rotateY(180deg);
}

.checkbox-wrapper-10 .tgl-flip:checked + .tgl-btn:after {
  transform: rotateY(0);
  left: 0;
  background: #53b30e;
}

.checkbox-wrapper-10 .tgl-flip:checked + .tgl-btn:active:after {
  transform: rotateY(20deg);
}


::v-deep .el-input__inner {
  width: 100%;
  height: 34px;
  border-radius: 4px;
  color: #2c3e50;
  border: #2c3e50 2px solid;
  background-color: #2c3e5000;
}
</style>