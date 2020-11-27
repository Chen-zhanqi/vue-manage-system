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
            <!--            <div class="handle-box">-->
            <el-form ref="form" :model="query" label-width="80px">
                <el-col :span="8">

                    <el-form-item label="类型">
                        <el-select v-model="query.type" placeholder="类型" class="handle-select mr10"
                                   style="width: 200px">
                            <el-option
                                    v-for="item in type_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>


                <el-col :span="8">
                    <el-form-item label="底价">
                        <el-input v-model="query.init_price" placeholder="底价" class="handle-input mr10"
                                  required></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="登记价">
                        <el-input v-model="query.price_record" placeholder="登记价" class="handle-input mr10"
                                  style=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="加价幅度">
                        <el-input v-model="query.bid_count" placeholder="加价幅度" class="handle-input mr10"
                                  style=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="出价次数">
                        <el-input v-model="query.price_amplitude" placeholder="出价次数" class="handle-input mr10"
                                  style=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="面积">
                        <el-input v-model="query.area" placeholder="面积" class="handle-input mr10"
                                  style=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-button type="primary" icon="el-icon-mouse" @click="calcuLation">计算</el-button>
                    <el-button type="success" icon="el-icon-mouse" @click="export2Excel">导出数据</el-button>
                </el-col>
                <!--            </div>-->
            </el-form>

            <el-table
                    :data="tableData"
                    border
                    class="table"
                    :row-style="{height:'20px'}"
                    :cell-style="{padding:'0px'}"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <!--                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>-->
                <el-table-column prop="amplitude" label="出价次数" align="center" width="100px"></el-table-column>
                <el-table-column prop="final_price" label="成交价（元）"></el-table-column>
                <el-table-column prop="taxes" label="税费（元）"></el-table-column>
                <el-table-column prop="count_price" label="总计（元）"></el-table-column>
                <el-table-column prop="unit_price" label="单价（元/㎡）"></el-table-column>

                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
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

        </div>
    </div>
</template>

<script>
    export default {
        name: 'TaxesCalculation',
        data() {
            return {
                query: {
                    'type': '1',  // 类型
                    'init_price': '',  // 底价
                    'price_record': '',  // 登记价
                    'bid_count': '',  // 加价幅度
                    'price_amplitude': '',  // 出价次数
                    'area': ''  // 面积
                },
                // ≦ ≧ ㎡
                type_options: [
                    {
                        value: '1',
                        label: '普宅首套 ( ≦ 90㎡ )'
                    },
                    {
                        value: '2',
                        label: '普宅首套 ( > 90㎡ )'
                    },
                    {
                        value: '3',
                        label: '普宅二套'
                    },
                    {
                        value: '4',
                        label: '豪宅首套（ > 144㎡ ）'
                    },
                    {
                        value: '5',
                        label: '豪宅二套（ > 144㎡ ）'
                    },
                    {
                        value: '6',
                        label: '商务公寓'
                    },
                    {
                        value: '7',
                        label: '商铺/写字楼'
                    }
                ],
                tableData: [],
                formula: '', // 公式
                init_price: ''  // 成交价  第一次是输入的底价
            };
        },
        methods: {
            // 触发计算按钮
            calcuLation() {
                this.$set(this.query);
                this.tableData = [];
                if (this.query.type == '1') {
                    this.formula = '(X - Y) * 0.03 + X * 0.01 + 85 ';
                } else if (this.query.type == '2') {
                    this.formula = '(X - Y) * 0.03 + X * 0.015 + 85 ';
                } else if (this.query.type == '3') {
                    this.formula = '(X - Y) * 0.03 + X * 0.03 + 85 ';
                } else if (this.query.type == '4') {
                    this.formula = '(X - Y) * 0.05525/1.05 + (X - Y) * 0.03 + X * 0.015 + 85 ';
                } else if (this.query.type == '5') {
                    this.formula = '(X - Y) * 0.0545/1.05 + (X - Y) * 0.03 + X * 0.03 + 85 ';
                } else if (this.query.type == '6') {
                    this.formula = '(X - Y) * 0.05125/1.05 + X * 0.097 + 555 ';
                } else if (this.query.type == '7') {
                    this.formula = '(X - Y) * 0.04785/1.05 + X * 0.0147 + 555 ';
                }
                // console.log(this.formula);

                var bid_count = parseInt(this.query.bid_count); // 加价幅度
                var price_amplitude = parseInt(this.query.price_amplitude); // 出价次数
                var area = parseFloat(this.query.area); // 面积
                var X = this.query.init_price;  // 底价 成交价 每次成交价= 上次成交价 + 加价幅度
                var Y = this.query.price_record;    // 登记价
                X = parseInt(X);
                Y = parseInt(Y);
                var i;
                for (i = 1; i < price_amplitude + 1; i++) {
                    if (i > 1) {
                        X += bid_count;
                    }

                    var taxes = eval(this.formula); // 税费
                    var count_price = X + taxes;  // 总计
                    var unit_price = count_price / area;    // 单价
                    var data = {
                        'amplitude': i,
                        'final_price': X,
                        'taxes': taxes.toFixed(3),
                        'count_price': count_price.toFixed(3),
                        'unit_price': unit_price.toFixed(3)
                    };
                    this.tableData.push(data);
                }
                console.log(this.tableData);
            },
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
            // 触发导出数据时间
            export2Excel() {
                var that = this;
                require.ensure([], () => {
                    const { export_json_to_excel } = require('../../../vendor/Export2Excel'); //这里必须使用绝对路径，使用@/+存放export2Excel的路径
                    const tHeader = ['出价次数', '成交价（元）', '税费（元）', '总计（元）', '单价（元/㎡）']; // 导出的表头名名称 可有多个
                    const filterVal = ['amplitude', 'final_price', 'taxes', 'count_price', 'unit_price']; // failList有多个字段，这里指定你需要导出的字段
                    const list = that.tableData;
                    const data = that.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, '税费结果');// 导出的表格名称，根据需要自己命名
                });
            },
            //格式转换，直接复制即可
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]));
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
    }

    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }

</style>
