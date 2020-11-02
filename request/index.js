let ajaxTimes = 0;
export const request=(params)=>{

    let header={...params.header};
    if(params.url.includes("/my/")){
        header["Authorization"] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
    }


    // 显示加载中图标
    ajaxTimes++;
    wx.showLoading({
        title: '加载中',
        mask: true,
    });

    return new Promise((resolve,reject)=>{
        const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1';
        wx.request({
            ...params, // 拓展运算符  ...params  相当于传入进来的对象url:'https://xxxxx.com'
            header:header,
            url:baseUrl+params.url,
            success:(result)=>{
                resolve(result.data.message);
            },
            fail:(err)=>{
                reject(err);
            },
            complete:()=>{
                ajaxTimes--;
                if(ajaxTimes==0){
                }
                wx.hideLoading();
                // 结束加载中图标
            }
        });
    })
}


// export const request=()=>{

// }