var box = document.getElementById("cont");


//自造数据
var data = []
for (let i = 0; i < 100; i++) {
    data.push({ no: i, title: "标题" });
}
//生成页脚
var footer = document.getElementsByClassName("footer")[0];
console.log(footer);

for (let i = 0; i < Math.floor(data.length / 12); i++) {
    let a = document.createElement("a");
    a.innerText = i + 1;
    footer.appendChild(a);
}


//创建一个Item
function crateItem(no, title) {
    var dom = document.createElement("div")
    dom.setAttribute("class", "item");
    var html = '<div class="numlab">' + no + '</div>' +
        '<img src="https://work.mafengshe.com/static/imgs/%E5%B9%B3%E9%9D%99.svg" width="60" height="60">' +
        '<div class="item-word">' + title + '</div>';
    dom.innerHTML = html;
    return dom;
}

//获取第page页的数据,一页12个
function getData(page) {
    return data.slice(page * 12, page * 12 + 12);
}

//清空盒子
function cleanBox() {
    var chil = box.childNodes;
    for (let i = chil.length - 1; i >= 0; i--) {
        box.removeChild(chil[i]);
    }

}

//填充盒子第page页的内容
function addItemToBox(page) {
    var items = getData(page);
    for (let i = 0; i < items.length; i++)
        box.appendChild(crateItem(items[i].no, items[i].title));
}


//点击翻页事件
function toPage(page) {
    cleanBox();
    addItemToBox(page);
}

//给翻页按钮绑定事件
var toPages = document.querySelectorAll(".footer a");
toPages.forEach(
    function(i) { //这里默认的参数是事件对象
        i.addEventListener("click", function(e) {
            toPage(e.srcElement.innerHTML - 1)
        });

    }
)