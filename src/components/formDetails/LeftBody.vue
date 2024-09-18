<template>
    <div class="left-body">   
        <div v-show="$route.path === '/formDetails'" class="tabs">
            <input v-model="isChecked" value="组件" name="fav_language" id="html" type="radio" class="input"/>
            <label for="html" class="label">组件</label>
            <input v-model="isChecked" value="功能" name="fav_language" id="css" type="radio" class="input"/>
            <label for="css" class="label">功能</label>
        </div>

        <div v-show="isChecked === '功能'" style="padding: 1rem;">
            <div class="MenuBtn" style="margin:1rem auto;" @click="gotoRelease()"> <i class="fa fa-send" /> 发布</div>
            <div class="MenuBtn" style="margin:1rem auto;" @click="gotoLogic()"> <i class="fa fa-meh-o" /> 反馈</div>
            <div class="MenuBtn" style="margin:1rem auto;" @click="gotoData()"> <i class="fa fa-table" /> 数据表格 </div>
            <div class="MenuBtn" style="margin:1rem auto;"> <i class="fa fa-bar-chart" /> 数据图表（未开放）</div>
            <div class="MenuBtn" style="margin:1rem auto;"> <i class="fa fa-mobile" /> 手机浏览（未开放）</div>
            <div class="MenuBtn" style="margin:1rem auto;" @click="gobackDetails()" v-show="$route.path !== '/formDetails'"> <i class="el-icon-arrow-left" /> 返回表单详情</div>
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
</template>

<script>
export default {
    props: [],
    data() {
        return {
            isChecked: this.$route.path === '/formDetails' ? '组件' : '功能',
        }
    },
    methods: {
        gotoRelease() {
          window.open('/share?key=' + this.$route.query.key)
          // this.$router.push({ path: '/form/share', query: { key: this.$route.query.key, type: 'details'  } })
        },
        gotoLogic() {
          window.open('/logic?key=' + this.$route.query.key)
        },
        gobackDetails() {
          if(this.$route.path === '/formDetails') {
            return
          }
          this.$router.push({ path: '/formDetails', query: { key: this.$route.query.key } })
        },
        gotoData() {
          if(this.$route.path === '/formData') {
            return
          }
          this.$router.push({ path: '/formData', query: { key: this.$route.query.key } })
        },
        addHeader(name, title, subtitle) {
            this.$emit('addHeader', name, title, subtitle)
        },
        addBasicComponents(name, label, defaultValue) {
            this.$emit('addBasicComponents', name, label, defaultValue)
        },
        addRadio(name, label, defaultValue) {
            this.$emit('addRadio', name, label, defaultValue)
        },
        addStar(name, label, defaultValue) {
            this.$emit('addStar', name, label, defaultValue)
        },
        addSlider(name, label, defaultValue) {
            this.$emit('addSlider', name, label, defaultValue)
        }
    }
}
</script>

<style lang="scss" scoped>
.left-body {
  @include nav-body;
  text-align: left;
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
  background-color: #b3dcfd6a;
  border-radius: 5px;
  color: black
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
</style>