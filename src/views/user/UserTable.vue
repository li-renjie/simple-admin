<template>
  <div class="user">
    <el-col :span="24">
      <el-form :inline="true" @submit.native.prevent style="float:left">
        <el-form-item>
          <el-input v-model="searchKey" @keyup.enter.native="handleSearch" placeholder="用户名/邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" icon="el-icon-search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleExport" icon="el-icon-download">导出</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    
    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange" 
      v-loading="loading" 
      element-loading-text="拼命加载中" 
      highlight-current-row border 
      style="width:100%"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="用户名" prop="name" width="110" sortable></el-table-column>
      <el-table-column label="邮箱" prop="email" sortable></el-table-column>
      <el-table-column label="用户组" prop="group" sortable></el-table-column>
      <el-table-column label="职位" prop="title"></el-table-column>
      <el-table-column label="创建时间" prop="create_date" ></el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.active ? '激活':'锁定' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" @click="hendleDelete(scope.$index, scope.row)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <el-col :span="24" style="margin-top:15px">
      <el-button 
        :disabled="this.selected.length===0" 
        @click="handleMultipleDelete" 
        size="small" 
        type="danger" 
        style="float:left"
      >
        批量删除
      </el-button>
      <el-pagination
        :total="total" 
        :page-size="pageSize" 
        :disabled="disablePagination"
        @current-change="handleCurrentChange" 
        @size-change="handleSizeChange" 
        :page-sizes="[10, 20, 30, 50]" 
        background layout="total, sizes, prev, pager, next, jumper" 
        style="float:right"
      >
      </el-pagination>
    </el-col>
    <user-form 
      v-if="dialogVisible"
      :dialog-visible="dialogVisible" 
      :is-edit-dialog="isEditDialog" 
      :initial-form-data="initialFormData"
      @close-dialog="handleCloseDialog"
      @update-data="getTableData"
    ></user-form>
  </div>
</template>

<script>
import UserForm from '@/views/user/UserForm'
import { getUsers, delUser, batchDelUser } from '@/api/user-table'

export default {
  name: 'user-table',
  components: {
    UserForm
  },
  props: {
    //
  },
  data() {
    return {
      searchKey: '',     //搜索框输入
      tableData: [],     //保存当前显示的数据
      allTableData: [],  //保存所有数据
      loading: false,    //是否提示加载中
      selected: [],      //保存被选中的行
      total: 0,          //总行数
      page: 1,           //当前页码
      pageSize: 10,      //每页显示行数
      disablePagination: false,    //禁用分页
      dialogVisible: false,        //是否显示新增/编辑对话框
      isEditDialog: false,        //是否为编辑对话框
      initialFormData: {          //传递给新增/编辑对话框的表单数据
        id: '',
        name: '',
        email: '',
        group: '',
        title: 'dev',
        //create_date: '',
        active: 'true',
      },
    }
  },
  methods:{
    handleSelectionChange(val) {
      //选择项发生变化时触发执行
      this.selected = val;
    },
    handleEdit(index, row) {
      //编辑指定行
      this.initialFormData = {
        id: row.id,
        name: row.name,
        email: row.email,
        group: row.group,
        title: row.title,
        active: row.active.toString(),
      }
      this.dialogVisible = true
      this.isEditDialog = true
    },
    hendleDelete(index, row) {
      //删除指定行
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确认',
        cancleButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //删除
        this.loading = true
        delUser(row.id).then((res) => {
          this.loading = false
          this.$message({
            message:'删除成功',
            type:'success'
          })
          this.getTableData()   //重新获取表格数据
        }).catch(() => {
          this.$message({
            message:'删除失败！',
            type:'error'
          })
        })
      }).catch(() => {
        //取消删除
      })
    },
    handleMultipleDelete() {
      //批量删除
      this.$confirm('确认删除选中记录？', '提示', {
        confirmButtonText: '确认',
        cancleButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        let idList = this.selected.map(item => { return item.id })
        batchDelUser(idList).then((res) => {
          this.loading = false
          this.$message({
            message:'批量删除成功',
            type:'success'
          })
          this.getTableData()   //重新获取表格数据
        }).catch(() => {
          this.$message({
            message:'批量删除失败！',
            type:'error'
          })
        })
      }).catch(() => {
        //取消删除
      })
    },
    handleSearch() {
      //搜索
      if (this.searchKey === '') {
        this.tableData = this.getPage(this.page, this.pageSize)
        this.disablePagination = false
      } else {
        let result =  this.allTableData.filter((row) => {
          if (row.name.includes(this.searchKey) || row.email.includes(this.searchKey)) {
            return true
          } else {
            return false
          }
        })
        this.tableData = result
        this.disablePagination = true
      }
    },
    handleAdd() {
      //新增
      this.initialFormData = {
        id: '',
        name: '',
        email: '',
        group: '',
        title: '',
        active: 'true',
      }
      this.dialogVisible = true
      this.isEditDialog = false
    },
    handleExport() {
      //导出表数据
    },
    getPage(page, pageSize) {
      //从allTableData数组中获取某页数据
      // if( page>0 && (page+pageSze) < this.allTableData.length ){
        return this.allTableData.slice(pageSize*(page-1), pageSize*(page))
      // }
    },
    getTableData() {
      //获取表格数据
      this.loading = true
      getUsers().then(res => {
        this.allTableData = res.data.data
        this.total = res.data.data.length
        this.tableData = this.getPage(this.page, this.pageSize)
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    handleCurrentChange(val) {
      //选择分页时触发
      this.page = val
      this.tableData = this.getPage(this.page, this.pageSize)
    },
    handleSizeChange(val) {
      //pageSize改变时触发
      this.pageSize = val
      this.tableData = this.getPage(this.page, this.pageSize)
    },
    handleCloseDialog() {
      //关闭对话框
      this.dialogVisible = false
    }
  },
  mounted() {
    this.getTableData();
  }
}
</script>

<sytle lang="less">
.el-table td, .el-table th {
  padding: 8px 0px 8px 0px
}
</sytle>