#### 排序滚动列表
![avatar](/src/assets/image/readMe/sortList.png)
接收数据：
参数：
sortTitle： 标题
sortHeader： 排行榜的各个参数名称
sortData： 数据
praise：排行榜第一个的图标
arrows: 标识涨幅、 1  上升 、0 持平、 -1 下降
接收数据：
`sortData: [
        { name: '四姑娘山', hot: 200, id: 111, arrows: 1 },
        { name: '四姑娘山', hot: 200, id: 112, arrows: 1 },
        { name: '四姑娘山', hot: 200, id: 113, arrows: 1 },
        { name: '四姑娘山', hot: 200, id: 114, arrows: -1 },
        { name: '四姑娘山', hot: 200, id: 115, arrows: 0 }
      ]`
