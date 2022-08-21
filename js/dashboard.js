
let user_details = {
    "name": null,
    "email": null,
    "phone": null,
    "gender": null,
    "location": null,
    "state": null,
    "business": null,
    "photo": null
}

user_details.name = 'Kingsley';
user_details.email = 'divine10646@gmail.com';

$(document).ready(function () {
    $("#user_name").val(user_details.name);
    $("#user_email").val(user_details.email);

    $("#select-service-btn").click(function () {
        $("#service-form-block").slideDown("slow", function () {
            $("#service-desc").focus();
        });
    });
    $("#service-desc-submit").click(function () {
        $("#service-form-block").slideUp("slow");
    });
});

