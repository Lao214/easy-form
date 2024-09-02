<template>
  <div class="body">
    <div class="header">
      <!-- {{ answerTotal }} -->
    </div>
    <div class="main">
      <component v-for="(item, index) in items" :key="index" @callBack="callBack" :is="item.component" :attributes="item.attributes" :option-key="index"/>
      <el-button :loading="submitloading" @click="submitAnswer()" type="success" style="padding: 11px 27px;margin: 0 auto;">
        提交
      </el-button>
    </div>
    <div class="footer">

    </div>
  </div>
</template>

<script>
import Heading from '@/components/buildElement/Heading.vue'
import eDescription from '@/components/buildElement/EDescription.vue'
import eRadio from '@/components/buildElement/ERadio.vue'
import SortText from '@/components/buildElement/SortText.vue'
import LongText from '@/components/buildElement/LongText.vue'
import eCheckBox from '@/components/buildElement/ECheckBox.vue'
import eDivider from '@/components/buildElement/EasyDivider.vue'
import eStar from '@/components/buildElement/EStar.vue'
import eAddress from '@/components/buildElement/EAddress.vue'
import ePicture from '@/components/buildElement/EPicture.vue'
import eDate from '@/components/buildElement/EDate.vue'
import eSelector from '@/components/buildElement/ESelector.vue'
import eSlider from '@/components/buildElement/ESlider.vue'
// import eButton from '@/components/buildElement/EButton.vue'
import formApi from '@/api/formApi'
import answerApi from '@/api/answerApi'

export default {
  components: {
    Heading,
    eDescription,
    eRadio,
    SortText,
    LongText,
    eCheckBox,
    eDivider,
    eStar,
    eAddress,
    ePicture,
    eDate,
    eSelector,
    eSlider
  },
  data() {
    return {
      items: [],
      requires: [],
      one: {},
      answer: [],
      answerNum: 0,
      answerTotal: 0,
      submitloading: false
    }
  },
  created() {
    this.getFormByKey()
  },
  methods: {
    getFormByKey() {
      formApi.getFormByKeyPublic(this.$route.query.key).then(res => {
         if(res.code === 200) {
          this.one = res.data.one
          this.items = JSON.parse(res.data.one.formItems)
          var answerCount = 0
          for(let i = 0; i < this.items.length; i++) {
            if(this.items[i].component === 'eRadio' || this.items[i].component === 'SortText' || this.items[i].component === 'LongText'
            || this.items[i].component === 'eCheckBox' || this.items[i].component === 'eStar' || this.items[i].component === 'eAddress'
            || this.items[i].component === 'eDate' || this.items[i].component === 'eSelector' || this.items[i].component === 'eSlider'
            ) {
              this.answerTotal = this.answerTotal + 1
              this.items[i].answerId = answerCount
              if(this.items[i].attributes.require) {
                this.requires.push(this.items[i].answerId)
              }
              answerCount++
              if(this.items[i].attributes.defaultValue) {
                this.answer[answerCount-1] = {
                  key: this.items[i].attributes.key,
                  label: this.items[i].attributes.label,
                  type: this.items[i].component,
                  value: this.items[i].attributes.defaultValue,
                  require: this.items[i].attributes.require
                }
              }
            }
          }
          console.log(this.answer)
          console.log(this.requires)
          console.log(this.items)
         }
      })
    },
    callBack(key) {
      // console.log(this.items[key])
      if(this.items[key].component === 'eButton') {
        this.submitAnswer()
      }
      else if(this.items[key].component === 'eAddress') {
        var addressValue = []
        this.items[key].attributes.complexAttr.forEach(element => {
          let attr = element.complexAttr
          let val = element.complexVal
          addressValue.push(attr + ':' + val)
        })
        const answer = {
          key: this.items[key].attributes.key,
          label: this.items[key].attributes.label,
          type: this.items[key].component,
          value: addressValue,
          require: this.items[key].attributes.require
        }
        this.answer[this.items[key].answerId] = answer
      } else{
        const answer = {
          key: this.items[key].attributes.key,
          value: this.items[key].attributes.defaultValue,
          label: this.items[key].attributes.label,
          type: this.items[key].component,
          require: this.items[key].attributes.require
        }
        this.answer[this.items[key].answerId] = answer
      }
    },
    submitAnswer() {
      if(this.answer.length < 1) {
        this.$message({
          type: 'info',
          message: '请填写问卷'
        })
        return
      }
      for(var i = 0; i < this.requires.length; i++) {
        if(this.answer[this.requires[i]]) {
          if(this.answer[this.requires[i]].type === 'eCheckBox') {
            if(this.answer[this.requires[i]].value.length < 1) {
              this.$message({
                type: 'info',
                message: '第' + (this.requires[i]+1) + '题还没回答'
              })
              return
            }     
          }
        } else {
          this.$message({
            type: 'info',
            message: '第' + (this.requires[i]+1) + '题还没回答'
          })
          return
        }
      }
      this.submitloading = true
      const dataAnswer = {
        formKey: this.$route.query.key,
        answerDetails: JSON.stringify(this.answer),
        // formName: this.one.formName,
        source: '其他'
      }
      answerApi.saveAnswer(dataAnswer).then(res => {
        if(res.code === 200) {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
          // this.$router.push({
          //   path: '/succ',
          //   query: {
          //     feedback: feedback
          //   }
          // })
          this.submitloading = false
        } else {
          this.submitloading = false
        }
      })
    }
  }
}
</script>

<style scoped>
.body {
  height: auto;
  background: #a7ce74
}
.header {
  height: 5vh
}
.footer {
  height: 5vh
}
.main {
  width: 81vw;
  max-width:960px;
  background: #fff;
  margin: 0 auto;
  padding: 1rem;
  height: auto;
  min-height:100vh;
}
</style>