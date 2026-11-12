import * as THREE from 'three';
export function createOrganicGrassTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#3f6a28';
    ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 16000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const w = 1 + Math.random() * 2;
      const h = 3 + Math.random() * 6;
      const shade = Math.random();
      const darkShade = shade > 0.3 ? '#355c20' : '#2a4b18';
      ctx.fillStyle = shade > 0.65 ? '#528735' : darkShade;
      ctx.fillRect(x, y, w, h);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(36, 36);
  texture.anisotropy = 4;
  return texture;
}

export function createStoneTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#64748b';
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 4500; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.07)' : 'rgba(15,23,42,0.12)';
      ctx.fillRect(x, y, 3, 3);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}
