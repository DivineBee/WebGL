"use strict";

function main() {

  // Get A WebGL context
  /** @type {HTMLCanvasElement} */
console.log('This is working');

  var canvas = document.getElementById('canvas');
  var gl = canvas.getContext('webgl');

  if (!gl) {
    console.log('WebGL not supported, falling back on experimental-webgl');
    gl = canvas.getContext('experimental-webgl');
  }

  if (!gl) {
    alert('Your browser does not support WebGL');
  }

  gl.clearColor(0.1, 0.1, 0.3, 1);//clears up background color and sets up new one

  var createFlattenedVertices = function(gl, vertices) {
    return webglUtils.createBufferInfoFromArrays(
        gl,
        primitives.makeRandomVertexColors(
            primitives.deindexVertices(vertices),
            {
              vertsPerColor: 6,
              rand: function(ndx, channel) {
                return channel < 3 ? ((128 + Math.random() * 128) | 0) : 255;
              }

            })
      );
  };
//in primitives js, are stored functions for creating objects
  var sphereBufferInfo = createFlattenedVertices(gl, primitives.createSphereVertices(10,20, 20, 6));
  var cubeBufferInfo   = createFlattenedVertices(gl, primitives.createCubeVertices(20));
  var coneBufferInfo   = createFlattenedVertices(gl, primitives.createTruncatedConeVertices(10, 0, 25, 12, 1, true, false));

  // setup GLSL program
  var programInfo = webglUtils.createProgramInfo(gl, ["3d-vertex-shader", "3d-fragment-shader"]);

  function degToRad(d) {
    return d * Math.PI / 180;
  }

  var cameraAngleRadians = degToRad(0);
  var fieldOfViewRadians = degToRad(60);
  var cameraHeight = 50;

  // Uniforms for each object.
  var sphereUniforms = {
    u_colorMult: [0.8, 0.2, 0.9, 1],
    u_matrix: m4.identity(),
  };
  var cubeUniforms = {
    u_colorMult: [0.2, 0.8, 0.9, 1],
    u_matrix: m4.identity(),
  };
  var coneUniforms = {
    u_colorMult: [0.5, 0.5, 1, 1],
    u_matrix: m4.identity(),
  };
  var sphereTranslation = [  0, 0, 0];
  var cubeTranslation   = [-40, 0, 0];
  var coneTranslation   = [ 40, 0, 0];

  function computeMatrix(viewProjectionMatrix, translation, xRotation, yRotation) {
    var matrix = m4.translate(viewProjectionMatrix,
        translation[0],
        translation[1],
        translation[2]);
    matrix = m4.xRotate(matrix, xRotation);
    return m4.yRotate(matrix, yRotation);
  }

  requestAnimationFrame(drawScene);

  // Draw the scene.
  function drawScene(time) {
    time *= 0.0005; //rotating speed

    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    //viewport specifies transformation of x and y from normalized device coordinates to window coordinates
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.enable(gl.CULL_FACE); //specifies front or back face of polygon
    gl.enable(gl.DEPTH_TEST); //depth

    // Clear the canvas AND the depth buffer.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Compute the projection matrix
    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var projectionMatrix =
        m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

    // Compute the camera's matrix using look at.
    var cameraPosition = [0, 0, 100];
    var target = [0, 0, 0];
    var up = [0, 1, 0];
    var cameraMatrix = m4.lookAt(cameraPosition, target, up);

    // Make a view matrix from the camera matrix.
    var viewMatrix = m4.inverse(cameraMatrix);

    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
//changing rotation
    var sphereXRotation =  0.2;
    var sphereYRotation =  time;
    var cubeXRotation   =  0.2;
    var cubeYRotation   =  time;
    var coneXRotation   =  -0.2;
    var coneYRotation   =  time; //to reverse can write -time

    // ------ Draw the sphere --------

    gl.useProgram(programInfo.program);

    // Setup all the needed attributes.
    webglUtils.setBuffersAndAttributes(gl, programInfo, sphereBufferInfo);

    sphereUniforms.u_matrix = computeMatrix(
        viewProjectionMatrix,
        sphereTranslation,
        sphereXRotation,
        sphereYRotation);

    // Set the uniforms we just computed
    webglUtils.setUniforms(programInfo, sphereUniforms);

    gl.drawArrays(gl.TRIANGLES, 0, sphereBufferInfo.numElements);

    // ------ Draw the cube --------

    // Setup all the needed attributes.
    webglUtils.setBuffersAndAttributes(gl, programInfo, cubeBufferInfo);

    cubeUniforms.u_matrix = computeMatrix(
        viewProjectionMatrix,
        cubeTranslation,
        cubeXRotation,
        cubeYRotation);

    // Set the uniforms we just computed
    webglUtils.setUniforms(programInfo, cubeUniforms);

    gl.drawArrays(gl.TRIANGLES, 0, cubeBufferInfo.numElements);

    // ------ Draw the cone --------

    // Setup all the needed attributes.
    webglUtils.setBuffersAndAttributes(gl, programInfo, coneBufferInfo);

    coneUniforms.u_matrix = computeMatrix(
        viewProjectionMatrix,
        coneTranslation,
        coneXRotation,
        coneYRotation);

    // Set the uniforms we just computed
    webglUtils.setUniforms(programInfo, coneUniforms);

    gl.drawArrays(gl.TRIANGLES, 0, coneBufferInfo.numElements);

    requestAnimationFrame(drawScene);
  }
}

main();

