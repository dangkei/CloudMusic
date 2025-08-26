import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import * as mm from "music-metadata";

dotenv.config();

const client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});

const bucket = process.env.R2_BUCKET_NAME;
const publicBase = process.env.R2_PUBLIC_URL;

const audioDir = "./audio";
const imageDir = "./images";
const lyricDir = "./lyrics";

const songs = [];

/**
 * 检查对象是否已存在 (用于增量上传)
 */
async function existsInR2(key) {
  try {
    await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    return true;
  } catch {
    return false;
  }
}

/**
 * 上传文件
 */
async function uploadFile(localPath, key, contentType) {
  if (await existsInR2(key)) {
    console.log(`⏩ 跳过已存在: ${key}`);
    return;
  }

  const fileStream = fs.createReadStream(localPath);
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: fileStream,
      ContentType: contentType,
    })
  );
  console.log(`✅ 上传成功: ${key}`);
}

/**
 * 主函数
 */
async function main() {
  const audioFiles = fs.readdirSync(audioDir).filter(f => f.endsWith(".mp3"));

  for (const file of audioFiles) {
    const id = path.parse(file).name.replace("song", ""); // 假设 song1.mp3 => id = 1
    const audioPath = path.join(audioDir, file);
    const imagePath = path.join(imageDir, `song${id}.jpeg`);
    const lyricPath = path.join(lyricDir, `song${id}.lrc`);

    // 解析 mp3 时长
    let duration = 0;
    try {
      const metadata = await mm.parseFile(audioPath);
      duration = Math.floor(metadata.format.duration || 0);
    } catch {
      console.warn(`⚠️ 解析时长失败: ${file}`);
    }

    // 上传音频
    await uploadFile(audioPath, `audio/${file}`, "audio/mpeg");

    // 上传封面
    if (fs.existsSync(imagePath)) {
      await uploadFile(imagePath, `images/song${id}.jpeg`, "image/jpeg");
    }

    // 上传歌词
    if (fs.existsSync(lyricPath)) {
      await uploadFile(lyricPath, `lyrics/song${id}.lrc`, "text/plain");
    }

    // 生成歌曲信息
    songs.push({
      id: Number(id),
      title: `Song ${id}`,
      artist: `Artist ${id}`,
      image: `${publicBase}/images/song${id}.jpeg`,
      audio: `${publicBase}/audio/song${id}.mp3`,
      lyric: `${publicBase}/lyrics/song${id}.lrc`,
      duration,
    });
  }

  // 生成 songs.json
  fs.writeFileSync("songs.json", JSON.stringify(songs, null, 2), "utf-8");
  console.log("📄 已生成 songs.json");

  // 上传 songs.json
  await uploadFile("songs.json", "songs.json", "application/json");
  console.log("✅ 已上传 songs.json");
}

main().catch(console.error);
