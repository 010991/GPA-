let hero =document.querySelector(".hero"); /*照片 img */
let slider=document.querySelector(".slider");
let animation =document.querySelector("section.animation-wrapper");/*包含所有的img */

const time_line =new TimelineMax();
//parameter1  要控制的對象
//parameter2  是持續時間
//parameter3  要控制對象的原始狀態
//parameter4  是控制對像動畫結束的狀態
//parameter5  提早時間
time_line.fromTo(hero,1,{height:"0%"},{height:"100%",ease:Power2.easeInOut})
.fromTo(hero,1.2,{width:"80%"},{width:"100%",ease:Power2.easeInOut})
.fromTo(slider,1,{x:"-100%"},{x:"0%",ease:Power2.easeInOut},"-=1.2")
.fromTo(animation,0.3,{opacity:1},{opacity:0});


setTimeout(()=>{
    animation.style.pointerEvents="none";//不對滑鼠做反應
},2500);

//讓網站的ENTER KEY 都禁止使用
window.addEventListener("keypress",(e)=>{
    if(e.key =="Enter"){
        e.preventDefault();
    }

})
//防止form內的按鈕交出表單
let allButtons= document.querySelectorAll("button");
allButtons.forEach((button)=>{
    
    button.addEventListener("click",(e)=>{
            e.preventDefault();
    });
});

//更改select裡的顏色，對應不同的abcd有不同的顏色
let allSelects=document.querySelectorAll("select");
allSelects.forEach((select)=>{
    select.addEventListener("change",(e)=>{
        setGPA();
        changeColor(e.target);//e.target is a "select" tag
        
    })
})
//更改credit之後，GPA也要更新
let credits = document.querySelectorAll(".class-credits");
credits.forEach((credit)=>{
    credit.addEventListener("change",()=>{
        setGPA();
    })
})


function changeColor(target){
    if (target.value=="A"){
        target.style.backgroundColor="lightgreen";
        target.style.color="black";
    }
    else if (target.value=="B"){
        target.style.backgroundColor="yellow";
        target.style.color="black";
    }
    else if (target.value=="C"){
        target.style.backgroundColor="orange";
        target.style.color="black";
    }
    else if (target.value=="D"){
        target.style.backgroundColor="red";
        target.style.color="black";
    }
    else{
        target.style.backgroundColor="grey";
        target.style.color="white";
    }
}
function convertor(grade) {
    switch (grade) {
      case "A":
        return 4.0;
      case "B":
        return 3.0;
      case "C":
        return 2.0;
      case "D":
        return 1.0;
      case "E":
        return 0.0;
      default:
        return 0;
    }
  }
function setGPA(){
    let formLength = document.querySelectorAll("form").length;
    let credits = document.querySelectorAll(".class-credits");
    let selects = document.querySelectorAll("select");
    let sum = 0;
    let creditsSum = 0;

    for (let i = 0;i< credits.length;i++){
        if(!isNaN(credits[i].valueAsNumber)){
            
        creditsSum+= credits[i].valueAsNumber;

        }
       
    }

    for(let i = 0;i < formLength;i++){
        if(!isNaN(credits[i].valueAsNumber)){
            
            sum+=credits[i].valueAsNumber * convertor(selects[i].value);
        }
    }
    let result;
    if(creditsSum == 0){
        result = 0.0.toFixed(2);
    }else{
        result = (sum / creditsSum).toFixed(2) ;//到小數點第幾位 
    }
    document.getElementById("result-gpa").innerText = result;
}
let addButton = document.querySelector(".plus-btn");
addButton.addEventListener("click",()=>{
    let newForm = document.createElement("form");
    let newDiv = document.createElement("div");
    newDiv.classList.add("grader");

      // here is the select tag
  let newSelect = document.createElement("select");
  newSelect.classList.add("select");

  var opt1 = document.createElement("option");
  opt1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  opt1.appendChild(textNode1);

  var opt2 = document.createElement("option");
  opt2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  opt2.appendChild(textNode2);

  var opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);

  var opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);

  var opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);

  var opt13 = document.createElement("option");
  opt13.setAttribute("value", "E");
  let textNode13 = document.createTextNode("E");
  opt13.appendChild(textNode13);

  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt13);




    //製作五個小元素
    let newInput1 = document.createElement("input");
    newInput1.setAttribute("type","text");
    newInput1.setAttribute("list","opt");
    newInput1.classList.add("class-type");

    let newInput2 = document.createElement("input");
    newInput2.setAttribute("type","text");
    newInput2.classList.add("class-number");

    let newInput3 = document.createElement("input");
    newInput3.setAttribute("type","number");
    newInput3.setAttribute("min","0");
    newInput3.setAttribute("max","6");
    newInput3.classList.add("class-credits");
    newInput3.addEventListener("change",()=>{
        setGPA();
    });

  
    newSelect.addEventListener("change", (e) => {
        setGPA();
        changeColor(e.target);
      });
    

    let newButton = document.createElement("button");
    newButton.classList.add("trash-button");
    let newItag = document.createElement("i");
    newItag.classList.add("fas");
    newItag.classList.add("fa-trash");
    newButton.appendChild(newItag);
  
  
    newButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.parentElement.parentElement.style.animation ="scaleDown 0.5s ease forwards";
      e.target.parentElement.parentElement.addEventListener("animationend",(e) => {
          e.target.remove();
          setGPA();
        }
      );
    });
  

    newDiv.appendChild(newInput1);
    newDiv.appendChild(newInput2);
    newDiv.appendChild(newInput3);
    newDiv.appendChild(newSelect);
    newDiv.appendChild(newButton);

    newForm.appendChild(newDiv);
    document.querySelector(".all-inputs").appendChild(newForm);
    newForm.style.animation="scaleUp 0.5s ease forwards";
});



let allTrash = document.querySelectorAll(".trash-button");
allTrash.forEach((trash) => {
  trash.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.classList.add("remove");
  });
});
allTrash.forEach((trash) => {
  let form = trash.parentElement.parentElement;
  form.addEventListener("transitionend", (e) => {
    e.target.remove();
    setGPA();
  });
});

// 排序演算法
let btn1 = document.querySelector(".sort-descending");
let btn2 = document.querySelector(".sort-ascending");
btn1.addEventListener("click", () => {
  handleSorting("descending"); // 大到小
});
btn2.addEventListener("click", () => {
  handleSorting("ascending"); // 小到大
});

function handleSorting(direction) {
  let graders = document.querySelectorAll("div.grader");
  let objectArray = [];

  for (let i = 0; i < graders.length; i++) {
    let class_name = graders[i].children[0].value; // class category
    let class_number = graders[i].children[1].value; // class number
    let class_credit = graders[i].children[2].value;
    let class_grade = graders[i].children[3].value;

    if (
      !(
        class_name == "" &&
        class_number == "" &&
        class_credit == "" &&
        class_grade == ""
      )
    ) {
      let class_object = {
        class_name,
        class_number,
        class_credit,
        class_grade,
      };
      objectArray.push(class_object);
    }
  }

  // 取得object array後，我們可以把成績String換成數字
  for (let i = 0; i < objectArray.length; i++) {
    objectArray[i].class_grade_number = convertor(objectArray[i].class_grade);
  }

  objectArray = mergeSort(objectArray);
  if (direction == "descending") {
    objectArray = objectArray.reverse();
  }
  // 根據object array的內容，來更新網頁
  let allInputs = document.querySelector(".all-inputs");
  allInputs.innerHTML = "";

  for (let i = 0; i < objectArray.length; i++) {
    allInputs.innerHTML += ` <form >
                    <div class="grader">
                        <input type="text" placeholder="class category" class="class-type" list="opt" value=${objectArray[i].class_name}><!----><input type="text" placeholder="class number" class="class-number" value=${objectArray[i].class_number}><!----><input type="number" placeholder="credits" min="0" max="6" class="class-credits" value=${objectArray[i].class_credit}><!----><select name="select" class="select">
                            <option value=""></option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option></select><!----><button class="trash-button">
                                <i class="fa fa-trash" ></i>
                            </button>
                    </div>
                </form>`;
  }

  // SELECT可直接用JS更改
  graders = document.querySelectorAll("div.grader");
  for (let i = 0; i < graders.length; i++) {
    graders[i].children[3].value = objectArray[i].class_grade;
  }

  // select事件監聽
  allSelects = document.querySelectorAll("select");
  allSelects.forEach((select) => {
    changeColor(select);
    select.addEventListener("change", (e) => {
      setGPA();
      changeColor(e.target);
    });
  });

  // credit事件監聽
  let allCredits = document.querySelectorAll(".class-credits");
  allCredits.forEach((credit) => {
    credit.addEventListener("change", () => {
      setGPA();
    });
  });

  // 垃圾桶
  let allTrash = document.querySelectorAll(".trash-button");
  allTrash.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.parentElement.parentElement.style.animation =
        "scaleDown 0.5s ease forwards";
      e.target.parentElement.parentElement.addEventListener(
        "animationend",
        (e) => {
          e.target.remove();
          setGPA();
        }
      );
    });
  });
}

function merge(a1, a2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < a1.length && j < a2.length) {
    if (a1[i].class_grade_number > a2[j].class_grade_number) {
      result.push(a2[j]);
      j++;
    } else {
      result.push(a1[i]);
      i++;
    }
  }

  while (i < a1.length) {
    result.push(a1[i]);
    i++;
  }
  while (j < a2.length) {
    result.push(a2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length == 0) {
    return;
  }

  if (arr.length == 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    return merge(mergeSort(left), mergeSort(right));
  }
}