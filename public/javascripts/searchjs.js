var fireRequest = true;

$ ( document ).ready( function () {
	console.log('dom is ready')

	$ ( '#searchform' ).on ( "keyup",function (){
		var inputLetters = {
			searchTyping: $ ('#searchform') .val( )
		}
		$('#foundPlaces').empty()
			if(fireRequest) {
				fireRequest = false
				$.post ('search/ajaxSearch', inputLetters, function(data){

					for (place in data){
						console.log(data[place].name)
						$ ( '#foundPlaces' ).append( '<div class="newCity">' + data[place].name + " " + 
							data[place].country.name + '</div>' )
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