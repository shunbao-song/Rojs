import{config}from'../config'
class HTTP{
  request(params){
    if(!params.method){
      params.method="GET"
    }
    wx.request({
      url:config.api_base_url + params.url,
      method:params.method,
      data:params.data,
      header:{
        'content-type':'application/json',
        'appkey':config.appkey
      },
      success:(res)=>{
        let code = res.statusCode.toString()
        if(code.startsWith('2')){
          params.success &&params.success(res.data)
        }
        else{
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail:(err)=>{
        this._show_error(1)
      }
    })
  }
}
export{HTTP};