function submitToAPI(e) {
    e.preventDefault();
    var URL = "https://tplxopjyti.execute-api.us-east-1.amazonaws.com/prod/Kyraha-form-email";

    var name = document.getElementById("name-input").value;
    var phone = document.getElementById("phone-input").value;
    var email = document.getElementById("email-input").value;
    var desc = document.getElementById("description-input").value;
    
    if (name.length < 2) {
        alert ("Name can not be less than 2 char");
        return;
    }
    if (phone.length < 5) {
        alert ("Please enter valid contact ID");
        return;
    }
    if (email=="") {
        alert ("Please enter pass code");
        return;
    }

    var data = {
        name : name,
        phone : phone,
        email : email,
        desc : desc
    };

    $.ajax({
        type: "POST",
        url: URL,
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),

        success: function () {
            // clear form and show a success message
            alert("Successfull");
            document.getElementById("contact-form").reset();
            location.reload();
        },
        error: function () {
            // show an error message
            alert("UnSuccessfull");
        }
    });
}
