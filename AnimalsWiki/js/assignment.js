
var home_template, class_template, animal_template;

var current_class = animals.class[0];
var current_class_index = 0;

var current_animal = current_class.animals[0];

// a helper function that instantiates a template
// and displays the results in the content div
function showTemplate(template, data){
	var html    = template(data);
	$('#container').html(html);
}

$(document).ready(function(){

	//
	// compile all of our templates ready for use
	//
	var source   = $("#home-template").html();
	home_template = Handlebars.compile(source);
	
	source   = $("#class-template").html();
	class_template = Handlebars.compile(source);
	
	source   = $("#animal-template").html();
	animal_template = Handlebars.compile(source);
	
	$("#home, #logo").click(function () {
		// styles
		$('.clickable').removeClass('clickable');
		$('.active').removeClass('active');
		$('#home').addClass('active');
		$('#level1, #level2').addClass('hide');
		// end of styles
		
		showTemplate(home_template, animals);
 
		$(".class-thumbnail, #level1").click(function (){
			
			var index = $(this).data("id");
			current_class = animals.class[index];
			current_class_index = index;
			
			// styles
			$('.clickable').removeClass('clickable');
			$('#home').addClass('clickable');
			$('.active').removeClass('active');
			$('#level1').addClass('active');
			$('#level2').addClass('hide');
			$('#level1').removeClass('hide');
			// end of styles
			
			//breadcrumb data
			$('#level1').empty();
			$('#level1').append(current_class.name);
			$('#level1').data('id', current_class_index);
			
			showTemplate(class_template, current_class);

			$(".animal-thumbnail").click(function (){
				
				var index2 = $(this).data("id");
				current_animal = current_class.animals[index2];
				
				// styles
				$('.clickable').removeClass('clickable');
				$('#home, .breadcrumb #level1').addClass('clickable');
				$('.active').removeClass('active');
				$('#level2').addClass('active');
				$('#level1, #level2').removeClass('hide');
				// end of styles
				
				//breadcrumb data
				$('#level1').data('id', current_class_index);
				$('#level2').empty();
				$('#level2').append(current_animal.name);
				
				showTemplate(animal_template, current_animal);
				
			});
		});
	});
	$("#logo").click();

});