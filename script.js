document.getElementById("send").addEventListener("click", Send);

function readCsv() {
    const input = document.getElementsByClassName("upload_csv")[0].files[0];
    const reader = new FileReader();
    let arr = []
    let text = reader.readAsText(input);
    text = csvToArray(text)
    return text
    // reader.onload = function (e) {
    //     const text = e.target.result;
    //     return csvToArray(text);
    // };

}


function csvToArray(str, delimiter = ",") {
    str = str.replace(/\s/g, '')
    return str.split(delimiter);
}


function Send() {
    const phones = readCsv()
    console.log(phones)
    const text = document.getElementById("message_text")
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        for (let i=0; i < phones.length; i++){
            chrome.tabs.update(tab.id, {url: `http://api.whatsapp.com/send?phone=${phones[i]}&text=${text}`});
            tab.document.onload = function (e) {
                tab.document.getElementsByClassName('_4sWnG').click()

            }
        }

    });
}