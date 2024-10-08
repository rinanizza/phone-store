import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default class MyApp extends React.Component {
  render() {
    console.log("PayPal Sandbox Client ID:", process.env.REACT_APP_PAYPAL_CLIENT_ID);

    const onSuccess = (details) => {
      // Successful payment handling
      console.log("The payment was succeeded!", details);
      this.props.clearCart();
      this.props.history.push("/");
    };

    const onCancel = (data) => {
      // User pressed "cancel" or closed PayPal's popup
      console.log("The payment was cancelled!", data);
    };

    const onError = (err) => {
      // Error handling
      console.log("Error!", err);
    };

    // Adjust button style
    const buttonStyle = {
      layout: 'vertical', // Keep the layout vertical for stacking buttons
      color: 'gold',      // Keep the PayPal button color as gold
      shape: 'rect',      // Rectangle shape for consistency
      label: 'paypal',    // Label to show the PayPal logo
      height: 40,         // Set height to 40px (adjust this as needed)
    };

    return (
      <div style={{ width: '200px', marginLeft: '0'}}> {/* Wrap in a div to control width */}
        <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
          <PayPalButtons
            style={buttonStyle}  // Apply the custom button style
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: this.props.total, // Use the total passed via props
                  },
                }],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(details => {
                onSuccess(details);
              });
            }}
            onError={onError}
            onCancel={onCancel}
          />
        </PayPalScriptProvider>
      </div>
    );
  }
}


/*import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

export default class MyApp extends React.Component {
  render() {
    console.log("PayPal Sandbox Client ID:", process.env.REACT_APP_PAYPAL_CLIENT_ID);

    const onSuccess = (payment) => {
      // Congratulation, it came here means everything's fine!
      console.log("The payment was succeeded!", payment);
      this.props.clearCart();
      this.props.history.push("/");
      // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
    };

    const onCancel = (data) => {
      // User pressed "cancel" or close Paypal's popup!
      console.log("The payment was cancelled!", data);
      // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    };

    const onError = (err) => {
      // The main Paypal's script cannot be loaded or somethings block the loading of that script!
      console.log("Error!", err);
      // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
      // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    };

    let env = "sandbox"; // you can set here to 'production' for production
    let currency = "USD"; // or you can set this value from your props or state
    //let total = 1;
    // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
    // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

    const client = {
      sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID,
      production: "YOUR-PRODUCTION-APP-ID"
    };
    // In order to get production's app-ID, you will have to send your app to Paypal for approval first
    // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
    //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
    // For production app-ID:
    //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

    // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
    return (
      <PaypalExpressBtn
        env={env}
        client={client}
        currency={currency}
        total={this.props.total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    );
  }
}

*/
