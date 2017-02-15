$(document).ready(function() {

	jQuery.get('static/json/biblio.json', function(jsonBibli) { 

		

		  var divBblio=document.getElementById("bibliografia");

		  var h1=document.createElement("h1");
		h1.className = 'centered';
      	h1.appendChild(document.createTextNode(jsonBibli.descripcion));
     	 divBblio.appendChild(h1);

     	 fuentes=jsonBibli.referencia

    for (var i in fuentes)
    {

    var a = document.createElement('a');
    a.className="BigLink"
	var linkText = document.createTextNode(fuentes[i].parte);
	a.appendChild(linkText);
	a.href = fuentes[i].link;
	a.title = "my title text";
	a.target="_blank";
	divBblio.appendChild(a);
    }
    

	});

})
