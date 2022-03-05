$(function() {
  $("#pokemon-search").click(function() {
    let pokemonName = $("#pokemon-name").val()

      if (pokemonName !== '') {
        $.getJSON(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`, function(data) {
          console.log('data: ', data)
          $("#pokemon_info").append(`<h1>${data.name}</h1>`)
          $("#pokemon").attr({src: data.sprites.front_shiny})
          $("#pokemon_info").append(`<p>${data.types[0].type.name}</p>`)

        }).fail(function() {
          console.log("that pokemon doesn't exist")
      })
    }
    //reset the input
    $('#pokemon-name').val('')
  })
})
