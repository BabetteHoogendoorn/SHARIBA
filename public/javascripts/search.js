var fireRequest = true

$ ( document ).ready( function () {
	console.log('dom is ready')

	$ ( '#searchform' ).on ( "keyup",function (){
		var inputLetters = {
			searchTyping: $ ('#searchform') .val( )
		}
		$('#foundPlaces').empty()
			if(fireRequest) {
				fireRequest = false
				$.post ('/searchResult', inputLetters, function(data){

					for (person in data){
						console.log(data[person].firstname)
						$ ( '#foundPlaces' ).append( '<div class="newCity">' + data[person].firstname + " " + 
							data[person].lastname + '</div>' )
					}
					$ ( '.newCity' ) .click( function() { 
						$('#searchform').val($(this).text()) 
					})
				})
				setTimeout(function(){
					fireRequest = true
				}, 300)
			}

})
})