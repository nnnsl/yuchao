// const GET = 'GET';
// const POST = 'POST';
// const PUT = 'PUT';
// const FORM = 'FORM';
// const DELETE = 'DELETE';

// const baseURL = 'https://fragmenttime.com:8081/api/';

// function request(method, url, data, sufuncton, errofunction) {
//   return new Promise(function (resolve, reject) {
//     let header = {
//       'content-type': 'application/json',
//     };
//     wx.request({
//       url: baseURL + url,
//       method: method,
//       data: method === POST ? JSON.stringify(data) : data,
//       header: header,
//       success(res) {
//         //请求成功
//         //判断状态码---errCode状态根据后端定义来判断
//         if (res.data.status == 200) {
//           sufuncton(res); 
//         } else {
//           //其他异常
//           reject('运行时错误,请稍后再试');
//         }
//       },
//       fail(err) {
//         //请求失败
//         errofunction(err);
//       }
//     })
//   })
// }

// const API = {
//   //getOpenid: (data) => request(GET,`jsapi/mini?jsCode=${data}`),
//   // createClub: (data) => request(POST, 'client/ClubApi'),//创建俱乐部

//   //查询订单
//   getGameRecord: (data) => request(GET, 'client/GamerecordApi/2', null,function (datas) {
//     console.log(datas.data.obj.gameTime)
//     console.log(datas.data.obj.statue)
//     console.log(datas.data.obj.venueName)
//   }, function (erro) {
//     wx.showToast({
//       title: '网络走神了！',
//     })
//   }),

//   //查询场馆
//   getVenue: (data) => request(GET,'client/VenueApi/2',null,function(datas){
//     // console.log(datas.data.obj)
//   },function(erro){
//     wx.showToast({
//       title: '网络走神了！',
//     })
//   })


// };


// module.exports = {
//   API: API
// }