import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe('pk_test_51L2D82LhRgElSijpUTeIGkx7iLVhdTeEHo90XM33soK7KDAQStJaR5tVGm5tU9krGaTxBhskhDK2kqsb1OUorRJS00jNptqNcP');

export default function Payment(props) {
    const clientSecret = props.clientSercet
    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <>
            <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </>
    );
}