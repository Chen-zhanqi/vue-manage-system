<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-user"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div class="handle-box">
                <el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="delAllSelection"
                >批量删除
                </el-button>
                <el-input v-model="query.search_kw" placeholder="请输入用户名称 手机号" class="handle-input mr10"
                          style="width: 200px"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <!--                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>-->
                <el-table-column label="缩略图" align="center" width="60" style="height: 30px">
                    <template slot-scope="scope">
                        <el-image
                                class="table-td-thumb"
                                :src="scope.row.head_logo"
                                :preview-src-list="[scope.row.head_logo]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="用户名" width="150"></el-table-column>
                <el-table-column prop="mobile" label="手机号" width="150"></el-table-column>
                <el-table-column prop="grade_code" label="用户级别" width="100"></el-table-column>
                <el-table-column prop="status" label="用户状态" width="100"></el-table-column>
                <el-table-column prop="create_time" label="咨询时间"></el-table-column>
                <el-table-column prop="broker" label="经纪人"></el-table-column>
                <el-table-column prop="follow_time" label="跟进(天)" width="120" sortable></el-table-column>
                <el-table-column prop="auction_start" label="浏览记录" width="150">
                    <template slot-scope="scope">
                        <el-button type="text" @click="userView(scope.$index, scope.row.id)">查看浏览记录</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row.id)"
                        >编辑
                        </el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.pageIndex"
                        :page-size="query.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>

            <!-- 编辑弹出框 -->
            <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
                <el-form ref="form" :model="form" label-width="70px">
                    <h3>基本信息</h3>
                    <br>
                    <el-row :gutter="10">
                        <el-col :span="6">
                            <el-form-item label="昵称">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="注册号码">
                                <el-input v-model="form.mobile" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="等级">
                                <el-select v-model="form.grade_code" placeholder="等级" clearable style="width: 80px">
                                    <el-option
                                            v-for="item in grade_code_options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="经纪人">
                                <el-input v-model="form.broker" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>

                    </el-row>

                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>

            </el-dialog>

            <!-- 浏览记录弹出框 -->
            <el-dialog title="浏览记录" :visible.sync="userViewisible" width="40%">
                <el-table
                        :data="viewDate"
                        border
                        class="table"
                        ref="multipleTable"
                        header-cell-class-name="table-header"
                >
                    <el-table-column prop="title" label="标的" width=""></el-table-column>
                    <el-table-column prop="price" label="价格" width="100"></el-table-column>
                    <el-table-column prop="view_count" label="次数" width="50"></el-table-column>
                    <el-table-column prop="update_time" label="时间" width="150"></el-table-column>
                </el-table>

                <span slot="footer" class="dialog-footer">
            </span>

            </el-dialog>

        </div>
    </div>
</template>

<script>
    import { getUserInfo, getUserList, getUserView } from '../../../api';

    export default {
        name: 'UserList',
        data() {
            return {
                query: {
                    'page_id': 1,
                    'search_kw': '',
                    'user_id': ''
                },
                viewquery: {
                    'page_id': 1,
                    'user_id': ''
                },
                grade_code_options: [
                    {
                        value: 'A',
                        label: 'A'
                    },
                    {
                        value: 'B',
                        label: 'B'
                    },
                    {
                        value: 'C',
                        label: 'C'
                    },
                    {
                        value: 'D',
                        label: 'D'
                    }
                ],

                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                userViewisible: false,
                pageTotal: 0,
                form: {},
                viewDate: [],
                idx: -1,
                id: -1
            };
        },
        created() {
            this.getData();
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getData() {
                getUserList(this.query).then(res => {
                    console.log(res);
                    this.tableData = res.data.users;
                    // this.pageTotal = res.pageTotal || 50;
                    this.pageTotal = res.data.total_page;
                });
            },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, 'page_id', 1);
                this.getData();
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'page_id', val);
                this.getData();
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            delAllSelection() {
                const length = this.multipleSelection.length;
                let str = '';
                this.delList = this.delList.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error(`删除了${str}`);
                this.multipleSelection = [];
            },

            // 编辑操作
            handleEdit(index, user_id) {
                this.idx = index;
                getUserInfo(user_id).then(res => {
                    console.log(res);
                    this.form = res.data;
                    // this.pageTotal = res.pageTotal || 50;
                });
                this.editVisible = true;
                // index 网页表格索引， user_id 当前行id
                console.log(index, user_id);
            },
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    })
                    .catch(() => {
                    });
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                this.$set(this.tableData, this.idx, this.form);
                console.log(this.form);
            },

            // 浏览记录
            userView(index, user_id) {
                this.idx = index;
                this.$set(this.viewquery, 'user_id', user_id);
                getUserView(this.viewquery).then(res => {
                    this.viewDate = res.data.data;
                    console.log(this.viewDate);
                    // this.pageTotal = res.pageTotal || 50;
                });
                this.userViewisible = true;
                // index 网页表格索引， user_id 当前行id
                console.log(index, user_id);
            }
        }
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .mr10 {
        margin-right: 10px;
    }

</style>
