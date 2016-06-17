var fireRequest = true

$ ( document ).ready( function () {
	console.log('dom is ready')

	$ ( '#searchform' ).on ( "keyup",function (){
		var inputLetters = {
			searchTyping: $ ('#searchform') .val( )
		}
		$('#places').empty()
			if(fireRequest) {
				fireRequest = false
				$.post ('/findAll', inputLetters, function(data){

					for (person in data){
						console.log(data[person].firstname)
						$ ( '#places' ).append( '<div class="newPerson">' + data[person].firstname + " " + 
							data[person].lastname + '</div>' )
					}
					$ ( '.newPerson' ) .click( function() { 
						$('#searchlist').val($(this).text()) 
					})
				})
				setTimeout(function(){
					fireRequest = true
				}, 300)
			}

})
})