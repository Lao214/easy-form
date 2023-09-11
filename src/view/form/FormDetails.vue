<template>
  <div class="body">
    <el-row>
      <el-col :span="4">
        <div style="height: 95vh;background-color: #d3cfdd79;padding: 11px;overflow-y: scroll;">
              <div class="MenuNodeTitle"> Basic Element</div>
              <div class="MenuBtn"> <i class="fa fa-header" /> Heading</div>
              <div class="MenuBtn"> <i class="fa fa-text-width" /> Sort Text</div>
              <div class="MenuBtn"> <i class="fa fa-text-height" /> Long Text</div>
              <div class="MenuBtn"> <i class="fa fa-dot-circle-o" /> Radio</div>
              <div class="MenuBtn"> <i class="fa fa-check-square" /> CheckBox</div>
              <div class="MenuBtn"> <i class="fa fa-minus" /> Divider</div>
              <div class="MenuBtn"> <i class="fa fa-star-half-o" /> Score</div>
              <div class="MenuBtn"> <i class="fa fa-map-marker" /> Address</div>
              <div class="MenuBtn"> <i class="fa fa-file-image-o" /> Picture</div>
              <div class="MenuBtn"> <i class="fa fa-calendar" /> Date</div>
              <div class="MenuBtn"> <i class="fa fa-calendar-o" /> DateTime</div>
              <div class="MenuBtn"> <i class="fa fa-caret-square-o-down" /> Selector</div>
              <div class="MenuBtn"> <i class="fa fa-toggle-off" /> Switch</div>
              <el-divider></el-divider>
              <div class="MenuNodeTitle"> Complex Element</div>
              <div class="MenuBtn"> <i class="fa fa-play-circle"/> Video</div>
              <div class="MenuBtn"> <i class="fa fa-sliders"/> Slider</div>
              <div class="MenuBtn"> <i class="fa fa-list"/> List</div>
              <div class="MenuBtn"> <i class="fa fa-list-ol"/> Ordered List</div>
              <div class="MenuBtn"> <i class="fa fa-table"/> Table</div>
              <div class="MenuBtn"> <i class="fa fa-question"/> Yes/No Question</div>
              <el-divider></el-divider>
              <div class="MenuNodeTitle"> Chart Element</div>
              <div class="MenuBtn"> <i class="fa fa-area-chart"/> Area Chart</div>
              <div class="MenuBtn"> <i class="fa fa-bar-chart"/> Bar Chart</div>
              <div class="MenuBtn"> <i class="fa fa-line-chart"/> Line Chart</div>
              <div class="MenuBtn"> <i class="fa fa-pie-chart"/> Pie Chart</div>
              <el-divider></el-divider>
              <div class="MenuNodeTitle"> Business Icon Element</div>
              <div class="MenuBtn"> <i class="fa fa-apple"/> Apple</div>
              <div class="MenuBtn"> <i class="fa fa-twitter"/> Twitter</div>
              <el-divider></el-divider>
        </div>
      </el-col>
      <el-col :span="14">
        <div style="height: 95vh;background-color: #a7ce74;padding: 11px;overflow-y: scroll;">
          <div class="adaptive-div">
            <div></div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div style="height: 95vh;background-color: #d3cfdd79;padding: 11px;overflow-y: scroll;">

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

</script>

<style scoped>
  .adaptive-div {
    width: 80%; /* 将宽度设置为100%以占据父容器的全部宽度 */
    background-color: #fefefe; /* 设置背景颜色 */
    max-width: 1200px;
    min-height: 400px;
    border-radius: 10px;
    margin: 0 auto;
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

/* .outer {
  height: 81vh;
  overflow-y: scroll;
}
.inter {
  height: 87vh;
  width: 100%;
} */
</style>