type BuildCommandParams = {
  videoInputs: string;
  audioInput: string;
  filters: string;
  outputPath: string;
  audioIndex: number;
  duration: number;
};

export const buildFFmpegCommand = ({
  videoInputs,
  audioInput,
  filters,
  outputPath,
  audioIndex,
  duration,
}: BuildCommandParams) =>
  `
  ${videoInputs} ${audioInput}
  -filter_complex "${filters}"
  -map "[v]"
  -map ${audioIndex}:a
  -t ${duration}
  -preset ultrafast
  -r 30
  -tune film
  -c:v libx264
  -c:a aac
  -b:a 192k
  -movflags +faststart
  "${outputPath}"
`.replace(/\s+/g, ' ');
