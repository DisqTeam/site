import React from 'react'
import PropTypes from 'prop-types';
import NextHead from 'next/head';
import { useRouter } from 'next/router';

export default function Head(props) {
    const router = useRouter()
    return (
        <NextHead>
            <title>{props.title}</title>

            <meta name="twitter:card" content="summary" key="twcard" />
            <meta name="twitter:creator" content="etstringy" key="twhandle" />

            <meta property="og:url" content={"https://disq.me" + router.pathname} key="ogurl" />
            <meta property="og:image" content={props.image} key="ogimage" />
            <meta property="og:site_name" content="Disq" key="ogsitename" />
            <meta property="og:title" content={`${props.title}`} key="ogtitle" />
            <meta property="og:description" content={props.description} key="ogdesc" />
        </NextHead>
    )
}

Head.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
};