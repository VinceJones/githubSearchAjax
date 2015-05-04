var user = {};

function search(searchUser) {
    searchUser = encodeURI(searchUser);
    $.ajax({
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        url: "https://api.github.com/users/" + searchUser +"?client_id=f8a4b95805c9804c9eb7&client_secret=4b1bff35a5b8b802fe4bb4e1204afd2f56fc8d8d",
        complete: function () {
            console.log('ajax complete');
        },
        success: function (data) {
            searchCallback(data);
        }
    });
}


function searchCallback(results) {
    console.log(results);
    user = results;
    displayContent(user);
}
function displayContent(userData){
    $('.userInfo').toggleClass("hidden");

    $('.userPic').attr("src", user.avatar_url);
    $('.name').text(user.name);
    $('.location').text(user.location);
    $('.email').text(user.email);
    $(".repos").html("<a href='" + user.repos_url + "'>Check out " + user.name + " repos!</a>");
}

$(document).ready(function() {


    $(".header").on('click', ".searchGithub", function(event){
        event.preventDefault()
        var searchUser = $('.inputField').val();
        console.log('input field: ' + searchUser);
        search(searchUser);
    });

});
