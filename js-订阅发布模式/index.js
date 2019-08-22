// 发布订阅模式示例
function publisher () {
    this.arr = [];
}

publisher.prototype = {
    // 订阅
    subscribe: function (fn) {
        this.arr.push(fn);
    },

    // 取消订阅
    unSubscribe: function (fn) {
        let that =  this;
        //过滤订阅者,如果'订阅者'el存在arr数组中，就解绑订阅
        that.arr = that.arr.filter(function (el) {
            if (el !== fn) {
                return el;
            }
        });
    },

    // 更新订阅内容
    upData: function (o, thisObj) {
        //o => 剩余订阅者 
        var scoped = thisObj || window ;
        this.arr.forEach (function (el) {
            // scoped 可以随便设置,el最终会替换scoped,将o 剩余订阅者传递进arr数组,将订阅的人的信息打印出来
            el.call(scoped,o)
        });
    }
};

//创建一个实例
var newSubScribe = new publisher () ;
 
//创建一个订阅者
var user = function (data) {
    console.log (` 第一位订阅者 ${data} 订阅了。`)
}
 
//创建第二位订阅者
var newUser = function (data) {
    console.log (` 第二位订阅者 ${data} 订阅了。`)
}
 
//绑定订阅
newSubScribe.subscribe(user);
 
newSubScribe.subscribe(newUser);
 
//更新订阅内容,看下效果
newSubScribe.upData(`Z先生`);
 
//解绑第一个订阅者
newSubScribe.unSubscribe(user);
 
//在更新下数据
newSubScribe.upData(`Z女士`);




