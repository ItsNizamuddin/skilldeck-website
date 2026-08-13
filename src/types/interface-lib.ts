export type SchemaObjectId = string;
export type TypesObjectId = string;

export interface ICloudImage {
    url: string;
    thumbnail?: string;
    alt?: string;
}

export interface IFAQ {
    title: string;
    value: string;
}

export interface ISeo {
    _id?: string | SchemaObjectId;
    metaTitle?: string;
    metaDescription?: string;
    metaRobots?: string;
    keywords?: string[];
    slug: string;
    type: string;
    subType: string;
    location: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    canonicalUrl?: string;
    internalSection?: {
        title: string;
        value: string;
    };
}

export interface IUserRef {
    id: number;
    userName: string;
}

export interface IBlogs {
    _id: string;
    title: string;
    slug: string;
    readTime: string;
    views: string;
    thumbnail: TypesObjectId | string | ICloudImage;
    intrested: string;
    smallDescription: string;
    share: string;
    body: string;

    author: string | IBlogAuthor;
    category: string | IBlogCategory;
    marketplaceCategory?: {
        _id: string;
        slug: string;
        title: string;
    };
    faqs: IFAQ[];
    seo: string | ISeo;
    updatedAt: string;
    order: number;
    status: 'draft' | 'scheduled' | 'published';
    scheduledAt?: string | Date | null;
    publishedAt?: string | Date | null;
    createdAt: string;
    updatedBy: IUserRef;
    platform?: {
        showOnPlatform?: boolean;
        isActive?: boolean;
        impressions?: number;
        clicks?: number;
    };
    websiteCourses?: string[] | TypesObjectId[];
    marketCourses?: string[] | TypesObjectId[];
}

export interface IBlogAuthor {
    _id: string;
    name: string;
    slug: string;
    trainerCode?: string;
    description: string;
    designation: string;
    linkdin: string;
    facebook: string;
    twitter: string;
    photo: TypesObjectId | string | ICloudImage;
    since_year: string;
    order: number;
    blogs: string[] | SchemaObjectId[];
    BlogAuthorid: number;
    contribution: number;
    createdAt: string;
    updatedAt: string;
    updatedBy: IUserRef;
}

export interface IBlogCategory {
    _id: string;
    order: number;
    title: string;
    slug: string;
    description: string;
    isGlobal?: boolean;
    blogs: string[] | SchemaObjectId[];
    createdAt: string;
    updatedAt: string;
    updatedBy: IUserRef;
}

export interface ITenant {
  _id?: string;
  id: string;
  name: string;
  legalName?: string;
  slug?: string;
  databaseName?: string;
  domain?: {
    main: string;
    other?: Record<string, string>;
    custom?: string | null;
    website?: string | null;
    adminPanel: string;
  };
  primaryDomain?: string;
  customDomain?: string;

  ownerEmail: string;
  ownerName?: string;
  phoneNumber?: string;
  billingEmail?: string;
  billingAddress?: string;
  address?: string;
  country?: string;
  locale?: string;
  timezone?: string;
  companySize?: number;
  industry?: string;
  currency?: string;

  platformProfile?: PlatformProfile;

  status: TenantStatus;
  planType?: SubscriptionType;
  region?: string;
  subscriptionEndsAt?: string;
  deletedAt?: string;

  metadata?: Record<string, any>;
  settings?: Record<string, any>;
  chatSettings?: any;

  tenantPlan?: TenantPlan;
  usageRecords?: UsageRecord[];
  integrations?: TenantIntegration[];
  webhooks?: WebhookEndpoint[];
  apiKeys?: ApiKey[];
  payments?: AdminPayment[];
  invoices?: Invoice[];

  createdAt: string;
  updatedAt: string;

  seatsUsed?: number;
  storageUsedMB?: number;
}

export enum TenantStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  CANCELLED = "CANCELLED",
  DELETED = "DELETED",
}

export interface Feature {
  key: string;
  description?: string;
  value: string | number;
}

export interface ICurrency {
  code: string;
  symbol: string;
}

export interface IPricing {
  comparedPrice: number;
  actualPrice: number;
  yearlyPrice?: number;
  yearlyComparedPrice?: number;
  currency: ICurrency;
}

export interface IPricingMap {
  currency: ICurrency;
  seatUnitPrice: number;
  storageUnitPrice: number;
  locationUnitPrice: number;
  courseUnitPrice: number;
  lmsCourseUnitPrice?: number;
  studentUnitPrice?: number;
  instructorUnitPrice?: number;
  certificateUnitPrice?: number;
  yearlySeatUnitPrice?: number;
  yearlyStorageUnitPrice?: number;
  yearlyLocationUnitPrice?: number;
  yearlyCourseUnitPrice?: number;
  yearlyLmsCourseUnitPrice?: number;
  yearlyStudentUnitPrice?: number;
  yearlyInstructorUnitPrice?: number;
  yearlyCertificateUnitPrice?: number;
  [key: string]: any;
}

export interface IDisplayFeatureGroup {
  category: string;
  items: string[];
}

export interface IPlan {
  _id?: string;
  id: string;
  code: string;
  name: string;
  description?: string;
  themeDescription?: string;
  interval: PlanInterval;
  trialDays?: number;
  features: Feature[];
  displayFeatures?: IDisplayFeatureGroup[];
  highlightLabel?: string;

  price: number;
  discountedPrice?: number | null;
  currency: string;
  yearlyPrice?: number | null;
  yearlyDiscountedPrice?: number | null;

  tier?: string;
  isCustom?: boolean;
  isHidden?: boolean;
  status: PlanStatus;
  isLmsEnabled?: boolean;

  razorpayMonthlyPlanId?: string;
  razorpayYearlyPlanId?: string;

  limits?: Record<string, number>;
  overagePricing?: Record<string, number>;

  prices?: IPricing[];
  multiCurrencyOveragePricing?: IPricingMap[];

  taxRules?: {
    countryCode: string;
    percentage: number;
    label?: string;
    included?: boolean;
  }[];

  tenantPlans?: TenantPlan[];
  coupons?: Coupon[];

  createdAt: string;
  updatedAt: string;
}

export enum PlanInterval {
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
  CUSTOM = "CUSTOM",
}

export enum PlanStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  ARCHIVED = "ARCHIVED",
}

export interface TenantPlan {
  _id?: string;
  id: string;
  tenantId: string;
  planId: string;
  type: SubscriptionType;
  status: SubscriptionStatus;
  startDate: string;
  endDate?: string;
  cancelAt?: string;
  renewalAt?: string;
  trialEndsAt?: string;
  lastPaymentAt?: string;
  nextBillingAt?: string;
  hasEvenrPaid?: boolean;
  seats: number;
  seatsUsed?: number;
  storageLimitGB?: number;

  currency?: string;
  basePrice?: number;
  discountedPrice?: number | null;
  extraSeatCount?: number;
  extraSeatUnitPrice?: number;
  storageAddonGB?: number;
  storageUnitPrice?: number;
  addons?: AddonItem[];
  recurringAmount?: number;

  pendingChanges?: PendingChange | null;
  addedFeatures?: Record<string, any>;

  paymentGateway?: string;
  gatewaySubscriptionId?: string;
  gatewayCustomerId?: string;
  paymentMethod?: string;
  paymentMethodDetails?: Record<string, any>;

  billingInterval?: PlanInterval;
  isLmsEnabled?: boolean;

  tenant?: ITenant;
  plan?: IPlan;
  payments?: AdminPayment[];
  invoices?: Invoice[];

  createdAt: string;
  updatedAt: string;
}

export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  PAST_DUE = "PAST_DUE",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
}

export enum SubscriptionType {
  FREE = "FREE",
  TRIAL = "TRIAL",
  PAID = "PAID",
}

export interface AdminPayment {
  _id?: string;
  id: string;
  tenantPlanId: string;
  tenantId: string;
  amount: number;
  currency: string;
  status: AdminPaymentStatus | SuperPaymentStatus;
  gateway?: string;
  transactionId?: string;
  provider?: string;
  providerCustomerId?: string;
  providerSubscriptionId?: string;
  checkoutSessionId?: string;
  gatewayPaymentId?: string;
  gatewayOrderId?: string;
  method?: string;
  metadata?: Record<string, any>;
  taxAmount?: number;
  feeAmount?: number;
  refundAmount?: number;
  errorCode?: string;
  errorMessage?: string;
  receiptUrl?: string;
  notes?: Record<string, any>;

  paidAt?: string;
  createdAt: string;
  updatedAt: string;

  tenantPlan?: TenantPlan;
  tenant?: ITenant;
}

export enum AdminPaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export interface Invoice {
  _id?: string;
  id: string;
  tenantId: string;
  tenantPlanId: string;
  invoiceNumber: string;
  totalAmount: number;
  currency: string;
  status: InvoiceStatus;
  issuedAt: string;
  dueAt?: string;
  paidAt?: string;
  taxAmount?: number;
  discount?: number;
  items: Record<string, any>;
  metadata?: Record<string, any>;
  subtotal?: number;

  tenant?: ITenant;
  tenantPlan?: TenantPlan;

  createdAt: string;
  updatedAt: string;
}

export enum InvoiceStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  VOID = "VOID",
  OVERDUE = "OVERDUE",
}

export enum SuperPaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export interface Coupon {
  _id?: string;
  id: string;
  code: string;
  discountPct?: number;
  discountAmt?: number;
  validFrom: string;
  validTo?: string;
  maxRedemptions?: number;
  redeemedCount?: number;
  active?: boolean;
  planId?: string;

  plan?: IPlan;
}

export interface UsageRecord {
  _id?: string;
  id: string;
  tenantId: string;
  metric: string;
  quantity: number;
  periodStart: string;
  periodEnd: string;
  metadata?: Record<string, any>;

  tenant?: ITenant;
}

export interface ApiKey {
  _id?: string;
  id: string;
  tenantId: string;
  key: string;
  label?: string;
  scopes: string[];
  isActive: boolean;
  expiresAt?: string;
  lastUsedAt?: string;

  tenant?: ITenant;
}

export interface WebhookEndpoint {
  _id?: string;
  id: string;
  tenantId: string;
  url: string;
  secret: string;
  isActive: boolean;
  eventTypes: string[];
  lastCalled?: string;

  tenant?: ITenant;
}

export interface TenantIntegration {
  _id?: string;
  id: string;
  tenantId: string;
  provider: string;
  config?: Record<string, any>;
  isActive: boolean;

  tenant?: ITenant;
}

export interface AddonItem {
  key: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface PendingChange {
  effectiveAt?: string;
  targetPlanId?: string;
  seats?: number;
  storageAddonGB?: number;
  addons?: AddonItem[];
  reason?: string;
  requestedBy?: string;
}

export interface PlatformProfile {
  description?: string;
  shortDescription?: string;
  website?: string;
  email?: string;
  phoneNumber?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  headerImage?: string;
}

export interface ITimezone {
  tzname: string;
  zone: string;
  abbreviation: string;
  gmtOffsetName: string;
}

export interface IRegion {
  id: number;
  name: string;
  slug: string;
  isActive?: boolean;
}

export interface ICountry {
  id: number;
  name: string;
  iso2: string;
  currency: string;
  currency_symbol: string;
  phone_code?: string;
  capital?: string;
  native?: string;
  subregion?: string;
  slug: string;
  timezones: ITimezone[];
  emoji: string;
  region_id?: number;
  isActive?: boolean;
}

export interface IState {
  id: number;
  country_id: number;
  name: string;
  state_code?: string;
  type?: string;
  slug: string;
  isActive?: boolean;
}

export interface ICity {
  id: number;
  state_id: number;
  country_id: number;
  name: string;
  slug: string;
  isActive?: boolean;
}
