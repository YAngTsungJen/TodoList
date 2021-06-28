let todoCount = document.querySelector('.todo');
let txt = document.querySelector('.txt');
let btn = document.querySelector('.btn');
let list = document.querySelector('.list');
let del_All =document.querySelector('.del_All');
btn.addEventListener('click',addData);
list.addEventListener('click',del);
del_All.addEventListener('click',delAll);
let data = JSON.parse(localStorage.getItem('listData')) || [];
function addData(){
  //Date.now() 方法回傳自 1970/01/01 00:00:00 UTC 起經過的毫秒數。
  let timeStamp = Math.floor(Date.now());
  let today=new Date();
  let currentDateTime =`${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`;
  if(txt.value.trim() == ''){
    alert('請寫出今天目標');
    return
  }
  let obj = {
    date: currentDateTime,
    content: txt.value.trim(),
    id: timeStamp,
  }
  data.push(obj);
  renderData();
  localStorage.setItem('listData',JSON.stringify(data));
  txt.value = '';
}
function renderData(){
  let el ='';
  el += `<p>目前有<span> ${data.length} </span>筆任務</p>`;
  todoCount.innerHTML = el;
  let str = '';
  data.forEach((item,index) => {
    str += 
    `<li class="d-flex justify-content-between">
      <p class="d-flex">
        <span class="material-icons d-block">event_note</span>
        ${item.date}
      </p>
      <span class="ms-4">${item.content}</span>
      <p><i id="delete" data-num ="${index}" class="fas fa-trash focus_task"></i></p>
    </li>`
  })
  list.innerHTML = str;
}

function del(e){
  if(e.target.getAttribute('id') !== 'delete'){
    return
  }
  let num = e.target.getAttribute('data-num');
  data.splice(num,1);
  localStorage.setItem('listData',JSON.stringify(data));
  renderData();
}
function delAll(){
  data = [];
  localStorage.setItem('listData',JSON.stringify(data));
  renderData();
}
function init(){
  renderData();
}
init();