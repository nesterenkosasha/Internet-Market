import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'

const LinkComponent = ({
    href,
    text
}) => {
    return(
        <span>
        <Link to={href}>{text}</Link>
        </span>
    )
}

LinkComponent.propTypes = {
    href: PropTypes.string,
    text: PropTypes.string
}

export default LinkComponent