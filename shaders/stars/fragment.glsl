

// void main() 
// {
//     float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
//     float strength = 0.05 / distanceToCenter - 0.1;

//     gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
// }

// uniform float time;
// uniform vec2 resolution;

// void main() {
//     vec2 uv = gl_FragCoord.xy / resolution.xy;
//     float brightness = 0.5 + 0.5 * sin(uv.x * uv.y + time);
//     gl_FragColor = vec4(vec3(0.2, 0.6, brightness), 1.0); // Adjust RGB values for desired shade of blue
// }

uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;

attribute float aScale;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(uTime + modelPosition.x * 100.0) * aScale * 0.2;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
    
    gl_PointSize = uSize * aScale * uPixelRatio;
    gl_PointSize *= (1.0 / - viewPosition.z);
}
