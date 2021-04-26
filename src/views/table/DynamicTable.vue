<template>
  <div>
    <a-row style="margin-bottom:10px">
      <a-col>
        <a-button
          type="primary"
          @click="toAdd"
        >新增</a-button>
        <a-input
          placeholder="请输入内容"
          v-model="searchTxt"
          class="input-with-search"
        >
          <a-button
            slot="append"
            icon="ios-search"
            @click="handSearch"
          ></a-button>
        </a-input>
      </a-col>
    </a-row>
    <a-table
      rowKey="date"
      :data-source="tableData"
      :columns="tableColumns"
      border
      style="width: 100%"
    >
      <template
        slot-scope="text,row"
        slot="action"
      >
        <a-button
          type="primary"
          size="small"
          style="margin-right: 5px"
          @click="handleClick(row)"
        >编辑</a-button>
        <a-button
          type="error"
          size="small"
          @click="deleteRow(row)"
        >删除</a-button>
      </template>
    </a-table>
  </div>

</template>

<script>
export default {
  data () {
    return {
      tableColumns: [
        {
          title: '日期',
          dataIndex: 'date'
        },
        {
          title: '姓名',
          dataIndex: 'name'
        },
        {
          title: '省份',
          dataIndex: 'province'
        },
        {
          title: '市区',
          dataIndex: 'city'
        },
        {
          title: '地址',
          dataIndex: 'address'
        },
        {
          title: '邮编',
          dataIndex: 'zip'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }
      ],
      searchTxt: ''
    };
  },
  methods: {
    toAdd () {
      this.$router.push('/table/dynamic-table/add');
    },
    handleClick (row) {
      console.log(row);
      this.$router.push(`/table/dynamic-table/edit/${row.date}`);
    },
    deleteRow (index) {
      console.log(index);
    },
    async handSearch () {
      const result = await this.$api.user.handSearch({
        searchTxt: this.searchTxt
      });
      Object.assign(this, {
        tableData: result.data
      });
    }
  }
};
</script>
<style lang="less" scoped>
.input-with-search {
  width: 300px;
  float: right;
}
</style>
