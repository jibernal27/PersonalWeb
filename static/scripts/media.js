$(document).ready(function() {
  $('i').hide();

  var divDescription = document.getElementById("description");
   var h2 = document.createElement("h2");
   jQuery.get('static/txt/descripciones.txt', function(descriText) {  
     h2.appendChild(document.createTextNode(descriText));
});
  
  divDescription.appendChild(h2); 


   jQuery.get('static/json/yo.json', function(jsonYo) {  

      var divEstudio=document.getElementById("logros");
      var h3=document.createElement("h3");
      
      var logros1=jsonYo.logros;
      h3.className = 'centered';
      h3.appendChild(document.createTextNode("Mis logros"));
      divEstudio.appendChild(h3); 

        

      for (var i in logros1) {
        var div=document.createElement("div");
        div.className = 'col-md-6';
        var p=document.createElement("p");
         p.appendChild(document.createTextNode(logros1[i].nombre+" "+logros1[i].descrip+ " "+logros1[i].fecha));
         div.appendChild(p); 
         divEstudio.appendChild(div);
        }
        


       var divEstudio=document.getElementById("estudios");
      var h3=document.createElement("h3");
      var formacion=jsonYo.formacion;
      h3.className = 'centered';
      h3.appendChild(document.createTextNode("Mi formación académica"));
      divEstudio.appendChild(h3); 

      for (var i in formacion) {

        var div=document.createElement("div");
        div.className = 'col-md-3';
        var p=document.createElement("p");
         p.appendChild(document.createTextNode(formacion[i].titulo));
         div.appendChild(p); 

         var p=document.createElement("p");
         p.appendChild(document.createTextNode(formacion[i].institucion));
         div.appendChild(p); 

         var p=document.createElement("p");
         p.appendChild(document.createTextNode(formacion[i].lugar));
         div.appendChild(p); 
         divEstudio.appendChild(div); 

        }  
      
});



  jQuery.get('static/json/iqui.json', function(jsonIQUI) {  
    
      var divIQUI=document.getElementById("IQUI");
     
      descripcion=jsonIQUI.descripcion;
      var p=document.createElement("p");
      p.className = 'justified';
       p.appendChild(document.createTextNode(descripcion));
      divIQUI.appendChild(p);


      var divExperiencia=document.createElement("div");
      divExperiencia.className = 'divExperiencia';
      var h4=document.createElement("h4");
      h4.className = 'centered';
      h4.appendChild(document.createTextNode("Experiencia Laboral"));
      divExperiencia.appendChild(h4);

      experiencias=jsonIQUI.experiencia;

       for (var i in experiencias)
    {
      var div=document.createElement("div");
        div.className = 'col-md-12';
         var p=document.createElement("p");
          p.className = 'bold';
         p.appendChild(document.createTextNode(experiencias[i].lugar+"\t"+experiencias[i].fechas));
         div.appendChild(p); 
         var p=document.createElement("p");
         p.appendChild(document.createTextNode(experiencias[i].nombre));
         div.appendChild(p); 
         var p=document.createElement("p");
         p.className = 'justified';
         p.appendChild(document.createTextNode(experiencias[i].descripcion));
         div.appendChild(p); 
         divExperiencia.appendChild(div); 
    }
    divIQUI.appendChild(divExperiencia);



//projectos

      projectos=jsonIQUI.projectos;
     var h4=document.createElement("h4");
      h4.className = 'centered';
      h4.appendChild(document.createTextNode("Proyectos"));
     var divprojectos=document.createElement("div");
     divprojectos.className = 'divprojectos';
     divprojectos.appendChild(h4);
    for (var i in projectos)
    {
      var div=document.createElement("div");
      div.className = 'col-md-12';
      var p=document.createElement("p");
      p.className = 'bold';
      p.appendChild(document.createTextNode(projectos[i].nombre));
      div.appendChild(p); 

      var p=document.createElement("p");
      p.className = 'justified';
      p.appendChild(document.createTextNode(projectos[i].descripcion));
      div.appendChild(p); 


      var p=document.createElement("p");
      p.className = 'cursiva';
      p.appendChild(document.createTextNode(projectos[i].materia));
      div.appendChild(p); 

      var br=document.createElement("br");
      divprojectos.appendChild(div); 
      divprojectos.appendChild(br); 
    }
    divIQUI.appendChild(divprojectos);



    // Intereses
     intereses=jsonIQUI.Intereses;
     var h4=document.createElement("h4");
      h4.className = 'centered';
      h4.appendChild(document.createTextNode("Intereses"));
     var divIntereses=document.createElement("div");
     divIntereses.className = 'divIntereses';
     divIntereses.appendChild(h4);
    for (var i in intereses)
    {
      var div=document.createElement("div");
        div.className = 'col-md-6';
         var p=document.createElement("p");
         p.appendChild(document.createTextNode(intereses[i]));
         div.appendChild(p); 
         divIntereses.appendChild(div); 
    }
    divIQUI.appendChild(divIntereses);

    
    // Habilidades


    var divHabilidades =document.createElement("div");
    divHabilidades.id='WrapperIQUI';
    divHabilidades.className='col-md-12';
    divIQUI.appendChild(divHabilidades);

 
   var h4=document.createElement("h4");
      h4.className = 'centered';
      h4.appendChild(document.createTextNode("Habilidades"));
       divHabilidades.appendChild(h4);


    habilidades=jsonIQUI.habilidades;
    var labelsH= new Array('');
    var pointsC=new Array();
    var colors= new Array();
    for (var j = habilidades.length - 1; j >= 0; j--) 
    {
      labelsH.push(habilidades[j].nombre);
      pointsC.push(habilidades[j].valor);
      colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
    }

    var grid = d3.range(25).map(function(i){
      return {'x1':0,'y1':0,'x2':0,'y2':480};
    });

    var tickVals = grid.map(function(d,i){
      if(i>0){ return i*10; }
      else if(i===0){ return "100";}
    });

    var xscale = d3.scale.linear()
            .domain([0,10])
            .range([0,150]);

    var yscale = d3.scale.linear()
            .domain([0,labelsH.length])
            .range([0,300]);

    var colorScale = d3.scale.quantize()
            .domain([0,labelsH.length])
            .range(colors);

    var canvas = d3.select('#WrapperIQUI')
            .append('svg')
            .attr({'width':300,'height':300});


    var xAxis = d3.svg.axis();
      xAxis
        .orient('bottom')
        .scale(xscale)
        .tickValues(tickVals);

    var yAxis = d3.svg.axis();
      yAxis
        .orient('left')
        .scale(yscale)
        .tickSize(1)
        .tickFormat(function(d,i){ return labelsH[i]; })
        .tickValues(d3.range(17));

    var y_xis = canvas.append('g')
              .attr("transform", "translate(150,0)")
              .attr('id','yaxis')
              .call(yAxis);

    var x_xis = canvas.append('g')
              .attr("transform", "translate(150,480)")
              .attr('id','xaxis')
              .call(xAxis);

    var chart = canvas.append('g')
              .attr("transform", "translate(150,0)")
              .attr('id','bars')
              .selectAll('rect')
              .data(pointsC)
              .enter()
              .append('rect')
              .attr('height',15)
              .attr({'x':0,'y':function(d,i){ return yscale(i)+19; }})
              .style('fill',function(d,i){ return colorScale(i); })
              .attr('width',function(d){ return 0; });


    var transit = d3.select("svg").selectAll("rect")
                .data(pointsC)
                .transition()
                .duration(1000) 
                .attr("width", function(d) {return xscale(d); });

    var transitext = d3.select('#bars')
              .selectAll('text')
              .data(pointsC)
              .enter()
              .append('text')
              .attr({'x':function(d) {return xscale(d)-75; },'y':function(d,i){ return yscale(i)+30; }})
              .text(function(d){ return d; }).style({'fill':'white','font-size':'14px'});


});













  jQuery.get('static/json/isis.json', function(jsonISIS) {  
    
      var divIQUI=document.getElementById("ISIS");
    

      descripcion=jsonISIS.descripcion;
      var p=document.createElement("p");
      p.className = 'justified';
       p.appendChild(document.createTextNode(descripcion));
      divIQUI.appendChild(p);


      var divExperiencia=document.createElement("div");
      divExperiencia.className = 'divExperiencia';
      var h4=document.createElement("h4");
      h4.className = 'centered';
      h4.appendChild(document.createTextNode("Experiencia Laboral"));
      divExperiencia.appendChild(h4);

      experiencias=jsonISIS.experiencia;

       for (var i in experiencias)
    {
      var div=document.createElement("div");
        div.className = 'col-md-12';
         var p=document.createElement("p");
          p.className = 'bold';
         p.appendChild(document.createTextNode(experiencias[i].lugar+"\t"+experiencias[i].fechas));
         div.appendChild(p); 
         var p=document.createElement("p");
         p.appendChild(document.createTextNode(experiencias[i].nombre));
         div.appendChild(p); 
         var p=document.createElement("p");
         p.className = 'justified';
         p.appendChild(document.createTextNode(experiencias[i].descripcion));
         div.appendChild(p); 
         divExperiencia.appendChild(div); 
    }
    divIQUI.appendChild(divExperiencia);



//projectos

      projectos=jsonISIS.projectos;
     var h4=document.createElement("h4");
      h4.className = 'centered';
      h4.appendChild(document.createTextNode("Proyectos"));
     var divprojectos=document.createElement("div");
     divprojectos.className = 'divprojectos';
     divprojectos.appendChild(h4);
    for (var i in projectos)
    {
      var div=document.createElement("div");
      div.className = 'col-md-12';
      var p=document.createElement("p");
      p.className = 'bold';
      p.appendChild(document.createTextNode(projectos[i].nombre));
      div.appendChild(p); 

      var p=document.createElement("p");
      p.className = 'justified';
      p.appendChild(document.createTextNode(projectos[i].descripcion));
      div.appendChild(p); 


      var p=document.createElement("p");
      p.className = 'cursiva';
      p.appendChild(document.createTextNode(projectos[i].materia));
      div.appendChild(p); 

      var br=document.createElement("br");
      divprojectos.appendChild(div); 
      divprojectos.appendChild(br); 
    }
    divIQUI.appendChild(divprojectos);



    // Intereses
     intereses=jsonISIS.Intereses;
     var h4=document.createElement("h4");
      h4.className = 'centered';
      h4.appendChild(document.createTextNode("Intereses"));
     var divIntereses=document.createElement("div");
     divIntereses.className = 'divIntereses';
     divIntereses.appendChild(h4);
    for (var i in intereses)
    {
      var div=document.createElement("div");
        div.className = 'col-md-6';
         var p=document.createElement("p");
         p.appendChild(document.createTextNode(intereses[i]));
         div.appendChild(p); 
         divIntereses.appendChild(div); 
    }
    divIQUI.appendChild(divIntereses);

    
    // Habilidades


    var divHabilidades =document.createElement("div");
    divHabilidades.id='WrapperISIS';
    divHabilidades.className='col-md-12';
    divIQUI.appendChild(divHabilidades);

 
   var h4=document.createElement("h4");
      h4.className = 'centered';
      h4.appendChild(document.createTextNode("Habilidades"));
       divHabilidades.appendChild(h4);


    habilidades=jsonISIS.habilidades;

    for (var i in habilidades)
    {
      var div=document.createElement("div");
        div.className = 'col-md-6';
         var p=document.createElement("p");
         p.appendChild(document.createTextNode(habilidades[i].nombre+ ":"+habilidades[i].valor));
         div.appendChild(p); 
         divHabilidades.appendChild(div); 
    }
    divIQUI.appendChild(divHabilidades);
    



});







})

$(window).load(function() {
  $('i').show();

  var twitterPos = $('#twitter').position();
  var githubPos = $('#github').position();
  var stackPos = $('#stack').position();
  var linkedinPos = $('#linkedin').position();
  var codePos = $('#code').position();
  var imgPos = $('.me').position();
  
  $('i').css({
    position: 'absolute',
    zIndex: '1',
    top: imgPos.top + 100,
    left: '47%'
  });
  
  setTimeout(function() {
    $('#twitter').animate({
      top: twitterPos.top + 10,
      left: twitterPos.left - 10
    }, 500);
  }, 250);
  
  setTimeout(function() {
    $('#twitter').animate({
      top: twitterPos.top,
      left: twitterPos.left
    }, 250);
    
    $('#github').animate({
      top: githubPos.top + 10,
      left: githubPos.left - 6
    }, 500);
  }, 500);
  
  setTimeout(function() {
    $('#github').animate({
      top: githubPos.top,
      left: githubPos.left
    }, 250);
    
    $('#stack').animate({
      top: stackPos.top + 10,
      left: stackPos.left - 3
    }, 500);
  }, 750);
  
  setTimeout(function() {
    $('#stack').animate({
      top: stackPos.top,
      left: stackPos.left
    }, 250);
    
    $('#linkedin').animate({
      top: linkedinPos.top + 10,
      left: linkedinPos.left
    }, 500);
  }, 1000);
  
  setTimeout(function() {
    $('#linkedin').animate({
      top: linkedinPos.top,
      left: linkedinPos.left
    }, 250);
  }, 1250);
  

  
})


function cambaiBarra() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

