var user = {};

function search(searchUser) {
    searchUser = encodeURI(searchUser);
    $.ajax({
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        url: "https://api.github.com/users/" + searchUser,
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
    $(".repos").text(user.repos_url);
}

$(document).ready(function() {


    $(".header").on('click', ".searchGithub", function(event){
        event.preventDefault()
        var searchUser = $('.inputField').val();
        console.log('input field: ' + searchUser);
        search(searchUser);
    });

});
