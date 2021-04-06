import React from 'react';

export default function PlusPerk(props) {
    const [background, setBG] = React.useState("");
    const gradients = [
        `linear-gradient(to right top, rgb(212, 6, 249), rgb(249, 212, 6))`,
        `linear-gradient(90deg, rgba(104,18,202,1) 0%, rgba(187,43,230,1) 100%)`,
        `linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)`,
        `linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)`
    ]

    React.useEffect(() => {
        if(props.img){
            setBG(`url(${props.img})`)
        } else {
            setBG(gradients[props.gradient])
        }
    })

    return (
        <div className="plus-perk" style={{backgroundImage: background}}>
            <h1>
                {props.title}
                {/* bodge */}
            </h1>
            <p>
                {props.description}
                {/* bodg nerghjnsdrfhrjfnskhol */}
            </p>
        </div>
    )
}
