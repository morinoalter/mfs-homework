问答题
=====
##### 1. js中对象的属性查找机制是什么？请写出实现属性查找机制的伪代码
在js中对象的属性查找采用递归的方式，首先js在对象本身拥有的属性里查找，如果没有找到，那么他会访问自己的__proto__，在__proto__对象的属性里查找，如果没有找到，会接着寻找__proto__的__proto__对象，直到最后__proto__对象为null或者找到对应的属性
伪代码：
```
      while （当前对象没有有属性a ）{
             if (当前对象的__proto__为null) return null;
                   else 当前对象=当前对象.__proto__;
      }
      if（当前对象有属性a）返回属性a；
```


##### 2. 自学ES5的 Object.create() 函数，然后用自己的代码重新实现
Object.create()使用传入的参数作为原型进行新对象的构造
```js
//prototype是函数才有的属性
function(proto){
     function Fn(){};
     //新建一个构造函数
     //将构造函数的原型指向参数
     Fn.prototype.__proto__=proto.prototype;
     return new Fn();
}
```
##### 3. 使用原型链实现继承，本质通过改变对象的什么，来实现继承？
通过改变对象的__proto__属性来实现继承
##### 4. 当我们使用new关键字，其背后干了哪些事？
首先js新建了一个空对象，然后将这个空对象传入new关键字后头跟着的构造函数进行修饰，最后将这个对象返回

##### 5. 讲义中使用 Book.prototype = new Goods() 实现继承有什么不完美的地方？
由于新建了一个实例good对象所以会导致属性值多复制了一份，另外这样的实现无法给goods构造函数传参数。
##### 6. 画出代码题1的原型图，需要画到null

代码题
=====
假定我们的代码中需要4个类，分别是 Animal，Dog，Cat，Human。Animal 有方法 eat,sleep;Dog,Cat有方法bark；Human有方法speak；请使用js中的继承实现

