<template>
<div style="width:100%;height:100%;display: flex">
    <div id="DeviceInfoGanttChart" style="display:flex; flex:1; margin-top:20px;"></div>
    <SingleDeviceInfo
        v-show="dialogShow"
        :show="dialogShow"
        @closefun="closeFun"
        :singledevicedata="singleDeviceData"
    />
</div>
</template>

<script>
    import echarts from 'echarts'
    import moment from "moment";
    import SingleDeviceInfo from './components/SingleDeviceInfo'
    import {
        reqSingleDeviceFind,
    } from '../../api'
    export default {
        name: 'DeviceInfoGanttChart',
        components: {SingleDeviceInfo},
        props: {
            companyCode: {
                type: String,
            },
            selectedDate: {
                type: String,
                default: moment().format('YYYY-MM-DD')
            },
            shiftType: {
                type: String,
                default: '1'
            },
            deviceInfoData: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                // deviceInfoGanttChart: null,
                dialogShow: false,
                singleDeviceData: ''
            }
        },
        mounted() {
            // console.log('mounted called', this.deviceInfoData)
            this.renderDeviceInfo()
            // window.addEventListener('resize', this.handleResize); // echarts图自适应
        },
        watch: {
            deviceInfoData: function (newValue, oldValue) {
                // console.log('watch deviceInfoData changed', newValue, oldValue)
                this.renderDeviceInfo()
            }
        },
        methods: {
            async renderDeviceInfo() {
                // console.log('renderMockData called', this.deviceInfoData, this.selectedDate, this.shiftType)
                if (!this.deviceInfoData.list) {
                    return
                }
                const {list: deviceList, nowDateStr} = this.deviceInfoData
                let deviceInfoGanttChart = echarts.init(document.getElementById("DeviceInfoGanttChart"))
                deviceInfoGanttChart.on('click','xAxis.category',function(params) {
                    console.log('clicked!!!!!',params)
                })
                window.onresize = function () {
                    deviceInfoGanttChart.resize()
                }

                let axisMainColor = '#55AEFB'
                let axisTextColor = '#53E3FD'

                let data = [];
                let startTime = ''
                let endTime = ''

                // 如果是当天
                if (moment(this.selectedDate).isSame(moment(), 'day')) {
                    switch (this.shiftType) {
                        // 全部：当天08:00-nowDateStr
                        case '0':
                            startTime = parseFloat(moment().startOf('day').add(8, 'hour').format('X'));
                            endTime = parseFloat(moment(nowDateStr).format('X'));
                            break
                        // 白班：起始时间-当天08:00，终了时间-[nowDateStr<20点，取nowDateStr; 否则取20:00]
                        case '1':
                            startTime = parseFloat(moment().startOf('day').add(8, 'hour').format('X'));
                            endTime = moment(nowDateStr).isBefore(moment().startOf('day').add(20, 'hour'))
                                ? parseFloat(moment(nowDateStr).format('X'))
                                : parseFloat(moment().startOf('day').add(20, 'hour').format('X'));
                            break
                        // 夜班：起始时间-当天20:00，终了时间-[nowDateStr<20点，取当天20:00; 否则取nowDateStr]
                        case '2':
                            startTime = parseFloat(moment().startOf('day').add(20, 'hour').format('X'));
                            endTime = moment(nowDateStr).isBefore(moment().startOf('day').add(20, 'hour'))
                                ? parseFloat(moment().startOf('day').add(8, 'hour').add(1, 'day').format('X'))
                                : parseFloat(moment(nowDateStr).format('X'));
                            break
                    }
                } else {
                    switch (this.shiftType) {
                        // 全部：起始时间-查询日期当天08:00，终了时间-[如果查询日期当天08:00+24h<nowDateStr，取nowDateStr; 否则取08:00+24h]
                        case '0':
                            startTime = parseFloat(moment(this.selectedDate).startOf('day').add(8, 'hour').format('X'));
                            endTime = (moment(this.selectedDate).startOf('day').add(8, 'hour').add(1, 'day'))
                                .isAfter(moment(nowDateStr))
                                ? parseFloat(moment(nowDateStr).format('X'))
                                : parseFloat(moment(this.selectedDate).startOf('day').add(8, 'hour').add(1, 'day').format('X'));
                            break
                        // 白班：查询日期当天08:00-查询日期当天20:00
                        case '1':
                            startTime = parseFloat(moment(this.selectedDate).startOf('day').add(8, 'hour').format('X'));
                            endTime = parseFloat(moment(this.selectedDate).startOf('day').add(20, 'hour').format('X'));
                            break
                        // 夜班：起始时间-查询日期当天20:00，终了时间-[同"全部"逻辑]
                        case '2':
                            startTime = parseFloat(moment(this.selectedDate).startOf('day').add(20, 'hour').format('X'));
                            endTime = (moment(this.selectedDate).startOf('day').add(8, 'hour').add(1, 'day'))
                                .isAfter(moment(nowDateStr))
                                ? parseFloat(moment(nowDateStr).format('X'))
                                : parseFloat(moment(this.selectedDate).startOf('day').add(8, 'hour').add(1, 'day').format('X'));
                            break
                    }
                }

                // console.log('startTime', startTime, 'endTime', endTime)
                // let categories = deviceList.map(device=>({
                //     dataList: device.dataList,
                //     machineName: device.machineName,
                //     machineNo: device.machineNo}))
                // let categories = deviceList.map(device => `${device.machineNo}`)
                let categories = deviceList.map(device => `${device.machineModel} (${device.machineName})`)
                // for (let i = 0; i < deviceList.length; i++) {
                //     categories.push('设备-'+(i+1))
                // }
                // console.log('categories.length', categories.length)
                let types = [
                    {name: '作业', color: '#1CF33C'},
                    {name: '待机', color: '#FFC31F'},
                    {name: '关机', color: '#BCBCBC'},
                    {name: '故障', color: '#FD0101'},
                    {name: '离线', color: '#4a4949'},
                ];
                let legendData = types.map(data => ({
                    name: data.name,
                    color: data.color,
                    // icon:'circle',
                    textStyle: {
                        color: '#fff',
                        fontSize: 16
                    }
                }))

                echarts.util.each(categories, function (category, index) {
                    // let machineXAxisLabelString = `${category.machineName} ${category.machineNo}`
                    // // console.log('echarts.util.each', machineXAxisLabelString)
                    let baseTime = startTime;
                    let specifiedDevice = deviceList[index]
                    for (let j = 0; j < specifiedDevice.dataList.length; j++) {
                        let dataSection = specifiedDevice.dataList[j]
                        let typeItem = types[parseInt(dataSection.machineStatus) - 1];
                        let duration = moment(dataSection.endDate).diff(dataSection.beginDate, 'second', false);
                        // // console.log('duration = ', duration)
                        data.push({
                            name: typeItem.name,
                            value: [
                                index,
                                baseTime,
                                baseTime + duration,
                                duration,
                                specifiedDevice.machineModel+'|'+specifiedDevice.machineName,
                                specifiedDevice.machineNo
                            ],
                            itemStyle: {
                                normal: {
                                    color: typeItem.color,
                                }
                            }
                        });
                        baseTime += duration;
                    }
                });

                function formatDurationTime(duration) {
                    let hh = parseInt(duration / 3600);
                    if (hh < 10) hh = "0" + hh;
                    let mm = parseInt((duration - hh * 3600) / 60);
                    if (mm < 10) mm = "0" + mm;
                    let ss = parseInt((duration - hh * 3600) % 60);
                    if (ss < 10) ss = "0" + ss;
                    let length = (hh > 0 ? hh + "小时 " : '') + (mm > 0 ? mm + "分 " : '') + ss + "秒 ";
                    if (duration > 0) {
                        return length;
                    } else {
                        return "NaN";
                    }
                }

                function renderItem(params, api) {
                    // // console.log('params',params,'api',api)
                    let categoryIndex = api.value(0);
                    let start = api.coord([api.value(1), categoryIndex]);
                    let end = api.coord([api.value(2), categoryIndex]);
                    let height = api.size([0, 1])[1] * 0.3;

                    let rectShape = echarts.graphic.clipRectByRect({
                        x: start[0],
                        y: start[1] - height / 2,
                        width: end[0] - start[0],
                        height: height,
                    }, {
                        x: params.coordSys.x,
                        y: params.coordSys.y,
                        width: params.coordSys.width,
                        height: params.coordSys.height
                    });

                    // // console.log('api.style()', api.style())
                    return rectShape && {
                        type: 'rect',
                        shape: rectShape,
                        style: api.style()
                    };
                }

                let option = {
                    tooltip: {
                        formatter: function (params) {
                            // // console.log('params', params) ${params.value[4]}
                            return `
                                    设备型号：${params.value[4].split('|')[0]}
                                    <br />
                                    设备名称：${params.value[4].split('|')[1]}
                                    <br />
                                    ${params.marker} ${params.name} ${formatDurationTime(params.value[3])}
                                    <br />
                                    起始：${moment(params.value[1] * 1000).format('HH:mm:ss')}
                                    <br />
                                    终止：${moment(params.value[2] * 1000).format('HH:mm:ss')}
                                    `
                            // return params.marker + params.name + ': ' + params.value[3] + '秒' +', \n'+ +','+moment(params.value[2]*1000).format('HH:mm:ss');
                        }
                    },
                    color: types.map(type => type.color),
                    animation: false,
                    // title: {
                    //     text: '设备状态信息图',
                    //     textStyle:{
                    //         color:'#fff'
                    //     },
                    //     left: 'center'
                    // },
                    dataZoom: [{
                        type: 'slider',
                        filterMode: 'weakFilter',
                        xAxisIndex: 0,
                        // showDataShadow: false,
                        height: 5,
                        bottom: '3%',
                        start: 0,
                        end: 100,
                        realtime: true,
                        fillerColor: '#1C50B5',
                        borderColor: 'transparent',
                        backgroundColor: '#1C3A74',
                        handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
                        // handleIcon: 'image://data:image/svg+xml;base64,PHN2ZyBpZD0i5Zu+5bGCXzEiIGRhdGEtbmFtZT0i5Zu+5bGCIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE1IDE1Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzFjNTBiNTtzdHJva2U6IzNlNzhlOTtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjJweDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPuWchuWciDwvdGl0bGU+PGNpcmNsZSBpZD0i5qSt5ZyGXzJf5ou36LSdIiBkYXRhLW5hbWU9IuakreWchiAyIOaLt+i0nSIgY2xhc3M9ImNscy0xIiBjeD0iNy41IiBjeT0iNy41IiByPSI2LjUiLz48L3N2Zz4=', // jshint ignore:line
                        handleSize: 16,
                        textStyle: {
                            color: axisTextColor,
                            fontWeight: 'bold',
                            fontSize: 14
                        },
                        labelFormatter: function (value) {
                            return moment(value * 1000).format('MM-DD HH:mm');
                        },
                        showDetail: true
                    }, {
                        type: 'inside',
                        id: 'insideX',
                        xAxisIndex: 0,
                        filterMode: 'weakFilter',
                        start: 0,
                        end: 50,
                        realtime: true,
                        zoomOnMouseWheel: false,
                        moveOnMouseMove: true,
                        showDetail: true
                    }, {
                        type: 'slider',
                        yAxisIndex: 0,
                        zoomLock: true,
                        width: 6,
                        right: '2%',
                        top: '5%',
                        bottom: '10%',
                        start: 0,
                        end: deviceList.length> 20 ? deviceList.length *4/3: null,
                        handleSize: 0,
                        fillerColor: '#1C50B5',
                        borderColor: 'transparent',
                        backgroundColor: '#1C3A74',
                        handleIcon: 'image://data:image/svg+xml;base64,PHN2ZyBpZD0i5Zu+5bGCXzEiIGRhdGEtbmFtZT0i5Zu+5bGCIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE1IDE1Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzFjNTBiNTtzdHJva2U6IzNlNzhlOTtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjJweDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPuWchuWciDwvdGl0bGU+PGNpcmNsZSBpZD0i5qSt5ZyGXzJf5ou36LSdIiBkYXRhLW5hbWU9IuakreWchiAyIOaLt+i0nSIgY2xhc3M9ImNscy0xIiBjeD0iNy41IiBjeT0iNy41IiByPSI2LjUiLz48L3N2Zz4=', // jshint ignore:line
                        textStyle: {
                            color: axisTextColor,
                            fontWeight: 'bold',
                            fontSize: 14
                        },
                        showDetail: false
                    }, {
                        type: 'inside',
                        id: 'insideY',
                        yAxisIndex: 0,
                        start: 0,
                        end: deviceList.length> 20 ? deviceList.length *4/3: null,
                        zoomOnMouseWheel: false,
                        moveOnMouseMove: true,
                        moveOnMouseWheel: true
                    }],
                    grid: {
                        top:30,
                        bottom:80,
                        left:'8%',
                        right:'8%',
                    },
                    xAxis: {
                        min: startTime,
                        max: endTime,
                        scale: true,
                        axisLabel: {
                            formatter: function (val) {
                                return moment(val * 1000).format('MM-DD HH:mm')
                                // return Math.max(0, val - startTime) + ' ms';
                            },
                            color: axisTextColor,
                            fontSize: 13,
                            showMinLabel: true,
                            showMaxLabel: true,
                        },
                        axisLine: {
                            lineStyle: {
                                color: axisMainColor
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        data: categories,
                        axisLabel: {
                            clickable: true,
                            // formatter: function (val) {
                            //     // console.log('==val===',val[0])
                            //     return val.machineName
                            //     // return Math.max(0, val - startTime) + ' ms';
                            // },
                            // formatter: function(val) {
                            //     console.log('val:',val.split('|'))
                            //     const valArr = val.split('|')
                            //     return "{valArr[0]+ ' ('+valArr[1]+')'}"

                            // },
                            // formatter: function (val) {
                            //     const valArr = val.split('|')
                            //     const newVal = valArr[0]+ ' ('+valArr[1]+')'
                            //     return [newVal,'{hr|}'].join('\n')
                            // },
                            rich: {
                                a: {
                                    textDecoration: 'underline',
                                    color: '#fff',
                                    borderColor: '#449911',
                                    borderLeftWidth: 1,
                                },
                                hr: {
                                    borderColor: axisTextColor,
                                    // 这里把 width 设置为 '100%'，表示分割线的长度充满文本块。
                                    // 注意，这里是文本块内容盒（content box）的 100%，而不包含 padding。
                                    // 虽然这和 CSS 相关的定义有所不同，但是在这类场景中更加方便。
                                    width: '90%',
                                    padding: 0,
                                    borderWidth: 2,
                                    height: 0
                                }
                            },
                            color: axisTextColor,
                            fontSize: 10,
                            // fontWeight:'bold',
                            interval:0,
                        },
                        axisTick: {
                            show: true,
                            alignWithLabel: true,
                            interval:0,
                        },
                        axisLine: {
                            lineStyle: {
                                color: axisMainColor
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        min: 0,
                        max: deviceList.length,
                    },
                    series: legendData.map(data => ({
                        type: 'custom',
                        name: data.name,
                        renderItem: null,
                        data: []
                    })).concat([{
                        type: 'custom',
                        name: 'device_info',
                        renderItem: renderItem,
                        itemStyle: {
                            normal: {
                                opacity: 1,
                                borderColor: 'transparent',
                                borderWidth:0,
                                borderType:'solid'
                            }
                        },
                        encode: {
                            x: [1, 2],
                            y: 0
                        },
                        data: data
                    }]),
                    legend: {
                        data: legendData,
                        selectedMode: false,
                    }
                };
                deviceInfoGanttChart.setOption(option)

                deviceInfoGanttChart.on('click', (params) => {
                    // console.log('yyy:',params)
                    this.dialogShow = true
                    const valueArr = params.value
                    const machineno = valueArr[5]
                    this.getSingleDeviceData(machineno)
                })
            },
            closeFun(e) {
                // console.log(e)
                this.dialogShow = false
            },
            async getSingleDeviceData(machineno) {
                const params ={
                    "companyCode": this.companyCode,
                    "date": this.selectedDate,
                    "dayType": this.shiftType,
                    "machineNo": machineno,
                    "firstGroupCode": '',
                    "machineName": '',
                    "workCenterCode": ''
                }
                const res = await reqSingleDeviceFind(params)
                if (res && res.data.list){
                    this.singleDeviceData = res.data.list[0]            
                }
            }
        },
        handleResize() {
            // this.deviceInfoGanttChart.resize();
        },
        beforeDestroy(){
            console.log('beforeDestroy called')
            // this.deviceInfoGanttChart.clear();
        },
        destroyed() {
            console.log('destroyed called')
            // this.deviceInfoGanttChart.dispose();
        }
    }
</script>

<style lang="scss" scoped>

</style>