import {HTTP} from '../util/http.js'
class ClassicModel extends HTTP {
  getLatest(sCallback){
    this.request({
      url:"classic/latest",
      success:(res)=>{
        sCallback(res)
        this._setLatestIndex(res.index)
      }
    })
  }

  getClassic(index,nextOrPrvious,sCallback){
    let key = nextOrPrvious=='next'?
    this._getKey(index+1):this._getKey(index-1)
    let classic = wx.getStorageSync(key)
    

    this.request({ 
      url:'classic/' + index + '/' + nextOrPrvious,
      success:(res)=>{
        sCallback(res)
      }
    })
  }

  isFirst(index){
    return index == 1 ? true : false
  }
  isLatest(index){
    let latestIndex = this._getLatestIndex()
    return latestIndex ==index ? true:false
  }
  _setLatestIndex(index){
    wx.setStorageSync('latest', index)
  }
  _getLatestIndex(){
    let index = wx.getStorageSync('latest')
    return index
  }
  _getKey(index){
    let key = 'classic-'+ index
    return index
  }
}
export{ClassicModel}