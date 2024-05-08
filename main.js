let title = document.getElementById('title');
let price = document.getElementById('price');
let texes = document.getElementById('texes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood ='create';
let tmp;

//get total
function gettotal()
{
    if (price.value != ''){
    let result = (+price.value + +texes.value + +ads.value)
    - +discount.value;
    total.innerHTML = result;
    total.style.background ='#040'; 
}
else{
    total.innerHTML = '';
    total.style.background ='brown'; 
}
}


//crate product
let datapro;
if(localStorage.product != null)
{
     datapro = JSON.parse(localStorage.product)
}
else
{
    datapro = [];
}

submit.onclick =function(){
    let newpro ={
title:title.value,
price:price.value,
texes:texes.value,
ads:ads.value,
discount:discount.value,
total:total.innerHTML,
count:count.value,
category:category.value,
    }
//count
if(title.value != '' && newpro.count < 101 ){
    if(mood === 'create')
{
        if(newpro.count > 1)
    {
        for(let i = 0; i < newpro.count;i++)
        {
         datapro.push(newpro);
      
        }
    }
 else
 {
    datapro.push(newpro);
 }
}
else
{
    datapro[tmp] = newpro;
    mood = 'create';
    submit.innerHTML = 'create';
    count.style.display ='block';
}
cleardata()
}



//save localstorage
    localStorage.setItem('product',JSON.stringify(datapro))

showdata()
}

//clear inputs

function cleardata()
{
title.value = '';
price.value = '';
texes.value = '';
ads.value = '';
discount.value = '';
total.innerHTML = '';
count.value = '';
category.value = '';
}

//read
function showdata()
{
    gettotal()
let table = '';
for(let i = 0; i < datapro.length;i++)
{
    table += `
                            <tr>
                            <td>${1}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].texes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td>
                                <button onclick="updateData(${i})" id="update">update</button>
                            </td>
                            <td>
                                <button onclick="deletedata(${i})" id="delete">delete</button>
                            </td>
                        </tr>
    `;

}

document.getElementById('tbody').innerHTML = table;
let btndelete = document.getElementById('deleteAll');
if(datapro.length > 0)
{
btndelete.innerHTML = `
<button onclick="deleteAll ()">delete All (${datapro.length})</button>
`
}
else
{
    btndelete.innerHTML = '';
}
}
showdata()

//delete
function deletedata(i)
{
datapro.splice(i,1)
localStorage.product =JSON.stringify(datapro)
showdata()
}

function deleteAll()
{
    localStorage.clear()
    datapro.splice(0)
    showdata()
}


//update
function updateData(i)
{
   title.value = datapro[i].title;
   price.value = datapro[i].price;
   texes.value = datapro[i].texes;
   ads.value = datapro[i].ads;
   discount.value = datapro[i].discount;
   gettotal()
count.style.display = 'none';
   category.value = datapro[i].category;
   submit.innerHTML = 'update';
  mood = 'update';
  tmp = i;
scroll({top:0, behavior:'smooth',})

}

//search
let searchmood ='title';
function getsearchmood(id)
{
    let searche =document.getElementById('search');
if(id == 'searchtitle')
{
    searchmood ='title';
    searche.Placeholder = 'search by title';
}
else
{
    searchmood ='category';
    searche.Placeholder = 'search by category';
}
searche.focus();
searche.value = '';
showdata();
}

function searchdata(value)
{
    let table = '';
if (searchmood == 'title')
{
    for(let i = 0; i < datapro.length;i++)
    {
        if(datapro[i].title.includes(value))
        {
             table += `
                            <tr>
                            <td>${i}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].texes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td>
                                <button onclick="updateData(${i})" id="update">update</button>
                            </td>
                            <td>
                                <button onclick="deletedata(${i})" id="delete">delete</button>
                            </td>
                        </tr>
    `;
        }
    }
}
else
{
        for(let i = 0; i < datapro.length;i++)
    {
        if(datapro[i].category.includes(value))
        {
             table += `
                            <tr>
                            <td>${i}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].texes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td>
                                <button onclick="updateData(${i})" id="update">update</button>
                            </td>
                            <td>
                                <button onclick="deletedata(${i})" id="delete">delete</button>
                            </td>
                        </tr>
    `;
        }
    }
}
document.getElementById('tbody').innerHTML = table;
}
//clean data
