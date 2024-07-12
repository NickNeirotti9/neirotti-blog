import React from "react";
import "../assets/disclaimer.css";

const Disclaimer: React.FC = () => {
  return (
    <div className="disclaimer-outer">
      <div className="disclaimer-container">
        <h2 className="disclaimer-title">Disclaimer</h2>
        <p className="disclaimer-text">
          The information provided by existnchill (“we,” “us” or “our”) on
          existnchill.com (the “Site”) is for general informational purposes
          only. All information on the Site is provided in good faith, however,
          we make no representation or warranty of any kind, express or implied,
          regarding the accuracy, adequacy, validity, reliability, availability
          or completeness of any information on the Site.
        </p>
        <p className="disclaimer-text">
          UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS
          OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR
          RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE
          AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN
          RISK.
        </p>
        <p className="disclaimer-text">
          The Site may contain (or you may be sent through the Site) links to
          other websites or content belonging to or originating from third
          parties or links to websites and features in banners or other
          advertising. Such external links are not investigated, monitored, or
          checked for accuracy, adequacy, validity, reliability, availability or
          completeness by us.
        </p>
        <p className="disclaimer-text">
          WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR
          THE ACCURACY OR RELIABILITY OF ANY INFORMATION OFFERED BY THIRD-PARTY
          WEBSITES LINKED THROUGH THE SITE OR ANY WEBSITE OR FEATURE LINKED IN
          ANY BANNER OR OTHER ADVERTISING. WE WILL NOT BE A PARTY TO OR IN ANY
          WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND
          THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
