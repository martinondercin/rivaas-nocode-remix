import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const IntegrationManualTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Identity Verification Service Integration Manual</CardTitle>
          <CardDescription>
            Complete guide for integrating with RIVaaS (Remote Identity Verification as a Service)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">What is RIVaaS?</h3>
            <p className="text-verify-mediumGray mb-4">
              Remote Identity Verification as a Service (RIVaaS) is a service allowing web platforms to verify the identity of their users remotely without the need of complicated integration of Innovatrics' identity verification toolkit - DOT. It is a web application that can be accessed either as a standalone web application (via redirect) or as an iframe.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Prerequisites</h3>
            <p className="text-verify-mediumGray mb-4">
              Before integrating with RIVaaS, contact Innovatrics representative and provide:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-verify-mediumGray mb-4">
              <li><strong>verifiedUrl (VERIFIED_URL)</strong> - URL to redirect after successful verification</li>
              <li><strong>rejectedUrl (REJECTED_URL)</strong> - URL to redirect when verification is rejected or failed</li>
              <li><strong>unverifiedUrl (UNVERIFIED_URL)</strong> - URL to redirect when verification is cancelled by user</li>
              <li><strong>callbackUrl (CALLBACK_URL)</strong> - URL to receive sensitive customer data via webhook</li>
              <li><strong>logoUrl (LOGO_URL)</strong> - Company logo URL (SVG recommended, PNG supported)</li>
              <li><strong>customerName (CUSTOMER_NAME)</strong> - Customer identification name</li>
            </ul>
            <p className="text-verify-mediumGray mb-4">
              After providing these, you will receive:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-verify-mediumGray">
              <li>Auth0 client id (AUTH0_CLIENT_ID)</li>
              <li>Auth0 client secret (AUTH0_CLIENT_SECRET)</li>
              <li>Auth0 issuer base URL (AUTH0_ISSUER_BASE_URL)</li>
              <li>RIVaaS service URL (RIVAAS_SERVICE_URL)</li>
              <li>RIVaaS app URL (RIVAAS_APP_URL)</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Integration Steps</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">1. Obtain JWT from Auth0</h4>
                <p className="text-verify-mediumGray mb-3">
                  First step is to obtain a JWT from Auth0. This is done on your backend server:
                </p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <pre className="text-sm overflow-x-auto">
{`const response = await fetch(\`\${AUTH0_ISSUER_BASE_URL}/oauth/token\`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    audience: 'https://verify-identity.innovatrics.com/service',
    grant_type: 'client_credentials',
    client_id: AUTH0_CLIENT_ID,
    client_secret: AUTH0_CLIENT_SECRET,
  }),
});`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2. Obtain Session Token from RIVaaS API</h4>
                <p className="text-verify-mediumGray mb-3">
                  Use the JWT to get a session token from RIVaaS API:
                </p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <pre className="text-sm overflow-x-auto">
{`const response = await fetch(\`\${RIVAAS_SERVICE_URL}/api/v1/session\`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: \`Bearer \${ACCESS_TOKEN}\`,
  },
  body: JSON.stringify({
    configuration: {
      locale: 'en', // desired localization
    },
  }),
});`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">3. Initialize RIVaaS App</h4>
                <p className="text-verify-mediumGray mb-3">
                  <strong>Redirect Flow:</strong> Redirect user to RIVaaS App with session token
                </p>
                <div className="bg-gray-50 p-4 rounded-md mb-3">
                  <pre className="text-sm overflow-x-auto">
{`window.location.href = \`\${RIVAAS_APP_URL}/?sessionToken=\${SESSION_TOKEN}\`;`}
                  </pre>
                </div>
                <p className="text-verify-mediumGray mb-3">
                  <strong>Iframe Flow:</strong> Load RIVaaS in an iframe
                </p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <pre className="text-sm overflow-x-auto">
{`const iframeUrl = \`\${RIVAAS_APP_URL}?sessionToken=\${SESSION_TOKEN}&viewType=iframe\`;
const iframeElement = document.createElement('iframe');
iframeElement.src = iframeUrl;
iframeElement.width = '100%';
iframeElement.height = '100%';
iframeElement.allow = 'camera';
document.body.appendChild(iframeElement);`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Verification Results</h3>
            <p className="text-verify-mediumGray mb-4">
              Results are provided in two ways:
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Redirect Flow</h4>
                <p className="text-verify-mediumGray mb-2">User is redirected with query parameters:</p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <code className="text-sm">https://your-site.com/verification-result?status=success</code>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Iframe Flow</h4>
                <p className="text-verify-mediumGray mb-2">Results are sent via postMessage:</p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <pre className="text-sm overflow-x-auto">
{`window.addEventListener('message', (event) => {
  if (event.origin !== 'https://your-verified-url.com') {
    return;
  }
  const { data } = event;
  // process verification data
});`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Webhook Events</h3>
            <p className="text-verify-mediumGray mb-4">
              Sensitive customer data is sent to your backend via webhook POST requests. Handle <code>VERIFICATION_SUCCEEDED</code> events:
            </p>
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <pre className="text-sm overflow-x-auto">
{`{
  "event": "VERIFICATION_SUCCEEDED",
  "data": {
    "sessionToken": "session_id",
    "result": "VERIFIED",
    "timestamp": "2024-01-15T10:30:00Z",
    "customer": {
      "address": { "fullAddress": "123 Main St, City" },
      "documentNumber": "ID123456",
      "dateOfBirth": "1990-01-01",
      "dateOfExpiry": "2030-01-01",
      "fullName": "John Doe",
      "placeOfBirth": "City, Country",
      "selfie": "base64_encoded_image"
    }
  }
}`}
              </pre>
            </div>
            <p className="text-verify-mediumGray">
              Your webhook endpoint must return <code>HTTP 204 No Content</code> to confirm data receipt.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Error Handling</h3>
            <p className="text-verify-mediumGray mb-4">
              All errors are returned as HTTP status codes and handled by RIVaaS App. Every error includes a unique "tracing ID" for debugging purposes. If you encounter issues, contact Innovatrics support with the tracing ID.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Security Notes</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-verify-mediumGray">
              <li>JWT tokens are valid for one week - store securely and refresh when needed</li>
              <li>Never store Auth0 client secret in frontend applications</li>
              <li>All authentication calls must be made from your backend</li>
              <li>Webhook endpoints should validate the source and respond with HTTP 204</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Support</h3>
            <p className="text-verify-mediumGray">
              For technical support and integration questions, contact Innovatrics support team with any tracing IDs from error messages for faster resolution.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationManualTab;