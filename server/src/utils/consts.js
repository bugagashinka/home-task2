module.exports = {
  roles: {
    ADMIN_ROLE: "admin",
    USER_ROLE: "gamer",
  },
  session: {
    AUTH_COOKIE: "isAuth",
    MAX_AGE_MS_COOKIE: 12 * 3600 * 1000, // 12 hours
    SALT_LENGTH: 32,
  },
  database: {
    errors: {
      DUPLICATE_ERR_CODE: 11000,
    },
    sort: {
      DESC_ORDER: -1,
      ASC_ORDER: 1,
    },
  },
  accountValidation: {
    LOGIN_VALID_MASK: /^[a-z0-9]+$/,
    NAME_VALID_MASK: /^[ёЁа-яА-Я0-9a-zA-z\s]+$/,
    PASS_MIN_LENGTH: 8,
  },
  clientAlertTypes: {
    DANGER_ALERT: "danger",
    SUCCESS_ALERT: "success",
    WARNING_ALERT: "warning",
    INFO_ALERT: "info",
  },
  gameConfig: {
    SCORE_LIST_SIZE: 10,
    PROTECTED_PATHS: [/^\/$/, /\/scores\/?/i],
    ADMIN_PATHS: [/^\/admin\/?$/],
    ROWS_PER_PAGE: 10,
  },
};
