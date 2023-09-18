<template>
  <div class="componentBorder">
    <p style=" padding: 0px 16px;font-weight: 700">{{ attributes.label }}</p>
    <div style="display:flex; flex-wrap: wrap;">
      <div style="width: 50%;display: flex;flex-wrap:wrap;">
        <label style="margin-left: 9px;margin-bottom: 1px;font-weight: 600;width:90%;font-size: 12px;">{{ attributes.complexAttr[0].complexAttr }}</label>
        <input style="margin-left: 7px;margin-bottom: 11px;width:90%;height:30px;border: 1.5px solid #425c77;border-radius:4px;padding-left:7px" @change="callBack" v-model="attributes.complexAttr[0].complexVal">
      </div>
      <div style="width: 50%;display: flex;flex-wrap: wrap;">
        <label style="margin-left: 9px;margin-bottom: 1px;font-weight: 600;width:90%;font-size: 12px;">{{ attributes.complexAttr[1].complexAttr }}</label>
        <input style="margin-left: 7px;margin-bottom: 11px;width:90%;height:30px;border: 1.5px solid #425c77;border-radius:4px;padding-left:7px"  @change="callBack" v-model="attributes.complexAttr[1].complexVal">
      </div>
      <div style="width: 50%;display: flex;flex-wrap:wrap;">
        <label style="margin-left: 9px;margin-bottom: 1px;font-weight: 600;width:90%;font-size: 12px;">{{ attributes.complexAttr[2].complexAttr }}</label>
        <input style="margin-left: 7px;margin-bottom: 11px;width:90%;height:30px;border: 1.5px solid #425c77;border-radius:4px;padding-left:7px"  @change="callBack" v-model="attributes.complexAttr[2].complexVal">
      </div>
      <div style="width: 50%;display: flex;flex-wrap: wrap;">
        <label style="margin-left: 9px;margin-bottom: 1px;font-weight: 600;width:90%;font-size: 12px;">{{ attributes.complexAttr[3].complexAttr }}</label>
        <input style="margin-left: 7px;margin-bottom: 11px;width:90%;height:30px;border: 1.5px solid #425c77;border-radius:4px;padding-left:7px"  @change="callBack" v-model="attributes.complexAttr[3].complexVal">
      </div>
      <div style="width: 100%;display: flex;flex-wrap: wrap;">
        <label style="margin-left: 9px;margin-bottom: 1px;font-weight: 600;width:90%;font-size: 12px;">{{ attributes.complexAttr[4].complexAttr }}</label>
        <input style="margin-left: 7px;margin-bottom: 11px;width:95%;height:30px;border: 1.5px solid #425c77;border-radius:4px;padding-left:7px"  @change="callBack" v-model="attributes.complexAttr[4].complexVal">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['optionKey','attributes'],
  data() {
    return {

    }
  },
  created() {
    // console.log(this.attributes.complexAttr[0].complexAttr1)
  },
  methods: {
    callBack() {
      this.$emit('callBack', this.optionKey)
    }
  }
}
</script>

<style scoped>
.componentBorder {
  width: 100%;
  /* border: 2px solid #2c3e50; */
  padding: 8px 0px;
  border-radius: 4px;
  margin: 14px 0px;
  text-align: start;
}

.componentBorder:hover {
  /* border: 2px solid #2881da; */
}


</style>