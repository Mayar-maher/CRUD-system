var nameInput=document.getElementById('nameInput')
var priceInput=document.getElementById('priceInput')
var typeInput=document.getElementById('typeInput')
var descInput=document.getElementById('descInput')
var searchInput=document.getElementById('searchInput')
var tableBody=document.getElementById('tableBody')
var btnChanger=document.getElementById('btnChanger')
var productList=[]
var currentIndex = -1;
var nameError= document.getElementById('nameError')



if (localStorage.getItem("products")!=null){

    productList = JSON.parse(localStorage.getItem("products"));
    display()
}

function addProduct(){
    if(nameValidation()){
        var product={
            name: nameInput.value,
            price: priceInput.value,
            type: typeInput.value,
            desc: descInput.value,
        };
    
        productList.push(product)
        localStorage.setItem("products",JSON.stringify(productList))
    
        display();
        clearForm();
    }

}

function clearForm(){
    nameInput.value = "";
    priceInput.value = "";
    typeInput.value = "";
    descInput.value = "";
}

function display(){
    var blackBox ="";
    for (var i=0 ; i<productList.length ; i++){
        blackBox += `   <tr>
                <th scope="row">${i+1}</th>
                <td>${productList[i].name}</td>
                <td>${productList[i].price} $</td>
                <td>${productList[i].type}</td>
                <td>${productList[i].desc}</td>
                <td>
                    <div>
                        <button onclick="deleteProduct(${i})" class="btn btn-danger" type="button">Delete</button>
                        <button onclick="updateProduct(${i})" class="btn btn-warning" type="button">Edit</button>
                    </div>
                </td>
              </tr>`;
    }
    tableBody.innerHTML = blackBox;
}

function deleteProduct(index){
    productList.splice(index , 1);
    localStorage.setItem("products", JSON.stringify(productList));

    display();
}

function searchProduct(){
    var term = searchInput.value.toLowerCase();
    var text="";
    var blackBox="";
    for(var i=0;i<productList.length;i++){
        text=productList[i].name.toLowerCase();
        if(text.includes(term)){

            blackBox += `  <tr>
      <th scope="row">${i + 1}</th>
      <td>${productList[i].name}</td>
      <td>${productList[i].price}</td>
      <td>${productList[i].type}</td>
      <td>${productList[i].desc}</td>
      <td>

        <button onclick="deleteProduct(${i})" id="deleteBtn" class="btn btn-danger ">Delete</button>
        <button id="editBtn" class="btn btn-warning ">Edit</button>

      </td>
    </tr>`;
        
        }
    }
    tableBody.innerHTML = blackBox;

}

function updateProduct(index){
    currentIndex = index; 
    nameInput.value = productList[index].name;
    priceInput.value = productList[index].price;
    typeInput.value = productList[index].type;
    descInput.value = productList[index].desc;

    document.getElementById('btnChanger').textContent = "Update Product";
    document.getElementById('btnChanger').onclick = saveUpdatedProduct;

}

function saveUpdatedProduct() {
    if (currentIndex >= 0) {
        var updatedProduct  = {
            name: nameInput.value,
            price: priceInput.value,
            type: typeInput.value,
            desc: descInput.value,
        };
        productList.splice(currentIndex,1,updatedProduct );
        localStorage.setItem("products", JSON.stringify(productList));

        clearForm();

        document.getElementById('btnChanger').textContent = "Add Product";
        document.getElementById('btnChanger').onclick = addProduct;

        display();
        currentIndex = -1;
    }
}
function nameValidation(){
    var regex = /^[A-Z][a-z]{3,9}$/;
    var text =nameInput.value;
    if( regex.test(text)){
        nameError.classList.add('d-none');
        nameInput.classList.add("is-valid");
        nameInput.classList.remove("is-invalid");
        return true;

    }else{
        nameError.classList.remove('d-none')
        nameInput.classList.add('is-invalid')
        nameInput.classList.remove("is-valid");
        return false;
    }
}

function priceValidation(){
    var regex = /[1-9]\d{3,}/;
    var text =priceInput.value;
    if( regex.test(text)){
        priceError.classList.add('d-none');
        priceInput.classList.add("is-valid");
        priceInput.classList.remove("is-invalid");
        return true;

    }else{
        priceError.classList.remove('d-none');
        priceInput.classList.add('is-invalid');
        priceInput.classList.remove("is-valid");
        return false;
    }
}

function typeValidation(){
    var regex = /^(tv|mobile|phone|laptop|ipad|itap)$/;
    var text =typeInput.value;
    if( regex.test(text)){
        typeError.classList.add('d-none');
        typeInput.classList.add("is-valid");
        typeInput.classList.remove("is-invalid");
        return true;

    }else{
        typeError.classList.remove('d-none')
        typeInput.classList.add('is-invalid')
        typeInput.classList.remove("is-valid");
        return false;
    }
}