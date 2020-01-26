new Promise(resolve => {
    resolve(1);
    Promise.resolve().then(() => console.log(2));
    setImmediate(function(){
        console.log('setImmediate')
    })
    setTimeout(function(){
        console.log('setTimeOut')
    },0)

    Promise.resolve().then(() => console.log('666'));
    console.log('promise log')
}).then(t => console.log(t));
Promise.resolve().then(() => console.log('out script promise'));

console.log('script log');