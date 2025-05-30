
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { FileText, Send, ExternalLink } from "lucide-react";

export const ApiContactForm = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    message: ""
  });
  
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!privacyAccepted) {
      toast({
        title: "Privacy Policy Required",
        description: "Please accept the privacy policy to continue.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.message) {
      toast({
        title: "Message Required",
        description: "Please enter your message.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message Sent Successfully",
        description: "We'll contact you within 24 hours regarding your API integration needs.",
      });
      
      // Reset form
      setFormData({
        message: ""
      });
      setPrivacyAccepted(false);
    } catch {
      toast({
        title: "Submission Failed",
        description: "Unable to send your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenDocumentation = () => {
    window.open("https://www.innovatrics.com/wp-content/uploads/2025/02/Innovatrics-IDV-Service_Integration-Manual.pdf", '_blank');
    toast({
      title: "Documentation opened",
      description: "API integration manual opened in a new tab.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Integration Manual Link */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={handleOpenDocumentation}
          className="border-blue-400 text-blue-600 hover:bg-blue-50"
        >
          <FileText className="mr-2 h-4 w-4" />
          View Integration Manual
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Contact Form */}
      <Card className="bg-white border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-gray-900">
            Need API Integration? Get in touch with us
          </CardTitle>
          <p className="text-gray-700 mt-2">
            Drop us a line, we will contact you within 24 hours
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-900">
                Your Message *
              </Label>
              <Textarea
                id="message"
                placeholder="What's on your mind?"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-gray-500 min-h-[120px]"
                required
              />
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="privacy"
                checked={privacyAccepted}
                onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                className="mt-1 border-gray-400 data-[state=checked]:bg-gray-600 data-[state=checked]:text-white"
              />
              <Label htmlFor="privacy" className="text-gray-800 text-sm leading-relaxed">
                I agree to receive occasional emails with marketing communication under the Privacy Policy, 
                and I confirm that I'm at least 16 years old. This consent is voluntary, and I can revoke it 
                at any time. I can object to direct marketing, including profiling.
              </Label>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-600 text-white hover:bg-gray-700 font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Send className="mr-2 h-4 w-4 animate-pulse" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
