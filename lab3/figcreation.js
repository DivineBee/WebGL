function ambientchange(string)
{
	var light = lightAmbient;
	
	var nr=parseInt(string[1]+string[2],16)/255;
	light[0]=nr;
	nr=parseInt(string[3]+string[4],16)/255;
	light[1]=nr;
	nr=parseInt(string[5]+string[6],16)/255;
	light[2]=nr;

	lightAmbient=light;
	ambientProduct = mult(lightAmbient, materialAmbient);
	console.log(ambientProduct);
	gl.uniform4fv( gl.getUniformLocation(program,
       "ambientProduct"),flatten(ambientProduct) );
}
function diffusechange(string)
{
	var light= vec4(0.0, 0.0, 0.0, 1.0 );
	
	var nr=parseInt(string[1]+string[2],16)/255;
	light[0]=nr;
	nr=parseInt(string[3]+string[4],16)/255;
	light[1]=nr;
	nr=parseInt(string[5]+string[6],16)/255;
	light[2]=nr;
	var field=Number(document.getElementById("index").value);
	if(field==0){
	lightDiffuse=light;
	diffuseProduct = mult(lightDiffuse, materialDiffuse);
	gl.uniform4fv( gl.getUniformLocation(program,"diffuseProduct"),flatten(diffuseProduct) );
	} else if(field==1){
	lightDiffuse2=light;
	diffuseProduct2 = mult(lightDiffuse2, materialDiffuse);
	gl.uniform4fv( gl.getUniformLocation(program,"diffuseProduct2"),flatten(diffuseProduct2) );
	} else if(field==2){
	lightDiffuse3=light;
	diffuseProduct3 = mult(lightDiffuse3, materialDiffuse);
	gl.uniform4fv( gl.getUniformLocation(program,"diffuseProduct3"),flatten(diffuseProduct3) );
	}
}
function specularchange(string)
{
	var light= vec4(0.0, 0.0, 0.0, 1.0 );
	var nr=parseInt(string[1]+string[2],16)/255;
	light[0]=nr;
	nr=parseInt(string[3]+string[4],16)/255;
	light[1]=nr;
	nr=parseInt(string[5]+string[6],16)/255;
	light[2]=nr;
	var field=Number(document.getElementById("index").value);
	if(field==0){
	lightSpecular=light;
	specularProduct = mult(lightSpecular, materialSpecular);
	gl.uniform4fv( gl.getUniformLocation(program,"specularProduct"),flatten(specularProduct) );
	} else if(field==1){
	lightSpecular2=light;
	specularProduct2 = mult(lightSpecular2, materialSpecular);
	gl.uniform4fv( gl.getUniformLocation(program,"specularProduct2"),flatten(specularProduct2) );
	} else if(field==2){
	lightSpecular3=light;
	specularProduct3 = mult(lightSpecular3, materialSpecular);
	gl.uniform4fv( gl.getUniformLocation(program,"specularProduct3"),flatten(specularProduct3) );
	}
}
function materialchange(string)
{
	var material= vec4(0.0, 0.0, 0.0, 1.0 );
	var nr=parseInt(string[1]+string[2],16)/255;
	material[0]=nr;
	nr=parseInt(string[3]+string[4],16)/255;
	material[1]=nr;
	nr=parseInt(string[5]+string[6],16)/255;
	material[2]=nr;
	ambientProduct = mult(lightAmbient, material);
	gl.uniform4fv( gl.getUniformLocation(program,
       "ambientProduct"),flatten(ambientProduct) );
	 diffuseProduct = mult(lightDiffuse, material);
	gl.uniform4fv( gl.getUniformLocation(program,"diffuseProduct"),flatten(diffuseProduct) );
	diffuseProduct2 = mult(lightDiffuse2, material);
	gl.uniform4fv( gl.getUniformLocation(program,"diffuseProduct2"),flatten(diffuseProduct2) );
	diffuseProduct3 = mult(lightDiffuse3, material);
	gl.uniform4fv( gl.getUniformLocation(program,"diffuseProduct3"),flatten(diffuseProduct3) );
	specularProduct = mult(lightSpecular, material);
	gl.uniform4fv( gl.getUniformLocation(program,"specularProduct"),flatten(specularProduct) );
	specularProduct2 = mult(lightSpecular2, material);
	gl.uniform4fv( gl.getUniformLocation(program,"specularProduct2"),flatten(specularProduct2) );
	specularProduct3 = mult(lightSpecular3, material);
	gl.uniform4fv( gl.getUniformLocation(program,"specularProduct3"),flatten(specularProduct3) );
	
}
var program;
var materialShininess = 200.0;
var vertexShaderText = 
[
'precision mediump float;',
'',
'attribute vec3 vertPosition;',
'attribute vec3 vertColor;',
'varying vec3 fragColor;',
'uniform mat4 mWorld;',
'uniform mat4 mView;',
'uniform mat4 mProj;',
'uniform mat4 trans;',
'uniform mat4 scale;',
'',
'void main()',
'{',
'  fragColor = vertColor;',
'  gl_Position = mProj * mView * trans *mWorld *scale* vec4(vertPosition, 1.0);',
'}'
].join('\n');

var fragmentShaderText =
[
'precision mediump float;',
'',
'varying vec3 fragColor;',
'void main()',
'{',
'  gl_FragColor = vec4(fragColor, 1.0);',
'}'
].join('\n');
var slider = document.getElementById("LightZ");
var output = document.getElementById("demo");
output.innerHTML = slider.value;
slider.oninput = function() {
	var field=Number(document.getElementById("index").value);
	if(field==0){
  lightPosition[0]=this.value;
  gl.uniform4fv( gl.getUniformLocation(program,
       "lightPosition"),flatten(lightPosition) );
	} else if (field==1)
	{
		lightPosition2[0]=this.value;
  gl.uniform4fv( gl.getUniformLocation(program,
       "lightPosition2"),flatten(lightPosition2) );
	}else if (field==2)
	{
		lightPosition3[0]=this.value;
  gl.uniform4fv( gl.getUniformLocation(program,
       "lightPosition3"),flatten(lightPosition3) );
	}
  
}
var slider2 = document.getElementById("LightZ2");
var output2 = document.getElementById("demo2");
output2.innerHTML = slider2.value;
slider2.oninput = function() {
	var field=Number(document.getElementById("index").value);
	if(field==0){
  lightPosition[1]=this.value;
  gl.uniform4fv( gl.getUniformLocation(program,
       "lightPosition"),flatten(lightPosition) );
	} else if (field==1)
	{
		lightPosition2[1]=this.value;
  gl.uniform4fv( gl.getUniformLocation(program,
       "lightPosition2"),flatten(lightPosition2) );
	}else if (field==2)
	{
		lightPosition3[1]=this.value;
  gl.uniform4fv( gl.getUniformLocation(program,
       "lightPosition3"),flatten(lightPosition3) );
	}
}
var slider3 = document.getElementById("LightZ3");
var output3 = document.getElementById("demo3");
output2.innerHTML = slider3.value;
slider3.oninput = function() {
	var field=Number(document.getElementById("index").value);
	if(field==0){
  lightPosition[2]=this.value;
  gl.uniform4fv( gl.getUniformLocation(program,
       "lightPosition"),flatten(lightPosition) );
	} else if (field==1)
	{
		lightPosition2[2]=this.value;
  gl.uniform4fv( gl.getUniformLocation(program,
       "lightPosition2"),flatten(lightPosition2) );
	}else if (field==2)
	{
		lightPosition3[2]=this.value;
  gl.uniform4fv( gl.getUniformLocation(program,
       "lightPosition3"),flatten(lightPosition3) );
	} 
}

var slidershines = document.getElementById("spec");
var outputspec = document.getElementById("demo4");
outputspec.innerHTML = slidershines.value;
slidershines.oninput = function() {
  materialShininess=this.value;
  gl.uniform1f( gl.getUniformLocation(program,
       "shininess"),materialShininess );
	   console.log("QWE"+materialShininess);
  outputspec.innerHTML = this.value;
}

function calculateNormal(a, b, c){
	// 3 main lines of NORMALS CALCULATION FOR 1 triangle a, b, c!
	var t1 = subtract(b, a);
	var t2 = subtract(c, a);
	var normal = normalize(cross(t2, t1));

	// converting vec3 to vec4, not needed if you send only vec3 to shaders, needed otherwise
	normal = vec4(normal);
	return normal;
}
function vec3()
{
    var result = _argumentsToArray( arguments );

    switch ( result.length ) {
    case 0: result.push( 0.0 );
    case 1: result.push( 0.0 );
    case 2: result.push( 0.0 );
    }

    return result.splice( 0, 3 );
}
function vec4()
{
    var result = _argumentsToArray( arguments );

    switch ( result.length ) {
    case 0: result.push( 0.0 );
    case 1: result.push( 0.0 );
    case 2: result.push( 0.0 );
    case 3: result.push( 1.0 );
    }

    return result.splice( 0, 4 );
}
function matr4()
{
    var v = _argumentsToArray( arguments );

    var m = [];
    switch ( v.length ) {
    case 0:
        v[0] = 1;
    case 1:
        m = [
            vec4( v[0], 0.0,  0.0,   0.0 ),
            vec4( 0.0,  v[0], 0.0,   0.0 ),
            vec4( 0.0,  0.0,  v[0],  0.0 ),
            vec4( 0.0,  0.0,  0.0,  v[0] )
        ];
        break;

    default:
        m.push( vec4(v) );  v.splice( 0, 4 );
        m.push( vec4(v) );  v.splice( 0, 4 );
        m.push( vec4(v) );  v.splice( 0, 4 );
        m.push( vec4(v) );
        break;
    }

    m.matrix = true;
    return m;
}

var objects = [];

var gl;

var identityMatrix = new Float32Array(16);
	var xRotationMatrix = new Float32Array(16);
	var yRotationMatrix = new Float32Array(16);
	var zRotationMatrix = new Float32Array(16);
	var translateMatrix= new Float32Array(16);
	var scaleMatrix= new Float32Array(16);
	
	var worldMatrix = new Float32Array(16);
	var viewMatrix = new Float32Array(16);
	var projMatrix = new Float32Array(16);
	
	var matWorldUniformLocation ;
	var matViewUniformLocation ;
	var matProjUniformLocation ;
	var mattransUniformLocation;
	var matscaleUniformLocation;
	var x=0,y=0.0,z=0.0;// for object translation
	

	var lightPosition = vec4(1.0, 1.0, 1.0, 1.0 );
	var lightPosition2 = vec4(1.0, 1.0, 1.0, 1.0 );
	var lightPosition3 = vec4(1.0, 1.0, 1.0, 1.0 );
	
	var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
	var lightDiffuse = vec4( 1.0, 0.0, 0.0, 1.0 );
	var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

	var lightAmbient2 = vec4(0.2, 0.2, 0.2, 1.0 );
	var lightDiffuse2 = vec4( 0.0, 1.0, 0.0, 1.0 );
	var lightSpecular2 = vec4( 1.0, 1.0, 1.0, 1.0 );

	var lightAmbient3 = vec4(0.2, 0.2, 0.2, 1.0 );
	var lightDiffuse3 = vec4( 0.0, 0.0, 1.0, 1.0 );
	var lightSpecular3 = vec4( 1.0, 1.0, 1.0, 1.0 );

	var materialAmbient = vec4( 1.0, 1.0, 1.0, 1.0 );
	var materialDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
	var materialSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var normalMatrix1 , normalMatrixLoc;

var eye=[0,2,2];
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);
var near = 0.3;
var far = 30.0;
var radius = 4.0;
var theta  = 0.0;
var phi    = 0.0;
var dr = 5.0 * Math.PI/180.0;

var  fovy = 45.0;  // Field-of-view in Y direction angle (in degrees)
var  aspect = 1.0;       // Viewport aspect ratio

var translate= function(e)
{
	//Translation
	var index=Number(document.getElementById('index').value);
	console.log(e.keyCode);
	var deltatrans=0.2;
	var deltarot=1/38;
	var deltacam=0.5;
	var deltascale=1.3;
	
	switch(e.keyCode)
{
	case 52:objects[index].x-=deltatrans;break;     // translation x --
	case 54:objects[index].x+=deltatrans;break;     // translation x ++
	case 50:objects[index].y-=deltatrans;break;	// translation y --
	case 56:objects[index].y+=deltatrans;break;   // translation y ++
	case 57:objects[index].z-=deltatrans;break;	// translation z --
	case 55:objects[index].z+=deltatrans;break;	// translation z ++
	//////////Rotation////////
	case 88:objects[index].rx+=deltarot;break;		//  rx ++
	case 120:objects[index].rx-=deltarot;break;		//	rx --
	case 67:objects[index].ry+=deltarot;break;		// 	ry ++
	case 99:objects[index].ry-=deltarot;break;		//	ry--
	case 90:objects[index].rz+=deltarot;break;		//	rz++
	case 122:objects[index].rz-=deltarot;break;		//	rz--
	///////////View// perspective////////
	case 97:eye[0]-=deltacam; break;     //theta --
	case 100:eye[0]+=deltacam; break;		// theta ++
	case 101:eye[1]+=deltacam; break;
	case 113:eye[1]-=deltacam;break;
	case 119:eye[2]-=deltacam;break;
	case 115:eye[2]+=deltacam;break;

	case 43:aspect+=0.1;break;
	case 45:aspect-=0.1;break;
	case 47:fovy+=3.0;break;
	case 46:fovy-=3.0;break;
	
	case 87:at[2]+=deltacam;break;
	case 83:at[2]-=deltacam;break;
	case 65:at[0]-=deltacam;break;
	case 68:at[0]+=deltacam;break;
	case 69:at[1]+=deltacam;break;
	case 81:at[1]-=deltacam;break;
	
	case 102:near*=1.2;break;
	case 118:near/=1.2;break;
	case 103:far*=1.2;break;
	case 98:far/=1.2;break;
	///////////////////////////Scaling///////////////
	case 106:objects[index].sx/=deltascale;break;// x scale --
	case 108:objects[index].sx*=deltascale;break;// x scale ++
	case 107:objects[index].sy/=deltascale;break;// y scale --
	case 105:objects[index].sy*=deltascale;break;// y scale ++
	case 111:objects[index].sz/=deltascale;break;// z scale --    // o
	case 117:objects[index].sz*=deltascale;break;// z scale ++   // u
}
	document.getElementById('rotx').innerHTML="rotation on x axes: "+objects[index].rx;
	document.getElementById('roty').innerHTML="rotation on y axes: "+objects[index].ry;
	document.getElementById('rotz').innerHTML="rotation on z axes: "+objects[index].rz;
}

var create=function( shape,edge,height)  //creates at 0.0 0.0 0.0 a cube // for sphere edge means radius
{

	edge=edge/2; // to avoid writing edge/2 everywhere
	if (shape=="cube"){
	var localVertices = 
	[ // X, Y, Z           R, G, B
		// Top
		-edge, edge, -edge,   0.5, 0.5, 0.5,
		-edge, edge, edge,    0.5, 0.5, 0.5,
		edge, edge, edge,     0.5, 0.5, 0.5,
		edge, edge, -edge,    0.5, 0.5, 0.5,

		// Left
		-edge, edge, edge,    0.75, 0.25, 0.5,
		-edge, -edge, edge,   0.75, 0.25, 0.5,
		-edge, -edge, -edge,  0.75, 0.25, 0.5,
		-edge, edge, -edge,   0.75, 0.25, 0.5,

		// Right
		edge, edge, edge,    0.25, 0.25, 0.75,
		edge, -edge, edge,   0.25, 0.25, 0.75,
		edge, -edge, -edge,  0.25, 0.25, 0.75,
		edge, edge, -edge,   0.25, 0.25, 0.75,

		// Front
		edge, edge, edge,    1.0, 0.0, 0.15,
		edge, -edge, edge,    1.0, 0.0, 0.15,
		-edge, -edge, edge,    1.0, 0.0, 0.15,
		-edge, edge, edge,    1.0, 0.0, 0.15,

		// Back
		edge, edge, -edge,    0.0, 1.0, 0.15,
		edge, -edge, -edge,    0.0, 1.0, 0.15,
		-edge, -edge, -edge,    0.0, 1.0, 0.15,
		-edge, edge, -edge,    0.0, 1.0, 0.15,

		// Bottom
		-edge, -edge, -edge,   0.5, 0.5, 1.0,
		-edge, -edge, edge,    0.5, 0.5, 1.0,
		edge, -edge, edge,     0.5, 0.5, 1.0,
		edge, -edge, -edge,    0.5, 0.5, 1.0,
	];
	var localIndices =
	[
		// Top
		2, 1, 0,
		3, 2, 0,

		// Left
		6, 4, 5,
		7, 4, 6,

		// Right
		10, 9, 8,
		11, 10, 8,

		// Front
		14, 12, 13,
		12, 14, 15,

		// Back
		18, 17, 16,
		19, 18, 16,

		// Bottom
		22, 20, 21,
		23, 20, 22
	];
	}
	else if (shape=="pyramid")
	{
	//	console.log("In pyramid");
		var localVertices = 
	[ // X, Y, Z           R, G, B
		// bottom
		-edge, 0, -edge,   0.75, 0.25, 0.5,
		-edge, 0, edge,    0.75, 0.25, 0.5,
		edge, 0, edge,    0.75, 0.25, 0.5,
		edge, 0, -edge,  0.75, 0.25, 0.5,

		// Front
		0, height, 0,    
		-edge, 0, -edge,   0.75, 0.25, 0.5,
		edge, 0, -edge,  0.75, 0.25, 0.5,
		

		// Right
		0, height, 0,    0.25, 0.25, 0.75,
		edge, 0, -edge,   0.25, 0.25, 0.75,
		edge, 0, edge,  0.25, 0.25, 0.75,

		// Back
		0, height, 0,    1.0, 0.0, 0.15,
		-edge, 0, edge,   1.0, 0.0, 0.15,
		 edge, 0, edge,  1.0, 0.0, 0.15,

		// Left
		0, height, 0,    0.0, 1.0, 0.15,
		-edge, 0, -edge,   0.0, 1.0, 0.15,
		-edge, 0, edge,  0.0, 1.0, 0.15,

	];
	var localIndices =
	[
// Top
		0, 1, 2,
		0, 2, 3,
		// Bottom
		0,1,2,
		0,2,3,

		// Front
		4,5,6,

		// Right
		7,8,9,

		// Back
		10,11,12,

		// Left
		13,14,15
	];
	}
	else if (shape=="sphere")
	{
	
		// Vertices
		console.log(height);
      var SPHERE_DIV = height;
      var i, ai, si, ci;
      var j, aj, sj, cj;
      var p1, p2;

      
      var vertices = [], indices = [];
      for (j = 0; j <= 2*SPHERE_DIV; j++) {
        aj = j * Math.PI / SPHERE_DIV;
        sj = Math.sin(aj);
        cj = Math.cos(aj);
        for (i = 0; i <= SPHERE_DIV; i++) {
          ai = i* 2* Math.PI / SPHERE_DIV;
          si = Math.sin(ai);
          ci = Math.cos(ai);

          vertices.push(si * sj*edge);  // X
          vertices.push(cj*edge);       // Y
         vertices.push(ci * sj*edge);  // Z 
		  vertices.push(1.0);
		  vertices.push(1.0);
		  vertices.push(1.0);  // colors
        }
      }
      // Indices
      for (j = 0; j < SPHERE_DIV; j++) {
        for (i = 0; i < SPHERE_DIV; i++) {
          p1 = j * (SPHERE_DIV+1) + i;
          p2 = p1 + (SPHERE_DIV+1);

          indices.push(p1 + 1); 
          indices.push(p2);
          indices.push(p1);

          indices.push(p1 + 1);
          indices.push(p2 + 1);
          indices.push(p2);
        }
      }
		localVertices=vertices;  // to lazy to replace everywhere
		localIndices=indices;
	}
	else if (shape=="seashell")
	{
	
		// Vertices
		console.log(height);
      var SPHERE_DIV = height;
      var i, ai, si, ci;
      var j, aj, sj, cj;
      var p1, p2;
   
      var vertices = [], indices = [];
      for (j = 0; j <= 2*SPHERE_DIV; j++) {
        aj = j * Math.PI / SPHERE_DIV;
        sj = Math.sin(aj);
        cj = Math.cos(aj);
        for (i = 0; i <= SPHERE_DIV; i++) {
          ai = i* 2.2* Math.PI / SPHERE_DIV;
          si = Math.sin(ai);
          ci = Math.cos(ai);

          vertices.push(si * sj*edge);  // X
          vertices.push(cj*edge);       // Y
          vertices.push(ci * sj*edge+i/200);  // Z
		  vertices.push(1.0);
		  vertices.push(1.0);
		  vertices.push(1.0);  // colors
		  
        }
      }    
      // Indices
      for (j = 0; j < SPHERE_DIV; j++) {
        for (i = 0; i < SPHERE_DIV; i++) {
          p1 = j * (SPHERE_DIV+1) + i;
          p2 = p1 + (SPHERE_DIV+1);

          indices.push(p1);
          indices.push(p2);
          indices.push(p1 + 1);

          indices.push(p1 + 1);
          indices.push(p2);
          indices.push(p2 + 1);
        }
      }
		localVertices=vertices;  // to lazy to replace everywhere
		localIndices=indices;
	}
	
	var localNormals=[];
		console.log(localVertices);
		for (var i =0;i<localIndices.length;i+=3)
		{
			var vertex1=vec3(localVertices[6*localIndices[i]],localVertices[6*localIndices[i]+1],localVertices[6*localIndices[i]+2]);
			// console.log(6*localIndices[i]);
			// console.log('ok');
			var vertex2=vec3(localVertices[6*localIndices[i+1]],localVertices[6*localIndices[i+1]+1],localVertices[6*localIndices[i+1]+2]);
			// console.log(6*localIndices[i+1]);
			// console.log('ok');
			// console.log("vertex2= "+vertex2)
			var vertex3=vec3(localVertices[6*localIndices[i+2]],localVertices[6*localIndices[i+2]+1],localVertices[6*localIndices[i+2]+2]);
			// console.log(6*localIndices[i+2]);
			// console.log('ok');
			// console.log(localVertices);
			var normal = calculateNormal(vertex1,vertex2,vertex3);
			// localNormals.push(normal);
			// localNormals.push(normal);
			// localNormals.push(normal);

			localNormals[ localIndices[i] ] =  normal;
			localNormals[ localIndices[i] ][3] =  0.0;

			localNormals[ localIndices[i+1] ] =  normal;
			localNormals[ localIndices[i+1] ][3] =  0.0;

			localNormals[ localIndices[i+2] ] =  normal;
			localNormals[ localIndices[i+2] ][3] =  0.0;
		
		}
		console.log(localNormals);
		console.log(localVertices);
		console.log(localIndices);
	var object = {
  vertices: localVertices,
  indices: localIndices,
  normals: localNormals,
  angle: [0,0,0],  // time(miliseconds)/1000 * times *2pi 
  identityMatrix: identityMatrix,
  xRotationMatrix: xRotationMatrix,
  yRotationMatrix: yRotationMatrix,
  zRotationMatrix: zRotationMatrix,
  x:0,											
  y:0,
  z:0,
  sx:1,
  sy:1,
  sz:1,
  rx:0,
  ry:0,
  rz:0,
  rotate: function(){
	mat4.identity(translateMatrix);					
	mat4.identity(scaleMatrix);
	translateMatrix[12]=this.x;
	translateMatrix[13]=this.y;
	translateMatrix[14]=this.z;
	
	scaleMatrix[0]=this.sx;
	scaleMatrix[5]=this.sy;
	scaleMatrix[10]=this.sz;
		
		this.angle[0]= this.angle[0]+this.rx;
		this.angle[1]= this.angle[1]+this.ry;
		this.angle[2]= this.angle[2]+this.rz;
		//this.angle[2]= this.rz*performance.now() / 1000 / 5 * Math.PI;
		mat4.rotate(zRotationMatrix, identityMatrix, this.angle[2], [0, 0, 1]);
		mat4.rotate(yRotationMatrix, identityMatrix, this.angle[1], [0, 1, 0]);
		mat4.rotate(xRotationMatrix, identityMatrix, this.angle[0], [1, 0, 0]);

		mat4.mul(worldMatrix,identityMatrix,xRotationMatrix);// 
		mat4.mul(worldMatrix,worldMatrix,yRotationMatrix);// 
		mat4.mul(worldMatrix,worldMatrix,zRotationMatrix);// 

		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		gl.uniformMatrix4fv(mattransUniformLocation, gl.FALSE, translateMatrix);
		gl.uniformMatrix4fv(matscaleUniformLocation, gl.FALSE, scaleMatrix);
	  return;
  }
};
	objects.push(object);
	document.getElementById('NrElem').innerHTML="Nr of elements: "+objects.length;// updates the field where is nr of elements	
};

var InitDemo = function () {

	var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);
	
    var diffuseProduct2 = mult(lightDiffuse2, materialDiffuse);
    var specularProduct2 = mult(lightSpecular2, materialSpecular);
	
    var diffuseProduct3 = mult(lightDiffuse3, materialDiffuse);
    var specularProduct3 = mult(lightSpecular3, materialSpecular);
	
	console.log('This is working');

	var canvas = document.getElementById('game-surface');
	gl = canvas.getContext('webgl');

	if (!gl) {
		console.log('WebGL not supported, falling back on experimental-webgl');
		gl = canvas.getContext('experimental-webgl');
	}
	if (!gl) {
		alert('Your browser does not support WebGL');
	}

	gl.clearColor(0, 0, 0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
	//
	// Create shaders
	// 
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);

	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}

	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
		return;
	}

	 program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error('ERROR linking program!', gl.getProgramInfoLog(program));
		return;
	}
	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error('ERROR validating program!', gl.getProgramInfoLog(program));
		return;
	}

	//
	// Create buffer
	//
	
	var pyramid_onx=2.0;
	var pyramid_ony=0.5;
	var pyramid_onz=0.0;
	pyramid_ony;
	pyramid_onz;
	var pyramidVertices=
	[
			//tetra pyramid
			// without dot 3
		 0.0+pyramid_onx,  0.5+pyramid_ony,  0.0+pyramid_onz,      0.5, 0.0, 0.0,  // vertd[0]
         0.2+pyramid_onx,  -0.7+pyramid_ony,  0.5+pyramid_onz,      0.5, 0.0, 0.0, // vertst[1]    all red
          0.5+pyramid_onx,  0.0+pyramid_ony,  0.5+pyramid_onz,       0.5, 0.0, 0.0,// vertdr[2]  
          	//without dot 2
           0.0+pyramid_onx,  0.5+pyramid_ony,  0.0+pyramid_onz,     0.0, 0.5, 0.0, // vertd[0]
          0.2+pyramid_onx,  -0.7+pyramid_ony,  0.5+pyramid_onz,      0.0, 0.5, 0.0, // vertst[1]  all green
       	  0.0+pyramid_onx,  0.0+pyramid_ony,  -0.5+pyramid_onz,        0.0, 0.5, 0.0, // vertc[3]
       	  //without dot 1
       	   0.0+pyramid_onx,  0.5+pyramid_ony,  0.0+pyramid_onz,     0.0, 0.0, 0.5,  // vertd[0]
       	   0.5+pyramid_onx,  0.0+pyramid_ony,  0.5+pyramid_onz,      0.0, 0.0, 0.5,// vertdr[2]  all blue
       	   0.0+pyramid_onx,  0.0+pyramid_ony,  -0.5+pyramid_onz,       0.0, 0.0, 0.5,// vertc[3]

       	  0.2+pyramid_onx,  -0.7+pyramid_ony,  0.5+pyramid_onz,      0.5, 0.5, 0.5, // vertst[1]    
          0.5+pyramid_onx,  0.0+pyramid_ony,  0.5+pyramid_onz,       0.5, 0.5, 0.5,// vertdr[2] 		all grey
         0.0+pyramid_onx,  0.0+pyramid_ony,  -0.5+pyramid_onz,        0.5, 0.5, 0.5 // vertc[3]
	];
	var boxVertices = 
	[ // X, Y, Z           R, G, B
		// Top
		-1.0, 1.0, -1.0,   0.5, 0.5, 0.5,
		-1.0, 1.0, 1.0,    0.5, 0.5, 0.5,
		1.0, 1.0, 1.0,     0.5, 0.5, 0.5,
		1.0, 1.0, -1.0,    0.5, 0.5, 0.5,

		// Left
		-1.0, 1.0, 1.0,    0.75, 0.25, 0.5,
		-1.0, -1.0, 1.0,   0.75, 0.25, 0.5,
		-1.0, -1.0, -1.0,  0.75, 0.25, 0.5,
		-1.0, 1.0, -1.0,   0.75, 0.25, 0.5,

		// Right
		1.0, 1.0, 1.0,    0.25, 0.25, 0.75,
		1.0, -1.0, 1.0,   0.25, 0.25, 0.75,
		1.0, -1.0, -1.0,  0.25, 0.25, 0.75,
		1.0, 1.0, -1.0,   0.25, 0.25, 0.75,

		// Front
		1.0, 1.0, 1.0,    1.0, 0.0, 0.15,
		1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
		-1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
		-1.0, 1.0, 1.0,    1.0, 0.0, 0.15,

		// Back
		1.0, 1.0, -1.0,    0.0, 1.0, 0.15,
		1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
		-1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
		-1.0, 1.0, -1.0,    0.0, 1.0, 0.15,

		// Bottom
		-1.0, -1.0, -1.0,   0.5, 0.5, 1.0,
		-1.0, -1.0, 1.0,    0.5, 0.5, 1.0,
		1.0, -1.0, 1.0,     0.5, 0.5, 1.0,
		1.0, -1.0, -1.0,    0.5, 0.5, 1.0,
	];
	
//	var offset=boxVertices.length/6;
	
	var pyramidIndices=
	[
			0,1,2, 
			3,4,5,  //
			6,7,8,
			9,10,11
	];
	var boxIndices =
	[
		// Top
		0, 1, 2,
		0, 2, 3,

		// Left
		5, 4, 6,
		6, 4, 7,

		// Right
		8, 9, 10,
		8, 10, 11,

		// Front
		13, 12, 14,
		15, 14, 12,

		// Back
		16, 17, 18,
		16, 18, 19,

		// Bottom
		21, 20, 22,
		22, 20, 23
	];
	
	/*create('sphere',1.0,100);*/
	// Tell OpenGL state machine which program should be active.
	gl.useProgram(program);

	 matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
	 matViewUniformLocation = gl.getUniformLocation(program, 'mView');
	 matProjUniformLocation = gl.getUniformLocation(program, 'mProj');
	 mattransUniformLocation = gl.getUniformLocation(program, 'trans');
	 matscaleUniformLocation = gl.getUniformLocation(program, 'scale');
	 normalMatrixLoc = gl.getUniformLocation( program, 'normalMatrix1' );
	 mat4.identity(worldMatrix);

	gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
	gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
	gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
	gl.uniformMatrix4fv(mattransUniformLocation, gl.FALSE, translateMatrix);
	gl.uniformMatrix4fv(matscaleUniformLocation, gl.FALSE, scaleMatrix);

	gl.uniform4fv( gl.getUniformLocation(program,
       "ambientProduct"),flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "diffuseProduct"),flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "specularProduct"),flatten(specularProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "lightPosition"),flatten(lightPosition) );
    gl.uniform1f( gl.getUniformLocation(program,
      "shininess"),materialShininess );
	   
    gl.uniform4fv( gl.getUniformLocation(program,
       "diffuseProduct2"),flatten(diffuseProduct2) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "specularProduct2"),flatten(specularProduct2) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "lightPosition2"),flatten(lightPosition) );

	gl.uniform4fv( gl.getUniformLocation(program,
       "diffuseProduct3"),flatten(diffuseProduct3) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "specularProduct3"),flatten(specularProduct3) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "lightPosition3"),flatten(lightPosition) );
	//
	// Main render loop
	//

	mat4.identity(identityMatrix);
	var angle = 0;
	var boxVertexBufferObject
	document.addEventListener('keypress',translate,false);
	var loop = function () {
		
	gl.clearColor(0, 0,0, 1);
	gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
		
	var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);
	
//	var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct2 = mult(lightDiffuse2, materialDiffuse);
    var specularProduct2 = mult(lightSpecular2, materialSpecular);
	
//	var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct3 = mult(lightDiffuse3, materialDiffuse);
    var specularProduct3 = mult(lightSpecular3, materialSpecular);
	
    viewMatrix = lookAt(eye, at , up);
    projMatrix = perspective(fovy, aspect, near, far);
	normalMatrix1 = [
        vec3(viewMatrix[0][0], viewMatrix[0][1], viewMatrix[0][2]),
        vec3(viewMatrix[1][0], viewMatrix[1][1], viewMatrix[1][2]),
        vec3(viewMatrix[2][0], viewMatrix[2][1], viewMatrix[2][2])
    ];
    gl.uniformMatrix4fv( matViewUniformLocation, false, flatten(viewMatrix) );
    gl.uniformMatrix4fv( matProjUniformLocation, false, flatten(projMatrix) );
	gl.uniformMatrix3fv( normalMatrixLoc, false, flatten(normalMatrix1) );	
		for (i =0; i < objects.length;i++)
		{	
		objects[i].rotate();
		
	var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer);

    gl.bufferData( gl.ARRAY_BUFFER, flatten(objects[i].normals), gl.STATIC_DRAW );
	var vNormal = gl.getAttribLocation( program, "vNormal" );

    gl.vertexAttribPointer( vNormal, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal);
   
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, objects[i].vertices, gl.STATIC_DRAW);
	
	var vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 6* Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(vPosition);
	
	var boxIndexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objects[i].vertices), gl.STATIC_DRAW);

	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(objects[i].indices), gl.STATIC_DRAW);
	
	gl.drawElements(gl.TRIANGLES, objects[i].indices.length, gl.UNSIGNED_SHORT, 0);
	}
		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
};