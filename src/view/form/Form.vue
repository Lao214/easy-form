<template>
  <div>
    <el-row>
      <el-col :span="4">
        <div style="height: 95vh;background-color: #d3cfdd79;padding: 11px;">
          <div class="createBtn" @click="createForm()">Create Form</div>
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
        <div class="form-list">
          <div class="forms" v-for="(item,index) in formList" :key="index" >
            <div style="display: flex;align-items: center;">
                <i class="fa fa-wpforms" style="font-size: 30px;" /> 
                <span style="margin-left: 7px;line-height: 25px;">{{ item.formName }} <br> <a style="color: #a1a1a1;font-size: 14px;">创建时间：{{ item.createTime }}</a></span>
            </div>
            <div style="margin-right: 20px;">
              <span class="form-edit" @click="goToEdit(item.id)">Edit</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogVisible" width="70%" :close-on-click-modal="false" >
      <span style="color: #2c3e50;font-weight: 700;font-size: 24px;">CREATE FORM</span>
      <div style="margin: 20px 15%;text-align: start;">
        <div  style="margin: 20px;">
          <span style="font-size: 20px;color: #2c3e50;font-weight: 500;width: 12%;">表单名称：</span>
          <input v-model="dataForm.formName" style="width: 84%;height: 40px;border-radius: 4px;border: 2.5px #2c3e50 solid;">
        </div>
        <div style="margin: 20px;display: flex;align-items: center;">
          <span style="font-size: 20px;color: #2c3e50;font-weight: 500;width: 12%;">表单类型：</span>
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

export default {
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
      formList: ''
    }
  },
  created() {
    this.getFormList()
  },
  computed: {
    data() {
      // 根据selectedOption的值返回相应的data值
      return this.selectedOption === 0 ? 0 : 1;
    }
  },
  methods: {
    changeSort(sortType) {
      this.sortType = sortType
      this.getFormList()
    },
    goToEdit(id) {
      this.$router.push({ path: '/formDetails', query: { id: id } })
    },
    createForm() {
      this.dialogVisible = true
    },
    confirmCreate() {
      this.dataForm.formType = this.selectedOption
      FormApi.saveForm(this.dataForm).then(res => {
        if(res.data.code === 200) {
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
        if(res.data.code === 200) {
          this.formList = res.data.data.list
        }
      })
    }
  }
}
</script>

<style scoped>
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
  width:  84%;
	display: flex;
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
	padding: 8px 47px;
	margin-right: -1px;
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