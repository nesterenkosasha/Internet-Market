import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

const LinkComponent = ({
    href,
    text
}) => {
    return(
        <Link to={href}>
           {text}
        </Link>
    )
}

LinkComponent.propTypes = {
    href: PropTypes.string,
    text: PropTypes.string
}

export default LinkComponent