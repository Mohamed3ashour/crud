var dataName = document.getElementById('productInputName');
var dataPrice = document.getElementById('productInputPrice');
var dataDescription = document.getElementById('productInputDescripion');
var addButton = document.getElementById('addBtn');
var updateButton = document.getElementById('updateBtn');
var arr;
var temp;

if (localStorage.getItem('productDetails') != null) {
    arr=JSON.parse(localStorage.getItem('productDetails'));
    viewData(arr);
}
else{
    arr=[];
}
function dataIn()
{
    if (validateInput()==true) {
       var product=
        {
            productName:dataName.value,
            productPrice:dataPrice.value,
            productDescription:dataDescription.value,
        }   
        arr.push(product);
        localStorage.setItem('productDetails',JSON.stringify(arr)); 
    
        viewData(arr);
        clearForm();
    }
    else
    {
        window.alert("You Shoud Inter valid Name where start with letter or (-) or ( _ ) and not start with space")  
    }
}

function clearForm()
{
    dataName.value="";
    dataPrice.value="";
    dataDescription.value="";
    productInputName.classList.remove("is-invalid");
    productInputName.classList.remove("is-valid");
       
}

function viewData(productOperation) 
{
    var cartona=``;
    for (var i = 0; i < productOperation.length; i++) {
        cartona+=`
            <tr>
                <td>${i+1}</td>
                <td>${productOperation[i].productName}</td>
                <td> ${productOperation[i].productPrice}</td>
                <td> ${productOperation[i].productDescription}</td>
                <td >
                    <button class="btn btn-danger btn-sm" onclick="deleteData(${i})">Delete</button>
                    <button class="btn btn-warning btn-sm" onclick="updateForm(${i})">Update</button>
                </td>
            </tr>
        `
    }

    document.getElementById('viewProduct').innerHTML=cartona;
}

function deleteData(deletTerm)
{
    arr.splice(deletTerm,1);
    localStorage.setItem('productDetails',JSON.stringify(arr)); 
    viewData(arr);

}

function updateForm(updatTerm)
{
    
    productInputName.value=arr[updatTerm].productName;
    productInputPrice.value=arr[updatTerm].productPrice;
    productInputDescripion.value=arr[updatTerm].productDescription;

    addButton.classList.add('d-none');
    updateButton.classList.replace('d-none','d-inline-block')
    temp=updatTerm;
    scroll({
        top:0,
        behavior:"smooth",
    });
}

function upadateData(temp)
{
    var productUpdate={
        productName:dataName.value,
        productPrice:dataPrice.value,
        productDescription:dataDescription.value,
    };

    arr.splice(temp,1,productUpdate);
    localStorage.setItem('productDetails',JSON.stringify(arr)); 
    viewData(arr);
    clearForm();
    updateButton.classList.replace('d-inline-block','d-none');
    addButton.classList.replace('d-none','d-inline-block');
    scroll({
        top:250+(50*temp),
        behavior:"smooth",
    });
}


function searchProduct(searchTerm) 
{
    var searchDisply=[];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].productName.toLowerCase().includes(searchTerm.toLowerCase()) == true) {
                // arr[i].productName=arr[i].productName.replace(searchTerm,`<span class="text-info">${searchTerm}</span>`);
                searchDisply.push(arr[i]);
        }
    }

    viewData(searchDisply)

}

function validateInput(){
    var regex = /^[\w-][\w -.]{0,100}$/i;
    // var numRegex =/^\d{1,}/; 
    // && numRegex.test(dataPrice)==true
    if (regex.test(dataName.value)==true) {
        
        productInputName.classList.add("is-invalid");
        productInputName.classList.replace("is-invalid","is-valid");
        if (dataName.value=='') {
            productInputName.classList.remove("is-valid");
            productInputName.classList.remove("is-invalid");
        }
        return true;
    }
    else {
        productInputName.classList.add("is-invalid");

        if (dataName.value=='') {
            productInputName.classList.remove("is-invalid");
            productInputName.classList.remove("is-valid");
        }
        return false;
    }

}

document.addEventListener('contextmenu',function(e){

    e.preventDefault();
})

//to prevent click on F12
// document.addEventListener('keydown',function(e){
//     if (e.key=='F12') {
//             e.preventDefault();
//     }
// })



