
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { X, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PrivacyPolicyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PrivacyPolicyDialog({ open, onOpenChange }: PrivacyPolicyDialogProps) {
  const renderHyperlinks = (text: string) => {
    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)|(?:www\.[^\s]+\.[^\s]+)/g;
    
    // Split the text by URLs and map each part
    const parts = text.split(urlRegex);
    
    // Find all URLs in the text
    const urls = text.match(urlRegex) || [];
    
    // Combine parts and URLs
    const result = [];
    parts.forEach((part, index) => {
      result.push(part);
      if (urls[index]) {
        let url = urls[index];
        // Add http:// prefix if it doesn't exist and the URL starts with www
        if (url.startsWith('www.') && !url.startsWith('http')) {
          url = 'http://' + url;
        }
        
        result.push(
          <a 
            key={`link-${index}`}
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline inline-flex items-center"
          >
            {urls[index]}
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        );
      }
    });
    
    return result;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] p-0 overflow-hidden bg-white">
        <div className="p-6 border-b">
          <DialogTitle className="text-xl font-bold text-[#0D1941] uppercase">
            PERSONAL DATA PROTECTION POLICY
          </DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <ScrollArea className="h-full px-6 py-4">
          <div className="space-y-4 text-gray-800">
            <p>Protection of your personal data is essential for Innovatrics, s.r.o.</p>
            
            <p>With regard to the adoption of the Regulation of the European Parliament and of the Council (EU) 2016/679 of 27 April 2016 on the protection of natural persons in the processing of personal data and on the free movement of such data, repealing Directive 95/46/EC ("GDPR"), Innovatrics adopts this personal data protection policy.</p>
            
            <p>In this document you will learn:</p>
            
            <ol className="list-decimal pl-8 space-y-2">
              <li>Where to contact us for your personal data protection questions</li>
              <li>How we process personal data when you:
                <ul className="list-disc pl-8 space-y-1 pt-2">
                  <li>visit our website;</li>
                  <li>visit our Innovatrics fan pages on Facebook, Twitter, LinkedIn and YouTube;</li>
                  <li>communicate with us, for example, through a contact form, chat, or electronically;</li>
                  <li>subscribe to our newsletter;</li>
                  <li>download or watch materials on our website {renderHyperlinks("www.innovatrics.com")};</li>
                  <li>use the support services provided through our website {renderHyperlinks("www.innovatrics.com")}.</li>
                </ul>
              </li>
              <li>
                What your rights are as a data subject Our website and its sub-domains may contain links to third-party websites. These third party websites have their own personal data protection policies and we do not assume any responsibility for these policies. Before submitting any personal data to such third-party websites please make sure that you are thoroughly informed about their policies.
              </li>
            </ol>
            
            <h3 className="text-lg font-bold pt-2">1. THE CONTROLLER AND ITS CONTACT INFORMATION</h3>
            <p>
              The Controller is Innovatrics, s.r.o., with its registered seat at: Pri vinohradoch 82, 831 06 Bratislava, Slovak Republic, ID No.: 36 280 712, registered in the Commercial Register of District Court Bratislava I, Section Sro, File No. 39481/B. If you want to communicate with us about personal data protection issues, please use the following contacts:
            </p>
            
            <ul className="list-disc pl-8 space-y-1">
              <li>E-mail: gdpr@innovatrics.com</li>
              <li>Mail – contact address: Innovatrics, s.r.o., Jarošova 1, 831 03 Bratislava, Slovak Republic.</li>
            </ul>
            
            <h3 className="text-lg font-bold pt-2">2. HOW WE PROCESS PERSONAL DATA</h3>
            <p className="font-medium">1) Visitors to our website</p>
            
            <p>
              We do not process any personal data about visitors to our website {renderHyperlinks("www.innovatrics.com")} that would enable us to individually identify a visitor to our website.
            </p>
            
            <p>
              Our website uses cookies – for more information about cookies please click on our Cookie Policy.
            </p>
            
            <p>
              We may incorporate features of third-party websites, which are mainly social networks (Facebook, LinkedIn, Twitter, YouTube), into our website. These functions sometimes include scripts or other elements that can read and sometimes place cookies from these social networks on the user's device. As an operator of the website {renderHyperlinks("www.innovatrics.com")} we have no access to these cookies and to the data they collect or control. In our Cookie Policy, we inform users about the conditions of how these Cookies are processed by these third parties.
            </p>
            
            <p className="font-medium">2) Visitors to our Innovatrics fan pages on Facebook, Twitter, LinkedIn and YouTube</p>
            
            <p>
              Innovatrics uses fan pages on Facebook ({renderHyperlinks("https://www.facebook.com/innovatrics/")}), Twitter({renderHyperlinks("https://twitter.com/innovatrics")}), LinkedIn ({renderHyperlinks("https://www.linkedin.com/company/innovatrics/")}) or YouTube ({renderHyperlinks("https://www.youtube.com/c/Innovatrics-Your_Biometric_Partner/videos")}) – hereinafter referred to as "Social Networks".
            </p>
            
            <p>
              These sites are used to increase brand awareness, to present Innovatrics, its services, products, visions, success stories and news. From time to time, we may inform of vacancies in Innovatrics. It is our legitimate interest to operate Innovatrics Social Networks pages, while we need to communicate with customers and the public on the social networks.
            </p>
            
            <p>
              If you visit our pages on Social Networks, we may receive an overview of traffic statistics via cookies placed by the third party (network operator). We may also receive personal data (depending on the user's profile settings and privacy settings on each social network) when visitors communicate with us on our fan pages, "Like" us, put comment, share or otherwise respond to our activities or posts. We assume that the users provided us with this personal information voluntarily. We shall process the personal data for the purposes of presenting our company, news, products and services to public, which we consider as our legitimate interest (Art. 6 par.1 letter f) of the GDPR). The personal data are processed for ten years.
            </p>
            
            <p>
              Please note that if you click on the button of the Social Network placed on our website, you will be redirected to the website which is operated by third parties (e.g. Facebook, LinkedIn, Twitter, Youtube), and which have their own personal data protection policies for which we assume no responsibility. The operators of social networks may place cookies on the computer or any other device of the person who visited our fan page, some of them do so regardless of whether the person has the social network account or not. Innovatrics and the social network are jointly responsible for the processing of personal data of the users of our fan page. However, in our case, Cookies of the social networks are used and managed exclusively by the social network operators. In other words, the social networksprocess personal data also for their own purposes and may even transfer the data to countries which do not provide sufficient level of protection of personal data (e.g. USA). You can find more information about Cookies Policy and Personal Data Protection Policies here:
            </p>
            
            <ul className="list-disc pl-8 space-y-1">
              <li>Facebook (Facebook Inc., 1601 South California Avenue, Palo Alto, CA 94304, USA): {renderHyperlinks("https://www.facebook.com/about/privacy/")} {renderHyperlinks("https://www.facebook.com/policies/cookies/")}</li>
              <li>LinkedIn (LinkedIn Corporation, Sunnyvale, USA): {renderHyperlinks("https://www.linkedin.com/legal/privacy-policy")} {renderHyperlinks("https://www.linkedin.com/legal/cookie-policy")}</li>
              <li>Google+ (Google Inc., Mountain View, California, USA): {renderHyperlinks("https://policies.google.com/privacy")} {renderHyperlinks("https://policies.google.com/technologies/cookies")}</li>
              <li>Twitter (Twitter Inc., 1355 Market Street, Suite 900, San Francisco, CA 94103 USA): {renderHyperlinks("https://twitter.com/en/privacy")} {renderHyperlinks("https://help.twitter.com/en/rules-and-policies/twitter-cookies")}</li>
            </ul>
            
            <p>For more information, please refer also to our Cookie Policy.</p>
            
            <p className="font-medium">3) Communication using, for example, a web form, chat, e-mail or other means.</p>
            
            <p>
              If you communicate with us through our website (e.g. by using chat or a contact form, or by sending an email), Innovatrics, s.r.o. receives your personal data you provide in such communication (in particular, e-mail, name, surname, employer, job position, etc.). We assume that you provide such personal data voluntarily, at your own discretion, and that the data you provide is correct and up-to-date. Handling of your correspondence is our legitimate interest (Art. 6 par.1 letter f) of the GDPR), and we base our right to process your personal data on this legal basis.
            </p>
            
            <p>
              We also assume that by sending such correspondence you are expecting and agreeing that we may subsequently contact you by e-mail, phone or by an electronic message with the aim of dealing with your correspondence or request. Your personal data obtained in this manner are processed only for the duration of the purpose of their processing, for a maximum of 12 months after the last communication has ended.
            </p>
            
            <p>
              Passive access to your personal data may be available to intermediaries with whom the Controller cooperates when providing the services and which include, in particular, the web hosting providers (servers in Germany) and the web site administrator. For e-mail communication we use services of The Rocket Science Group LLC d/b/a Mailchimp ("Mailchimp") with its seat in the Atlanta, USA. On July 16, 2020, CJEU invalidated the EU-US Privacy Shield. However, Mailchimp guarantees that it will continue to protect EEA data and contractually commits to transfer and process all of its users' EU and UK data in compliance with the Standard Contractual Clauses, which automatically apply in accordance with Mailchimp's Data Processing Addendum ({renderHyperlinks("https://mailchimp.com/help/mailchimp-european-data-transfers/")}).
            </p>
            
            <p className="font-medium">4) Newsletter</p>
            
            <p>
              On our web site, we offer an opportunity to subscribe to a newsletter where we provide information about our news, offers, information about our company or other business information about our products and services.
            </p>
            
            <p>
              If you subscribe to our newsletter, Innovatrics s.r.o. will receive the e-mail address you provide in the subscription request. If you subscribe to our newsletter along with your demand or question related to our specific product, we may send you newsletters related to this product (we may use categorization and segmentation for this purposes). We do not intend to send you information you might not be interested in or which you might not need.
            </p>
            
            <p>
              Subscribing to the newsletter is not your legal obligation and is completely voluntary. We will assume that the data you provide when subscribing is correct and up-to-date. The legal basis for processing is your consent, which you confirm by checking the box and subsequently confirm it by clicking on the link in the e-mail that will be sent to you immediately after you subscribe. The purpose of processing is our direct marketing – i.e. sending of business information as described above. By subscribing to the newsletter, you also agree that Innovatrics, s.r.o. will send the newsletter to you by e-mail.
            </p>
            
            <p>
              We process your personal data only for the duration of the purpose of processing, for a maximum of five years. You can withdraw your consent at any time by writing to the address: Innovatrics, s.r.o., Pri vinohradoch 82, 831 06 Bratislava, Slovak Republic, or by e-mail to: marketing@innovatrics.com. Withdrawal of your consent shall not affect the lawfulness of processing based on consent before its withdrawal.
            </p>
            
            <p>
              We point out in particular that according to Article 21 of the GDPR you have the right to object at any time to the processing of your personal data for the purposes of direct marketing. You can send the objection in writing to our address provided above. Unsubscribing from the newsletter will be available to you in each newsletter received. Access to your personal data may be available to intermediaries with whom the Controller cooperates when providing the services and which include, in particular, the web hosting provider (servers in Germany), the e-mail platform provider (Mailchimp – please see above in 3)), and the web site administrator.
            </p>
            
            <p className="font-medium">5) Downloading or watching materials on our website ("content")</p>
            
            <p>
              We are regularly spending a significant amount of our resources for creating specialized content for our customers and prospective customers. Such content presents unique solutions, contains our know-how and instructions on how our biometric software works.
            </p>
            
            <p>
              In order to access or view such content free of charge, we may request your personal information – name, company name and e-mail. We process the personal information based on Art. 6 par. 1 letter b) of the GDPR (to comply with your request to view/download the content placed on our website). Please note that the content is protected by copyrights as per the Terms of Use and by viewing or downloading the content you do not receive any ownership rights or copyrights to the content; you are only granted with the limited non-exclusive licence – a right to view/ download the content (as applicable) for your personal needs only, for non-commercial purposes, while complying with all conditions and limitations arising from copyright and other generally binding legal regulations (in particular you are not allowed to copy, record, transmit, transfer, distribute, translate, make public, sell, rent, modify, adapt, imitate, sublicense or use the content for purposes others than receiving information from them for your own needs).
            </p>
            
            <p>
              Passive access to your personal information may be available to intermediaries with whom the Controller cooperates when providing the services and which include, in particular, the web hosting providers (servers in Germany) and the web site administrator. Your personal data are processed only for the duration of the purpose of their processing, for a maximum of 4 years after the download/view of the content.
            </p>
            
            <p className="font-medium">6) Use of support services provided through www.innovatrics.com.</p>
            
            <p>
              Existing clients may be granted an access to our support section of {renderHyperlinks("www.innovatrics.com")}, where we provide specific information and technical assistance to our clients. In order to access the support section, the client will be provided with login and password information, which should be used by a person/persons who will be entitled to request/access our services on behalf of the client. The personal data processed are name, surname, company name, job title, phone and e-mail contact, profile photo (if provided), user role, password and login data. These personal data shall be processed by us only in order to provide the support service, on your request/on the request of the authorized person. The legal basis for processing is Art. 6 par. 1 letter b) of the GDPR (contract) or Art. 6 par. 1 letter f) of the GDPR (it is our legitimate interest to process personal data of employees of our customers who may request/use our services on behalf of our customer). Access to personal information may be available to intermediaries with whom the Controller cooperates when providing the services and which include, in particular, the web hosting providers (servers in Germany) and the web site administrator. Personal data are processed only for the duration of the purpose of their processing, i.e. for as long as the need for the support exists.
            </p>
            
            <h3 className="text-lg font-bold pt-2">3. YOUR RIGHTS</h3>
            <p>Please note that Innovatrics does not perform any automated individual decision making nor profiling.</p>
            
            <p>As a data subject under the GDPR, you have the right</p>
            
            <ul className="list-disc pl-8 space-y-1">
              <li>based on a written (including electronic) request to access your personal data (in particular, to require confirmation of whether or not the data is being processed, the category of data being processed, the purpose of the processing, the source of the data, and the duration of retention);</li>
              <li>to repair the incorrect or supplement the incomplete data;</li>
              <li>to restrict the processing of data under Art. 18 of the GDPR (e.g., if the data is incorrect or processed illegally);</li>
              <li>to obtain personal data related to you and which you have provided to the Controller in a structured, commonly used and machine readable format, and the right to transfer such data to another controller under the conditions specified in Art. 20 of the GDPR;</li>
              <li>to object in the cases referred to in Art. 21 of the GDPR;</li>
              <li>to the erasure of data the purpose of the processing of which has ended or in the cases listed in Art. 17 of the GDPR.</li>
            </ul>
            
            <p>
              If you believe that your rights are being violated in the processing of personal data or that there is a violation of the Personal Data Protection Act or the GDPR, you may file a motion to initiate personal data protection proceedings at the Office for Personal Data Protection of the Slovak Republic, Hraničná 12, 820 07 Bratislava 27, Slovak Republic; {renderHyperlinks("www.dataprotection.gov.sk")}.
            </p>
            
            <p>This Privacy Policy is governed by the laws of the Slovak Republic.</p>
            
            <p>
              We may change or modify this PERSONAL DATA PROTECTION POLICY at any time, in particular with regard to legislative changes in the area of personal data protection which may be adopted in the future. If we do so, we will inform you accordingly.
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
