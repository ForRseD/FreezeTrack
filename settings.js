let products = [];


const savedProducts = localStorage.getItem("products");


if(savedProducts){

    products = JSON.parse(savedProducts);

}


const settingsList =
document.getElementById("settingsList");



const categories = [
    "Овощи",
    "Ягоды",
    "Фритюр"
];



// На всякий случай добавляем категории старым товарам

products.forEach(product => {

    if(!product.category){

        product.category = "Овощи";

    }

});



function save(){

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}



function render(){


    settingsList.innerHTML = "";


    categories.forEach(category=>{


        let html = `

        <h2>${category}</h2>

        `;


        products.forEach((product,index)=>{


            if(product.category === category){


                html += `

                <div class="settingItem">

                    <span>
                    ${product.name}
                    </span>


                    <button onclick="removeProduct(${index})">
                    🗑️
                    </button>

                </div>

                `;


            }


        });



        html += `

        <button onclick="addProduct('${category}')">
        ➕ Добавить продукт
        </button>

        `;


        settingsList.innerHTML += html;


    });


    save();

}





function addProduct(category){


    let name = prompt(
        "Название продукта"
    );


    if(!name) return;



    products.push({

        name:name,

        category:category,

        count:0,

        rest:0

    });



    save();

    render();


}





function removeProduct(index){


    if(confirm("Удалить продукт?")){


        products.splice(index,1);


        save();

        render();


    }


}



render();
window.addEventListener("pageshow", function(){

    loadProducts();

    render();

});

document
.getElementById("backButton")
.onclick=function(){

history.back();

};