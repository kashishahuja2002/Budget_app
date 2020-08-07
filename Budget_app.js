var sign, description, value,input,ID,item,html,newHtml,expense,income;
income=0,expense=0;

function getInput(){
    return{
        sign : document.querySelector('#sign').value,
        description : document.querySelector('#description').value,
        value : parseFloat(document.querySelector('#value').value)
    }
}

document.addEventListener('keypress',function(event){
    if(event.keycode==13 || event.which==13){
        input = getInput();
        if(input.description !== '' && !isNaN(input.value) && input.value > 0){
            addItem(input.sign,input.description,input.value);
            addListItem(input.sign,item);
            clearFields();
            document.querySelector('#description').focus();
            total(input.sign,input.value);
        }
    }
});

document.querySelector('#tick').addEventListener('click',function(){
    input = getInput();
    if(input.description !== '' && !isNaN(input.value && input.value > 0)){
        addItem(input.sign,input.description,input.value);
        addListItem(input.sign,item);
        clearFields();
        document.querySelector('#description').focus();
        total(input.sign,input.value);
    }
});

var Expense = function(id,des,val){
    this.id=id;
    this.des=des;
    this.val=val;
};

var Income = function(id,des,val){
    this.id=id;
    this.des=des;
    this.val=val;
};

var data;
data = {
    allItems: {
        inc: [],
        exp: []
    },
    total: {
        inc: 0,
        exp: 0
    }
}

function addItem(type,descrip,value){
    if(data.allItems[type].length > 0)
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
    else
        ID=1;

    if(type==='inc')
        item = new Income(ID,descrip,value);
    else if(type === 'exp')
        item = new Expense(ID,descrip,value);

    data.allItems[type].push(item);
}

function addListItem(type,obj){
    var element;
    //Adding html string
    if(type=='inc'){
        html = '<div class="income-item" id="income-%id%"> <div class="income-description">%Description%</div> <div class="income-value">%Value%</div> <button class="income-delete"><i class="ion-ios-close-outline"></i></button> </div>'
        element='.income-list';
    }

    else if(type=='exp'){
        html = '<div class="expense-item" id="expense-%id%"> <div class="expense-description">%Description%</div> <div class="expense-value">%Value%</div> <button class="expense-delete"><i class="ion-ios-close-outline"></i></button> <div class="expense-percentage">23%</div> </div>'
        element='.expense-list';
    }

    //Changing string value
    newHtml = html.replace('%id%',obj.id);
    newHtml = newHtml.replace('%Description%',obj.des);
    newHtml = newHtml.replace('%Value%',obj.val);

    //Insert HTML into DOM
    document.querySelector(element).insertAdjacentHTML("beforeend",newHtml);
}

function clearFields(){
    document.querySelector('#description').value='';
    document.querySelector('#value').value='';
}

function total(type,value){
    if(type=='inc'){
        income=income+value;
        document.querySelector('#income-amount').textContent=income;
    }
    else if(type=='exp'){
        expense=expense+value;
        document.querySelector('#expense-amount').textContent=expense;
    }
}