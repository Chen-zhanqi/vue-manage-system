<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-s-home"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--  列表  -->
        <div class="container">
            <div class="handle-box">
                <el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="delAllSelection"
                >批量删除
                </el-button>
                <el-select v-model="query.city_id" placeholder="地址" class="handle-select mr10">
                    <el-option key="1" label="深圳市" value="1212"></el-option>
                    <el-option key="2" label="北京市" value="1023"></el-option>
                    <el-option key="4" label="武汉市" value="1251"></el-option>
                </el-select>
                <el-input v-model="query.community_name" placeholder="请输入小区 地址" class="handle-input mr10"
                          style="width: 200px"></el-input>
                <el-select v-model="query.area" placeholder="面积" clearable class="mr10" style="">
                    <el-option
                            v-for="item in area_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="query.asset_type" placeholder="类型" clearable class="mr10" style="">
                    <el-option
                            v-for="item in asset_type_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="query.price" placeholder="起拍价" clearable class="mr10" style="">
                    <el-option
                            v-for="item in price_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="query.floor" placeholder="楼层" clearable class="mr10" style="">
                    <el-option
                            v-for="item in floor_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="query.reset" placeholder="占用" clearable class="mr10" style="">
                    <el-option
                            v-for="item in reset_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="query.rent" placeholder="租赁" clearable class="mr10" style="">
                    <el-option
                            v-for="item in rent_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="query.circ" placeholder="拍卖轮次" clearable class="mr10" style="">
                    <el-option
                            v-for="item in circ_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="query.decorate" placeholder="装修" clearable class="mr10" style="">
                    <el-option
                            v-for="item in decorate_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="query.build_time" placeholder="年代" clearable class="mr10" style="">
                    <el-option
                            v-for="item in build_time_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="query.is_deliver" placeholder="清场交付" clearable class="mr10" style="">
                    <el-option
                            v-for="item in is_deliver_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="query.cut" placeholder="折扣率" clearable class="mr10" style="width: 100px">
                    <el-option
                            v-for="item in cut_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
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
                <el-table-column label="缩略图" align="center" width="100">
                    <template slot-scope="scope">
                        <el-image
                                class="table-td-thumb"
                                :src="scope.row.img_url"
                                :preview-src-list="[scope.row.img_url]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="community_name" label="小区" ></el-table-column>
                <el-table-column prop="title" label="标的" width="250"></el-table-column>
                <el-table-column prop="asset_type" label="类型" ></el-table-column>
                <el-table-column prop="circ" label="次数"></el-table-column>
                <el-table-column prop="currentPrice" label="当前价(万)"></el-table-column>
                <el-table-column prop="consultPrice" label="评估价(万)"</el-table-column>
                <el-table-column prop="marketPrice" label="市场价(万)" sortable></el-table-column>
                <el-table-column prop="auction_start" label="起拍时间" sortable></el-table-column>
                <el-table-column prop="auction_end" label="结束时间"></el-table-column>


                <!--                <el-table-column label="账户余额">-->
                <!--                    <template slot-scope="scope">￥{{scope.row.money}}</template>-->
                <!--                </el-table-column>-->
                <!--                <el-table-column label="状态" align="center">-->
                <!--                    <template slot-scope="scope">-->
                <!--                        <el-tag-->
                <!--                                :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"-->
                <!--                        >{{scope.row.state}}-->
                <!--                        </el-tag>-->
                <!--                    </template>-->
                <!--                </el-table-column>-->

                <!--                <el-table-column prop="date" label="注册时间"></el-table-column>-->
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
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="65%">
            <el-form ref="form" :model="form" label-width="70px">
                <h3>基本信息</h3>
                <br>
                <el-row :gutter="0">
                    <el-col :span="12">
                        <el-form-item label="标的">
                            <el-input v-model="form.title"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="小区">
                            <el-input v-model="form.community_name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="0">
                    <el-col :span="6">
                        <el-form-item label="起拍价">
                            <el-input v-model="form.initialPrice"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="当前价">
                            <el-input v-model="form.currentPrice"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="评估价">
                            <el-input v-model="form.consultPrice"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="市场价">
                            <el-input v-model="form.marketPrice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="0">
                    <el-col :span="4">
                        <el-form-item label="税费">
                            <el-input v-model="form.tax"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="面积">
                            <el-input v-model="form.area"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="开始时间">
                            <el-input v-model="form.auction_start"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="结束时间">
                            <el-input v-model="form.auction_end"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="0">
                    <el-col :span="4">
                        <el-form-item label="类型">
                            <el-select v-model="form.asset_type" placeholder="类型" clearable class="mr10"
                                       style="width: 100px">
                                <el-option
                                        v-for="item in asset_type_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="阶段">
                            <el-select v-model="form.circ" placeholder="阶段" clearable class="mr10"
                                       style="width: 100px">
                                <el-option
                                        v-for="item in circ_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="保证金">
                            <el-input v-model="form.margin"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="单价">
                            <el-input v-model="form.average"></el-input>
                        </el-form-item>
                    </el-col>
                    <!--                    <el-col :span="4">-->
                    <!--                        <el-form-item label="年代">-->
                    <!--                            <el-input v-model="form.build_time"></el-input>-->
                    <!--                        </el-form-item>-->
                    <!--                    </el-col>-->
                    <!--                    <el-col :span="4">-->
                    <!--                        <el-form-item label="楼层">-->
                    <!--                            <el-input v-model="form.floor"></el-input>-->
                    <!--                        </el-form-item>-->
                    <!--                    </el-col>-->
                </el-row>
                <el-row :gutter="0">
                    <el-col :span="4">
                        <el-form-item label="朝向">
                            <el-input v-model="form.direction"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="空置">
                            <el-select v-model="form.reset" placeholder="空置" clearable class="mr10"
                                       style="width: 100px">
                                <el-option
                                        v-for="item in reset_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="装修">
                            <el-select v-model="form.decorate" placeholder="装修" clearable class="mr10"
                                       style="width: 100px">
                                <el-option
                                        v-for="item in decorate_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="4">
                        <el-form-item label="目标价">
                            <el-input v-model="form.forecast_deal"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="风险价">
                            <el-input v-model="form.forecast_safe"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="收益价">
                            <el-input v-model="form.forecast_save"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h3>其他信息</h3>
                <br>
                <el-row :gutter="0">
                    <el-col :span="8">
                        <el-form-item label="折扣率">
                            <el-input v-model="form.cut"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="折扣率">
                            <el-select v-model="form.cut_score" placeholder="评分" clearable class="mr10"
                                       style="width: 100px">
                                <el-option
                                        v-for="item in score_options"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            分
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="交通">
                            <el-input v-model="form.traffic_tag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="交通">
                            <el-select v-model="form.traffic_score" placeholder="评分" clearable class="mr10"
                                       style="width: 100px">
                                <el-option
                                        v-for="item in score_options"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            分
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="0">
                    <el-col :span="8">
                        <el-form-item label="周边溢价">
                            <el-input v-model="form.activation_tag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="周边溢价">
                            <el-select v-model="form.activation_score" placeholder="评分" clearable class="mr10"
                                       style="width: 100px">
                                <el-option
                                        v-for="item in score_options"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            分
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="位置">
                            <el-input v-model="form.biz_tag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="位置">
                            <el-select v-model="form.biz_score" placeholder="评分" clearable class="mr10"
                                       style="width: 100px">
                                <el-option
                                        v-for="item in score_options"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            分
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="0">
                    <el-col :span="8">
                        <el-form-item label="教育配套">
                            <el-input v-model="form.education_tag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="教育配套">
                            <el-select v-model="form.education_score" placeholder="评分" clearable class="mr10"
                                       style="width: 100px">
                                <el-option
                                        v-for="item in score_options"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            分
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="服务配套">
                            <el-input v-model="form.service_tag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="服务配套">
                            <el-select v-model="form.service_score" placeholder="评分" clearable class="mr10"
                                       style="width: 100px">
                                <el-option
                                        v-for="item in score_options"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            分
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="0">
                    <el-col :span="8">
                        <el-form-item label="环境">
                            <el-input v-model="form.environment_tag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="环境">
                            <el-select v-model="form.environment_score" placeholder="评分" clearable class="mr10"
                                       style="width: 100px">
                                <el-option
                                        v-for="item in score_options"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            分
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="年代">
                            <el-input v-model="form.build_time"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="年代">
                            <el-select v-model="form.build_score" placeholder="评分" clearable class="mr10"
                                       style="width: 100px">
                                <el-option
                                        v-for="item in score_options"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            分
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="0">
                    <el-col :span="8">
                        <el-form-item label="楼层">
                            <el-input v-model="form.floor"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="楼层">
                            <el-select v-model="form.floor_score" placeholder="评分" clearable class="mr10"
                                       style="width: 100px">
                                <el-option
                                        v-for="item in score_options"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            分
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="面积">
                            <el-input v-model="form.area"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="面积">
                            <el-select v-model="form.area_score" placeholder="评分" clearable class="mr10"
                                       style="width: 100px">
                                <el-option
                                        v-for="item in score_options"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            分
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="0">
                    <el-col :span="4">
                        <el-form-item label="增长率">
                            <el-input v-model="form.grow_ratio"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>

        </el-dialog>
    </div>
</template>

<script>
    import { fetchData } from '../../api/index';
    import { getHouseInfo } from '../../api/index';

    export default {
        name: 'basetable',
        data() {
            return {
                query: {
                    'page_id': 1,
                    'city_id': '1212',
                    'zone_id': '',
                    'community_name': '',   // 小区
                    'area': '',     // 面积
                    'asset_type': '',   // 类型
                    'price': '',    // 起拍价
                    'floor': '',    // 楼层
                    'reset': '',    // 占用
                    'rent': '',    // 租赁
                    'circ': '',    // 拍卖伦次
                    'decorate': '',    // 装修
                    'build_time': '',    // 年代
                    'is_deliver': '',    // 清场交付
                    'cut': ''    // 折扣率
                },
                area_options: [
                    {
                        value: '1-80',
                        label: '1-80'
                    },
                    {
                        value: '81-160',
                        label: '81-160'
                    },
                    {
                        value: '161-240',
                        label: '161-240'
                    },
                    {
                        value: '241-1000',
                        label: '241以上'
                    }
                ],
                asset_type_options: [
                    {
                        value: '1',
                        label: '住宅'
                    }, {
                        value: '2',
                        label: '商业'
                    }],
                price_options: [
                    {
                        value: '1-50',
                        label: '1-50'
                    }, {
                        value: '51-100',
                        label: '51-100'
                    }, {
                        value: '101-150',
                        label: '101-150'
                    }, {
                        value: '151-200',
                        label: '151-200'
                    }, {
                        value: '201-250',
                        label: '201-250'
                    }, {
                        value: '251-300',
                        label: '251-300'
                    }, {
                        value: '301-1000',
                        label: '300以上'
                    }],
                floor_options: [
                    {
                        value: '1',
                        label: '1楼'
                    }, {
                        value: '2',
                        label: '2楼-7楼'
                    }, {
                        value: '3',
                        label: '8楼-15楼'
                    }, {
                        value: '4',
                        label: '16楼-25楼'
                    }, {
                        value: '5',
                        label: '26楼以上'
                    }],
                reset_options: [
                    {
                        value: '1',
                        label: '被占用'
                    },
                    {
                        value: '2',
                        label: '已清空'
                    },
                    {
                        value: '3',
                        label: '其他'
                    }
                ],
                rent_options: [
                    {
                        value: '1',
                        label: '无租赁'
                    },
                    {
                        value: '2',
                        label: '有租赁'
                    },
                    {
                        value: '3',
                        label: '其他'
                    }
                ],
                circ_options: [
                    {
                        value: '1',
                        label: '一拍'
                    },
                    {
                        value: '2',
                        label: '二拍'
                    },
                    {
                        value: '3',
                        label: '变卖'
                    },
                    {
                        value: '4',
                        label: '重新拍卖'
                    },
                    {
                        value: '5',
                        label: '破产'
                    },
                    {
                        value: '6',
                        label: '其他'
                    }
                ],
                decorate_options: [
                    {
                        value: '1',
                        label: '简装修'
                    },
                    {
                        value: '2',
                        label: '精装修'
                    },
                    {
                        value: '3',
                        label: '毛坯房'
                    },
                    {
                        value: '4',
                        label: '其他'
                    }
                ],
                build_time_options: [
                    {
                        value: '1',
                        label: '2000年以前'
                    },
                    {
                        value: '2',
                        label: '2008年以前'
                    },
                    {
                        value: '3',
                        label: '2013年以前'
                    },
                    {
                        value: '4',
                        label: '2013年以后'
                    },
                    {
                        value: '5',
                        label: '其他'
                    }
                ],
                is_deliver_options: [
                    {
                        value: '是',
                        label: '是'
                    },
                    {
                        value: '否',
                        label: '否'
                    }
                ],
                cut_options: [
                    {
                        value: '1',
                        label: '1-3'
                    },
                    {
                        value: '2',
                        label: '4-6'
                    },
                    {
                        value: '3',
                        label: '7-9'
                    },
                    {
                        value: '4',
                        label: '9以上'
                    }
                ],
                score_options: [
                    {
                        value: '20',
                        label: '1星'
                    },
                    {
                        value: '40',
                        label: '2星'
                    },
                    {
                        value: '60',
                        label: '3星'
                    },
                    {
                        value: '80',
                        label: '4星'
                    },
                    {
                        value: '100',
                        label: '5星'
                    }
                ],

                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                pageTotal: 0,
                form: {},
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
                fetchData(this.query).then(res => {
                    console.log(res);
                    this.tableData = res.data.houses;
                    // this.pageTotal = res.pageTotal || 50;
                    this.pageTotal = res.data.total_page;
                });
            },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, 'page_id', 1);
                this.getData();
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
            // // 编辑操作
            // handleEdit(index, row) {
            //     this.idx = index;
            //     this.form = row;
            //     this.editVisible = true;
            //     // index 网页表格索引， row 当前行数据
            //     console.log(index, row);
            // },
            // 编辑操作
            handleEdit(index, house_id) {
                this.idx = index;
                getHouseInfo(house_id).then(res => {
                    console.log(res);
                    this.form = res.data;
                    // this.pageTotal = res.pageTotal || 50;
                });
                this.editVisible = true;
                // index 网页表格索引， house_id 当前行房源id
                console.log(index, house_id);
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                this.$set(this.tableData, this.idx, this.form);
                console.log(this.form);
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'page_id', val);
                this.getData();
            }
        }
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 12px;
        margin-bottom: 12px;
    }

    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>
