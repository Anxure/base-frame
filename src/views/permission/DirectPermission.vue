 <template>
  <div class="table-content" style="width:100%;overflow:hidden" :key="'permission' + key">
    <div class="tabble-com">
      <el-radio-group v-model="radio" @change="changeRole">
        <el-radio label="admin">admin</el-radio>
        <el-radio label="edit">edit</el-radio>
        <el-radio label="add">add</el-radio>
      </el-radio-group>
    </div>
    <div class="table-btn">
      <el-button size="small" type="primary" v-permission="['add','admin']">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">
          {{scope.row.sex | sexFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话">
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" v-permission="['admin','edit']" size="small">查看
          </el-button>
          <el-button type="primary" size="small"  v-permission="['admin','edit']">编辑</el-button>
          <el-button type="danger" size="small"  v-permission="['admin']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'DynamicTable',
  data () {
    return {
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
      const { data } = await this.$api.user.changeRole({ roleName: [row] })
      this.$store.commit('SET_ROLE', data.role)
      this.key++
    }
  }
}
</script>

<style scoped lang="scss">
.tab-com {
  margin-bottom: 20px;
}
.table-btn {
  margin: 10px 0;
}
</style>
