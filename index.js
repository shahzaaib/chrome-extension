let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn")

// Log out the variable
//console.log(leadsFromLocalStorage);

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}
tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify("myLeads"))
        render(myLeads);
        /* since only one tab should be active and in the current window at once
         the return variable should only have one entry
        let activeTab = tabs[0]
        let activeTabId = activeTab.id // or do whatever you need*/
    });
})


function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener('dblclick', function () {
    //  When clicked, clear localStorage, myLeads, and the DOM

    localStorage.clear();
    myLeads = []
    render(myLeads)

});
//  Listen for clicks on tabBtn. Log URL to the console
inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    //to verify that its work
    //console.log(localStorage.getItem(myLeads))
})


