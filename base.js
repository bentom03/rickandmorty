const url = 'https://rickandmortyapi.com/api/character/'
fetch(url) 
    .then(response => response.json())
    .then(data => dataUsage(data.results)); 

function dataUsage(arr) {
    sortByIds(arr);
    searchByName(arr);
    filterSearch(arr);
    displayCharacters(arr);
    fillFilters(arr);
}

function displayCharacters(arr) {
    
    arr.map(el => {
        let characterBox = '<div class="character-wrapper"><div class="image-container"><img src="' + el.image + '" alt="' + el.name + '"profile pic"></div><div class="profile-info"><h4>' + el.name + '</h4><p>ID: ' + el.id + '</p><p>Created: ' + el.created + '</p></div><div class="character-info"><div class="status"><p>Status</p><p>' + el.status + '</p></div><div class="species"><p>Species</p><p>' + el.species + '</p></div><div class="gender"><p>Gender</p><p>' + el.gender + '</p></div><div class="origin"><p>Origin</p><p>' + el.origin.name + '</p></div><div class="location"><p>Last Location</p><p>' + el.location.name + '</p></div></div></div>';

        $('#characters').append(characterBox);

    });

};

function fillFilters(arr) {
    let speciesArray = [], originArray = [], genderArray = []
    arr.map(el => {
        speciesArray.push(el.species);
        originArray.push(el.origin.name);
        genderArray.push(el.gender);
    });
    
    const removeDuplicates = (arr) => new Set([...arr]);
    let species = removeDuplicates(speciesArray);
    let origin = removeDuplicates(originArray);
    let gender = removeDuplicates(genderArray);
    
    // console.log(species, origin, gender);

    for(let el of species) {
        $('#species').append('<p><a id="species-' +el+ '" href="">' + el + '</a></p>');
    }
    for(let el of origin) {
        $('#origin').append('<p><a id="origin-' +el+ '" href="">' + el + '</a></p>');
    }
    for(let el of gender) {
        $('#gender').append('<p><a id="gender-' +el+ '" href="">' + el + '</a></p>');
    }
}

function filterSearch(arr) {
    // console.log(arr);
    
    $('body').on('click', 'a', function(e) {
        e.preventDefault();
        let characterFilter = $(this).attr('id').split('-')[0];
        let characterQuality = $(this).attr('id').split('-')[1];
        
        console.log(characterQuality);
        let tag = '<div class="tag">'+characterQuality+'</div>'
        
        $('.tags').html('');
        $('.tags').append(tag); 

        let filteredArray = [];
        arr.map(el => {
            if(el.hasOwnProperty(characterFilter)) {
                if(el[characterFilter] == characterQuality) {
                    filteredArray.push(el); 
                }
            }
            $('#characters').html('');
            displayCharacters(filteredArray);    
        });
        
    });
}

function sortByIds(arr) {
    $("#sort").change(function (){
        let sortingValue = $(this).val(); 
        let sortedArray = [];

        if(sortingValue == 'ascending') {
            sortedArray = arr.sort(function(a, b){
                return a.id - b.id;
            });
            $('#characters').html('');
            displayCharacters(sortedArray);   
        } else {
            sortedArray = arr.sort(function(a, b){
                return b.id - a.id;
            });
            $('#characters').html('');
            displayCharacters(sortedArray); 
        }
        
        
    });
 
}

function searchByName(arr) {
    $('.search').click(function() {
        let searchTerm = $('input').val();
        let searchArray = [];
        // $("p:contains(is)")
        arr.map( el => {
            if(el.hasOwnProperty('name')) {
                if(el.name.includes(searchTerm)) {
                    searchArray.push(el);
                }
            }
        });
        $('#characters').html('');
        displayCharacters(searchArray);
    });
}   