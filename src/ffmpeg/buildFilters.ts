export const buildFFmpegFilters = (duration: number) =>
  `
  [0:v]trim=duration=${duration},setpts=PTS-STARTPTS,scale=360:640:force_original_aspect_ratio=increase,crop=360:640,setsar=1[v0];
  [1:v]trim=duration=${duration},setpts=PTS-STARTPTS,scale=360:640:force_original_aspect_ratio=increase,crop=360:640,setsar=1[v1];
  [2:v]trim=duration=${duration},setpts=PTS-STARTPTS,scale=360:640:force_original_aspect_ratio=increase,crop=360:640,setsar=1[v2];
  [3:v]trim=duration=${duration},setpts=PTS-STARTPTS,scale=360:640:force_original_aspect_ratio=increase,crop=360:640,setsar=1[v3];
  [v0][v1][v2][v3]xstack=inputs=4:layout=0_0|360_0|0_640|360_640[v]
`.replace(/\s+/g, ' ');
