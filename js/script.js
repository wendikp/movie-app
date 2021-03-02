function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function searchMovies () {
    $('#movie-list').html('');
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'b6c11893',
            's': $('#search-input').val()
        },
        success: function (result) {
            if (result.Response == "True") {
                let movies = result.Search;
                $.each(movies, function (i, data) {
                    if (data.Type != "game") {
                        $('#movie-list').append(`
                            <div class="col-md-4">
                                <div class="card mb-3" style="max-width: 540px; background-color: rgba(0, 0, 0, 0.6);">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            <img src="`+ data.Poster +`" alt="poster" style="max-height: 178px; max-width: 120px">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h6 class="card-title">`+ data.Title +`</h6>
                                                <p class="card-text" style="font-size: 12px;">`+ capitalizeFirstLetter(data.Type) +`</p>
                                                <p class="card-text"><small>`+ data.Year +`</small></p>
                                                <a href="#" class="card-link see-details" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+ data.imdbID +`"><font color="white">See details..</font></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `);
                    }
                });
                $('#search-input').val('');
            } else {
                $('#movie-list').html("<h1 class='text-center'>Sorry, we can't find that movie</h1>");
            }
        }
    });
}

$('#search-button').on('click', function () {
    searchMovies();
});

$('#search-input').on('keyup', function (e) {
    if (e.keyCode === 13) {
        searchMovies();
    }
});

$('#movie-list').on('click', '.see-details', function () {
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'b6c11893',
            'i': $(this).data('id')
        },
        success: function (detail) {
            if (detail.Response === "True") {
                $('.modal-title').html('<h3>' + detail.Title + '</h3>');

                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="` + detail.Poster + `" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item">Released : `+ detail.Released +`</li>
                                    <li class="list-group-item">Genre : `+ detail.Genre +`</li>
                                    <li class="list-group-item">Director : `+ detail.Director +`</li>
                                    <li class="list-group-item">Actors : `+ detail.Actors +`</li>
                                    <li class="list-group-item">Plot : `+ detail.Plot +`</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    });
});