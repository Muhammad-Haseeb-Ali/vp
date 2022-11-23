const fs = require('fs')

const CHUNK_SIZE_IN_BYTES = 1000000; // 1 mb

function getVideoStream(req, res) {
  const range = req.headers.range,
        videoId = req.query.id,
        videoType = req.query.type,
        videoPath = `../../videos/${videoId}/${videoType}.mp4`;


  if(!fs.existsSync(videoPath)){
    console.log('video is not exist')
    return res.status(404).send("Video file is not exist");
  }

  if (!range) {
    console.log('range is not define')
    return res.status(400).send("Rang must be provided");
  }

  const videoSizeInBytes = fs.statSync(videoPath).size;

  const chunkStart = Number(range.replace(/\D/g, ""));

  const chunkEnd = Math.min(
    chunkStart + CHUNK_SIZE_IN_BYTES,
    videoSizeInBytes - 1
  );

  const contentLength = chunkEnd - chunkStart + 1;

  const headers = {
    "Content-Range": `bytes ${chunkStart}-${chunkEnd}/${videoSizeInBytes}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, {
    start: chunkStart,
    end: chunkEnd,
  });

  videoStream.pipe(res);
}


export default function handler(req, res){
    return getVideoStream(req, res);
}
