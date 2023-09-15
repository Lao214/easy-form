<template>
  <div class="body">
    <div class="header">
      <!-- {{ answerTotal }} -->
    </div>
    <div class="main">
      <component v-for="(item, index) in items" :key="index" @callBack="callBack" :is="item.component" :attributes="item.attributes" :option-key="index"/>
      <el-button @click="submitAnswer()" type="success" style="padding: 11px 27px">
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
import formApi from '@/api/formApi'

export default {
  components: {
    Heading,
    eDescription,
    eRadio,
    SortText,
    LongText,
    eCheckBox
  },
  data() {
    return {
      items: [],
      one: {},
      answer: [],
      answerNum: 0,
      answerTotal: 0
    }
  },
  created() {
    this.getFormByKey()
  },
  methods: {
    getFormByKey() {
      formApi.getFormByKeyPublic(this.$route.query.key).then(res => {
         if(res.data.code === 200) {
          this.one = res.data.data.one
          this.items = JSON.parse(res.data.data.one.formItems)
          var answerCount = 0
          for(let i = 0; i < this.items.length; i++) {
            if(this.items[i].component === 'eRadio' || this.items[i].component === 'SortText' || this.items[i].component === 'LongText'
            || this.items[i].component === 'eCheckBox' 
            ) {
              this.answerTotal = this.answerTotal + 1
              this.items[i].answerId = answerCount
              answerCount++
            }
          }
         }
      })
    },
    callBack(key) {
      console.log(this.items[key])
      const answer = {
        key: this.items[key].attributes.key,
        value: this.items[key].attributes.defaultValue,
        label: this.items[key].attributes.label,
        type: this.items[key].component
      }
      this.answer[this.items[key].answerId] = answer
    },
    submitAnswer() {
      console.log(this.items)
      console.log(this.answer)
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
  width: 87vw;
  max-width:1200px;
  background: #fff;
  margin: 0 auto;
  padding: 11px;
  height: auto;
  min-height:100vh;
}
</style>