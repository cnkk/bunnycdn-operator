import { KubernetesObject, V1ObjectMeta } from "@kubernetes/client-node";

export const API_GROUP = "bunny-cdn-operator.com";

export type Regions = "DE" | "NY" | "LA" | "SG" | "SYD";

// Storage Zone
export const BUNNY_CDN_STORAGE_ZONE = {
  API_GROUP,
  API_VERSION: "v1alpha1",
  PLURAL: "storagezones",
};

export interface StorageZone extends KubernetesObject {
  metadata: StorageZoneMeta;
  spec: StorageZoneSpec;
  status?: StorageZoneStatus;
}
export interface StorageZoneMeta extends V1ObjectMeta {
  name: string;
  namespace: string;
}

export interface StorageZoneSpec {
  region?: Regions;
  replicationRegions?: Regions[];
  deletionPolicy: "delete" | "retain";
}

export interface StorageZoneStatus {
  id?: number;
  ready: boolean;
  message: string;
  observedGeneration?: number;
}

// Pull Zone

export const BUNNY_CDN_PULL_ZONE = {
  API_GROUP,
  API_VERSION: "v1alpha1",
  PLURAL: "pullzones",
};

export interface PullZone extends KubernetesObject {
  spec: PullZoneSpec;
  metadata: PullZoneMeta;
  status?: PullZoneStatus;
}

export interface PullZoneMeta extends V1ObjectMeta {
  name: string;
  namespace: string;
}

export interface PullZoneSpec {
  originUrl?: string;
  additionalHostnames?: string[];
  storageZoneId?: number;
  storageZoneRef?: {
    name: string;
    namespace?: string;
  };
  zoneType: "premium" | "volume"; // defaults to 'volume'
  zoneSecurityEnabled: boolean; // defaults to true
  errorPageWhiteLabel: boolean; // defaults to true
  enabledCacheSlice: boolean; // defaults to true
  monthlyBandwidthLimit: number; // defaults to 0 a.k.a unlimited
  deletionPolicy: "delete" | "retain"; // defaults to 'retain'
  enableSmartCache: boolean; // defaults to false
  cacheExpirationTime: number; // defaults to -1 (Respect Origin Cache-Control)
  browserCacheExpirationTime: number; // defaults to -1 (Match Server Cache Expiration)
  enableQueryStringSort: boolean; // defaults to true
  cacheErrorResponses: boolean; // defaults to false
  enableQueryStringVary: boolean; // defaults to false
  queryStringVaryParameters: string[]; // defaults to []
  enableWebpVary: boolean; // defaults to false
  enableAvifVary: boolean; // defaults to false
  enableMobileVary: boolean; // defaults to false
  enableCountryCodeVary: boolean; // defaults to false
  enableHostnameVary: boolean; // defaults to false
  cookieVaryNames: string[]; // defaults to []
  stripResponseCookies: boolean; // defaults to true
  useStaleWhileOffline: boolean; // defaults to false
  useStaleWhileUpdating: boolean; // defaults to false
}

export interface PullZoneStatus {
  id?: number;
  ready: boolean;
  message: string;
  observedGeneration?: number;
}

// Edge rule
export const BUNNY_CDN_EDGE_RULE = {
  API_GROUP,
  API_VERSION: "v1alpha1",
  PLURAL: "edgerules",
};

export interface EdgeRule extends KubernetesObject {
  metadata: EdgeRuleMeta;
  spec: EdgeRuleSpec;
  status?: EdgeRuleStatus;
}
export interface EdgeRuleMeta extends V1ObjectMeta {
  name: string;
  namespace: string;
}

interface Trigger {
  type: number;
  patternMatches?: string[];
  patternMatchingType: number;
  parameter1?: string;
}

export interface EdgeRuleSpec {
  pullZoneRef: {
    name: string;
    namespace?: string;
  };
  actionType: number;
  actionParameter1?: string;
  actionParameter2?: string;
  triggers: Trigger[];
  triggerMatchingType: number;
  description?: string;
  enabled: boolean;
  deletionPolicy: "delete" | "retain";
}

export interface EdgeRuleStatus {
  id?: string;
  pullZoneId?: number;
  ready: boolean;
  message: string;
  observedGeneration?: number;
}
