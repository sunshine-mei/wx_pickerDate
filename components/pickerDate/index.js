const date = require("../../utils/date.js");
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    fields: {
      type: String,
      value: 'day'
    },
    quick: {
      type: Boolean,
      value: false
    },
    placeholder: {
      type: String,
      value: ''
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    pickerDateshow: false,
    picker_btn: ['取消', '确定'],
    years: [],
    months: [],
    days: [],
    year: date.nowYear,
    month: date.nowMonth,
    day: date.nowDay,
    value: [], //选中值的下标
    selectDate: ''
  },
  methods: {
    // 打开选框
    showBirthday: function () {
      date.setDate(this.data.quick, this.data.year, this.data.month, this.data.day, this)
      this.setData({
        pickerDateshow: true
      })
      this.value = this.data.value;// 记录改变前的日期
    },
    // 关闭选框
    selectBirthday: function (e) {
      let index = e.currentTarget.dataset.index;
      if (index && this.val) { // 确定选择 更换改变后的日期
        date.setDate(this.data.quick, this.data.years[this.val[0]], this.data.months[this.val[1]], this.data.days[this.val[2]], this)
      } else { // 取消选择 还原改变前的日期
        date.setDate(this.data.quick, this.data.years[this.value[0]], this.data.months[this.value[1]], this.data.days[this.value[2]], this)
      }
      this.setData({
        pickerDateshow: false,
      })
      let res = ''
      if (this.data.year === '至今') {
        res = this.data.year
      } else if (this.data.fields === 'year') {
        res = this.data.year
      } else if (this.data.fields === 'month') {
        res = this.data.year + '-' + this.data.month
      } else {
        res = this.data.year + '-' + this.data.month + '-' + this.data.day
      }
      this.setData({
        selectDate: res
      })
      this.triggerEvent('changeDate', res)
    },
    bindChange: function (e) {
      let val = e.detail.value;
      this.val = e.detail.value; //记录改变后的日期
      date.setDate(this.data.quick, this.data.years[val[0]], this.data.months[val[1]], this.data.days[val[2]], this)
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
})
