import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const IntegrationManualTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Getting Started with API Integration</CardTitle>
          <CardDescription>
            Learn how to integrate our verification services into your application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Authentication</h3>
            <p className="text-verify-mediumGray mb-4">
              All API requests require authentication using your API key. Include your API key in the request headers:
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <code className="text-sm">
                Authorization: Bearer YOUR_API_KEY
              </code>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Base URL</h3>
            <p className="text-verify-mediumGray mb-4">
              All API requests should be made to the following base URL:
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <code className="text-sm">
                https://api.verification-service.com/v1/
              </code>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Common Endpoints</h3>
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    POST
                  </Badge>
                  <code className="text-sm">/verify/identity</code>
                </div>
                <p className="text-sm text-verify-mediumGray">
                  Submit identity verification request with document images
                </p>
              </div>

              <div className="border rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    GET
                  </Badge>
                  <code className="text-sm">/verify/status/&#123;id&#125;</code>
                </div>
                <p className="text-sm text-verify-mediumGray">
                  Check the status of a verification request
                </p>
              </div>

              <div className="border rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    GET
                  </Badge>
                  <code className="text-sm">/verify/results/&#123;id&#125;</code>
                </div>
                <p className="text-sm text-verify-mediumGray">
                  Retrieve verification results and extracted data
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Example Request</h3>
            <p className="text-verify-mediumGray mb-4">
              Here's an example of how to submit a verification request:
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <pre className="text-sm overflow-x-auto">
{`curl -X POST https://api.verification-service.com/v1/verify/identity \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "front_image=@document_front.jpg" \\
  -F "back_image=@document_back.jpg" \\
  -F "selfie_image=@selfie.jpg"`}
              </pre>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Webhooks</h3>
            <p className="text-verify-mediumGray mb-4">
              Configure webhooks to receive real-time notifications when verification status changes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-verify-mediumGray">
              <li>Verification completed successfully</li>
              <li>Verification failed or rejected</li>
              <li>Additional documents required</li>
              <li>AML check results available</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Rate Limits</h3>
            <p className="text-verify-mediumGray mb-4">
              API requests are limited to ensure service reliability:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-verify-mediumGray">
              <li>100 requests per minute per API key</li>
              <li>1000 requests per hour per API key</li>
              <li>Rate limit headers are included in all responses</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Support</h3>
            <p className="text-verify-mediumGray">
              For technical support and questions about integration, please contact our development team at{" "}
              <a href="mailto:api-support@verification-service.com" className="text-verify-purple hover:underline">
                api-support@verification-service.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationManualTab;