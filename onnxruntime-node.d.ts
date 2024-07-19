// declare module 'onnxruntime-node' {
//   // Tensor types
//   export type TensorType =
//     | 'float32'
//     | 'uint8'
//     | 'int8'
//     | 'uint16'
//     | 'int16'
//     | 'int32'
//     | 'int64'
//     | 'string'
//     | 'bool'
//     | 'float16'
//     | 'float64'
//     | 'uint32'
//     | 'uint64';

//   // Tensor class
//   export class Tensor<T extends TensorType> {
//     constructor(type: T, data: number[] | Float32Array | Uint8Array | Int8Array | Uint16Array | Int16Array | Int32Array | BigInt64Array | string[], dims: number[]);
//     readonly data: number[] | Float32Array | Uint8Array | Int8Array | Uint16Array | Int16Array | Int32Array | BigInt64Array | string[];
//     readonly type: T;
//     readonly dims: number[];
//   }

//   // Session class
//   export class InferenceSession {
//     static create(path: string, options?: InferenceSession.SessionOptions): Promise<InferenceSession>;
//     run(feeds: { [name: string]: Tensor<TensorType> }, fetches?: string[]): Promise<{ [name: string]: Tensor<TensorType> }>;
//   }

//   // Session options
//   export namespace InferenceSession {
//     export interface SessionOptions {
//       executionProviders?: ('cpu' | 'cuda' | 'tensorrt')[];
//       graphOptimizationLevel?: 'disabled' | 'basic' | 'extended' | 'all';
//       enableCpuMemArena?: boolean;
//       enableMemPattern?: boolean;
//       logSeverityLevel?: 0 | 1 | 2 | 3 | 4;
//     }
//   }

//   // Error handling
//   export class OrtError extends Error {
//     constructor(message: string);
//   }
// }
