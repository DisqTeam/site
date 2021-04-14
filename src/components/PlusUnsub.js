import React from 'react'
import config from '../config.json';
import PlusPerk from './PlusPerk';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(config.stripePublic);

export default function PlusUnsub() {
    return (
        <div>
            <p>Support Disq and help us improve with a Disq+ subscription.</p>

            <h2>Okay, What do I get?</h2>
            <div className="plus_perks_container">
                <PlusPerk title="Custom Short URLs" description="Create up to 3 vanity short urls - Yes, you can even claim disq.me/s/piss" gradient={0}/>
                <PlusPerk title="Higher upload limit" description="Extra allowance to upload files (30mb -> 70mb)" gradient={1}/>
            </div>
            <div className="plus_perks_container">
                <PlusPerk title="Profile badge" description="A cool profile badge in the dashboard to show how epic you are" gradient={2}/>
                <PlusPerk title="I love you" description="By getting Disq+, you're helping us (a small team!) run this service for free." gradient={3}/>
            </div>

            <h2>What do you spend the money on?</h2>
            <div className="plus_perks_container">
                <PlusPerk 
                    img="/assets/misc/better_servers.jpg"
                    title="Better servers" 
                    description="We'll sometimes upgrade our servers, adding more RAM/CPU and speeding up for everyone"
                />
                <PlusPerk
                    img="/assets/misc/more_storage.jpg"
                    title="More storage" 
                    description="We'll mainly buy more storage space with the money, so we can store everyone's files without the paranoia of running out of storage some day."
                />
            </div>

            <h2>Convinced?</h2>
            <div className="plus_stripe">
                <PayPalScriptProvider options={{ "client-id": config.paypalClient }}>
                    <PayPalButtons style={{ layout: "horizontal" }} />
                </PayPalScriptProvider>
                <button className="btn_porp btn" onClick={
                    async () => {
                        const stripe = await stripePromise
                        let res = await fetch(`${config.endpoint}/subscription/session`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "token": localStorage.token
                            }
                        })
                        let st = await res.json()

                        await stripe.redirectToCheckout({
                            sessionId: st.sess
                        })
                    }
                }>
                    Subscribe (£3.99 / month)
                </button>
                {/* <img className="plus_stripe_badge" src="/assets/stripe.svg" width="120vw"></img> */}
            </div>
        </div>
    )
}
