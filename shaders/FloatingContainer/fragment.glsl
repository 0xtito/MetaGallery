varying vec2 vUv;
uniform vec3 uColor;

void main() {
    gl_FragColor = vec4(uColor, 0.5); // 50% transparency
}