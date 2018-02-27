console.log('script start');

setTimeout(function() {
  console.log('timeout1');
}, 0);

new Promise(resolve => {
    console.log('promise1');
    resolve();
    setTimeout(() => console.log('timeout2'), 10);
}).then(function() {
    console.log('then1')
})

console.log('script end');

// $ node task.js
// script start
// promise1
// script end
// then1
// timeout1
// timeout2