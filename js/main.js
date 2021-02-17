

const list = [
    {
        "desc": "rice",
        "amount": "1",
        "value": "5.40"
    },
    {
        "desc": "beer", 
        "amount": "12", 
        "value": "1.99"
    },
    {
        "desc": "meat", 
        "amount": "1", 
        "value": "15.00"
    },
];

// Compõe todos os valores na table
function getTotal(list){
    let total = 0;
    for(let key in list){
        total += list[key].value * list[key].amount;
    }
    return total;
};

// Composição da table
function setList(list){
    let table = `
            <thead>
                <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Value</th>
                    <th scope="col">Action</th>
                </tr>
           </thead>
           <tbody>
    `;
    for(let key in list){
        table += `
         <tr>
            <td>${formatDesc(list[key].desc)}</td>
            <td>${list[key].amount}</td>
            <td>${formatValue(list[key].value)}</td>
            <td>
              <button onclick="setUpdate('+key+')" class="btn btn-secondary">Edit</button>
              <button onclick="setUpdate('+key+')" class="btn btn-danger">Delete</button>
            </td>
        </tr>
      `;
    };
    table += `</tbody>`;
    document.getElementById("listTable").innerHTML = table;
};

// Formata com letras inicial maiúscula
function formatDesc(desc){
    let str = desc.toLowerCase(); 
    str = `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
    return str;
}

// Formata ponto para vírgula e insere sifrão
function formatValue(value){
    let str = `${parseFloat(value).toFixed(2)}${""}`;
    str = str.replace(".", ",");
    str = `${"$"}${str}`;
    return str;
}


function addData(){
    const desc = document.getElementById("desc").value;
    const amount = document.getElementById("amount").value;
    const value = document.getElementById("value").value;

    list.unshift({
        "desc":desc,
        "amount":amount,
        "value":value
    });
    setList(list);
}



function setUpdate(id){ 
    const obj = list[id];   

    document.getElementById("desc").value = obj.desc 
    document.getElementById("amount").value = obj.amount 
    document.getElementById("value").value = obj.value 
    
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";

    document.getElementById("inputIDUpdate").innerHTML = `<input id="idUpdate" type="hidden" value={id}>`;   
}



function resetForm(){
    
    document.getElementById("desc").value =  "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value =  "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";

    document.getElementById("inputIDUpdate").innerHTML = "";
}

function updateData(){
    const id = document.getElementById("idUpdate").value;

    const desc = document.getElementById("desc").value;
    const amount = document.getElementById("amount").value;
    const value = document.getElementById("value").value;

    list[id] = {
        "desc": desc,
        "amount": amount,
        "value": value
    }
    resetForm();
    setList(list);
}

setList(list);















console.log(getTotal(list))