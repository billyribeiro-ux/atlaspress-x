// Core domain types for AtlasPress X

// =============================================================================
// Workspace & Multi-Tenancy
// =============================================================================

export interface Workspace {
  id: string
  name: string
  slug: string
  domain?: string
  settings: WorkspaceSettings
  subscription: Subscription
  createdAt: Date
  updatedAt: Date
}

export interface WorkspaceSettings {
  timezone: string
  locale: string
  theme: 'light' | 'dark' | 'system'
  branding: {
    logo?: string
    primaryColor: string
    secondaryColor: string
  }
  features: Record<string, boolean>
  limits: {
    users: number
    storage: number // bytes
    content: number
  }
}

export interface Subscription {
  plan: 'starter' | 'professional' | 'enterprise'
  status: 'active' | 'inactive' | 'cancelled'
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
}

// =============================================================================
// User & Authentication
// =============================================================================

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  emailVerified: Date
  twoFactorEnabled: boolean
  lastLoginAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface WorkspaceMember {
  id: string
  userId: string
  workspaceId: string
  role: WorkspaceRole
  permissions: Permission[]
  invitedBy: string
  joinedAt: Date
  lastActiveAt?: Date
}

export enum WorkspaceRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  MANAGING_EDITOR = 'managing_editor',
  EDITOR = 'editor',
  AUTHOR = 'author',
  CONTRIBUTOR = 'contributor',
  ANALYST = 'analyst',
  VIEWER = 'viewer'
}

export enum Permission {
  // Workspace permissions
  MANAGE_WORKSPACE = 'manage_workspace',
  MANAGE_MEMBERS = 'manage_members',
  MANAGE_BILLING = 'manage_billing',
  
  // Content permissions
  CREATE_CONTENT = 'create_content',
  EDIT_CONTENT = 'edit_content',
  PUBLISH_CONTENT = 'publish_content',
  DELETE_CONTENT = 'delete_content',
  MANAGE_WORKFLOWS = 'manage_workflows',
  
  // Media permissions
  UPLOAD_MEDIA = 'upload_media',
  MANAGE_MEDIA = 'manage_media',
  
  // Analytics permissions
  VIEW_ANALYTICS = 'view_analytics',
  EXPORT_REPORTS = 'export_reports',
  
  // System permissions
  IMPERSONATE_USERS = 'impersonate_users',
  VIEW_AUDIT_LOGS = 'view_audit_logs'
}

// =============================================================================
// Content Domain
// =============================================================================

export interface Content {
  id: string
  workspaceId: string
  type: string // ContentType ID
  title: string
  slug: string
  excerpt?: string
  content: BlockContent[]
  metadata: ContentMetadata
  seo: SEOData
  workflowState: WorkflowState
  authorId: string
  reviewerIds: string[]
  publishedAt?: Date
  scheduledFor?: Date
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export interface ContentType {
  id: string
  workspaceId: string
  name: string
  slug: string
  description?: string
  schema: BlockSchema[]
  workflowTemplateId: string
  seoTemplateId: string
  createdAt: Date
  updatedAt: Date
}

export interface ContentMetadata {
  wordCount: number
  readingTime: number // minutes
  featuredImage?: string
  tags: string[]
  categories: string[]
  series?: string
  episode?: number
  customFields: Record<string, any>
}

export interface SEOData {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  robots?: string
  ogImage?: string
  ogTitle?: string
  ogDescription?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  jsonLd?: Record<string, any>[]
}

// =============================================================================
// Block Editor System
// =============================================================================

export interface BlockContent {
  id: string
  type: string
  data: Record<string, any>
  children?: BlockContent[]
  attrs?: Record<string, any>
}

export interface BlockSchema {
  type: string
  name: string
  description: string
  category: 'content' | 'media' | 'structure' | 'interactive'
  icon: string
  fields: BlockField[]
  template?: Record<string, any>
}

export interface BlockField {
  name: string
  type: 'text' | 'textarea' | 'rich' | 'image' | 'number' | 'boolean' | 'select' | 'multiselect' | 'date' | 'url' | 'array' | 'object'
  label: string
  description?: string
  required?: boolean
  defaultValue?: any
  validation?: FieldValidation
  options?: Array<{ label: string; value: any }>
}

export interface FieldValidation {
  min?: number
  max?: number
  pattern?: string
  message?: string
}

// =============================================================================
// Editorial Workflow
// =============================================================================

export interface WorkflowState {
  id: string
  contentId: string
  state: WorkflowStateType
  assignedTo?: string
  dueDate?: Date
  completedAt?: Date
  comments: WorkflowComment[]
  transitions: WorkflowTransition[]
  createdAt: Date
  updatedAt: Date
}

export enum WorkflowStateType {
  DRAFT = 'draft',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  SCHEDULED = 'scheduled',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

export interface WorkflowComment {
  id: string
  workflowStateId: string
  authorId: string
  content: string
  mentions: string[]
  resolvedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface WorkflowTransition {
  id: string
  workflowStateId: string
  fromState: WorkflowStateType
  toState: WorkflowStateType
  triggeredBy: string
  triggeredAt: Date
  comment?: string
}

export interface WorkflowTemplate {
  id: string
  workspaceId: string
  name: string
  description?: string
  states: WorkflowStateDefinition[]
  transitions: WorkflowTransitionRule[]
  defaultFor?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface WorkflowStateDefinition {
  state: WorkflowStateType
  name: string
  description?: string
  color: string
  permissions: Permission[]
  autoTransition?: {
    toState: WorkflowStateType
    delay: number // minutes
  }
}

export interface WorkflowTransitionRule {
  fromState: WorkflowStateType
  toState: WorkflowStateType
  name: string
  description?: string
  permissions: Permission[]
  requireComment?: boolean
  requireApproval?: {
    roles: WorkspaceRole[]
    minApprovals: number
  }
}

// =============================================================================
// Media & Assets
// =============================================================================

export interface MediaAsset {
  id: string
  workspaceId: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  width?: number
  height?: number
  duration?: number // for video/audio
  variants: MediaVariant[]
  metadata: MediaMetadata
  uploadedBy: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export interface MediaVariant {
  id: string
  mediaAssetId: string
  name: string
  filename: string
  width?: number
  height?: number
  size: number
  quality?: number
  format: string
  url: string
}

export interface MediaMetadata {
  title?: string
  description?: string
  alt?: string
  caption?: string
  credit?: string
  tags: string[]
  focalPoint?: { x: number; y: number }
  exif?: Record<string, any>
  hash: string // for duplicate detection
  usage: MediaUsage[]
}

export interface MediaUsage {
  id: string
  mediaAssetId: string
  entityType: 'content' | 'workspace' | 'user'
  entityId: string
  field: string
  addedAt: Date
}

// =============================================================================
// Analytics & Metrics
// =============================================================================

export interface ContentMetrics {
  id: string
  contentId: string
  date: Date
  views: number
  uniqueViews: number
  engagedTime: number // seconds
  depth: number // average scroll depth
  bounceRate: number
  conversions: number
  conversionValue: number
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  referrer?: string
  device?: string
  browser?: string
  country?: string
  createdAt: Date
}

export interface AnalyticsDashboard {
  id: string
  workspaceId: string
  name: string
  type: 'content' | 'author' | 'traffic' | 'conversion' | 'custom'
  config: DashboardConfig
  createdBy: string
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}

export interface DashboardConfig {
  timeframe: '7d' | '30d' | '90d' | '1y' | 'custom'
  startDate?: Date
  endDate?: Date
  widgets: DashboardWidget[]
  filters: Record<string, any>
}

export interface DashboardWidget {
  id: string
  type: 'metric' | 'chart' | 'table' | 'list'
  title: string
  query: AnalyticsQuery
  visualization: VisualizationConfig
  position: { x: number; y: number; w: number; h: number }
}

export interface AnalyticsQuery {
  metric: string
  dimensions: string[]
  filters: Record<string, any>
  aggregation: 'sum' | 'avg' | 'count' | 'unique_count'
  orderBy?: { field: string; direction: 'asc' | 'desc' }
  limit?: number
}

export interface VisualizationConfig {
  chartType?: 'line' | 'bar' | 'pie' | 'area' | 'table'
  colors?: string[]
  showLegend?: boolean
  showGrid?: boolean
  format?: 'number' | 'currency' | 'percentage' | 'duration'
}

// =============================================================================
// API Response Types
// =============================================================================

export interface ApiResponse<T = any> {
  data: T
  meta?: {
    pagination?: PaginationMeta
    filters?: Record<string, any>
    timestamp: Date
  }
  error?: ApiError
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
  stack?: string
}

// =============================================================================
// Common Utility Types
// =============================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export interface SelectOption {
  label: string
  value: any
  disabled?: boolean
  group?: string
}

export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  width?: string | number
  align?: 'left' | 'center' | 'right'
  render?: (value: any, row: any) => React.ReactNode
}

export interface FilterOption {
  field: string
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'contains' | 'startsWith' | 'endsWith'
  value: any
  label?: string
}

// =============================================================================
// Environment Configuration
// =============================================================================

export interface DatabaseConfig {
  url: string
  ssl?: boolean
  poolSize?: number
  timeout?: number
}

export interface RedisConfig {
  url: string
  keyPrefix?: string
  ttl?: number
}

export interface StorageConfig {
  endpoint: string
  region: string
  bucket: string
  accessKey: string
  secretKey: string
  publicUrl?: string
}

export interface AuthConfig {
  secret: string
  baseUrl: string
  providers: {
    google?: {
      clientId: string
      clientSecret: string
    }
    github?: {
      clientId: string
      clientSecret: string
    }
  }
  callbacks: {
    signIn?: string
    redirect?: string
    session?: string
    jwt?: string
  }
}
