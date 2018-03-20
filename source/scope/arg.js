function demo(a){
    console.log(a)
    var a = "局部变量"
    function a(){
        console.log('函数提升')
    }
}
demo("函数参数")