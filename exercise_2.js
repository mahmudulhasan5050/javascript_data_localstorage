var guruInfoArrayRaw = JSON.parse(localStorage.getItem("guru")) || "[]";
var techName = document.getElementById("techMain");
var ele = document.querySelector("#textFromGuru");

//date and time format
const dateAndTime = (dateS) => {
    const allParts = {
        date: dateS.getDate(),
        month: dateS.getMonth() + 1,
        year: dateS.getFullYear(),
        hour: (dateS.getHours() % 12) || 12,
        minute: dateS.getMinutes().toString().padStart(2, "0"),
        second: dateS.getSeconds().toString().padStart(2, "0"),
        amOrPm: dateS.getHours() < 12 ? "AM" : "PM"
    }
    return `${allParts.date}/${allParts.month}/${allParts.year} ${allParts.hour}:${allParts.minute}:${allParts.second} ${allParts.amOrPm}`
}

//print function
const printing = (guru) => {
    let lines = "";
    guru.map(element => {
        var dateS = new Date(element.creationTime);
        var timeFormatted = dateAndTime(dateS);

        var itemOpt = '<p class="categoryAndTime"> <span class="titleCardTop">Category</span> </br> ' + element.opt + "</p>";
        var itemDate = '<p class="categoryAndTime"> <span class="titleCardTop">Date and Time</span> </br> ' + timeFormatted + "</p>";
        var itemText = '<p id="text"> <span class="titleCardTop">Question </span> </br>' + element.text + "</p>";
        lines = lines + "<div class='card'>" + "<div class='topPart'>" +itemOpt + itemDate +"</div>" + itemText + "</div>";
    });
    ele.innerHTML = lines;
}

// when localStorage is empty
const emptymsg = () => {
    ele.innerHTML = "";
}

// to sort array
const commonCall = (guruInfoArrayRaw) => {
    guru = guruInfoArrayRaw
        .sort(function (a, b) {
            return Date.parse(b.creationTime) - Date.parse(a.creationTime);
        })
    printing(guru);
}

// Initial Call after page load
const guruInfo = () => {
    if (guruInfoArrayRaw !== "[]") {
        commonCall(guruInfoArrayRaw);
    }
    else {
        emptymsg();
    }
}

// event listener function
const getKeyValue = () => {
    var keyKey = techName.options[techName.selectedIndex].value;
    var guruWithKey = guruInfoArrayRaw
        .filter(element => {
            if (keyKey !== "all") {
                return element.opt === keyKey;
            } else {
                return element;
            }
        })
    commonCall(guruWithKey);
}
techName.addEventListener("change", getKeyValue);



//form popup
function openForm() {
    document.getElementById("buttonDiv").style.display = "none";
    document.getElementById("displaySelect").style.display = "none";
    document.getElementById("myForm").style.display = "block";
    

    var btnSave = document.getElementById("buttonSave");
    // store data to localStorage
    const storeData = (obj) => {
        if (localStorage.length <= 0) {
            let arr = [];
            arr.push(obj);
            localStorage.setItem("guru", JSON.stringify(arr));
        }
        else {
            var fromLocalStorage = JSON.parse(localStorage.getItem("guru"));
            fromLocalStorage.push(obj);
            localStorage.setItem("guru", JSON.stringify(fromLocalStorage));
        }
    }


    const addToGuruArrayMain = () => {
        var guruObj = {};
        var text = document.getElementById("guruText");
        var techName = document.getElementById("tech");

        guruObj.text = text.value;
        guruObj.opt = techName.options[techName.selectedIndex].value;
        guruObj.creationTime = new Date();

        if (guruObj.text !== "" && guruObj.opt !== "") {

            storeData(guruObj);
            window.location.replace("index.html");
        }
        else {
            window.location.replace("index.html");
        }

    }

    btnSave.addEventListener("click", addToGuruArrayMain);
}



//form cancel
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("buttonDiv").style.display = "block";
    document.getElementById("displaySelect").style.display = "block";
}
