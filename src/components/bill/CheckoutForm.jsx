import {
    PaymentElement, useElements, useStripe
} from "@stripe/react-stripe-js";
import { Button, Checkbox, Form } from "antd";
import React from "react";

export default function CheckoutForm(props) {
    const stripe = useStripe();
    const elements = useElements();
    const confirmCode = props.confirmCode;
    const [message, setMessage] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {

            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);
        // instance.put('/payments/confirm', { GEDFDGlD: 'MKDADNJK' })

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:3000",
            },
        })
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    return (
        <form style={{ border: '1px solid #D1D1D1', borderRadius: '10px' }} id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <Form.Item style={{ border: '1px solid #D1D1D1', borderRadius: '10px', background: '#F9F9F9', marginTop: '10px' }}>
                <Checkbox style={{ paddingLeft: '10px' }}>I agree with sending an Marketing and newsletter emails. No spam, promised!</Checkbox>
            </Form.Item>
            <Form.Item style={{ border: '1px solid #D1D1D1', borderRadius: '10px', background: '#F9F9F9', marginTop: '10px' }}>
                <Checkbox style={{ paddingLeft: '10px' }}>I agree with our <u>terms and conditions</u>  and <u>privacy policy.</u></Checkbox>
            </Form.Item>

            <Button type='submit' htmlType="submit" loading={isLoading} style={{ width: '218px', height: '56px', background: '#6A983C', border: '2px solid #46760A', borderRadius: '12px' }} id="submit">
                <label style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '15px' }}>     {"Pay now"}</label>
            </Button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}