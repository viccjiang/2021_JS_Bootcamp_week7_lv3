// let data = [
//     {
//         "id": 0,
//         "name": "肥宅心碎賞櫻3日",
//         "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
//         "area": "高雄",
//         "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
//         "group": 87,
//         "price": 1400,
//         "rate": 10
//     },
//     {
//         "id": 1,
//         "name": "貓空纜車雙程票",
//         "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//         "area": "台北",
//         "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
//         "group": 99,
//         "price": 240,
//         "rate": 2
//     },
//     {
//         "id": 2,
//         "name": "台中谷關溫泉會1日",
//         "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//         "area": "台中",
//         "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
//         "group": 20,
//         "price": 1765,
//         "rate": 7
//     }
// ];

// 使用套件 axios 要先載入  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

let data = [];
let url = 'https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json';

function init() {
  axios.get(url)
    .then(function (response) {
      // console.log('資料有回傳了');
      console.log(response.data.data);
      data = response.data.data;
      render();
      renderC3()
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

// Lv3-3：組資料 --- > 點擊新增 ---> filter 篩選地區資料 ---> 渲染畫面
// 選取渲染畫面區塊的 dom 
const list = document.querySelector(".ticketCard-area");
// 組資料，改寫為函式 function 以便於初始化或渲染畫面時可以呼叫
function render(changeData) { // 為了要篩選資料，要帶入搜尋欄選到的值，進行比對並且渲染畫面 (傳入地區的參數來判斷顯示的資料)
  let str = "";// 準備組資料
  // // 先用 filter 篩選  data 內的資料，用 cacheData 接住篩選後的資料集
  const cachedata = data.filter(function (item) {
    if (changeData === item.area) {
      return item;
    }
    if (changeData === "全部地區") { // 地區搜尋全部地區時
      return item;
    }

    if (!changeData) { // 地區搜尋，尚未篩選時狀態
      return item;
    }
  });
  // 再將篩選過後的資料用 forEach 一一跑過
  cachedata.forEach(function (item) {
    str += `<li class="ticketCard">
        <div class="ticketCard-img">
          <a href="#">
            <img src="${item.imgUrl}" alt="">
          </a>
          <div class="ticketCard-region">${item.area}</div>
          <div class="ticketCard-rank">${item.rate}</div>
        </div>
        <div class="ticketCard-content">
          <div>
            <h3>
              <a href="#" class="ticketCard-name">${item.name}</a>
            </h3>
            <p class="ticketCard-description">
              ${item.description}
            </p>
          </div>
          <div class="ticketCard-info">
            <p class="ticketCard-num">
              <span><i class="fas fa-exclamation-circle"></i></span>
              剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
            </p>
            <p class="ticketCard-price">
              TWD <span id="ticketCard-price">$ ${item.price}</span>
            </p>
          </div>
        </div>
      </li>`;
  });
  list.innerHTML = str;

  searchNum(cachedata); // 印出本次搜尋幾筆資料的函式
}

// 點擊新增套票的話，必須監聽新增套票的按鈕
const addTicketBtn = document.querySelector(".addTicket-btn")
// 抓到 dom 後，做監聽
addTicketBtn.addEventListener("click", addData);
// 觸發 click 事件，接著跑函式 addData
function addData() {
  // 因為點擊之後要新增套票的 input 資訊，所以要先抓到所有 input 的 dom
  const name = document.querySelector("#ticketName");
  const imgUrl = document.querySelector("#ticketImgUrl");
  const area = document.querySelector("#ticketRegion");
  const price = document.querySelector("#ticketPrice");
  const group = document.querySelector("#ticketNum");
  const rate = document.querySelector("#ticketRate");
  const description = document.querySelector("#ticketDescription");

  // 點擊以及抓到 dom 元素之後
  // 抓到 dom 之後可以開始進行抓取 input 裡的 value，同時新增資料的動作
  // 先做好要 新增的格式，最好是跟本來的格式一樣
  // 且要記得將字串轉型 因為 input value 都是字串型式
  data.push({
    id: Date.now(), // 取得目前時間 時間戳 timestamp
    name: name.value,
    imgUrl: imgUrl.value,
    area: area.value,
    price: Number(price.value), // 也可用 parseInt
    group: Number(group.value),
    rate: Number(rate.value),
    description: description.value
  })

  console.log(data);

  // 新增完之後，表單 value 要清空 
  const form = document.querySelector(".addTicket-form");
  form.reset(); // 清空，此方式為 form 元素的 merhods ，作用等同於 name.value = "";
  // 因為新增套票後套票卡片區（.ticketCard-area）會顯示所有套票，所以建議可以將 .regionSearch 切換成全部地區
  regionSearch.value = "全部地區";

  renderC3(); // 加上上方套票新增時，下方 C3 與套票列表也會即時更新
  // 重新渲染
  render();
}

// 篩選地區資料
const regionSearch = document.querySelector(".regionSearch");
regionSearch.addEventListener("change", function (e) {
  // console.log(e);
  console.log(regionSearch.value);// 搜尋欄的值
  render(regionSearch.value);// 帶入搜尋欄選到的值，進行渲染畫面
})

// 本次搜尋幾筆資料
function searchNum(cachedataNum) {
  const searchNum = document.querySelector("#searchResult-text");
  searchNum.innerHTML = `本次搜尋共 ${cachedataNum.length} 筆資料`;
}

// axios 顯示 C3 圖表
function renderC3() {
  //先給一個空物件，預期要組出 {高雄: 1, 台北: 1, 台中: 1} 的資料
  let areaName = {};
  // 用 data 跑 forEach
  data.forEach(function (item) {
    if (!areaName[item.area]) { // 等同於 areaName[item.area] == undefined
      areaName[item.area] = 1; // 沒有此屬性給 1 初始值，直接新增到物件內
    } else if (areaName[item.area]) {
      areaName[item.area] += 1; // 有此屬性的話 +=1 ，直接新增到物件內
    }
  })
  console.log(areaName); //{高雄: 1, 台北: 1, 台中: 1}


  // C3 要的是格式是：陣列包陣列
  // 給一個空陣列，預期要組出[ ['高雄', 1]  ['台北', 1]  ['台中', 1] ] 
  let newData = []; // 拿來接資料
  let areaNameAry = Object.keys(areaName); // Object.key 做資料關聯陣列再處理，此用途是將所有屬性撈出來，變成一個陣列
  console.log(areaNameAry);//['高雄', '台北', '台中']

  // 再用資料關聯陣列得到的一個陣列跑 forEach ['高雄', '台北', '台中']
  areaNameAry.forEach(function (item) {
    // 因為C3要的是陣列格式，所已先給一個空陣列來接資料
    let ary = [];
    ary.push(item);
    ary.push(areaName[item]); // areaName 物件取到的數字值
    newData.push(ary);
  })
  console.log(newData); //  ['高雄', 1]  ['台北', 1]  ['台中', 1] 


  const chart = c3.generate({
    bindto: "#chart",
    data: {
      // 
      columns: newData, // C3 要的陣列格式 [ ['高雄', 1]  ['台北', 1]  ['台中', 1] ]
      type: 'donut',
      donut: {
        title: "套票地區比重"
      },

      //顏色
      colors: {
        高雄: "#E68618",
        台中: "#5151D3",
        台北: "#26C0C7"
      },
    },
    // 圖表尺寸
    size: {
      height: 160,
      width: 160
    },
  });


}

// 改成函式後只需要呼叫函式
// init 初始化
init(); // 初始化的概念

