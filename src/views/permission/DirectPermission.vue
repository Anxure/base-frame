<template>
  <div class="table-content" style="width:100%;overflow:hidden" :key="'permission' + key">
    <div class="tabble-com">
      <RadioGroup v-model="radio" @change="changeRole">
        <Radio label="admin">admin</Radio>
        <Radio label="edit">edit</Radio>
        <Radio label="add">add</Radio>
      </RadioGroup>
    </div>
    <div class="table-btn">
      <Button size="small" type="primary" v-permission="['add','admin']">添加</Button>
    </div>
    <Table stripe :columns="columns" :data="tableData">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">添加</Button>
        <Button type="error" size="small" style="margin-right: 5px" @click="remove(index)">编辑</Button>
        <Button type="error" size="small" @click="remove(index)">删除</Button>
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  name: 'DynamicTable',
  data () {
    return {
      columns: [{
        title: '日期',
        key: 'date'
      },
      {
        title: '姓名',
        key: 'name'
      },
      {
        title: '地址',
        key: 'address'
      },
      {
        title: '性别',
        key: 'sex'
      },
      {
        title: '电话',
        key: 'phone'
      },
      {
        title: '操作',
        slot: 'action',
        width: 300,
        align: 'center'
      }
      ],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        sex: 0,
        phone: 13880988736
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        sex: 0,
        phone: 13880988736
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        sex: 1,
        phone: 13880988736
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        sex: 0,
        phone: 13880988736
      }],
      radio: 'admin',
      key: 1
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    async changeRole (row) {
      console.log(this.$api)
      const {
        data
      } = await this.$api.user.changeRole({
        roleName: [row]
      })
      this.$store.commit('SET_ROLE', data.role)
      this.key++
    }
  }
}
</script>

<style lang="less" scoped>
.tab-com {
  margin-bottom: 20px;
}

.table-btn {
  margin: 10px 0;
}
</style>
