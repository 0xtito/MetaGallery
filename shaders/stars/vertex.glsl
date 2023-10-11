// uniform float uPixelRatio;
// uniform float uSize;

// attribute float aScale;


// void main() 
// {
//     vec4 modelPosition = modelMatrix * vec4(position,1.0);
//     vec4 viewPosition = viewMatrix * modelPosition;
//     vec4 projectionPosition = projectionMatrix * viewPosition;

//     gl_Position = projectionPosition;

//    gl_PointSize = uSize * aScale * uPixelRatio;
//    gl_PointSize *= (1.0 / -viewPosition.z);
//}

// precision mediump float;

// void main() {
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     float distance = abs(gl_Position.z);
//     gl_PointSize = 75.0 * (1.0 / distance); // Adjust this formula as needed
// }
