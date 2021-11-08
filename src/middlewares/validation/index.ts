import validateLoginEndpointBody from './login'
import validateTokenEndpointBody from './token'
import validateSignUpEndpointBody from './signup'
import validateResetPasswordEndpointBody from './resetPassword'
import validateConfirmEmailTokenEndpointBody from './confirmEmailToken'
import validateConfirmResetPasswordEndpointBody from './confirmResetPassword'

export {
	validateConfirmEmailTokenEndpointBody,
	validateConfirmResetPasswordEndpointBody,
	validateLoginEndpointBody,
	validateResetPasswordEndpointBody,
	validateSignUpEndpointBody,
	validateTokenEndpointBody,
}
