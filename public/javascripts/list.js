//全局变量用于在更改类型或者排序规则后获取数据的时候使用
var classid = null;
var order = null;
var keyword = null;
$(".goods").delegate(".type-btn","click",function (e) {

    //当切换类型的时候，不需要关键字搜索
    keyword = null
    $("#search-inp").val('')

    //控制样式
    $(".type-btn").removeClass('btn-primary').addClass("btn-info")
    $(this).removeClass('btn-info').addClass("btn-primary")
        //1.获取到此按钮代表的classid
    if($(this).data('id')==classid){//如果两次点击是相同的type，阻止下面代码运行，不重新获取
        return ;
    }
    classid = $(this).data('id')//$(this).attr("data-id")
    //classid为0代表全部，
    getGoods()
 
})
$(".goods").delegate(".order-btn","click",function (e) {
    //更改样式
    $(".order-btn").removeClass("btn-danger").addClass("btn-info")
    $(this).removeClass("btn-info").addClass("btn-danger")

    //1.获取到此按钮代表的order
    if($(this).data('order')==order){//如果点击的还是同一个按钮的时候，取消排序
        $(this).removeClass("btn-danger").addClass("btn-info")//重置样式
        order=null
    }else{
        order = $(this).data('order')//$(this).attr("data-id")
    }
   
    //classid为0代表全部，
    getGoods()
 
})

$("#search-inp").keyup(function (e) {
    if(e.keyCode==13){
        keyword = this.value
        getGoods()
    }
})

function getGoods(){
    $.ajax({
        url:"/goods/getGoodsInList",
        data:{classid:classid,order:order,keyword:keyword},
        success:function (results) {             
            showGoods(results)
        }
    })
}

function showGoods(results){
    let str = ''
    results.forEach((item,i)=>{
        str+=`
            <div class="col-xs-12 col-sm-6 col-md-3">
                <div class="thumbnail">
                <img class="animated" src="${item.imgurl}" title="${item.name}" >
                <div class="caption">
                    <h3><a href="/show?id=${item._id}">${item.name}</a></h3>
                    <p>￥：${item.price} 人气：${item.hot}</p>
                    <p>
                    <button data-id=${item._id} class="add-btn btn btn-danger" >加入购物车</button> 
                    </p>
                </div>
                </div>
            </div>
        `
    })
    $(".goods .row").html(str)
}