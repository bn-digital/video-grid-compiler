export type CompileGridVideoParams = {
  videoUris: string[];
  audioUri: string;
};

export type CompileGridVideoOutput = {
  path: string;
  duration: number;
  size: number;
  createdTime: number;
};

export type CompileGridVideoResult = CompileGridVideoOutput | null;
