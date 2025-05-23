import { z } from 'zod';

export const ContainerAnalysisRequest = z.object({
  image: z.string().min(1)
});

export const SBOMResult = z.object({
  imageName: z.string(),
  baseImage: z.string(),
  layers: z.array(z.object({
    layerId: z.string(),
    packages: z.array(z.object({
      name: z.string(),
      version: z.string(),
      type: z.string(),
    })),
  })),
  metadata: z.object({
    envVars: z.record(z.string()),
    buildArgs: z.record(z.string()).optional(),
    createdAt: z.string(),
  }),
});

// Chaos Test types
export interface ChaosTestRequest {
  githubUrl: string;
  chaosType?: "pod-delete" | "disk-fill" | "node-io-stress";
  duration?: number;
  targetNamespace?: string;
  targetDeployment?: string;
  fillPercentage?: number;        // For disk-fill
  ioPercentage?: number;          // For io-stress
}

export interface ChaosTestResult {
  success: boolean;
  message?: string;
  error?: string;
  details?: string;
  chaosType?: string;
  duration?: number;
  targetDeployment?: string;
  targetNamespace?: string;
  repository?: string;
  verdict?: string;
  failStep?: string;
  experimentStatus?: string;
}

export type ContainerAnalysisRequest = z.infer<typeof ContainerAnalysisRequest>;
export type SBOMResult = z.infer<typeof SBOMResult>;