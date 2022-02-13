//全局分享页面
export default {
    data() {
       return {
            share:{
               title: "草莓酱English",
               imageUrl:"../../static/image/face.jpg",
			   path: "../learn/learn",
			   desc:"您的好友邀请您跟你一起学习英语"
            }
       }
    },
    onShareAppMessage() {
    	return {
    		...this.share,
    		success: res => {
    			console.info(res)
    		}
    	}
    }
}