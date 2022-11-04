// 对于时间   以及json文件的处理

export default {
    data() {
        return {
            //全局变量名
            valueBeforeFullScreen: {},
            exitFullScreenEscKey: null,
            defaultJsData: `/**字符串和字节数组相互转换方法*/
function bytes2string(arr) { 
    if(typeof arr === 'string') {  
        return arr;  
    }  
    var str = '',_arr = arr;  
    for(var i = 0; i < _arr.length; i++) {  
        var one = _arr[i].toString(2), v = one.match(/^1+?(?=0)/);  
        if(v && one.length == 8) {  
            var bytesLength = v[0].length;  
            var store = _arr[i].toString(2).slice(7 - bytesLength);  
            for(var st = 1; st < bytesLength; st++) {  
                store += _arr[st + i].toString(2).slice(2);  
            }  
            str += String.fromCharCode(parseInt(store, 2));  
            i += bytesLength - 1;  
        } else {  
            str += String.fromCharCode(_arr[i]);  
        }  
    }  
    return str;  
} 
function string2bytes(str) { 
    var bytes = new Array();  
    var len, c;  
    len = str.length;  
    for(var i = 0; i < len; i++) {  
        c = str.charCodeAt(i);  
        if(c >= 0x010000 && c <= 0x10FFFF) {  
            bytes.push(((c >> 18) & 0x07) | 0xF0);  
            bytes.push(((c >> 12) & 0x3F) | 0x80);  
            bytes.push(((c >> 6) & 0x3F) | 0x80);  
            bytes.push((c & 0x3F) | 0x80);  
        } else if(c >= 0x000800 && c <= 0x00FFFF) {  
            bytes.push(((c >> 12) & 0x0F) | 0xE0);  
            bytes.push(((c >> 6) & 0x3F) | 0x80);  
            bytes.push((c & 0x3F) | 0x80);  
        } else if(c >= 0x000080 && c <= 0x0007FF) {  
            bytes.push(((c >> 6) & 0x1F) | 0xC0);  
            bytes.push((c & 0x3F) | 0x80);  
        } else {  
            bytes.push(c & 0xFF);  
        }  
    }  
    return bytes;  
}   
/**
* 将设备的自定义数据转换为标准平台格式,平台格式见相关文档
* 属性上报
* 入参：topic string 设备上报或下发的topic
* 入参：bytes byte数组
* 出参：jsonObj JSON对象
*/
function bytesToJsonForPropUp(topic, bytes) {
    var jsonObj = JSON.parse(bytes2string(bytes));
    //jsonObj['properties']['rssi']=10
    return jsonObj;
}

/**
* 将设备的标准平台格式转换为自定义数据,平台格式见相关文档
* 属性设置
* 入参：topic string 设备上报或下发的topic
* 入参：jsonStr JSON字符串
* 出参：byte[] byte数组
*/
function jsonToBytesForPropDown(topic, jsonStr) {
    var jsonObj=JSON.parse(jsonStr)
    //jsonObj['properties']['rssi']=10
    return string2bytes(JSON.stringify(jsonObj)); 
}

/**
* 将设备的标准平台格式转换为自定义数据,平台格式见相关文档
* 属性刷新
* 入参：topic string 设备上报或下发的topic
* 入参：jsonStr JSON字符串
* 出参：byte[] byte数组
*/
function jsonToBytesForPropRefresh(topic, jsonStr) {
    var jsonObj=JSON.parse(jsonStr)
    //jsonObj['properties']['rssi']=10
    return string2bytes(JSON.stringify(jsonObj)); 
}

/**
* 将设备的自定义数据转换为标准平台格式,平台格式见相关文档
* 事件上报,注意日志事件为多个告警的数组，略有不同
* 入参：topic string 设备上报或下发的topic
* 入参：bytes byte数组
* 出参：jsonObj JSON对象
*/
function bytesToJsonForEventUp(topic, bytes) {
    var jsonObj = JSON.parse(bytes2string(bytes));
    //jsonObj['datas']['rssi']=10
    return jsonObj;
}

/**
* 将设备的标准平台格式转换为自定义数据,平台格式见相关文档
* 事件下发,注意日志事件为多个告警的数组，略有不同
* 入参：topic string 设备上报或下发的topic
* 入参：jsonStr JSON字符串
* 出参：byte[] byte数组
*/
function jsonToBytesForEventDown(topic, jsonStr) {
    var jsonObj=JSON.parse(jsonStr)
    //jsonObj['datas']['rssi']=10
    return string2bytes(JSON.stringify(jsonObj)); 
}




`, //不要去掉上面的空行
            defaultPythonData: `# coding=utf-8
def bytesToJsonForPropUp(topic, bytes):
    '''
    将设备的自定义数据转换为标准平台格式,平台格式见相关文档
    属性上报
    入参：topic string 设备上报或下发的topic
    入参：bytes byte数组
    出参：jsonObj JSON对象
    '''
    jsonObj = JSON.parse(bytes2string(bytes));
    #jsonObj['properties']['rssi']=10
    return jsonObj;


def jsonToBytesForPropDown(topic, jsonStr):
    '''
    将设备的标准平台格式转换为自定义数据,平台格式见相关文档
    属性设置
    入参：topic string 设备上报或下发的topic
    入参：jsonStr JSON字符串
    出参：byte[] byte数组
    '''
    jsonObj=JSON.parse(jsonStr)
    #jsonObj['properties']['rssi']=10
    return string2bytes(JSON.stringify(jsonObj)); 

def jsonToBytesForPropRefresh(topic, jsonStr):
    '''
    将设备的标准平台格式转换为自定义数据,平台格式见相关文档
    属性刷新
    入参：topic string 设备上报或下发的topic
    入参：jsonStr JSON字符串
    出参：byte[] byte数组
    '''
    jsonObj=JSON.parse(jsonStr)
    #jsonObj['properties']['rssi']=10
    return string2bytes(JSON.stringify(jsonObj)); 

def bytesToJsonForEventUp(topic, bytes):
    '''
    将设备的自定义数据转换为标准平台格式,平台格式见相关文档
    事件上报
    入参：topic string 设备上报或下发的topic
    入参：bytes byte数组
    出参：jsonObj JSON对象
    '''
    jsonObj = JSON.parse(bytes2string(bytes));
    #jsonObj['datas']['rssi']=10
    return jsonObj;

def jsonToBytesForEventDown(topic, jsonStr):
    '''
    将设备的标准平台格式转换为自定义数据,平台格式见相关文档
    事件下发
    入参：topic string 设备上报或下发的topic
    入参：jsonStr JSON字符串
    出参：byte[] byte数组
    '''
    jsonObj=JSON.parse(jsonStr)
    #jsonObj['datas']['rssi']=10
    return string2bytes(JSON.stringify(jsonObj)); 




`, //不要去掉上面的空行
            topics: [
                { 'type': '属性上报', 'topic': 'device/properties/up/{产品编码}/{设备编码}' },
                { 'type': '属性设置', 'topic': 'device/properties/down/{产品编码}/{设备编码}' },
                { 'type': '属性刷新', 'topic': 'device/properties/refresh/{产品编码}/{设备编码}' },
                { 'type': '事件上报', 'topic': 'device/event/up/{产品编码}/{设备编码}' },
                { 'type': '事件下发', 'topic': 'device/event/down/{产品编码}/{设备编码}' },
            ],
            childTopics: [
                { 'type': '子设备属性上报', 'topic': 'device/child/properties/up/{网关产品编码}/{网关设备编码}/{产品编码}/{设备编码}' },
                { 'type': '子设备属性设置', 'topic': 'device/child/properties/down/{网关产品编码}/{网关设备编码}/{产品编码}/{设备编码}' },
                { 'type': '子设备属性刷新', 'topic': 'device/child/properties/refresh/{网关产品编码}/{网关设备编码}/{产品编码}/{设备编码}' },
                { 'type': '子设备事件上报', 'topic': 'device/child/event/up/{网关产品编码}/{网关设备编码}/{产品编码}/{设备编码}' },
                { 'type': '子设备事件下发', 'topic': 'device/child/event/down/{网关产品编码}/{网关设备编码}/{产品编码}/{设备编码}' },
            ],
        };
    },
    // json生成文件下载
    sequenceDownload(params, name) {
        const element = document.createElement("a");
        element.setAttribute(
            "href",
            "data:text/plain;charset=utf-8," + encodeURIComponent(params)
        );
        element.setAttribute("download", name);
        element.style.display = "none";
        element.click();
    },
    // 前一个月日期
    getPreMonthDay(date) {
        var arr = date.split("-");
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var day = arr[2]; //获取当前日期的日
        //var days = new Date(year, month, 0);
        //console.log(days);
        //days = days.getDate(); //获取当前日期中月的天数
        var year2 = year;
        var month2 = parseInt(month) - 1;
        if (month2 == 0) {
            year2 = parseInt(year2) - 1;
            month2 = 12;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = "0" + month2;
        }
        var t2 = year2 + "-" + month2 + "-" + day2;
        return t2;
    },
    toTimeString(now) {
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth(); //得到月份
        var date = now.getDate(); //得到日期
        var hour = now.getHours(); //得到小时
        var minute = now.getMinutes(); //得到分钟
        var second = now.getSeconds(); //得到秒数
        month = month + 1;
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        if (hour < 10) hour = "0" + hour;
        if (minute < 10) minute = "0" + minute;
        if (second < 10) second = "0" + second;
        var timeStr =
            year +
            "-" +
            month +
            "-" +
            date +
            " " +
            hour +
            ":" +
            minute +
            ":" +
            second;
        return timeStr;
    },
    addDays(curDate, n) {
        if (typeof(n) === 'undefined' || n == null)
            n = 1;
        return (new Date(curDate.getTime() + n * 24 * 3600 * 1000));
    },
    addHours(curDate, n) {
        if (typeof(n) === 'undefined' || n == null)
            n = 1;
        return (new Date(curDate.getTime() + n * 3600 * 1000));
    },
    toTimeString14(now) {
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth(); //得到月份
        var date = now.getDate(); //得到日期
        var hour = now.getHours(); //得到小时
        var minute = now.getMinutes(); //得到分钟
        var second = now.getSeconds(); //得到秒数
        month = month + 1;
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        if (hour < 10) hour = "0" + hour;
        if (minute < 10) minute = "0" + minute;
        if (second < 10) second = "0" + second;
        var timeStr = year + month + date + hour + minute + second;
        return timeStr;
    },
    formatEveryDay(start, end) {
        let dateList = [];
        var startTime = this.getDate(start);
        var endTime = this.getDate(end);

        while (endTime.getTime() - startTime.getTime() >= 0) {
            var year = startTime.getFullYear();
            var month =
                startTime.getMonth() + 1 < 10 ?
                "0" + (startTime.getMonth() + 1) :
                startTime.getMonth() + 1;
            var day =
                startTime.getDate().toString().length == 1 ?
                "0" + startTime.getDate() :
                startTime.getDate();
            dateList.push(year + "-" + month + "-" + day);
            startTime.setDate(startTime.getDate() + 1);
        }
        return dateList;
    },

    getDate(datestr) {
        var temp = datestr.split("-");
        var date = new Date(temp[0], temp[1] - 1, temp[2]);
        return date;
    },
    JSONParseString(str) {
        if (typeof str == "string") {
            try {
                var obj = JSON.parse(str);
                if (typeof obj == "object" && obj) {
                    return obj;
                } else {
                    return str;
                }
            } catch (e) {
                // console.log('error：'+str+'!!!'+e);
                return str;
            }
        }
        // console.log('It is not a string!')
        return str;
    },
    toFullScreen(element, func) {
        let this_ = this;
        // if(element.requestFullscreen){
        //     element.requestFullscreen();
        // }
        // else if(element.mozRequestFullScreen) {
        //     element.mozRequestFullScreen();
        // }
        // else if(element.webkitRequestFullscreen) {
        //     element.webkitRequestFullscreen();
        // }
        // else if(element.msRequestFullscreen) {
        //     element.msRequestFullscreen();
        // }
        // let wi=window.screen.width;
        // let hi=window.screen.height;
        element.style.width = "100%";
        element.style.height = "100%";
        element.style.position = "fixed";
        element.style.overflow = "auto";
        element.style.zIndex = 1000;
        element.style.margin = "0px";
        element.style.top = "0px";
        element.style.left = "0px";
        element.style.backgroundColor = "#ffffff";
        this_.valueBeforeFullScreen = element.style;
        this_.exitFullScreenEscKey = 27; //ESC
        // document.onkeyup=function(e){
        //   this_.exitFullScreenEscKey=null;
        // }
        document.onkeydown = function(event) {
            // console.log('event='+event.keyCode+',this_.exitFullScreenEscKey='+this_.exitFullScreenEscKey)
            if (this_.exitFullScreenEscKey !== null) {
                if (this_.exitFullScreenEscKey === event.keyCode) {
                    this_.exitFullScreen(element, func);
                }
            }
        };
        // element.style={
        //         width:"100%",
        //         height:"100%",
        //         position:"fixed",
        //         overflow:"auto",
        //         zIndex:1000,
        //         margin: "0px",
        //         top:"0px",
        //         left:"0px",
        //         padding:"0px",
        //         backGroundColor:"#ffffff",
        //         }
    },
    exitFullScreen(element, func) {
        // if(document.exitFullscreen) {
        //     document.exitFullscreen();
        // } else if(document.mozCancelFullScreen) {
        //     document.mozCancelFullScreen();
        // } else if(document.webkitExitFullscreen) {
        //     document.webkitExitFullscreen();
        // }
        // location.reload()
        // element.style={
        //         width:"unset",
        //         height:"unset",
        //         position:"unset",
        //         overflow:"unset",
        //         zIndex:"unset",
        //         margin: "unset",
        //         top:"unset",
        //         left:"unset",
        //         padding:"unset",
        //         backGroundColor:"unset",
        //         }
        // element.style.width="auto";
        // element.style.height="auto";
        // element.style.position="";
        // element.style.overflow="unset";
        // element.style.zIndex="unset";
        // element.style.margin="unset";
        // element.style.top="unset";
        // element.style.left="unset";
        // element.style.backGroundColor="unset";
        element.style = this.valueBeforeFullScreen;
        this.exitFullScreenEscKey = null;
        if (func !== null) {
            func();
        }
    },
    propNameUndefined: '__undefined__',
    topics: [
        { 'type': '属性上报', 'topic': 'device/properties/up/{产品编码}/{设备编码}' },
        { 'type': '属性设置', 'topic': 'device/properties/down/{产品编码}/{设备编码}' },
        { 'type': '属性刷新', 'topic': 'device/properties/refresh/{产品编码}/{设备编码}' },
        { 'type': '事件上报', 'topic': 'device/event/up/{产品编码}/{设备编码}' },
        { 'type': '事件下发', 'topic': 'device/event/down/{产品编码}/{设备编码}' },
    ],
    childTopics: [
        { 'type': '子设备属性上报', 'topic': 'device/child/properties/up/{网关产品编码}/{网关设备编码}/{产品编码}/{设备编码}' },
        { 'type': '子设备属性设置', 'topic': 'device/child/properties/down/{网关产品编码}/{网关设备编码}/{产品编码}/{设备编码}' },
        { 'type': '子设备属性刷新', 'topic': 'device/child/properties/refresh/{网关产品编码}/{网关设备编码}/{产品编码}/{设备编码}' },
        { 'type': '子设备事件上报', 'topic': 'device/child/event/up/{网关产品编码}/{网关设备编码}/{产品编码}/{设备编码}' },
        { 'type': '子设备事件下发', 'topic': 'device/child/event/down/{网关产品编码}/{网关设备编码}/{产品编码}/{设备编码}' },
    ],
    unit_names: ["伏特",
        "像素",
        "克",
        "克每升",
        "克每毫升",
        "克每立方米",
        "公斤",
        "公里",
        "公顷",
        "分",
        "分米",
        "分贝",
        "分钟",
        "千克",
        "千克每立方米",
        "千安",
        "千帕",
        "千焦",
        "千瓦·时",
        "千瓦特",
        "千米",
        "千米每小时",
        "升",
        "华氏度",
        "卡路里",
        "厘米",
        "吨",
        "周",
        "安培",
        "小时",
        "帕斯卡",
        "平方公里",
        "平方千米",
        "平方厘米",
        "平方毫米",
        "平方米",
        "年",
        "度",
        "开尔文",
        "弧度",
        "弧度每平方秒",
        "弧度每秒",
        "微克每升",
        "微克每平方分米每天",
        "微克每立方米",
        "微安",
        "微法",
        "微瓦",
        "微米",
        "摄氏度",
        "日",
        "月",
        "欧姆",
        "比特",
        "毫伏",
        "毫克",
        "毫克每升",
        "毫克每立方米",
        "毫升",
        "毫安",
        "毫帕",
        "毫瓦",
        "毫秒",
        "毫米",
        "法拉",
        "流明",
        "焦耳",
        "照度",
        "牛",
        "瓦·时",
        "瓦特",
        "电子伏",
        "百万分率",
        "百分比",
        "百帕",
        "皮法",
        "秒",
        "立方公里",
        "立方千米",
        "立方厘米",
        "立方毫米",
        "立方米",
        "米",
        "米每秒",
        "纳法",
        "纳米",
        "节",
        "节每分钟转数",
        "赫兹",
        "重力加速度",
    ],
    defaultJsData: `/**字符串和字节数组相互转换方法*/
function bytes2string(arr) { 
    if(typeof arr === 'string') {  
        return arr;  
    }  
    var str = '',_arr = arr;  
    for(var i = 0; i < _arr.length; i++) {  
        var one = _arr[i].toString(2), v = one.match(/^1+?(?=0)/);  
        if(v && one.length == 8) {  
            var bytesLength = v[0].length;  
            var store = _arr[i].toString(2).slice(7 - bytesLength);  
            for(var st = 1; st < bytesLength; st++) {  
                store += _arr[st + i].toString(2).slice(2);  
            }  
            str += String.fromCharCode(parseInt(store, 2));  
            i += bytesLength - 1;  
        } else {  
            str += String.fromCharCode(_arr[i]);  
        }  
    }  
    return str;  
} 
function string2bytes(str) { 
    var bytes = new Array();  
    var len, c;  
    len = str.length;  
    for(var i = 0; i < len; i++) {  
        c = str.charCodeAt(i);  
        if(c >= 0x010000 && c <= 0x10FFFF) {  
            bytes.push(((c >> 18) & 0x07) | 0xF0);  
            bytes.push(((c >> 12) & 0x3F) | 0x80);  
            bytes.push(((c >> 6) & 0x3F) | 0x80);  
            bytes.push((c & 0x3F) | 0x80);  
        } else if(c >= 0x000800 && c <= 0x00FFFF) {  
            bytes.push(((c >> 12) & 0x0F) | 0xE0);  
            bytes.push(((c >> 6) & 0x3F) | 0x80);  
            bytes.push((c & 0x3F) | 0x80);  
        } else if(c >= 0x000080 && c <= 0x0007FF) {  
            bytes.push(((c >> 6) & 0x1F) | 0xC0);  
            bytes.push((c & 0x3F) | 0x80);  
        } else {  
            bytes.push(c & 0xFF);  
        }  
    }  
    return bytes;  
}   
/**
* 将设备的自定义数据转换为标准平台格式,平台格式见相关文档
* 属性上报
* 入参：topic string 设备上报或下发的topic
* 入参：bytes byte数组
* 出参：jsonObj JSON对象
*/
function bytesToJsonForPropUp(topic, bytes) {
    var jsonObj = JSON.parse(bytes2string(bytes));
    //jsonObj['properties']['rssi']=10
    return jsonObj;
}

/**
* 将设备的标准平台格式转换为自定义数据,平台格式见相关文档
* 属性设置
* 入参：topic string 设备上报或下发的topic
* 入参：jsonStr JSON字符串
* 出参：byte[] byte数组
*/
function jsonToBytesForPropDown(topic, jsonStr) {
    var jsonObj=JSON.parse(jsonStr)
    //jsonObj['properties']['rssi']=10
    return string2bytes(JSON.stringify(jsonObj)); 
}

/**
* 将设备的标准平台格式转换为自定义数据,平台格式见相关文档
* 属性刷新
* 入参：topic string 设备上报或下发的topic
* 入参：jsonStr JSON字符串
* 出参：byte[] byte数组
*/
function jsonToBytesForPropRefresh(topic, jsonStr) {
    var jsonObj=JSON.parse(jsonStr)
    //jsonObj['properties']['rssi']=10
    return string2bytes(JSON.stringify(jsonObj)); 
}

/**
* 将设备的自定义数据转换为标准平台格式,平台格式见相关文档
* 事件上报,注意日志事件为多个告警的数组，略有不同
* 入参：topic string 设备上报或下发的topic
* 入参：bytes byte数组
* 出参：jsonObj JSON对象
*/
function bytesToJsonForEventUp(topic, bytes) {
    var jsonObj = JSON.parse(bytes2string(bytes));
    //jsonObj['datas']['rssi']=10
    return jsonObj;
}

/**
* 将设备的标准平台格式转换为自定义数据,平台格式见相关文档
* 事件下发,注意日志事件为多个告警的数组，略有不同
* 入参：topic string 设备上报或下发的topic
* 入参：jsonStr JSON字符串
* 出参：byte[] byte数组
*/
function jsonToBytesForEventDown(topic, jsonStr) {
    var jsonObj=JSON.parse(jsonStr)
    //jsonObj['datas']['rssi']=10
    return string2bytes(JSON.stringify(jsonObj)); 
}




`, //不要去掉上面的空行
    defaultPythonData: `# coding=utf-8
def bytesToJsonForPropUp(topic, bytes):
    '''
    将设备的自定义数据转换为标准平台格式,平台格式见相关文档
    属性上报
    入参：topic string 设备上报或下发的topic
    入参：bytes byte数组
    出参：jsonObj JSON对象
    '''
    jsonObj = JSON.parse(bytes2string(bytes));
    #jsonObj['properties']['rssi']=10
    return jsonObj;


def jsonToBytesForPropDown(topic, jsonStr):
    '''
    将设备的标准平台格式转换为自定义数据,平台格式见相关文档
    属性设置
    入参：topic string 设备上报或下发的topic
    入参：jsonStr JSON字符串
    出参：byte[] byte数组
    '''
    jsonObj=JSON.parse(jsonStr)
    #jsonObj['properties']['rssi']=10
    return string2bytes(JSON.stringify(jsonObj)); 

def jsonToBytesForPropRefresh(topic, jsonStr):
    '''
    将设备的标准平台格式转换为自定义数据,平台格式见相关文档
    属性刷新
    入参：topic string 设备上报或下发的topic
    入参：jsonStr JSON字符串
    出参：byte[] byte数组
    '''
    jsonObj=JSON.parse(jsonStr)
    #jsonObj['properties']['rssi']=10
    return string2bytes(JSON.stringify(jsonObj)); 

def bytesToJsonForEventUp(topic, bytes):
    '''
    将设备的自定义数据转换为标准平台格式,平台格式见相关文档
    事件上报
    入参：topic string 设备上报或下发的topic
    入参：bytes byte数组
    出参：jsonObj JSON对象
    '''
    jsonObj = JSON.parse(bytes2string(bytes));
    #jsonObj['datas']['rssi']=10
    return jsonObj;

def jsonToBytesForEventDown(topic, jsonStr):
    '''
    将设备的标准平台格式转换为自定义数据,平台格式见相关文档
    事件下发
    入参：topic string 设备上报或下发的topic
    入参：jsonStr JSON字符串
    出参：byte[] byte数组
    '''
    jsonObj=JSON.parse(jsonStr)
    #jsonObj['datas']['rssi']=10
    return string2bytes(JSON.stringify(jsonObj)); 




`, //不要去掉上面的空行
    msgStructs: [
        { type: 'propUp', value: `{
"seqId":"序列ID",
"deviceId":"设备或子设备ID",
"gwDeviceId":"网关设备ID,没有为空",
"timestampSec":1598320913,
"timestampMSec":873,
"properties":{"width":11,"animal":"dog"}
}` },
        { type: 'propDown', value: `{
"seqId":"序列ID",
"deviceId":"设备或子设备ID",
"gwDeviceId":"网关设备ID,没有为空",
"timestampSec":1598320913,
"timestampMSec":873,
"properties":{"sn":"2355","model":"AMD06","width":11}
}` },
        { type: 'propRefresh', value: `{
"seqId":"序列ID",
"deviceId":"设备或子设备ID",
"gwDeviceId":"网关设备ID,没有为空",
"timestampSec":1598320913,
"timestampMSec":873,
"properties":["sn","model"]
}` },
        { type: 'eventUpLogEvent', value: `{
"seqId":"序列ID",
"deviceId":"设备或子设备ID",
"gwDeviceId":"网关设备ID,没有为空",
"timestampSec":1598320913,
"timestampMSec":873,
"type":"log",
"content":[
    {
    "level":"warn",
    "code":"9910",
    "message":"温度过高",
    "datas":{"temperature":120}
    }
]
}` },
        { type: 'eventUpOther', value: `{
"seqId":"序列ID",
"deviceId":"设备或子设备ID",
"gwDeviceId":"网关设备ID,没有为空",
"timestampSec":1598320913,
"timestampMSec":873,
"type":"command",
"content":{
    "type":"reboot",
    "resultCode": 0,
    "resultMessage": "reboot ok",
    "datas":{"cause":"manul from plat"}
}
}` },
        { type: 'eventDown', value: `{
"seqId":"序列ID",
"deviceId":"设备或子设备ID",
"gwDeviceId":"网关设备ID,没有为空",
"timestampSec":1598320913,
"timestampMSec":873,
"type":"command",
"content":{
    "type":"reboot",
    "args":{"afterSecs":"60"}
}
}


` }, //不要去掉上面的空行
    ],
    remoteLoad(url, hasCallback) {
        return createScript(url)
            /**
             * 创建script
             * @param url
             * @returns {Promise}
             */
        function createScript(url) {
            let scriptElement = document.createElement('script')
            document.body.appendChild(scriptElement)
            let promise = new Promise((resolve, reject) => {
                scriptElement.addEventListener('load', e => {
                    removeScript(scriptElement)
                    if (!hasCallback) {
                        resolve(e)
                    }
                }, false)

                scriptElement.addEventListener('error', e => {
                    removeScript(scriptElement)
                    reject(e)
                }, false)

                if (hasCallback) {
                    window.____callback____ = function() {
                        resolve()
                        window.____callback____ = null
                    }
                }
            })

            if (hasCallback) {
                url += '&callback=____callback____'
            }

            scriptElement.src = url

            return promise
        }

        /**
         * 移除script标签
         * @param scriptElement script dom
         */
        function removeScript(scriptElement) {
            document.body.removeChild(scriptElement)
        }
    },
    sleep(numberMillis) {
        let now = new Date();
        let exitTime = now.getTime() + numberMillis;
        while (now.getTime() < exitTime) {
            now = new Date();
        }
    },
    // amapLoaderFlag: 0,
};