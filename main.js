var form = document.getElementById("addForm");
var itemList = document.getElementById("addItems");
var filter=document.getElementById("filter");

// Form submit event
form. addEventListener("submit", addItem);
//Delte event
itemList.addEventListener("click", removeItem);
//Filter event
filter.addEventListener("keyup", filterItems);

// Add item
function addItem(e) {
    e.preventDefault();
    
    //get input value
    var newItem = document.getElementById("item").value;

    //create new li element
    var li = document.createElement("li");
    // Add class
    li.className = "list-group-item";
    console.log(li);
    // Add text node with input value
    li.appendChild(document.createTextNode(newItem));
    //Create delete button
    var deleteBtn = document.createElement("button");

    // Add classes to delete button
    deleteBtn.className = "btn btn-danger btn-sm float-right delete";
    //Append text node
    deleteBtn.appendChild(document.createTextNode("X"));
    //Append button to li
    li.appendChild(deleteBtn);

    // Append li to list
    itemList.appendChild(li);

}

//Remove item
function removeItem(e) {
    if(e.target.classList.contains("delete")){
        if(confirm("Are you sure?")) {
            var li = e.target.parentElement;
            itemList.removeChild(li);
        }	
    }}

// Filter items
function filterItems(e){
    //convert text to Lowercase
    var text = e.target.value.toLowerCase();
    //get lis
    itemList.getElementsByTagName("li");
    //convert to an array
    Array.from(items).forEach(function(item){
        var itemName = item.firstChild.textContent;
        if(itemName.toLowerCase().indexOf(text)!=-1){
            item.style.display = "block";
        }else {
            item.style.display = "none";
        }
    })
}
