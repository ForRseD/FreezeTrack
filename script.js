// =====================================
// ЗАГРУЗКА ТОВАРОВ
// =====================================

let currentCategory = "Овощи";

let products = [];


// Загружаем сохранённые данные

function loadProducts(){

    const savedProducts = localStorage.getItem("products");


    if(savedProducts){

        products = JSON.parse(savedProducts);

    }

    else {


        // Начальные товары при первом запуске

        products = [

            {
                name:"Цветная капуста",
                category:"Овощи",
                count:4,
                rest:1
            },

            {
                name:"Фасоль",
                category:"Овощи",
                count:7,
                rest:0
            },

            {
                name:"Брокколи",
                category:"Овощи",
                count:2,
                rest:2
            }

        ];


        saveProducts();

    }



    // Добавляем категорию старым товарам

    products.forEach(product=>{


        if(!product.category){

            product.category = "Овощи";

        }


    });


}



loadProducts();





// =====================================
// ЭЛЕМЕНТЫ СТРАНИЦЫ
// =====================================


const productList =
document.getElementById("productList");


const reportDate =
document.getElementById("reportDate");





// =====================================
// СОХРАНЕНИЕ ДАННЫХ
// =====================================


function saveProducts(){

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}





// =====================================
// ДАТА ПОСЛЕДНЕГО ОБНОВЛЕНИЯ
// =====================================


function updateDate(){


    const now = new Date();


    reportDate.innerHTML =

    "Последнее обновление: " +

    now.toLocaleDateString("ru-RU") +

    " " +

    now.toLocaleTimeString("ru-RU",{

        hour:"2-digit",
        minute:"2-digit"

    })

    +

    "<br><small style='opacity:0.4'>Версия: Кристина жопа</small>";

}





// =====================================
// ПЕРЕКЛЮЧЕНИЕ КАТЕГОРИЙ
// =====================================


function changeCategory(category, button){


    currentCategory = category;


    document
    .querySelectorAll(".tab")
    .forEach(tab=>{


        tab.classList.remove("active");


    });


    button.classList.add("active");


    render();


}





// =====================================
// ОТРИСОВКА ТОВАРОВ
// =====================================


function render(){


    productList.innerHTML = "";



    products.forEach((product,index)=>{


        // другая категория

        if(product.category !== currentCategory){

            return;

        }



        // скрытые товары не показываем

        if(product.hidden){

            return;

        }



        productList.innerHTML += `


<div class="card">


<div class="name">

${product.name}

</div>



<div class="columns">


<div class="column">


<div class="label">

Коробки

</div>



<div class="controls">


<button onclick="minusBox(${index})">

-

</button>



<div class="count">

${product.count}

</div>



<button onclick="plusBox(${index})">

+

</button>


</div>


</div>





<div class="column">


<div class="label">

Остаток

</div>



<div class="controls">


<button onclick="minusRest(${index})">

-

</button>



<div class="count">

${product.rest}

</div>



<button onclick="plusRest(${index})">

+

</button>


</div>


</div>


</div>


</div>


`;


    });



    saveProducts();


}

// =====================================
// ИЗМЕНЕНИЕ КОЛИЧЕСТВА КОРОБОК
// =====================================


function plusBox(index){

    products[index].count++;

    updateDate();

    render();

}



function minusBox(index){

    if(products[index].count > 0){

        products[index].count--;

    }


    updateDate();

    render();

}





// =====================================
// ИЗМЕНЕНИЕ ОСТАТКА
// =====================================


function plusRest(index){

    products[index].rest++;

    updateDate();

    render();

}



function minusRest(index){

    if(products[index].rest > 0){

        products[index].rest--;

    }


    updateDate();

    render();

}





// =====================================
// ОТПРАВКА ОТЧЁТА
// =====================================


document
.getElementById("shareButton")
.onclick = function(){



let text = "❄️ Заморозка\n";



const now = new Date();



text +=

"📅 " +

now.toLocaleDateString("ru-RU") +

" " +

now.toLocaleTimeString("ru-RU",{

hour:"2-digit",
minute:"2-digit"

})

+

"\n\n";





const categories = [

"Овощи",
"Ягоды",
"Фритюр"

];





categories.forEach(category=>{


let categoryProducts = products.filter(product=>


product.category === category &&

!product.hidden


);





if(categoryProducts.length > 0){



let emoji = "";



if(category==="Овощи") emoji="🥦";

if(category==="Ягоды") emoji="🍓";

if(category==="Фритюр") emoji="🍟";





text +=

emoji +

" " +

category.toUpperCase()

+

"\n\n";






categoryProducts.forEach(product=>{



text +=

product.name +

" — 📦 " +

product.count +

" кор. | ◽ " +

product.rest +

"\n\n";



});



}



});







if(navigator.share){


navigator.share({

title:"Заморозка",

text:text

});


}

else{


alert(text);


}


};








// =====================================
// ОЧИСТКА ЗНАЧЕНИЙ
// =====================================


document
.getElementById("clearButton")
.onclick=function(){



if(confirm("Очистить все значения?")){



products.forEach(product=>{


product.count = 0;

product.rest = 0;


});




saveProducts();

updateDate();



// полностью перерисовываем список

render();



}



};






// =====================================
// КНОПКА НАСТРОЕК
// =====================================


document
.getElementById("settingsButton")
.onclick=function(){


window.location.href="settings.html";


};







// =====================================
// ОБНОВЛЕНИЕ ПОСЛЕ ВОЗВРАТА ИЗ НАСТРОЕК
// =====================================


window.addEventListener("visibilitychange",function(){



if(document.visibilityState === "visible"){



const savedProducts =
localStorage.getItem("products");



if(savedProducts){


products = JSON.parse(savedProducts);


render();


}


}



});






// =====================================
// ЗАПУСК ПРИ ОТКРЫТИИ
// =====================================


render();

updateDate();