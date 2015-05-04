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

function getRepoList() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        url: user.repos_url + "?client_id=f8a4b95805c9804c9eb7&client_secret=4b1bff35a5b8b802fe4bb4e1204afd2f56fc8d8d",
        complete: function () {
            console.log('ajax complete');
        },
        success: function (data) {
            console.log(data);
            displayRepos(data);
        }
    });
}

function searchCallback(results) {
    console.log(results);
    user = results;
    displayContent();
    getRepoList();
}

function displayRepos(data) {
    var description="";
    for (var j = 0; j < data.length; j++){
        if (data[j].description == ""){
            description = "No info available";
        } else {
            description = data[j].description;
        }
        $(".repositoryList").append("<li><a href='"+ data[j].clone_url + "'>" + data[j].name + "</a><p> Description: " + description + "</p></li>");
    }
}

function displayContent(){
    $('.userInfo').toggleClass("hidden");
    var signUpDate = user.created_at.slice(0, 10);
    var signUpTime = user.created_at.slice(12, 19);
    $('.userPic').attr("src", user.avatar_url);
    $('.name').text(user.name);
    $('.created').text("This user signed up on "+ signUpDate +" at "+ signUpTime);
    $('.location').text(user.location);
    $('.email').text(user.email);

    $(".repos").html("<a href='" + user.html_url + "'>Check out " + user.name + " repos!</a>");
}

$(document).ready(function() {

    $(".header").on('click', ".searchGithub", function(event){
        event.preventDefault()
        var searchUser = $('.inputField').val();
        console.log('input field: ' + searchUser);
        search(searchUser);
    });

});
