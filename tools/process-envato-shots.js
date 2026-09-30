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

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(posterDir)) fs.mkdirSync(posterDir, { recursive: true });

const envatoJobs = [
  {
    name: 'Luxury Wax Seal Unboxing',
    input: 'hands-sealing-brown-paper-package-with-pink-wax-2026-09-16-01-23-01-utc.mov',
    output: 'luxury-wax-seal-unboxing.mp4',
    poster: 'luxury-wax-seal-poster.jpg',
    seek: '2',
    duration: '14',
    filters: 'scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,eq=contrast=1.16:brightness=-0.02:saturation=1.15',
    posterSeek: '00:00:03.000',
  },
  {
    name: 'Apparel Folding & Kitting',
    input: 'young-adult-folding-clothes-in-a-small-warehouse-2026-09-17-09-12-55-utc.mov',
    output: 'apparel-folding-warehouse.mp4',
    poster: 'apparel-folding-poster.jpg',
    seek: '0',
    duration: '14',
    filters: 'scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,eq=contrast=1.15:brightness=-0.02:saturation=1.12',
    posterSeek: '00:00:02.000',
  },
  {
    name: 'Cosmetics Serum Dropper Bottle',
    input: 'pink-serum-dropper-bottle-liquid-being-dispensed-2026-09-18-05-20-44-utc.mov',
    output: 'cosmetics-serum-dropper.mp4',
    poster: 'cosmetics-serum-poster.jpg',
    seek: '0',
    duration: '8.0',
    filters: 'scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,eq=contrast=1.15:brightness=-0.02:saturation=1.14',
    posterSeek: '00:00:02.000',
  },
  {
    name: 'Express Delivery Labeling',
    input: 'applying-express-delivery-label-to-shipping-box-2026-09-17-15-49-50-utc.mov',
    output: 'tiktok-express-label.mp4',
    poster: 'tiktok-express-label-poster.jpg',
    seek: '0',
    duration: '10.8',
    filters: 'scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,eq=contrast=1.16:brightness=-0.02:saturation=1.14',
    posterSeek: '00:00:02.000',
  },
  {
    name: 'Semi Truck Loading Dock Aerial',
    input: 'semi-truck-parked-at-warehouse-loading-dock-aerial-2026-09-16-09-54-56-utc.mov',
    output: 'semi-truck-loading-dock.mp4',
    poster: 'semi-truck-loading-dock-poster.jpg',
    seek: '0',
    duration: '14',
    filters: 'scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,eq=contrast=1.18:brightness=-0.03:saturation=1.15',
    posterSeek: '00:00:02.000',
  },
];

console.log('🚀 ENCODING ENVATO BROADCAST FOOTAGE INTO STARSHIPP PRODUCTION ASSETS...');

for (const job of envatoJobs) {
  const inPath = path.join(rawDir, job.input);
  const outPath = path.join(outDir, job.output);
  const posterPath = path.join(posterDir, job.poster);

  console.log(`\n🎬 [${job.name}] Processing ${job.output}...`);
  const t0 = Date.now();

  const args = [
    '-y',
    '-ss', job.seek,
    '-t', job.duration,
    '-i', inPath,
    '-vf', job.filters,
    '-c:v', 'libx264',
    '-crf', '22',
    '-preset', 'veryfast',
    '-movflags', '+faststart',
    '-an',
    outPath
  ];

  const res = spawnSync(ffmpegExe, args, { stdio: 'inherit', shell: true });
  if (res.status !== 0) {
    console.error(`❌ Failed to encode ${job.output}`);
    continue;
  }

  // Generate poster frame
  spawnSync(ffmpegExe, ['-y', '-ss', job.posterSeek, '-i', outPath, '-vframes', '1', '-q:v', '2', posterPath], { stdio: 'ignore', shell: true });

  const sizeMb = (fs.statSync(outPath).size / (1024 * 1024)).toFixed(2);
  const durationSec = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`✅ [${job.name}] Rendered in ${durationSec}s | Size: ${sizeMb} MB | Poster: ${job.poster}`);
}

console.log('\n🎉 ALL 5 ENVATO BROADCAST ASSETS READY FOR DEPLOYMENT!');
