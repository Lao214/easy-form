<template>
  <div>
    <el-row>
      <el-col :span="4">
        <div style="height: 95vh;background-color: #d3cfdd79;padding: 11px;">
          <div id="createForm" class="createBtn" @click="createForm()">Create Form</div>
          <el-divider></el-divider>
          <div class="MenuNodeTitle"> My Forms</div>
          <div class="MenuBtn"> <i class="fa fa-folder"/> All Forms</div>
          <div class="MenuBtn"> <i class="fa fa-plus"/> Create a new Foloder</div>
          <el-divider></el-divider>
          <div class="MenuNodeTitle"> My Teams</div>
          <div class="MenuBtn"> <i class="fa fa-users"/> My Team</div>
          <div class="MenuBtn"> <i class="fa fa-user-plus"/> Create a new Team</div>
          <el-divider></el-divider>
          <div class="MenuNodeTitle"> Others</div>
          <div class="MenuBtn"> <i class="fa fa-star"/> My Star</div>
          <el-divider></el-divider>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="list-head">
          <div class="options">
            <div class="radio-inputs">
              <label class="radio">
                <!-- SortByCreateTimeDesc -->
                <input type="radio"  checked name="radio">
                <span class="name" @click="changeSort('SortByCreateTimeDesc')"> <i class="fa fa-long-arrow-down" style="font-weight: 600;font-size: 18px;margin-right: 2px;" /> Sort By CreateTime</span>
              </label>
              <label class="radio">
                <input type="radio" name="radio" >
                <span class="name" @click="changeSort('SortByCreateTimeAsc')"> <i class="fa fa-long-arrow-up" style="font-weight: 600;font-size: 18px;margin-right: 2px;" /> CreateTime</span>
              </label>
              <label class="radio">
                <input type="radio"  name="radio">
                <span class="name" @click="changeSort('SortByNameDesc')"><i class="fa fa-sort-alpha-asc" style="font-weight: 600;font-size: 18px;margin-right: 2px;" /> Name</span>
              </label>
              <label class="radio">
                <input type="radio"  name="radio">
                <span class="name" @click="changeSort('SortByNameAsc')"><i class="fa fa-sort-alpha-desc" style="font-weight: 600;font-size: 18px;margin-right: 2px;" /> Name</span>
              </label>
              <label class="radio">
                <input type="radio"  name="radio">
                <span class="name" @click="changeSort('SortByWriteCountDesc')"><i class="fa fa-sort-amount-desc" style="font-weight: 600;font-size: 18px;margin-right: 2px;" /> Write Count</span>
              </label>
              <label class="radio">
                <input type="radio"  name="radio">
                <span class="name" @click="changeSort('SortByWriteCountAsc')"><i class="fa fa-sort-amount-asc" style="font-weight: 600;font-size: 18px;margin-right: 2px;" /> Write Count</span>
              </label>
            </div>
          </div>
          <div class="search">
            <div class="group">
              <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
              <input placeholder="Search" type="search" class="input">
            </div>
          </div>
        </div>
        <div id="formList" class="form-list">
          <div class="forms" v-for="(item,index) in formList" :key="index" >
            <div style="display: flex;align-items: center;">
                <i class="fa fa-wpforms" style="font-size: 30px;" /> 
                <span style="margin-left: 7px;line-height: 25px;">{{ item.formName }} <br> <a style="color: #a1a1a1;font-size: 14px;">创建时间：{{ item.createTime }}</a></span>
            </div>
            <div style="margin-right: 20px;">
              <span class="form-edit" @click="goToEdit(item.formKey)">Edit</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog  id="createFormDialog" :visible.sync="dialogVisible" width="70%" :close-on-click-modal="false" >
        <span style="color: #2c3e50;font-weight: 700;font-size: 2rem;">CREATE FORM</span>
        <div style="margin-left:15%;text-align: start;">
          <div  style="margin: 1rem;display: flex;">
            <span style="font-size: 20px;color: #2c3e50;font-weight: 500;width: 7rem;">表单名称：</span>
            <input v-model="dataForm.formName" class="create-form-input">
          </div>
          <div style="margin: 1rem;display: flex;">
            <span style="font-size: 20px;color: #2c3e50;font-weight: 500;width: 7rem;">表单类型：</span>
            <div class="switch-field">
              <input type="radio" id="radio-one" name="switch-one" v-model="selectedOption" :value="0" checked/>
              <label for="radio-one">CLASSIC FORM</label>
              <input type="radio" id="radio-two" name="switch-one" v-model="selectedOption" :value="1" />
              <label for="radio-two">CARD FORM</label>
            </div>
          </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="createBtn" style="padding:0px 20px ;" type="primary" @click="confirmCreate()">CONFIRM CREATE</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FormApi from '@/api/formApi'
import userApi from '@/api/user/userApi'
import { driver } from "driver.js"
import "driver.js/dist/driver.css"
import { mapGetters } from 'vuex'

export default {
  computed: {
    data() {
      // 根据selectedOption的值返回相应的data值
      return this.selectedOption === 0 ? 0 : 1;
    },
    ...mapGetters([
      'isFinishedLead'
    ])
  },
  data() {
    return {
      dialogVisible: false,
      dataForm: {
        formName: '',
        formType: 0
      },
      selectedOption: 0,
      formName: '',
      sortType: 'SortByCreateTimeDesc',
      formList: '',
      // 引导
      steps: [
        {
          element: '#createForm',
          popover: {
            title: "第一步",
            description: '点击创建按钮',
            position: 'right',
            onNextClick: this.goSecondStep
          }
        },
        {
          element: '#createFormDialog',
          popover: {
            title: "第二步",
            description: '输入表单名称，选择表单类型，进行创建',
            position: 'center',
            onNextClick: this.goThirdStep
          }
        },
        {
          element: '#formList',
          popover: {
            title: "第三步",
            description: '创建后得到一条表单记录，点击edit按钮可编辑表单',
            position: 'right',
            onNextClick: this.finish
          }
        }
      ]
    }
  },
  created() {
    this.getFormList()
  },
  mounted() {
    this.$store.dispatch('user/getInfo').then(() => {
      var isFinishedLead = this.isFinishedLead
      if(isFinishedLead) {
        isFinishedLead = JSON.parse(isFinishedLead)
      }
      if(!isFinishedLead.includes(1) && !isFinishedLead.includes('1')) {
        this.driver = new driver({
            showProgress:true,
            progressText:'{{current}}/{{total}}',
            animate: true, // 动画
            stageBackground: '#ffffff', // 突出显示元素的背景颜色
            nextBtnText: '下一步', // 下一步按钮的文字
            prevBtnText: '上一步', // 上一步按钮的文字
            doneBtnText: '完成', // 结束按钮的文字
            popoverClass: 'driverjs-theme',
            onPopoverRender: (popover, { config, state }) => {
              const firstButton = document.createElement('button')
              firstButton.innerText = '跳过'
              popover.footerButtons.appendChild(firstButton)
              firstButton.addEventListener('click', () => {
                var nowFinished = this.$store.state.user.isFinishedLead
                if(!nowFinished) {
                  nowFinished = []
                }
                nowFinished.push(1)
                userApi.updateFinishedStep(JSON.stringify(nowFinished)).then(res => {
                  if(res.code === 200) {
                    this.$router.push('/formDetails?guide=guide')
                  }
                })
                this.driver.destroy()
              })
            },
            highlightTab: true, // 是否高亮当前 tab
            allowClose: false, // 用户是否可以关闭引导层
            overlayClickNext: false, // 是否点击覆盖阴影时下一步
            keyboardControl: false, // 是否允许键盘控制
            steps: this.steps,
            stagePadding:10,
            onCloseClick:() => {
              this.driver.destroy();
            },
        })
        this.driver.drive()
      }
    })
  },
  methods: {
    finish() {
      // 结束引导
      console.log('finish')
      this.driver.moveNext()
      var nowFinished = this.$store.state.user.isFinishedLead
      if(!nowFinished) {
        nowFinished = []
      }
      nowFinished.push(1)
      userApi.updateFinishedStep(JSON.stringify(nowFinished)).then(res => {
        if(res.code === 200) {
          this.$router.push('/formDetails?guide=guide')
        }
      })
    },
    goSecondStep() {
      // 打开dialog
      this.dialogVisible = true
      this.driver.moveNext()
    },
    goThirdStep() {
      this.dialogVisible = false
      this.driver.moveNext()
    },
    changeSort(sortType) {
      this.sortType = sortType
      this.getFormList()
    },
    goToEdit(id) {
      this.$router.push({ path: '/formDetails', query: { key: id } })
    },
    createForm() {
      this.dialogVisible = true
    },
    confirmCreate() {
      this.dataForm.formType = this.selectedOption
      FormApi.saveForm(this.dataForm).then(res => {
        if(res.code === 200) {
          this.$message({
            type: 'success',
            message: 'Create Success'
          })
          this.dialogVisible = false
          this.getFormList()
        }
      })
    },
    getFormList() {
      const queryForm = {
        formName: this.formName,
        sortType: this.sortType
      }
      FormApi.getFormList(queryForm).then(res => {
        if(res.code === 200) {
          this.formList = res.data.list
        }
      })
    }
  }
}
</script>

<style>
/** 引导的css **/
.driver-popover.driverjs-theme {
    /* background-color: #fde047; */
    background: #0b3C59;
    color: #ffffff;
    min-width: 20rem;
}
  
.driver-popover.driverjs-theme .driver-popover-title {
    font-size: 20px;
}
  
.driver-popover.driverjs-theme .driver-popover-title,
.driver-popover.driverjs-theme .driver-popover-description,
.driver-popover.driverjs-theme .driver-popover-progress-text {
    color: #ffffff;
}
  
.driver-popover.driverjs-theme button {
    flex: 1;
    text-align: center;
    background-color: #000;
    color: #ffffff;
    border: 2px solid #000;
    text-shadow: none;
    font-size: 14px;
    padding: 5px 8px;
    border-radius: 6px;
}
  
.driver-popover.driverjs-theme button:hover {
    background-color: #000;
    color: #ffffff;
}
  
.driver-popover.driverjs-theme .driver-popover-navigation-btns {
    justify-content: space-between;
    gap: 3px;
}
  
.driver-popover.driverjs-theme .driver-popover-close-btn {
    color: #9b9b9b;
}
  
.driver-popover.driverjs-theme .driver-popover-close-btn:hover {
    color: #000;
}
  
.driver-popover.driverjs-theme .driver-popover-arrow-side-left.driver-popover-arrow {
    border-left-color: #fff;
    /* border-left-color: #fde047; */
}
  
.driver-popover.driverjs-theme .driver-popover-arrow-side-right.driver-popover-arrow {
    border-right-color: #fff;
    /* border-right-color: #fde047; */
}
  
.driver-popover.driverjs-theme .driver-popover-arrow-side-top.driver-popover-arrow {
    /* border-top-color: #fde047; */
    border-top-color: #fff;
}
  
.driver-popover.driverjs-theme .driver-popover-arrow-side-bottom.driver-popover-arrow {
    /* border-bottom-color: #fde047; */
    border-bottom-color: #fff;
}
</style>

<style scoped>
.create-form-input {
  height: 2.4rem;
  border-radius: 4px;
  outline: none;      /* 去掉点击或输入时的边框 */
  resize: none;       /* 去掉右下角的拖动调整大小的控件 */
  border: 2.5px #2c3e50 solid;
  box-sizing: border-box;
  padding: 1rem;
  font-size: 1.1rem;
  width: 57%;
}

.forms {
  height: 61px;
  line-height: 60px;
  font-weight: 700;
  font-size: 20px;
  margin: 10px;
  text-align: start;
  padding-left: 20px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
.forms:hover {
  background-color: #5492b66d;
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
.MenuBtn{
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

.list-head {
  /* background-color: #d3cfdd79; */
  /* background-color: #d3cfdd79; */
  height: 54px;
  /* background-color: #d3cfdd79; */
  padding: 11px;
  display: flex;
  justify-content: space-between;
}

.radio-inputs {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  border-radius: 0.5rem;
  background-color: #EEE;
  box-sizing: border-box;
  box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
  padding: 0.4rem;
  width: 827px;
  font-size: 14px;
  height: 47px;
}

.radio-inputs .radio {
  flex: 1 1 auto;
  text-align: center;
  margin:0 10px;
}

.radio-inputs .radio input {
  display: none;
}

.radio-inputs .radio .name {
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: none;
  padding: .5rem 0;
  color: rgba(51, 65, 85, 1);
  transition: all .15s ease-in-out;
}

.radio-inputs .radio input:checked + .name {
  background-color: #fff;
  font-weight: 600;
}

.group {
 display: flex;
 line-height: 28px;
 align-items: center;
 position: relative;
 max-width: 190px;
}

.input {
 width: 100%;
 height: 47px;
 line-height: 28px;
 padding: 0 1rem;
 padding-left: 2.5rem;
 border: 2px solid transparent;
 border-radius: 8px;
 outline: none;
 background-color: #f3f3f4;
 color: #0d0c22;
 transition: .3s ease;
}

.input::placeholder {
 color: #9e9ea7;
}

.input:focus, input:hover {
 outline: none;
 border-color: rgba(76, 145, 234, 0.4);
 background-color: #fff;
 box-shadow: 0 0 0 4px rgba(76, 152, 234, 0.1);
}

.icon {
 position: absolute;
 left: 1rem;
 fill: #9e9ea7;
 width: 1rem;
 height: 1rem;
}

.form-edit:hover {
  color:  #7d24b4
}

.createBtn {
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  background-color: #0b3c59;color: #fff;border-radius: 4px;
  font-weight: 500;cursor: pointer;
  border: none;
}

 .createBtn:hover {
    background-color: #105781;
 }

 .switch-field {
	display: flex;
  justify-content: left;
	overflow: hidden;
}

.switch-field input {
	position: absolute !important;
	clip: rect(0, 0, 0, 0);
	height: 1px;
	width: 1px;
	border: 0;
	overflow: hidden;
}

.switch-field label {
	background-color: #68696b;
	color: rgb(255, 255, 255);
	font-size: 18px;
  font-weight: 600;
	/* line-height: 1; */
	text-align: center;
	padding: 8px 1rem;
	/* margin-right: -1px; */
	transition: all 0.1s ease-in-out;
}

.switch-field label:hover {
	cursor: pointer;
}

.switch-field input:checked + label {
	background-color: #0b3c59;
	box-shadow: none;
}

.switch-field label:first-of-type {
	border-radius: 4px 0 0 4px;
}

.switch-field label:last-of-type {
	border-radius: 0 4px 4px 0;
}

</style>