import fs from 'fs';
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ffmpegExe = path.join(__dirname, 'ffmpeg.cmd');
const rawDir = path.join(__dirname, '..', 'Raw_Video');
const outDir = path.join(__dirname, '..', 'public', 'videos');
const posterDir = path.join(__dirname, '..', 'public', 'images');

const inPath = path.join(rawDir, 'applying-express-delivery-label-to-shipping-box-2026-09-17-15-49-50-utc.mov');
const outPath = path.join(outDir, 'tiktok-express-label.mp4');
const posterPath = path.join(posterDir, 'tiktok-express-label-poster.jpg');

const args = [
  '-y',
  '-i', inPath,
  '-vf', 'setparams=color_trc=bt709:colorspace=bt709:color_primaries=bt709,scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,eq=contrast=1.16:brightness=-0.02:saturation=1.14,format=yuv420p',
  '-c:v', 'libx264',
  '-crf', '22',
  '-preset', 'veryfast',
  '-movflags', '+faststart',
  '-an',
  outPath
];

const res = spawnSync(ffmpegExe, args, { stdio: 'inherit', shell: true });
if (res.status === 0) {
  spawnSync(ffmpegExe, ['-y', '-ss', '00:00:02.000', '-i', outPath, '-vframes', '1', '-q:v', '2', posterPath], { stdio: 'ignore', shell: true });
  console.log('SUCCESS! Encoded tiktok-express-label.mp4');
} else {
  console.error('Failed with exit code:', res.status);
}
