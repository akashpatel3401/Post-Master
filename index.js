console.log("project 6 is back");

//utility function
//1.Utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
//initialize no of parameter
let addParamCount = 0;

// Hide the parameters box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// if the user clicks on params box ,hide the json box

let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
        document.getElementById('requestjsonbox').style.display = 'none';
        document.getElementById('parametersBox').style.display = 'block';
    })
    //if user click on json box hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestjsonbox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})

//if the user clicks on + button ,add more parameters
let addparam = document.getElementById('addparam');
addparam.addEventListener('click', () => {
    let params = document.getElementById('params')
    let string = ` <div class="form-row my-3">
                            <label for="parameterKey1" class="col-sm-2 col-form-label">Parameter ${addParamCount+2}</label>
                            <div class=" col-md-4">
                                <input type="text" class="form-control" id="parameterKey ${addParamCount+2}" placeholder="Enter Parameter ${addParamCount+2} key">
                            </div>
                            <div class=" col-md-4">
                                <input type="text" class="form-control" id="parameterValue ${addParamCount+2}" placeholder="Enter Parameter ${addParamCount+2} value">
                            </div>
                            <button  class="btn btn-primary deleteparam"> - </button>
                    </div>`;

    //convert the element string to DOM mode
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement)
        //add an event listener to remove the parameter  on clicking - button
    let deleteparam = document.getElementsByClassName('deleteparam');
    for (item of deleteparam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
    addParamCount++;
})


// if the user click on submit button

let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    document.getElementById('Responsejsontext').value = "Please wait... Fetching response";

    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;


    //if user has used params option instead of json ,collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        console.log("jayyy")
        for (let i = 0; i < addParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                console.log("helloeeo")
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;

            }
        }
        data = JSON.stringify(data);

    } else {
        data = document.getElementById('requestjsontext').value;
    }

    //log all the value in the console for debugging
    console.log('url is', url);
    console.log('requestType is', requestType);
    console.log('Content type is', contentType);
    console.log('data is', data);

    // if the request type is get invoke fetch api to create a post request
    if (requestType == 'GET') {
        fetch(url, {
                method: 'GET',
            })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('Responsejsontext').value = text;

            });
    } else {
        fetch(url, {
                method: 'post',
                body: data,
                headers: {
                    "content-type": "application/json; charset = UTF-8"
                }
            })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('Responsejsontext').value = text;

            });

    }
})