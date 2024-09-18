<template>
    <div>
        <el-row>
            <el-col :span="4">
                <LeftBodyVue></LeftBodyVue>
            </el-col>
            <el-col :span="20">
                <div class="main-body">
                    <div class="InputContainer">
                        <input type="text" name="text" class="input" id="input" placeholder="Search">
                        
                        <!-- <label for="input" class="labelforsearch">
                            <svg viewBox="0 0 512 512" class="searchIcon"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
                        </label> -->
                        <div class="border"></div>
                        
                        <button class="micButton">
                            <i class="el-icon-search"></i>
                        </button>
                    </div>

                    <div class="data-table-body">
                        <!-- 正文表格 -->
                        <el-table class="table-list" :data="tableData" stripe style="width: 100%" max-height="800" border>
                            <el-table-column  type="selection" width="55"> </el-table-column>
                            <el-table-column v-for="(item,index) in tableHead" :key="index" :label="item.label" :property="item.property" :index="item.index" align="center" width="160">
                                <template slot-scope="scope">
                                    <div>
                                        <p v-if="scope.column.property !== 'value'">{{scope.row[scope.column.property]}}</p>
                                        <p v-else>{{ scope.row.answerDetails[index-1] ? scope.row.answerDetails[index-1].value : '' }}</p>
                                    </div>
                                </template>

                                <!-- 添加表头样式 -->
                                <template slot="header">
                                    <div class="header-cell">{{ item.label }}</div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import LeftBodyVue from '@/components/formDetails/LeftBody.vue'
import answerApi from '@/api/answerApi'

export default {
    components: {
        LeftBodyVue
    },
    data() {
        return {
            total: 0, // 数据库中的总记录数
            page: 1, // 默认页码
            limit: 10, // 每页记录数
            searchObj: {}, // 查询表单对象
            tableData: [],
            multipleSelection: [],
            tableHead: [],
            // questionStatisticsData:[
            //     {
            //         "classNo":1,
            //         "grade":2019,
            //         "id":553,
            //         "items":[
            //             {
            //                 "count":0,
            //                 "itemName":"229"
            //             },
            //             {
            //                 "count":0,
            //                 "itemName":"230"
            //             },
            //             {
            //                 "count":0,
            //                 "itemName":"231"
            //             },
            //             {
            //                 "count":0,
            //                 "itemName":"232"
            //             },
            //             {
            //                 "count":0,
            //                 "itemName":"233"
            //             },
            //             {
            //                 "count":0,
            //                 "itemName":"234"
            //             },
            //             {
            //                 "count":0,
            //                 "itemName":"235"
            //             },
            //             {
            //                 "count":0,
            //                 "itemName":"236"
            //             },
            //             {
            //                 "count":0,
            //                 "itemName":"237"
            //             },
            //             {
            //                 "count":0,
            //                 "itemName":"238"
            //             },
            //             {
            //                 "count":0,
            //                 "itemName":"239"
            //             },
            //             {
            //                 "count":0,
            //                 "itemName":"240"
            //             }
            //         ],
            //         "name":"咖啡",
            //         "studentCount":24,
            //         "submitCount":0,
            //         "title":"班主任技能评定"
            //     },
            //     {
            //         "classNo":2,
            //         "grade":2018,
            //         "id":554,
            //         "items":[
            //             {
            //                 "count":1,
            //                 "itemName":"229"
            //             },
            //             {
            //                 "count":0,
            //                 "itemName":"230"
            //             },
            //             {
            //                 "count":0,
            //                 "itemName":"231"
            //             },
            //             {
            //                 "count":0,
            //                 "itemName":"232"
            //             },
            //             {
            //                 "count":1,
            //                 "itemName":"233"
            //             },
            //             {
            //                 "count":0,
            //                 "itemName":"234"
            //             },
            //             {
            //                 "count":0,
            //                 "itemName":"235"
            //             },
            //             {
            //                 "count":0,
            //                 "itemName":"236"
            //             },
            //             {
            //                 "count":1,
            //                 "itemName":"237"
            //             },
            //             {
            //                 "count":0,
            //                 "itemName":"238"
            //             },
            //             {
            //                 "count":0,
            //                 "itemName":"239"
            //             },
            //             {
            //                 "count":0,
            //                 "itemName":"240"
            //             }
            //         ],
            //         "name":"张三",
            //         "studentCount":3,
            //         "submitCount":1,
            //         "title":"班主任技能评定"
            //     }
            // ],
        }
    },
    mounted() {
        this.fetchData()
        // this.getQuestionStatistics()
    },
    methods: {
        getQuestionStatistics() {
           console.log(this.tableData)
            // 动态部分的表头
            const tableHead = []
            let selectStatistics = this.tableData[0].answerDetails
            selectStatistics.forEach((item, index) => {
                //这里是根据数据循环得到的动态的表头
                tableHead.push({ index: index, property: 'value' ,label: item.label }) // 动态表头
            })
            // 这里是固定的表头
            const anotherTableHead = [
                {
                    label: '提交时间',
                    property: 'createTime'
                },
            ]
            // 合并动态部分的表头
            this.tableHead = [...anotherTableHead, ...tableHead]; // 表头信息
            console.log(this.tableHead)
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row)
                })
            } else {
                this.$refs.multipleTable.clearSelection()
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        fetchData(page = 1) {
            this.loadingBoolean = true
            this.page=page
            this.searchObj.formKey = this.$route.query.key
            answerApi.getPageList(this.page,this.limit,this.searchObj).then(res => {
                if(res.code === 200) {
                    this.tableData = res.data.data.records
                    this.total = res.data.data.total
                    if(this.tableData.length > 0) {
                        this.tableData.forEach(element => {
                            element.answerDetails = JSON.parse(element.answerDetails)
                        })
                    }
                    this.getQuestionStatistics()
                    // console.log(this.tableData)
                }
            })
        }
    }
}
</script>

<style scoped>

.main-body {
    padding: 1rem;
}

/* From Uiverse.io by vinodjangid07 */ 
.InputContainer {
  height: 40px;
  width: 17rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  padding-left: 15px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.175);
  margin-bottom: 1rem;
}

.input {
  width: 15rem;
  height: 100%;
  border: none;
  outline: none;
  font-size: 0.9em;
  caret-color: rgb(255, 81, 0);
}

.labelforsearch {
  cursor: text;
  padding: 0px 12px;
}

.searchIcon {
  width: 13px;
}

.border {
  height: 40%;
  width: 1.3px;
  background-color: rgb(223, 223, 223);
}

.micIcon {
  width: 12px;
}

.micButton {
  padding: 0px 15px 0px 12px;
  border: none;
  background-color: transparent;
  height: 40px;
  cursor: pointer;
  transition-duration: .3s;
  color: rgb(114, 114, 114);
}

.micButton:hover {
  background-color: rgb(255, 230, 230);
  transition-duration: .9s;
  color: rgb(255, 81, 0);
}


.header-cell {
    white-space: nowrap; /* 不换行 */
    overflow: hidden; /* 超出隐藏 */
    text-overflow: ellipsis; /* 超出部分显示为... */
    max-width: 150px; /* 你可以根据实际需要设置最大宽度 */
    display: inline-block; /* 需要配合 display inline-block 或 block */
}

.el-table th .cell {
    white-space: nowrap; /* 保持表头单行显示 */
    overflow: hidden;
    text-overflow: ellipsis;
}

</style>