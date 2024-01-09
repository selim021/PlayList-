function Playlist(mus_img, artist, Song, link, id) {
    var obj = {}
    obj.mus_img = mus_img,
        obj.artist = artist,
        obj.Song = Song,
        obj.link = link,
        obj.id = id,
        obj.counter = 0
    
   
    return obj
}

var music1 = Playlist(["./images/maes.jpg", "./images/cover1.jpg"], "Maes", "Bercy", "https://www.youtube.com/watch?v=MBpnyHp3x4M", 1)
var music2 = Playlist(["./images/babygang.jpg", "./images/cover2.jpg"], "Baby Gang", "Mocro Mafia", "https://www.youtube.com/watch?v=xK-rxiKd2D4", 2)
var music3 = Playlist(["./images/maes2.jpg"], "Maes", "Professor", "https://www.youtube.com/watch?v=1Z7_wsXkxYc", 3)
var music4 = Playlist(["./images/freeze.jpg", "./images/cover3.jpg"], "Freeze Corleone", "Ancelotti", "https://www.youtube.com/watch?v=a05sE-59zC0", 4)
var music5 = Playlist(["./images/lacrim.jpg", "./images/kanun2.jpg"], "Lacrim", "Kanun", "https://www.youtube.com/watch?v=1Z7_wsXkxYc", 5)


var musics = [music1, music2, music3, music4, music5]



function each(array, func) {
    for (var i = 0; i < array.length; i++) {
        func(array[i], i);
    }
}

function map(array, f) {
    var acc = [];
    each(array, function (element, i) {
        acc.push(f(element, i));
    });
    return acc;
}

function filter(array, predicate) {
    var acc = [];
    each(array, function (element, index) {
        // notice we added the index here
        if (predicate(element, index)) {
            // notice we added the index here
            acc.push(element);
        }
    });
    return acc;
}

function reduce(array, f, acc) {
    if (acc === undefined) {
        acc = array[0];
        array = array.slice(1);
    }
    each(array, function (element, i) {
        acc = f(acc, element, i);
    });
    return acc;
}

var $container = $(".container")

function render(musics) {
    $container.empty()
    each(musics, function (element, i) {
        console.log(musics)
        console.log(element)
        $container.append(`
<img class="images" id="${element.id}" src=${element.mus_img[element.counter]}>
 <h2> ${element.artist}</h2>
 <h2> ${element.Song}</h2>
 <a href="${element.link}" >Play</a>
      `)
    })
}

render(musics)

$(".images").click(function (event) {

    var music;
    var id = event.target.id
    var idOfClickedImage = (Number(event.target.id));
    //console.log(idOfClickedImage)
    for (var i = 0; i < musics.length; i++) {
        if (idOfClickedImage === musics[i].id) {
            idOfClickedImage = musics[i].mus_img
            music = musics[i]
        }
    }
    if (music.counter === 1) {
        music.counter = 0

    } else {
        music.counter = 1
    }
    $(`#${id}`).attr("src", idOfClickedImage[music.counter])
})







function addMusic(mus_img, artist, Song, link, id) {
   musics.push(new Playlist(mus_img, artist, Song, link, id))
}
$(".btn").click(function () {
    var imageUrl = $("#imageUrl").val()
    var artist = $("#artist").val()
    var song = $("#song").val()
    var link = $("#link").val()
    var id = parseInt($("#id").val())
    console.log([imageUrl], artist, song, link, id)
   
    
    var newSong = new Playlist([imageUrl,artist,song,link,id])
  musics.push(newSong )
  render(musics)
});









function searchThis(query) {
    var filtered = [];
    if (query !== "") {
        filtered = filter( musics,function(song) {
            // console.log(song,"tesssss");
            return song.artist.toLowerCase().includes(query.toLowerCase()) ||
                song.Song.toLowerCase().includes(query.toLowerCase())
        })
    } else if(query==="") {
        filtered = musics
    }
    return filtered
}


$(".searchButton").click(function () {
    var searchQuery = $('.searchTerm').val();
    var filteredMusics = searchThis(searchQuery);
    render(filteredMusics);
});