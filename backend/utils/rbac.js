// server/utils/rbac.js

/**
 * Simple role hierarchy
 */
const ROLE_HIERARCHY = {
  admin: 3,
  communityOwner: 2,
  user: 1,
};

/**
 * Check if the user has at least the required role
 * @param {string} userRole - current user role
 * @param {string} requiredRole - minimum required role
 */
export function hasRole(userRole, requiredRole) {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

/**
 * Check if a user has permission for an operation
 * Example usage:
 * if (!canManageCommunity(user, community)) return res.status(403).json(...)
 */
export function canManageCommunity(user, community) {
  return (
    user.role === "admin" ||
    (user.role === "communityOwner" &&
      community.owner.toString() === user._id.toString())
  );
}
