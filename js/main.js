

let list = [];

// Compõe todos os valores na table
function getTotal(list){
    let total = 0;
    for(let key in list){
        total += list[key].value * list[key].amount;
    }
    document.getElementById("totalValue").innerHTML = formatValue(total);  
}

// Composição da table
function setList(list){ 
    let table = `
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Ação</th>
                </tr>
           </thead>
           <tbody>
    `;
    for(let key in list){
        table += `
         <tr>
            <td>${formatDesc(list[key].desc)}</td>
            <td>${formatAmount(list[key].amount)}</td>
            <td>${formatValue(list[key].value)}</td>
            <td>
              <button onclick="setUpdate(${key})" class="btn btn-secondary">Editar</button>
              <button onclick="deleteData(${key})" class="btn btn-danger">Deletar</button>
            </td>
        </tr>
      `;
    };
    table += `</tbody>`;
    document.getElementById("listTable").innerHTML = table;
    getTotal(list);
    saveOnLocalStorage(list)
}


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
    str = `${"R$ "}${str}`;
    return str;
}

// Formata números floats para integers
function formatAmount(amount){ 
    return parseInt(amount);
}


function addData(){
    if(!validateData()) return ;

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

    document.getElementById("inputIDUpdate").innerHTML = `<input id="idUpdate" type="hidden" value="${id}">`;   
}



function resetForm(){ 
    document.getElementById("desc").value =  "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value =  "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";

    document.getElementById("inputIDUpdate").innerHTML = "";
    document.getElementById("errors").style.display = "none";
}

function updateData(){
    if(!validateData()) return ;
    
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


function deleteData(id){
    if(confirm("Tem certeza que quer deletar esse item?")){
        if(id === list.length - 1){
            list.pop(); 

        }else if(id === 0){
            list.shift();

        }else{
            const arrItemFirst = list.slice(0, id);
            const arrItemLast = list.slice(id + 1);
            list = arrItemFirst.concat(arrItemLast)
        } 
        setList(list);
    }
}


function validateData(){ 
    const desc = document.getElementById("desc").value;
    const amount = document.getElementById("amount").value;
    const value = document.getElementById("value").value;
    let errors = "";

    document.getElementById("errors").style.display = "none";

    if(desc === ""){
        errors += "<p>*Insira uma descrição</p>";
    }  

    if(amount === ""){
        errors += "<p>*Insira uma quantidade</p>";

    }else if(amount != parseInt(amount)){
        errors += "<p>*Insira uma quantidade válida!</p>"
    }

    if(value === ""){
        errors += "<p>*Insira um valor</p>";

    }else if(value != parseFloat(value)){
        errors += "<p>*Insira um valor válido!</p>"
    }

    if(errors !== ""){ 
        document.getElementById("errors").style.display = "block";
        document.getElementById("errors").innerHTML = `<h3>Erro:</h3>${errors}`;
        return 0;

    }else{
        return 1; 
    }
}

function deleteList(){
    if(confirm("Deseja deletar tudo?")){
        list = [];
        setList(list);
    }
}


function saveOnLocalStorage(list){
    const jSONString = JSON.stringify(list);
    localStorage.setItem("list", jSONString);
}


function initListStorage(){
    let testList = localStorage.getItem("list");
    if(testList){
        list = JSON.parse(testList);
    }
    setList(list);
}

initListStorage(list);