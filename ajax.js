//1  web浏览器
// 2 ajax对象
// 3 初始化HTTP请求参数（请求方式、地址、同步异步）
// 4 发送请求
// 5 监控数据
// 6 检查数据 使用


function ajax(method,url,callback,datas,flag){
    // 2 ajax对象
    var xml = null;
    //判断浏览器的版本
    if(window.XMLHttpRequest){
        //IE6以上的版本兼容
        xml = new XMLHttpRequest();
    }else{
        //IE6及以下的版本兼容
        xml = new ActiveXObject('Microsoft.XMLHttp');
    }
    // 3 初始化HTTP请求参数（请求方式、地址、同步异步）
    //请求方式要写大写
    // xml.open('GET','./getNews.php?'+data,true);
    // 4 发送请求
    //请求类型 传的类型是一个以url编码为格式的形式  类型必须是固定的，不能更改
    // xml.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    // xml.send();

    //封装好GET和POST 
    //可以传大小写的get  post  GET POST
    method = method.toUpperCase();
     if(method == 'GET'){
         //清除浏览器缓存  只有GET请求才有缓存，POST没有缓存
         var date = new Date();
         timer = date.getTime();
        xml.open(method,url +'?'+datas+'&timer='+timer,flag);
        xml.send();
     }else if(method == 'POST'){
        xml.open(method,url,flag);
        xml.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xml.send(data);
     }

    // 5 监控数据
    xml.onreadystatechange = function(){
        // console.log(xml.readyState);
        if(xml.readyState == 4){
          // 6 检查数据 使用
            if(xml.status == 200){
                callback(xml.responseText);
            }
        }
    }
}


