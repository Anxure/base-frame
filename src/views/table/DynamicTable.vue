<template>
  <div>
    <Row style="margin-bottom:10px">
      <Col>
      <Button type="primary" size="small" @click="toAdd">新增</Button>
      <Input placeholder="请输入内容" size="small" v-model="searchTxt" class="input-with-search">
      <Button slot="append" icon="ios-search" @click="handSearch"></Button>
      </Input>
      </Col>
    </Row>
    <Table :data="tableData" :columns="tableColumns" border style="width: 100%">
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="handleClick(row)">编辑</Button>
        <Button type="error" size="small" @click="deleteRow(row)">删除</Button>
      </template>
    </Table>
  </div>

</template>

<script>
export default {
  data () {
    return {
      tableColumns: [
        {
          title: '日期',
          key: 'date'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '省份',
          key: 'province'
        },
        {
          title: '市区',
          key: 'city'
        },
        {
          title: '地址',
          key: 'address'
        },
        {
          title: '邮编',
          key: 'zip'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }],
      searchTxt: ''
    }
  },
  methods: {
    toAdd () {
      this.$router.push('/table/dynamic-table/add');
    },
    handleClick (row) {
      console.log(row)
      this.$router.push(`/table/dynamic-table/edit/${row.date}`);
    },
    deleteRow (index) {
      console.log(index)
    },
    async handSearch () {
      const result = await this.$api.user.handSearch({ searchTxt: this.searchTxt })
      Object.assign(this, {
        tableData: result.data
      })
    }
  }
}
</script>
<style lang="less" scoped>
.input-with-search {
  width: 300px;
  float: right;
}
</style>
