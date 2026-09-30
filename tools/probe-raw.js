import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

for (const dirName of ['public/videos', 'Raw_Video']) {
  const dir = path.join(__dirname, '..', dirName);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mov') || f.endsWith('.mp4') || f.endsWith('.webm'));

  console.log(`\n=== FOLDER: ${dirName} ===`);
  for (const file of files) {
    const filePath = path.join(dir, file);
    try {
      const probe = execSync(`tools\\ffprobe.cmd -v error -select_streams v:0 -show_entries stream=width,height,codec_name,r_frame_rate,duration,display_aspect_ratio,sample_aspect_ratio -of csv=p=0 "${filePath}"`).toString().trim();
      const stats = fs.statSync(filePath);
      const sizeMb = (stats.size / (1024 * 1024)).toFixed(1);
      console.log(`${file} | ${sizeMb} MB | ${probe}`);
    } catch (err) {
      console.error(`Failed on ${file}:`, err.message);
    }
  }
}
