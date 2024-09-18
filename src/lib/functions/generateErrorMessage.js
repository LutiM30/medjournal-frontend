export const generateFirebaseAuthErrorMessage = (error) => {
  let errormessage = '';
  switch (error?.code) {
    case 'auth/invalid-email':
      errormessage = 'Invalid email address. Please enter a valid email.';
      break;
    case 'auth/user-not-found':
      errormessage = 'User not found. Please check the email address.';
      break;
    case 'auth/wrong-password':
      errormessage = 'Incorrect password. Please try again.';
      break;
    case 'auth/email-already-in-use':
      errormessage = 'Email already in use. Please try another email.';
      break;
    case 'auth/weak-password':
      errormessage = 'Password should be at least 6 characters.';
      break;
    case 'auth/operation-not-allowed':
      errormessage = 'Operation not allowed. Please try again later.';
      break;
    case 'auth/invalid-verification-code':
      errormessage = 'Invalid verification code. Please try again.';
      break;
    case 'auth/invalid-verification-id':
      errormessage = 'Invalid verification ID. Please try again.';
      break;
    case 'auth/code-expired':
      errormessage = 'Code expired. Please try again.';
      break;
    case 'auth/invalid-action-code':
      errormessage = 'Invalid action code. Please try again.';
      break;
    case 'auth/user-disabled':
      errormessage = 'User disabled. Please contact support.';
      break;
    case 'auth/invalid-credential':
      errormessage = 'Invalid credential. Please try again.';
      break;
    case 'auth/invalid-continue-uri':
      errormessage = 'Invalid continue URL. Please try again.';
      break;
    case 'auth/unauthorized-continue-uri':
      errormessage = 'Unauthorized continue URL. Please try again.';
      break;
    case 'auth/missing-continue-uri':
      errormessage = 'Missing continue URL. Please try again.';
      break;
    case 'auth/missing-verification-code':
      errormessage = 'Missing verification code. Please try again.';
      break;
    case 'auth/missing-verification-id':
      errormessage = 'Missing verification ID. Please try again.';
      break;
    case 'auth/captcha-check-failed':
      errormessage = 'Captcha check failed. Please try again.';
      break;
    case 'auth/invalid-phone-number':
      errormessage = 'Invalid phone number. Please try again.';
      break;
    case 'auth/missing-phone-number':
      errormessage = 'Missing phone number. Please try again.';
      break;
    case 'auth/quota-exceeded':
      errormessage = 'Quota exceeded. Please try again.';
      break;
    case 'auth/missing-app-credential':
      errormessage = 'Missing app credential. Please try again.';
      break;
    case 'auth/invalid-app-credential':
      errormessage = 'Invalid app credential. Please try again.';
      break;
    case 'auth/session-expired':
      errormessage = 'Session expired. Please try again.';
      break;
    case 'auth/missing-or-invalid-nonce':
      errormessage = 'Missing or invalid nonce. Please try again.';
      break;
    case 'auth/missing-client-identifier':
      errormessage = 'Missing client identifier. Please try again.';
      break;
    case 'auth/key-retrieval-failed':
      errormessage = 'Key retrieval failed. Please try again.';
      break;
    case 'auth/invalid-oauth-provider':
      errormessage = 'Invalid OAuth provider. Please try again.';
      break;
    case 'auth/invalid-oauth-client-id':
      errormessage = 'Invalid OAuth client ID. Please try again.';
      break;
    case 'auth/invalid-cert-hash':
      errormessage = 'Invalid cert hash. Please try again.';
      break;
    case 'auth/invalid-user-token':
      errormessage = 'Invalid user token. Please try again.';
      break;
    case 'auth/invalid-custom-token':
      errormessage = 'Invalid custom token. Please try again.';
      break;
    case 'auth/app-deleted':
      errormessage = 'App deleted. Please try again.';
      break;
    case 'auth/app-not-authorized':
      errormessage = 'App not authorized. Please try again.';
      break;
    case 'auth/argument-error':
      errormessage = 'Argument error. Please try again.';
      break;
    case 'auth/invalid-api-key':
      errormessage = 'Invalid API key. Please try again.';
      break;
    case 'auth/network-request-failed':
      errormessage = 'Network request failed. Please try again.';
      break;
    case 'auth/requires-recent-login':
      errormessage = 'Requires recent login. Please try again.';
      break;
    case 'auth/too-many-requests':
      errormessage = 'Too many requests. Please try again.';
      break;
    case 'auth/unauthorized-domain':
      errormessage = 'Unauthorized domain. Please try again.';
      break;
    case 'auth/user-token-expired':
      errormessage = 'User token expired. Please try again.';
      break;
    case 'auth/web-storage-unsupported':
      errormessage = 'Web storage unsupported. Please try again.';
      break;
    case 'auth/account-exists-with-different-credential':
      errormessage =
        'Account exists with different credential. Please try again.';
      break;
    case 'auth/auth-domain-config-required':
      errormessage = 'Auth domain config required. Please try again.';
      break;
    case 'auth/cancelled-popup-request':
      errormessage = 'Cancelled popup request. Please try again.';
      break;
    case 'auth/credential-already-in-use':
      errormessage = 'Credential already in use. Please try again.';
      break;
    case 'auth/custom-token-mismatch':
      errormessage = 'Custom token mismatch. Please try again.';
      break;
    case 'auth/provider-already-linked':
      errormessage = 'Provider already linked. Please try again.';
      break;
    case 'auth/timeout':
      errormessage = 'Timeout. Please try again.';
      break;
    case 'auth/missing-android-pkg-name':
      errormessage = 'Missing Android package name. Please try again.';
      break;
    case 'auth/missing-ios-bundle-id':
      errormessage = 'Missing iOS bundle ID. Please try again.';
      break;
    case 'auth/invalid-dynamic-link-domain':
      errormessage = 'Invalid dynamic link domain. Please try again.';
      break;
    case 'auth/invalid-persistence-type':
      errormessage = 'Invalid persistence type. Please try again.';
      break;
    case 'auth/unsupported-persistence-type':
      errormessage = 'Unsupported persistence type. Please try again.';
      break;
    case 'auth/invalid-oauth-client-secret':
      errormessage = 'Invalid OAuth client secret. Please try again.';
      break;
    case 'auth/invalid-argument':
      errormessage = 'Invalid argument. Please try again.';
      break;
    case 'auth/invalid-creation-time':
      errormessage = 'Invalid creation time. Please try again.';
      break;
    case 'auth/invalid-disabled-field':
      errormessage = 'Invalid disabled field. Please try again.';
      break;
    case 'auth/invalid-display-name':
      errormessage = 'Invalid display name. Please try again.';
      break;
    case 'auth/invalid-email-verified':
      errormessage = 'Invalid email verified. Please try again.';
      break;
    case 'auth/invalid-hash-algorithm':
      errormessage = 'Invalid hash algorithm. Please try again.';
      break;
    case 'auth/invalid-hash-block-size':
      errormessage = 'Invalid hash block size. Please try again.';
      break;
    case 'auth/invalid-hash-derived-key-length':
      errormessage = 'Invalid hash derived key length. Please try again.';
      break;
    case 'auth/invalid-hash-key':
      errormessage = 'Invalid hash key. Please try again.';
      break;
    case 'auth/invalid-hash-memory-cost':
      errormessage = 'Invalid hash memory cost. Please try again.';
      break;
    case 'auth/invalid-hash-parallelization':
      errormessage = 'Invalid hash parallelization. Please try again.';
      break;
    case 'auth/invalid-hash-rounds':
      errormessage = 'Invalid hash rounds. Please try again.';
      break;
    case 'auth/invalid-hash-salt-separator':
      errormessage = 'Invalid hash salt separator. Please try again.';
      break;
    case 'auth/invalid-id-token':
      errormessage = 'Invalid ID token. Please try again.';
      break;
    case 'auth/invalid-last-sign-in-time':
      errormessage = 'Invalid last sign in time. Please try again.';
      break;
    case 'auth/invalid-page-token':
      errormessage = 'Invalid page token. Please try again.';
      break;
    case 'auth/invalid-password':
      errormessage = 'Invalid password. Please try again.';
      break;
    case 'auth/invalid-password-hash':
      errormessage = 'Invalid password hash. Please try again.';
      break;
    case 'auth/invalid-password-salt':
      errormessage = 'Invalid password salt. Please try again.';
      break;
    case 'auth/invalid-photo-url':
      errormessage = 'Invalid photo URL. Please try again.';
      break;
    case 'auth/invalid-provider-id':
      errormessage = 'Invalid provider ID. Please try again.';
      break;
    case 'auth/invalid-session-cookie-duration':
      errormessage = 'Invalid session cookie duration. Please try again.';
      break;
    case 'auth/invalid-uid':
      errormessage = 'Invalid UID. Please try again.';
      break;
    case 'auth/invalid-user-import':
      errormessage = 'Invalid user import. Please try again.';
      break;
    case 'auth/invalid-provider-data':
      errormessage = 'Invalid provider data. Please try again.';
      break;
    case 'auth/maximum-user-count-exceeded':
      errormessage = 'Maximum user count exceeded. Please try again.';
      break;
    case 'auth/missing-hash-algorithm':
      errormessage = 'Missing hash algorithm. Please try again.';
      break;
    case 'auth/missing-uid':
      errormessage = 'Missing UID. Please try again.';
      break;
    case 'auth/reserved-claims':
      errormessage = 'Reserved claims. Please try again.';
      break;
    case 'auth/session-cookie-revoked':
      errormessage = 'Session cookie revoked. Please try again.';
      break;
    case 'auth/uid-already-exists':
      errormessage = 'UID already exists. Please try again.';
      break;
    case 'auth/email-already-exists':
      errormessage = 'Email already exists. Please try again.';
      break;
    case 'auth/phone-number-already-exists':
      errormessage = 'Phone number already exists. Please try again.';
      break;
    case 'auth/project-not-found':
      errormessage = 'Project not found. Please try again.';
      break;
    case 'auth/insufficient-permission':
      errormessage = 'Insufficient permission. Please try again.';
      break;
    case 'auth/internal-error':
      errormessage = 'Internal error. Please try again.';
      break;

    default:
      errormessage = 'Oops! Something went wrong. Please try again later.';
  }
  return errormessage;
};
