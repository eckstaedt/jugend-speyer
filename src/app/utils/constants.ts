export const SESSION_FEEDBACK_THRESHOLD = 2;

export enum AnalyticsField {
    CATEGORY_CHANGED = 'categoryChanged',
    FAVORITE_ADDED = 'favoriteAdded',
    FAVORITE_REMOVED = 'favoriteRemoved',
    APP_SESSIONS = 'appSessions',
    CORRECT_PASSWORD_PROVIDED = 'correctPasswordProvided',
    INVALID_PASSWORD_PROVIDED = 'invalidPasswordProvided',
    FILTER_MODAL_APPLIED = 'filterModalApplied',
    ADMIN_LOGGED_IN = 'adminLoggedIn'
}

export enum Platforms {
    IPAD = 'iPad',
    IPHONE = 'iPhone',
    ANDROID_PHONE = 'AndroidPhone',
    ANDROID_TABLET = 'AndroidTablet',
    WEB = 'Web',
    OTHER = 'Other'
}
