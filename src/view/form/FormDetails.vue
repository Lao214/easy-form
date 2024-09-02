<template>
  <div class="body">
    <el-row>
      <el-col :span="4">
        <div class="left-body">
          <!-- <div class="checkbox-wrapper-10">
            <input checked="" type="checkbox" id="cb5" class="tgl tgl-flip" v-model="isChecked">
            <label for="cb5" data-tg-on="组件" data-tg-off="功能" class="tgl-btn"></label>
          </div> -->
        
          <div class="tabs">
            <input v-model="isChecked" value="组件" name="fav_language" id="html" type="radio" class="input"/>
            <label for="html" class="label">组件</label>
            <input v-model="isChecked" value="功能" name="fav_language" id="css" type="radio" class="input"/>
            <label for="css" class="label">功能</label>
          </div>

          <div v-show="isChecked === '功能'" style="padding: 10px;">
            <div class="MenuBtn" style="margin:1rem auto;" @click="gotoRelease()"> <i class="fa fa-send" /> 发布</div>
            <div class="MenuBtn" style="margin:1rem auto;"> <i class="fa fa-meh-o" /> 反馈（未开放）</div>
            <div class="MenuBtn" style="margin:1rem auto;"> <i class="fa fa-table" /> 数据表格（未开放）</div>
            <div class="MenuBtn" style="margin:1rem auto;"> <i class="fa fa-bar-chart" /> 数据图表（未开放）</div>
            <div class="MenuBtn" style="margin:1rem auto;"> <i class="fa fa-mobile" /> 手机浏览（未开放）</div>
          </div>
          <div v-show="isChecked === '组件'">
            <div class="MenuNodeTitle" style="margin-top: 1rem;"> 基础组件 </div>
            <div class="MenuBtn" @click="addHeader('Heading','主标题','副标题')"> <i class="fa fa-header" /> 头部/标题</div>
            <div class="MenuBtn" @click="addBasicComponents('eDescription','Description','write something please')"> <i class="fa fa-file-text-o" /> 描述</div>
            <div class="MenuBtn" @click="addBasicComponents('SortText','Your Question','please input your answer in here')"> <i class="fa fa-text-width" /> 短输入框</div>
            <div class="MenuBtn" @click="addBasicComponents('LongText','Your Question','please input your answer in here')"> <i class="fa fa-text-height" /> 长输入框</div>
            <div class="MenuBtn" @click="addRadio('eRadio','Your Question','value-2')"> <i class="fa fa-dot-circle-o" /> 单选框</div>
            <div class="MenuBtn" @click="addRadio('eCheckBox','Your Question', [])"> <i class="fa fa-check-square" /> 多选框</div>
            <div class="MenuBtn" @click="addRadio('eSelector','Your Question','value-2')"> <i class="fa fa-caret-square-o-down" /> 下拉框</div>
            <div class="MenuBtn" @click="addBasicComponents('eDivider','divider2023', '#a7ce74')"> <i class="fa fa-minus" /> 分割线</div>
            <div class="MenuBtn" @click="addStar('eStar','Your Question', 0)"> <i class="fa fa-star-half-o" /> 评分</div>
            <div class="MenuBtn" @click="addBasicComponents('ePicture','picture','https://cdn.pixabay.com/photo/2013/03/06/01/01/water-90781_1280.jpg')"> <i class="fa fa-file-image-o" /> 网络图片</div>
            <div class="MenuBtn" @click="addBasicComponents('eDate','date','2018-10-10')"> <i class="fa fa-calendar" /> 日期</div>
            <el-divider></el-divider>
            <div class="MenuNodeTitle"> 复杂组件</div>
            <div class="MenuBtn" @click="addSlider('eSlider','Slider',0)"> <i class="fa fa-sliders"/> 滑块条</div>
            <!-- <div class="MenuBtn" @click="addComplexComponents('eAddress','address','',addressArray)"> <i class="fa fa-map-marker" /> 地址组件</div> -->
          </div>
        </div>
      </el-col>
      <el-col :span="13">
        <div style="height: 95vh;background-color: #a7ce74;padding: 14px;overflow-y: scroll;">
          <div class="adaptive-div">
            <div v-show="isLoading" class="three-body">
              <div class="three-body__dot"></div>
              <div class="three-body__dot"></div>
              <div class="three-body__dot"></div>
            </div>
            <div v-show="!isLoading">
              <draggable v-model="items" chosen-class="chosen" force-fallback="true" group="people" animation="1000" @start="onStart" @end="onEnd">
                <transition-group>
                  <component v-for="(item, index) in items" :key="item.attributes.key" :is="item.component" :attributes="item.attributes" :option-key="index" @callBack="callBack"/>
                </transition-group>
              </draggable>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="right-body">
          <div class="opInputs">
            <el-button @click="saveForm()" class="save-btn" :loading="isLoading" type="success">保存表单</el-button>
          </div>
          <div v-show="isChecked">

            <div class="opName">
              组件名：{{ optionsName }} <br>

              <span v-show="optionsName && optionsName !== 'Heading' && optionsName !== 'eDescription' && optionsName !== 'ePicture' && optionsName !== 'eDivider'">
                是否必填：
                <label class="switch">
                  <input v-model="optionsRequire" @change="changeRequire(optionsRequire)" type="checkbox">
                  <span class="slider"></span>
                </label>
              </span>

              <el-divider></el-divider>
            </div>

            <div class="opInputs">
              组件Key: 
              <input class="opInput" @input="changeKey(optionsKey)" v-model="optionsKey" >
            </div>
            <div v-show="optionsName === 'Heading'" class="opInputs">
              主标题: 
              <input class="opInput" @input="changeTitle(optionsTitle)" v-model="optionsTitle" >
            </div>
            <div v-show="optionsName === 'Heading'" class="opInputs">
              副标题: 
              <input class="opInput" @input="changeTitle(optionsSubtitle)" v-model="optionsSubtitle" >
            </div>

            <div class="opInputs" v-show="optionsName === 'SortText' || optionsName === 'LongText' || optionsName === 'eRadio' || optionsName === 'eCheckBox' || optionsName === 'eSelector' || optionsName === 'eStar' || optionsName === 'ePicture' || optionsName === 'ePicture' || optionsName === 'eDate'">
              <span >组件Label: </span>
              <input class="opInput" @input="changeLabel(optionsLabel)" v-model="optionsLabel" >
            </div>

            <div v-show="optionsName === 'eDescription' || optionsName === 'SortText' || optionsName === 'LongText' || optionsName === 'eRadio' || optionsName === 'eCheckBox' || optionsName === 'eSelector' || optionsName === 'eStar' || optionsName === 'ePicture' || optionsName === 'eDate'" class="opInputs">
              <span>组件默认值: </span>
              <input v-show="optionsName != 'eCheckBox'" class="opInput" @input="changeDefaultValue(optionsDefaultValue)" v-model="optionsDefaultValue" >
              <el-select v-show="optionsName === 'eCheckBox'" style="width: 100%;color: #2c3e50;" @change="changeDefaultValue(optionsDefaultValue)" v-model="optionsDefaultValue" multiple placeholder="请选择">
                <el-option v-for="item in optionsRadio" :key="item.radioValue" :label="item.radioLabel" :value="item.radioValue">
                </el-option>
              </el-select>
            </div>

            <div v-show="optionsName === 'eSlider' || optionsName === 'eCheckBox'" class="opInputs">
              <span v-if="optionsName !== 'eCheckBox'">组件最大值:</span> 
              <span v-if="optionsName === 'eCheckBox'">最多可选:</span> 
              <input class="opInput" placeholder="请输入整数" @input="changeMaxValue(optionsMaxValue)" v-model="optionsMaxValue" >
            </div>

            <div v-show="optionsName === 'eSlider' || optionsName === 'eCheckBox'" class="opInputs">
              <span v-if="optionsName !== 'eCheckBox'">组件最小值:</span> 
              <!-- <span v-if="optionsName === 'eCheckBox'">最少要选:</span>  -->
              <input  v-if="optionsName != 'eCheckBox'" class="opInput" placeholder="请输入整数" @input="changeMinValue(optionsMinValue)" v-model="optionsMinValue" >
            </div>

            <div class="opInputs" v-show="optionsStepValue">
              组件步值: 
              <input class="opInput" placeholder="请输入整数" @input="changeStepValue(optionsStepValue)" v-model="optionsStepValue" >
            </div>

            <div class="opInputs">
              <button @click="delComponents()" class="del-btn"><i class="el-icon-delete"></i></button>
            </div>

            <div class="opName" v-show="optionsRadio.length > 0">
              选项：
              <el-divider></el-divider>
              <div v-for="(item,index) in optionsRadio" :key="index" style="display: flex;margin-bottom: 7px;font-size: 12px;width: 100%;">
                <label style="line-height: 40px;">Label：</label>
                <input class="opInput" v-model="item.radioLabel" style="margin-right: 4px;">
                <label style="line-height: 40px;">Value：</label>
                <input class="opInput" v-model="item.radioValue" style="" >
              </div>
              <div class="save-btn" @click="addRadioOptions()">
                <i class="el-icon-plus"></i>
              </div>
            </div>
            <div class="opName" v-show="optionsAttr.length > 0">
              选项：
              <el-divider></el-divider>
              <div v-for="(item,index) in optionsAttr" :key="index" style="display: flex;margin-bottom: 7px;font-size: 12px;width: 100%;">
                <label style="line-height: 40px;">Label：</label>
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
import draggable from 'vuedraggable'

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
    eDescription,
    draggable
  },
  data() {
    return {
      one: {},
      isChecked: '组件',
      items: [],
      optionsIndex: '',
      optionsKey: '',
      optionsName: '',
      optionsRequire: false,
      optionsLabel: '',
      optionsDefaultValue: '',
      optionsMaxValue: '',
      optionsMinValue: '',
      optionsStepValue: '',
      optionsTitle:'',
      optionsSubtitle: '',
      optionsRadio: [],
      optionsAttr: [],
      dialogVisible: false,
      isLoading: false,
      drag: false,
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
  mounted() {
    this.getFormByKey()
  },
  methods: {
    // 开始拖拽事件
    onStart() {
      this.drag = true
    },
    // 拖拽结束事件
    onEnd() {
      this.drag = false
    },
    gotoRelease() {
      window.open('/share?key=' + this.$route.query.key)
      // this.$router.push({ path: '/form/share', query: { key: this.$route.query.key, type: 'details'  } })
    },
    getFormByKey() {
      this.isLoading = true
      formApi.getFormByKey(this.$route.query.key).then(res => {
        if(res.code === 200) {
            this.one = res.data.one
            if(res.data.one.formItems) {
              this.items = JSON.parse(res.data.one.formItems)
            }
          }
        })
      this.isLoading = false
    },
    saveForm() {
      this.isLoading = true
      const bForm = {
        formKey: this.$route.query.key,
        formItems: JSON.stringify(this.items)
      }
      formApi.updateForm(bForm).then(res => {
          if(res.code === 200) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
          }
      })
      this.isLoading = false
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
      this.optionsRequire = false,
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
          require: false,
          max: 1,
          min: 1,
          radioOptions: [
            {
              radioLabel: '选项label1',
              radioValue: 'value-1'
            },
            {
              radioLabel: '选项label2',
              radioValue: 'value-2'
            },
            {
              radioLabel: '选项label3',
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
          require: false,
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
          step: 1,
          require: false,
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
          complexAttr: complexAttr,
          require: false,
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
          require: false,
        }
      })
    },
    addHeader(name, title, subtitle) {
      var date = new Date().getTime()
      this.items.push({
        component: name,
        attributes: {
          title: title,
          subtitle: subtitle,
          key: 'easy' + date,
        }
      })
    },
    callBack(key) {
      this.optionsIndex = key
      this.optionsName = this.items[key].component
      this.optionsRequire = this.items[key].attributes.require
      this.optionsLabel = this.items[key].attributes.label
      this.optionsDefaultValue = this.items[key].attributes.defaultValue
      this.optionsKey = this.items[key].attributes.key
      this.optionsTitle = this.items[key].attributes.title
      this.optionsSubtitle = this.items[key].attributes.subtitle
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
    changeRequire(newValue) {
      this.items[this.optionsIndex].attributes.require = newValue
    },
    changeLabel(newValue) {
      this.items[this.optionsIndex].attributes.label = newValue
    },
    // Heading 的方法
    changeTitle(newValue) {
      this.items[this.optionsIndex].attributes.title = newValue
    },
     // Heading 的方法
    changeSubtitle(newValue) {
      this.items[this.optionsIndex].attributes.subtitle = newValue
    },
    changeDefaultValue(newValue) {
      if( this.items[this.optionsIndex].component === 'eStar') {
        if(!newValue) {
          newValue = 0
        }
        newValue = parseInt(newValue)
      }
      this.items[this.optionsIndex].attributes.defaultValue = newValue
      if(this.items[this.optionsIndex].component === 'eCheckBox') {
        // console.log(this.items[this.optionsIndex].attributes)
        // console.log(this.items[this.optionsIndex].attributes.defaultValue.length)
        // console.log(this.items[this.optionsIndex].attributes.max)
        if(this.items[this.optionsIndex].attributes.defaultValue && (this.items[this.optionsIndex].attributes.defaultValue.length > this.items[this.optionsIndex].attributes.max)) {
          this.items[this.optionsIndex].attributes.defaultValue = this.items[this.optionsIndex].attributes.defaultValue.slice(0, this.items[this.optionsIndex].attributes.max)
          this.optionsDefaultValue = this.optionsDefaultValue.slice(0, this.items[this.optionsIndex].attributes.max)
          return this.$message.warning('超过最大限制')
        } else {

        }
      }
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
  background-color: #83bbe800;
  /* height: 100vh; */
  text-align: center;
  --radius: 8px;
  --border: 4px;
  --height: 2rem;
  --speed: 0.25s;
}
.left-body {
  height: 95vh;
  // background: linear-gradient(to right, #363555, #2a2941);
  background: #101e33;
  padding: 11px;
  overflow-y: scroll;
  color: #7f84a8;
}

.right-body {
  height: 95vh;
  background-color: #101e33;
  padding: 11px;
  overflow-y: scroll;
  color: #7f84a8;
}

.MenuBtn{
  cursor: pointer;
  min-height: 40px;
  line-height: 40px;
  font-size: 1.1rem;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
  border: none;       /* 去掉默认边框 */
  outline: none;      /* 去掉点击或输入时的边框 */
  resize: none;       /* 去掉右下角的拖动调整大小的控件 */
  background-color: #35455c;
  color: #7f84a8;
  box-sizing: border-box;
  padding: .4rem;
}

.save-btn {
  width: 100%;
  padding: .77rem;
  border-radius: .2rem;
  border: none;
  background: #42b983;
  color: white;
  cursor: pointer;
  transition: all .2s ease-in-out;
}

.del-btn {
  width: 100%;
  padding: .77rem;
  border-radius: .2rem;
  border: none;
  // background: #d51212;
  background: #f52f25;
  color: white;
  cursor: pointer;
  transition: all .2s ease-in-out;
}

.save-btn:hover, .del-btn:hover {
  background: #d4dff6;
  color: #2c2f47;
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


.three-body {
 --uib-size: 105px;
 --uib-speed: 0.8s;
 --uib-color: #53b30e;
 position: relative;
 display: inline-block;
 height: var(--uib-size);
 width: var(--uib-size);
 animation: spin78236 calc(var(--uib-speed) * 2.5) infinite linear;
}

.three-body__dot {
 position: absolute;
 height: 100%;
 width: 30%;
}

.three-body__dot:after {
 content: '';
 position: absolute;
 height: 0%;
 width: 100%;
 padding-bottom: 100%;
 background-color: var(--uib-color);
 border-radius: 50%;
}

.three-body__dot:nth-child(1) {
 bottom: 5%;
 left: 0;
 transform: rotate(60deg);
 transform-origin: 50% 85%;
}

.three-body__dot:nth-child(1)::after {
 bottom: 0;
 left: 0;
 animation: wobble1 var(--uib-speed) infinite ease-in-out;
 animation-delay: calc(var(--uib-speed) * -0.3);
}

.three-body__dot:nth-child(2) {
 bottom: 5%;
 right: 0;
 transform: rotate(-60deg);
 transform-origin: 50% 85%;
}

.three-body__dot:nth-child(2)::after {
 bottom: 0;
 left: 0;
 animation: wobble1 var(--uib-speed) infinite
    calc(var(--uib-speed) * -0.15) ease-in-out;
}

.three-body__dot:nth-child(3) {
 bottom: -5%;
 left: 0;
 transform: translateX(116.666%);
}

.three-body__dot:nth-child(3)::after {
 top: 0;
 left: 0;
 animation: wobble2 var(--uib-speed) infinite ease-in-out;
}

@keyframes spin78236 {
 0% {
  transform: rotate(0deg);
 }

 100% {
  transform: rotate(360deg);
 }
}

@keyframes wobble1 {
 0%,
  100% {
  transform: translateY(0%) scale(1);
  opacity: 1;
 }

 50% {
  transform: translateY(-66%) scale(0.65);
  opacity: 0.8;
 }
}

@keyframes wobble2 {
 0%,
  100% {
  transform: translateY(0%) scale(1);
  opacity: 1;
 }

 50% {
  transform: translateY(66%) scale(0.65);
  opacity: 0.8;
 }
}

/* The switch - the box around the slider */
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 2.5em;
  height: 1.27em;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background: #759151;
  border-radius: 50px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.slider:before {
  position: absolute;
  content: "";
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.27em;
  width: 1.27em;
  inset: 0;
  background-color: white;
  border-radius: 50px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.4);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.switch input:checked + .slider {
  background: #72c10a;
}

.switch input:focus + .slider {
  box-shadow: 0 0 1px #72c10a;
}

.switch input:checked + .slider:before {
  transform: translateX(1.6em);
}


.tabs {
  height: var(--height);
  display: grid;
  grid-auto-flow: column;
  background: hsl(0 0% 0%);
  border-radius: var(--radius);
  grid-auto-columns: 1fr;
  position: relative;
  border: var(--border) solid hsl(0 0% 0%);
  font-weight: 700;
}

.tabs {
  --ease: linear(
    0,
    0.1641 3.52%,
    0.311 7.18%,
    0.4413 10.99%,
    0.5553 14.96%,
    0.6539 19.12%,
    0.738 23.5%,
    0.8086 28.15%,
    0.8662 33.12%,
    0.9078 37.92%,
    0.9405 43.12%,
    0.965 48.84%,
    0.9821 55.28%,
    0.992 61.97%,
    0.9976 70.09%,
    1
  );
}

.tabs > .input,
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.tabs:has(:checked:nth-of-type(1)) {
  --active: 0;
}
.tabs:has(:checked:nth-of-type(2)) {
  --active: 1;
}
.tabs:has(:checked:nth-of-type(3)) {
  --active: 2;
}
.tabs:has(:checked:nth-of-type(4)) {
  --active: 3;
}

.tabs :checked + .label {
  --highlight: 1;
}

.tabs:has(.input:nth-of-type(2)) {
  --count: 2;
}
.tabs:has(.input:nth-of-type(3)) {
  --count: 3;
}
.tabs:has(.input:nth-of-type(4)) {
  --count: 4;
}

.tabs .label {
  padding: 0 clamp(10px, 10px + 10px, 20px);
  cursor: pointer;
  text-align: center;
  height: 100%;
  display: grid;
  border-radius: calc(var(--radius) - var(--border));
  place-items: center;
  color: hsl(0 0% 100% / calc(0.5 + var(--highlight, 0)));
  transition: background, color;
  transition-duration: 0.25s;
  transition-timing-function: var(--ease, ease);
}

.input:not(:checked) + .label:hover {
  --highlight: 0.35;
  background: hsl(0 0% 20%);
}

.tabs::after {
  pointer-events: none;
  content: "";
  width: calc(100% / var(--count));
  height: 100%;
  background: hsl(0 0% 100%);
  position: absolute;
  border-radius: calc(var(--radius) - var(--border));
  mix-blend-mode: difference;
  translate: calc(var(--active, 0) * 100%) 0;
  transition: translate, outline-color;
  transition-duration: var(--speed);
  transition-timing-function: var(--ease, ease);
  outline: 2px solid transparent;
}

.tabs:has(:focus-visible)::after {
  outline-color: red;
}

.MenuBtn .fa {
  margin-right: .4rem;
}

</style>