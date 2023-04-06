[toc]

# 渲染十万条数据解决方案
```
# 三种解决方案
## 虚拟列表: 最佳，无需
只挂载可见区域dom, 根据高度等数据，完整长列表数据进行截断 sliceList = dataList.slice(start, end)
  scroll
  优化IntersectionObserver（交叉观察器）动画，异步api,性能消耗小

## 懒加载
触底加载dom

## 时间分片
递归创建dom
  setTimeout
  优化requestAnimationFrame 16.7ms掉帧问题，react fiber
```
## 参考
* [面试题：渲染十万条数据解决方案](https://juejin.cn/post/7065218958663614500)
* [demo参考：花三个小时，完全掌握分片渲染和虚拟列表～](https://juejin.cn/post/7121551701731409934)
* [性能优化小册 - 渲染十万条数据：基于 IntersectionObserver 的虚拟化长列表](https://segmentfault.com/a/1190000022956784)
* [「前端进阶」高性能渲染十万条数据(时间分片)](https://juejin.cn/post/6844903938894872589)
* [性能优化小册 - 渲染十万条数据：基于 IntersectionObserver 的虚拟化长列表](https://segmentfault.com/a/1190000022956784)
