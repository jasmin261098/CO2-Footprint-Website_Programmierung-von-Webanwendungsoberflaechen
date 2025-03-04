function searchFunction() {
    let input = document.getElementById("searchInput");
    let filter = input.value.toUpperCase();
    let table = document.getElementById("emissionTable");
    let tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td");
        let rowMatch = false;
        
        for (j = 0; j < td.length; j++) {
            if (td[j]) {
                let txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    rowMatch = true;
                    break;
                }
            }
        }
        
        tr[i].style.display = rowMatch ? "" : "none";
    }
}

function filterAll() {
    let table = document.getElementById("emissionTable");
    let tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td");

        let countryFilterResult = countryFilter(td);
        let industryFilterResult = industryFilter(td);

        let showRow = countryFilterResult && industryFilterResult;

        if (showRow) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

function countryFilter(td) {
    let countryFilter = document.getElementById("countryFilter").value;

    if (td[0].textContent === countryFilter || countryFilter === "") {
        return true;
    } else {
        return false;
    }
}
    

function industryFilter(td) {
    let industryFilter = document.getElementById("industryFilter").value;

    if (td[3].textContent === industryFilter || industryFilter === "") {
        return true;
    } else {
        return false;
    }
}

function sort(index) {
    let table = document.getElementById("emissionTable");
    let tbody = table.getElementsByTagName("tbody")[0];
    let rows = Array.from(table.getElementsByTagName("tr")).slice(1);

    rows.sort((rowA, rowB) => {
        let cellA = rowA.getElementsByTagName("td")[index];
        let cellB = rowB.getElementsByTagName("td")[index];
        
        let valueA = parseFloat(cellA) || cellA;
        let valueB = parseFloat(cellB) || cellB;
        
        return (valueA > valueB ? 1 : -1);
    });

    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));
}

function detectLanguage() {
    const rtlLanguages = ["ar", "he", "fa", "ur"];
    const userLang = navigator.language || navigator.userLanguage;
    const langCode = userLang.split("-")[0];

    document.documentElement.lang = langCode;

    if (rtlLanguages.includes(langCode)) {
        document.body.classList.add("rtl");
    } else {
        document.body.classList.remove("rtl");
    }
}

detectLanguage();

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form");
    const answer = form.querySelector("#form-answer");
    
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const formData = new FormData(form);
        let xssDetected = false;
        
        function sanitizeInput(input) {
            if (input.includes("<") || input.includes(">")) {
                xssDetected = true; 
            }
            return input.replace(/</g, "U+003C").replace(/>/g, "U+003E");
        }

        let vorname = sanitizeInput(formData.get("vorname"));
        let name = sanitizeInput(formData.get("name"));
        let email = sanitizeInput(formData.get("email"));
        let nachricht = sanitizeInput(formData.get("nachricht"));
        
        console.log("Formulardaten:", { vorname, name, email, nachricht });
        
        if (xssDetected) {
            answer.textContent = "Netter Versuch, aber wir sind abgesichert!";
        } else {
            answer.textContent = "Danke für Deine Nachricht.";
        }
        
        form.reset();
    });
});
