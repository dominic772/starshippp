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

const jobs = [
  {
    input: 'automated-warehouse-aisle-flythrough-with-organize-2026-09-18-00-36-08-utc.mov',
    output: 'warehouse-flythrough.mp4',
    poster: 'warehouse-flythrough-poster.jpg',
    filters: 'scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,eq=contrast=1.16:brightness=-0.02:saturation=1.14',
    seek: '0',
    duration: '14',
  },
  {
    input: 'cargo-ship-on-the-ocean-digital-futuristic-interfa-2026-09-16-08-30-49-utc.mov',
    output: 'freight-ocean-digital.mp4',
    poster: 'freight-ocean-poster.jpg',
    filters: 'scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,eq=contrast=1.18:brightness=-0.03:saturation=1.15',
    seek: '0',
    duration: '10',
  },
  {
    input: 'scanning-packages-for-shipment-in-office-2026-09-17-16-13-15-utc.mov',
    output: 'package-scan-dispatch.mp4',
    poster: 'package-scan-poster.jpg',
    filters: 'scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,eq=contrast=1.14:brightness=-0.01:saturation=1.12',
    seek: '0',
    duration: '8.3',
  },
  {
    input: 'adult-using-tablet-in-warehouse-2026-09-17-12-29-55-utc.mov',
    output: 'tablet-warehouse.mp4',
    poster: 'tablet-warehouse-poster.jpg',
    filters: 'scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,eq=contrast=1.15:brightness=-0.02:saturation=1.12',
    seek: '0',
    duration: '5.3',
  },
  {
    input: 'warehouse-workers-pulling-pallet-of-boxes-in-a-lar-2026-09-16-03-51-48-utc.mov',
    output: 'warehouse-pallet-pull.mp4',
    poster: 'warehouse-pallet-poster.jpg',
    filters: 'scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,eq=contrast=1.16:brightness=-0.02:saturation=1.14',
    seek: '0',
    duration: '13.4',
  }
];

console.log('🚀 STARTING HIGH-PERFORMANCE VIDEO ENCODING PIPELINE...');

for (const job of jobs) {
  const inPath = path.join(rawDir, job.input);
  const outPath = path.join(outDir, job.output);
  const posterPath = path.join(posterDir, job.poster);

  if (fs.existsSync(outPath) && fs.existsSync(posterPath) && !process.env.FORCE) {
    console.log(`⏭️ Skipping ${job.output} (already encoded)`);
    continue;
  }

  console.log(`\n🎬 Processing: ${job.output}...`);
  const t0 = Date.now();

  // 1. Encode MP4 (H.264, +faststart, 60fps capable, CRF 22, veryfast)
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

  // 2. Generate high-res poster frame at 1s mark
  const posterArgs = [
    '-y',
    '-ss', '00:00:01.000',
    '-i', outPath,
    '-vframes', '1',
    '-q:v', '2',
    posterPath
  ];
  spawnSync(ffmpegExe, posterArgs, { stdio: 'ignore', shell: true });

  const sizeMb = (fs.statSync(outPath).size / (1024 * 1024)).toFixed(2);
  const durationSec = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`✅ Finished ${job.output} in ${durationSec}s | Size: ${sizeMb} MB | Poster created: ${job.poster}`);
}

// Auto-discover any other clips dropped into Raw_Video (e.g. from Envato)
const allRawFiles = fs.readdirSync(rawDir).filter(f => (f.endsWith('.mov') || f.endsWith('.mp4')) && !f.includes('(1)'));
const handledInputs = new Set(jobs.map(j => j.input));

for (const rawFile of allRawFiles) {
  if (handledInputs.has(rawFile)) continue;
  
  const baseName = path.basename(rawFile, path.extname(rawFile))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
    
  const outName = `${baseName}.mp4`;
  const posterName = `${baseName}-poster.jpg`;
  const inPath = path.join(rawDir, rawFile);
  const outPath = path.join(outDir, outName);
  const posterPath = path.join(posterDir, posterName);

  if (fs.existsSync(outPath) && fs.existsSync(posterPath) && !process.env.FORCE) {
    console.log(`⏭️ Skipping auto-discovered ${outName} (already encoded)`);
    continue;
  }

  console.log(`\n🎬 Auto-Processing Envato raw asset: ${rawFile} -> ${outName}...`);
  const t0 = Date.now();

  const args = [
    '-y',
    '-i', inPath,
    '-vf', 'scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,eq=contrast=1.16:brightness=-0.02:saturation=1.14',
    '-c:v', 'libx264',
    '-crf', '22',
    '-preset', 'veryfast',
    '-movflags', '+faststart',
    '-an',
    outPath
  ];

  const res = spawnSync(ffmpegExe, args, { stdio: 'inherit', shell: true });
  if (res.status === 0) {
    spawnSync(ffmpegExe, ['-y', '-ss', '00:00:01.000', '-i', outPath, '-vframes', '1', '-q:v', '2', posterPath], { stdio: 'ignore', shell: true });
    const sizeMb = (fs.statSync(outPath).size / (1024 * 1024)).toFixed(2);
    const durationSec = ((Date.now() - t0) / 1000).toFixed(1);
    console.log(`✅ Finished ${outName} in ${durationSec}s | Size: ${sizeMb} MB | Poster created: ${posterName}`);
  }
}

console.log('\n🎉 ALL VIDEO ASSETS COMPILED & READY FOR PRODUCTION!');
