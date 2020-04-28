问答题
=====
##### 1. setTimeout 或者 setInterval 设置定时器是准时触发的吗？为什么？如果不是，他可能延时触发还是延后触发？
并不是，是延后触发的。
由于JS是单线程的一个时间只能处理一件事情，所以实际定时器设定的执行语句是在JS引擎判断该执行后，才加入事件处理队列，如果这时队列中有别的任务那么会造成触发延后。
##### 2. 如下代码 setInterval 设置的定时器激活间隔为多少？为什么？

    setInterval(function(){
      for(var i=0;i<1000*1000*1000;i++);//假设这行代码运行需要100ms
    },1000)
1000ms
setInterval只会每隔1000ms将代码放入任务队列一次，具体的执行间隔要看实际的浏览器的运行状态



##### 3. 如下代码的输出是什么？为什么？

    setTimeout(function(){
      console.log(1);
    },0)
    console.log(2);

```js
2
1//由于设定了定时器所以不管时间设置的有多短内部的语句都会放到下一轮事件循环里去所以先输出2再输出1
```

##### 4. 如下代码执行结果是什么？请解释原因

    var t = true;

    window.setTimeout(function (){
       t = false;
    },1000);
    while (t){}
    alert('end');
```js
//死循环，由于t=false被移到下一轮循环去了会直接运行while(t){}进入死循环卡住。而由于js不能多线程操作所以不会进入下一轮
```
##### 5. 我们会在很多代码里看到如下语句，请说明在什么场景下需要使用如下形式代码

    setTimeout(function(){
      // balala
      // 这里有很多代码
      // balala
    },0)
```
/*这段代码的作用是把中间的代码段移到下一轮事件循环里去执行
实际上意味着将任务放到浏览器最早可得的空闲时段执行
具体的应用包括
1.调整事件的发生顺序
   比如开发中某个事件县发生到子元素然后冒泡到父元素，那么子元素的回调函数会先于父元素的先执行。如果想要父元素先执行，就需要用setTimeout(f,0);

2.大多时候用户自定义的回调函数通常在浏览器的默认动作前就触发了，比如
document.getElementById('input-box').onkeypress = function (event) {
  this.value = this.value.toUpperCase();
}
该函数将输入的内容实时的替换成大写的，而由于提前触发的原因往往浏览器还没接受文本之前就触发，所以为了发挥作用需要把函数的内容用定时器改写

var self= this;
setTimeout(function() {
    self.value = self.value.toUpperCase();
  }, 0);

注意setTimeout方法内部的this默认指向的是全局环境，所以这里把dom的this指针用变量保存下来使用

3. 将计算量耗时长的任务分别放到setTimeout里去执行
https://wangdoc.com/javascript/async/timer.html
*/



```
代码题
=====
请用 setTimeout 模拟实现 setInterval，并说明你实现的函数和系统自带的 setInterval 有什么不同

```
function mySetInterval(f, time) {
            setTimeout(function() {
                f();
                mySetInterval(f, time);
            }, time);
        }
```
不同之处系统的setIntercal每隔规定的time就会把任务加入任务列表一次，
而我们自己写的间隔的时间除了规定的time还要加上f自己运行的时间
另外我们自己的定时器的号码会不断变化