<template>
    <div>  
        <el-row>
            <el-col :span="4">
                <LeftBodyVue></LeftBodyVue>
            </el-col>
            <el-col :span="13">
                <div class="center-body">
                    <h2> 计分公式 </h2>
                    <div class="logic-container">
                        <div v-for="(item,index) in logics" :key="index" class="results">
                            <span> {{ item }}</span>
                            <span @click="cutResult(item,index)"> <i class="el-icon-delete"></i> </span>
                        </div>
                        <div>
                            {{ logic }}  <span style="color: grey; margin-right: .2rem;" v-show="!logic">请点击右侧运算符和数据项组成您的计算公式...</span> <span class="blinking">_</span>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="right-body">
                    <div class="operators">
                        <h2 style="margin: .41rem;">运算符</h2>
                        <div class="button-container">
                            <button v-for="(item,index) in operators" :key="index" class="button-3d" @click="addOperators(item)">
                                <div class="button-top">
                                    <span class="material-icons">{{ item }}</span>
                                </div>
                                <div class="button-bottom"></div>
                                <div class="button-base"></div>
                            </button>
                            <button class="button-3d" @click="delOne()">
                                <div class="button-top">
                                    <span class="material-icons">
                                        <svg t="1725504213278" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8753" width="22" height="22"><path d="M977.408 192v696.576H279.936L64 534.848 280.256 192h697.152z m-64 64H315.584L139.328 535.424l176.576 289.152h597.504V256z m-216.704 139.264l45.248 45.248-99.84 99.776L742.016 640l-45.248 45.248-99.84-99.84-99.712 99.84L451.84 640 551.68 540.16 451.84 440.576l45.312-45.248 99.776 99.776 99.776-99.84z" fill="#ffffff" p-id="8754"></path></svg>
                                    </span>
                                </div>
                                <div class="button-bottom"></div>
                                <div class="button-base"></div>
                            </button>
                            <button class="button-3d" @click="clear()">
                                <div class="button-top">
                                    <span class="material-icons" style="font-size: 1.2rem;">清空</span>
                                </div>
                                <div class="button-bottom"></div>
                                <div class="button-base"></div>
                            </button>
                            <button class="button-3d" @click="update()">
                                <div class="button-top">
                                    <span class="material-icons" style="font-size: 1.2rem;">保存</span>
                                </div>
                                <div class="button-bottom"></div>
                                <div class="button-base"></div>
                            </button>
                        </div>
                    </div>

                    <div class="items">
                        <h2 style="margin: .41rem;">可用数据项（组件Key）</h2>
                        <div class="items-list">
                            <div v-for="(item, index) in formItems" :key="index" class="item">
                                <button class="button" @click="addItem(item)">{{ item.attributes.key }}</button>
                            </div>
                        </div>
                    </div>


                    <div class="items">
                        <h2>结果集</h2>
                        <div class="items-list">
                            <div v-for="(item, index) in results" :key="index" class="item">
                                <button class="button" @click="addResult(item)">{{ item }}</button>
                            </div>
                        </div>
                    </div>

                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import LeftBodyVue from '@/components/formDetails/LeftBody.vue'
import formApi from '@/api/formApi';

export default {
    components: {
        LeftBodyVue
    },
    data() {
        return {
            operators: ['+','-','x','÷','=','(',')'],
            formItems: [],
            results: [],
            logic: '',
            logics: [],
        }
    },
    methods: {
        update() {
            if(this.logics.length === 0) {
                this.$message.warning("请至少算出一个结果集")
                return
            }
            const dataForm = {
                formKey: this.$route.query.key,
                evaluateLogic: this.logics.join(',')
            }
            formApi.updateForm(dataForm).then(res => {
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            })
        },
        getFormByKey() {
            formApi.getFormByKey(this.$route.query.key).then(res => {
                if(res.code === 200) {
                    let items = JSON.parse(res.data.one.formItems)
                    items.forEach(element => {
                        if(element.component === 'eRadio') {
                            this.formItems.push(element)
                        }
                    })
                    this.logics = res.data.one.evaluateLogic.split(',')
                    this.logics.forEach(element => {
                        this.results.push(element.split('=')[1])
                    });
                }
            })
        },
        addOperators(item) {
            if(this.logic.length === 0 && (item !== '(' && item !== ')' )) {
                this.$message.warning("请先输入数据项或括弧")
                return
            }
            if(item !== '(' && item !== ')' && item !== '=') {
                if (['+', '-', 'x', '÷','=','(',')'].includes(this.logic.slice(-1))) {
                    this.$message.warning("运算符不能连续输入")
                    return
                }
            } else if(item === '(' || item === ')') {
                if (['(',')'].includes(this.logic.slice(-1))) {
                    this.$message.warning("不能连续输入括弧")
                    return
                }
            } else if(item === '=') {
                if (['+', '-', 'x', '÷'].includes(this.logic.slice(-1))) {
                    this.$message.warning("不能以运算符结尾")
                    return
                }
                this.logic += item
                this.results.push('result' + (this.logics.length + 1))
                this.logic += 'result' + (this.logics.length + 1)
                this.logics.push(this.logic)
                this.logic = ''
                return
            }
            this.logic += item
        },
        delOne() {
            this.logic = this.logic.slice(0, -1)
        },
        addItem(item) {
            if (['}'].includes(this.logic.slice(-1))) {
                this.$message.warning("请不要连续输入数据项或结果集")
                return
            }
            this.logic += '{{' + item.attributes.key + '}}'
        },
        addResult(item) {
            if (['}'].includes(this.logic.slice(-1))) {
                this.$message.warning("请不要连续输入数据项或结果集")
                return
            }
            this.logic += '{{' + item + '}}'
        },
        clear() {
            this.logic = ''
        },
        cutResult(item, index) {
            const resultToDelete = this.results[index]; // 获取即将删除的 result

            // 遍历 logics，检查是否有其他元素使用了该 result
            const isUsed = this.logics.some((element, i) => {
                // 排除当前要删除的 index 元素进行判断
                return i !== index && element.includes(resultToDelete);
            });

            // 如果其他元素中使用了该 result，中止方法并显示警告
            if (isUsed) {
                this.$message.warning("其他元素中使用了此 result，无法删除！");
                return;
            }

            // 如果没有其他元素使用该 result，则删除 logics 和 results 中的元素
            this.logics.splice(index, 1);
            this.results.splice(index, 1);
        }
    },
    mounted() {
        this.getFormByKey()
    }

}
</script>

<style scoped>

.right-body {
    min-height: 100vh;
    height: auto;
    background-color: #0a2e3e;
    padding: 1rem;
    box-sizing: border-box;
    overflow-y: scroll;
    color: #9398b8;
}

.center-body {
    height: 100vh;
    background: #f3f3fd;
    padding: 1rem;
    overflow-y: scroll;
    box-sizing: border-box;
}


/* From Uiverse.io by Z4drus */ 
.button-container {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    margin: .49rem;
}

.button-3d {
    -webkit-appearance: none;
    appearance: none;
    position: relative;
    border-width: 0;
    padding: 0 .4rem;
    min-width: 3.6rem;
    min-height: 3.9rem;
    box-sizing: border-box;
    background: transparent;
    font: inherit;
    cursor: pointer;
    margin: .5rem;
    border-radius: .8rem;
}

.button-top {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    padding: 8px 1rem;
    transform: translateY(0);
    color: #fff;
    background-image: linear-gradient(145deg, #6a11cb, #2575fc);
    text-shadow: 0 -1px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    transition: transform 0.3s, border-radius 0.3s, background 10s;
}

.button-3d:active .button-top {
    border-radius: 10px 10px 8px 8px / 8px;
    transform: translateY(2px);
    background-image: linear-gradient(145deg, #2575fc, #6a11cb);
}

.button-bottom {
    position: absolute;
    z-index: 1;
    bottom: 4px;
    left: 4px;
    border-radius: 20px;
    padding-top: 6px;
    width: calc(100% - 8px);
    height: calc(100% - 10px);
    background-image: linear-gradient(145deg, #2575fc, #6a11cb);
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.5);
    transition: border-radius 0.2s, padding-top 0.2s;
}

.button-base {
    position: absolute;
    z-index: 0;
    top: 4px;
    left: 0;
    border-radius: 20px;
    width: 100%;
    height: calc(100% - 4px);
    background-color: rgba(0, 0, 0, 0.15);
    box-shadow: 0 1px 1px 0 rgba(255, 255, 255, 0.75), inset 0 2px 2px rgba(0, 0, 0, 0.25);
    transition: border-radius 0.2s, padding-top 0.2s;
}

.button-3d:active .button-bottom {
  border-radius: 10px 10px 8px 8px / 8px;
  padding-top: 0;
}

.button-3d:active .button-base {
  border-radius: 10px 10px 8px 8px / 8px;
}

.material-icons {
    font-size: 1.5rem;
}


.items-list {
    display: flex;
    flex-wrap: wrap;
}

.button {
    color: #ecf0f1;
    font-size: .9rem;
    background-color: #e67e22;
    border: 1px solid #f39c12;
    border-radius: 5px;
    cursor: pointer;
    padding: .3rem;
    box-shadow: 0px 6px 0px #d35400;
    transition: all 0.1s;
    margin: .4rem;
}

.button:active {
    box-shadow: 0px 2px 0px #d35400;
    position: relative;
    top: 2px;
}

.logic-container{
    /* display: flex;
    flex-wrap: wrap; */
    text-align: left;
    width: 100%;
    min-height: 30rem;
    border: 1px solid #cecece;
    padding: 1rem;
    box-sizing: border-box;
}

.blinking {
    animation: blink .41s step-start infinite;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}

.results {
    letter-spacing: .1rem;
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 1rem;
    width: 100%;
    padding: .31rem;
    border-radius: .2rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
}
.results:hover {
    background: rgb(182, 203, 217);
}
</style>