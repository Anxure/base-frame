<template>
  <div class="table-content" style="width:100%;overflow:hidden" :key="'permission' + key">
    <div class="tabble-com">
      <a-radio-group v-model="radio" @change="changeRole">
        <a-radio value="admin">admin</a-radio>
        <a-radio value="edit">edit</a-radio>
        <a-radio value="add">add</a-radio>
      </a-radio-group>
    </div>
    <div class="table-btn">
      <a-button type="primary" v-permission="['add','admin']">添加</a-button>
    </div>
    <a-table :columns="columns" :data-source="tableData" rowKey="date">
      <template slot-scope="text, row, index " slot="action">
        <a-button type="primary" size="small" style="margin-right: 5px" @click="show(index)"
          v-permission="['add', 'admin']">添加</a-button>
        <a-button type="error" size="small" style="margin-right: 5px" @click="remove(index)"
          v-permission="['edit', 'admin']">编辑</a-button>
        <a-button type="error" size="small" @click="remove(index)" v-permission="['delete', 'admin']">删除</a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  name: 'DynamicTable',
  data () {
    return {
      columns: [{
        title: '日期',
        dataIndex: 'date'
      },
      {
        title: '姓名',
        dataIndex: 'name'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        customRender: val => {
          return val === 0 ? '男' : '女'
        }
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
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
    async changeRole (e) {
      const { code, data } = await this.$api.user.changeRole({
        roleName: [e.target.value]
      })
      if (code === 0) {
        this.$store.commit('SET_ROLE', data.role)
        this.key++
      }
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
