<template>
    <div class="body">
        <el-row>
            <el-col :span="4">
                <leftBody></leftBody>
            </el-col>
            <el-col :span="10" style="padding: 1rem 2rem;"> 
                <div class="phone-shell">
                    <div class="phone-earpiece">

                    </div>
                    <div class="phone-screen">
                        <div class="form-body">
                            <component v-for="(item, index) in items" :key="index" @callBack="callBack" :is="item.component" :attributes="item.attributes" :option-key="index"/>
                            <el-button type="success" style="padding: 11px 27px;margin: .5rem auto;">
                                提交
                            </el-button>
                        </div>
                    </div>
                    <div class="phone-home-button">

                    </div>
                </div>
            </el-col>
            <el-col :span="10">
                
            </el-col>
        </el-row>
    </div>
</template>

<script>
import LeftBody from '@/components/formDetails/LeftBody.vue'
/** 问卷组件 **/
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
/** API **/
import formApi from '@/api/formApi'

export default {
    components: {
        LeftBody,
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
    created() {
        this.getFormByKey()
    },
    data() {
        return {
            key: this.$route.query.key,
            items: [],
            requires: []
        }
    },
    methods: {
        getFormByKey() {
            formApi.getFormByKeyPublic(this.$route.query.key).then(res => {
                if (res.code === 200) {
                    this.one = res.data.one
                    this.logic = res.data.one.evaluateLogic
                    this.logicUI = res.data.one.evaluateUi
                    this.items = JSON.parse(res.data.one.formItems)
                    var answerCount = 0
                    for (let i = 0; i < this.items.length; i++) {
                        if (this.items[i].component === 'eRadio' || this.items[i].component === 'SortText' || this.items[i].component === 'LongText'
                            || this.items[i].component === 'eCheckBox' || this.items[i].component === 'eStar' || this.items[i].component === 'eAddress'
                            || this.items[i].component === 'eDate' || this.items[i].component === 'eSelector' || this.items[i].component === 'eSlider'
                        ) {
                            this.answerTotal = this.answerTotal + 1
                            this.items[i].answerId = answerCount
                            if (this.items[i].attributes.require) {
                                this.requires.push(this.items[i].answerId)
                            }
                            answerCount++
                            if (this.items[i].attributes.defaultValue) {
                                this.answer[answerCount - 1] = {
                                    key: this.items[i].attributes.key,
                                    label: this.items[i].attributes.label,
                                    type: this.items[i].component,
                                    value: this.items[i].attributes.defaultValue,
                                    require: this.items[i].attributes.require
                                }
                            }
                        }
                    }
                    // console.log(this.answer)
                    // console.log(this.requires)
                    // console.log(this.items)
                }
            })
        },
        callBack(key) {
            if (this.items[key].component === 'eButton') {
                this.submitAnswer()
            }
            else if (this.items[key].component === 'eAddress') {
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
            } else {
                const answer = {
                    key: this.items[key].attributes.key,
                    value: this.items[key].attributes.defaultValue,
                    label: this.items[key].attributes.label,
                    type: this.items[key].component,
                    require: this.items[key].attributes.require
                }
                if (this.items[key].attributes.defaultLabel) {
                    answer.valueLabel = this.items[key].attributes.defaultLabel
                }
                console.log(answer)
                this.answer[this.items[key].answerId] = answer
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.body {
    background-color: #83bbe800;
    text-align: center;
    --radius: 8px;
    --border: 4px;
    --height: 2rem;
    --speed: 0.25s;
}

.phone-shell {
    width: 375px;
    height: 667px;
    border-radius: 1.7rem;
    background: linear-gradient(145deg, #2c2c2c, #3a3a3a); /* 金属质感的深浅渐变 */
    box-shadow:
        inset 0 2px 6px rgba(255, 255, 255, 0.1), /* 内部高光 */
        inset 0 -4px 8px rgba(0, 0, 0, 0.6),     /* 内部阴影 */
        0 10px 20px rgba(0, 0, 0, 0.6),          /* 外部主要阴影 */
        0 20px 40px rgba(0, 0, 0, 0.3),          /* 柔和外发光 */
        0 0 12px rgba(80, 80, 80, 0.4);          /* 外壳的微微发光 */
    border: 1px solid rgba(255, 255, 255, 0.1);   /* 微弱边框让外壳更清晰 */
}

.phone-earpiece {
    width: 20%; /* 稍微加宽，比例更自然 */
    height: 0.35rem; /* 高度略提升，更符合真实听筒条 */
    margin: 0 auto;
    margin-top: 5%;
    border-radius: 0.2rem;
    background: linear-gradient(180deg, #4a4a4a, #1f1f1f); /* 深浅渐变制造金属条质感 */
    box-shadow:
        inset 0 1px 2px rgba(255, 255, 255, 0.2), /* 内部高光 */
        inset 0 -1px 2px rgba(0, 0, 0, 0.5),      /* 内部阴影 */
        0 1px 3px rgba(0, 0, 0, 0.4);             /* 外部轻微阴影 */
}

.phone-screen {
    width: 87%;
    height: 84%;
    margin: .5rem auto;
    background: #a7ce74;
    border-radius: .15rem;
    overflow: scroll;
    padding: .7rem;
}

.form-body {
    background: white;
    border-radius: .1rem;
    padding: .7rem;
}

.phone-home-button {
    margin: 0.7rem auto;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, #3a3a3a, #1a1a1a 70%, #000000 100%);
    box-shadow:
        inset 0 2px 4px rgba(255, 255, 255, 0.1), /* 内部轻微高光 */
        inset 0 -3px 6px rgba(0, 0, 0, 0.7),      /* 内部阴影 */
        0 4px 8px rgba(0, 0, 0, 0.8);             /* 外部投影 */
    border: 1px solid rgba(255, 255, 255, 0.08);  /* 边缘轻微反光 */
    position: relative;
}

/* 模拟玻璃反光 */
.phone-home-button::after {
    content: '';
    position: absolute;
    top: 20%;
    left: 20%;
    width: 60%;
    height: 60%;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15), transparent 70%);
    pointer-events: none;
}
</style>