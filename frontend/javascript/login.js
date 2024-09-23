const apiUrl = "http://localhost:3500";

async function login(event)
{
    event.preventDefault();

    let username = document.getElementById("loginEmailField").value;
    let password = document.getElementById("loginPasswordField").value;

    if (username && password)
    {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let bodyContent = JSON.stringify
        ({
            username: username,
            password: password
        });
        
        let requestOptions = 
        {
            method: "POST",
            headers: myHeaders,
            body: bodyContent,
            redirect: "follow"
        }

        let result = await fetch(apiUrl + "/checkLogin", requestOptions);
        let resultJson = await result.json();

        if (resultJson.success == true)
        {
            window.location = "currencyConverterPage.html";
        }
    }
    
    document.querySelector(".failedLoginMessage").style.visibility = "visible";
    setTimeout(() => {document.querySelector(".failedLoginMessage").style.visibility = "hidden";}, 2000);   
}