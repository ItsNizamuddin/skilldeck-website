// export IPlan removal
export interface IPlanFeature {
    key: string;
    value?: string | boolean | number;
    description?: string;
}

export interface IPlanLimits {
    seats?: number;
    storageGB?: number;
    locations?: number;
    courses?: number;
}

export interface IPlanOveragePricing {
    seatUnitPrice?: number;
    storageUnitPrice?: number;
    locationUnitPrice?: number;
    courseUnitPrice?: number;
    yearlySeatUnitPrice?: number;
    yearlyStorageUnitPrice?: number;
    yearlyLocationUnitPrice?: number;
    yearlyCourseUnitPrice?: number;
}

export interface GroupedFeatures {
    [category: string]: {
        [subcategory: string]: {
            key: string;
            label: string;
        }[];
    };
}
