import React from 'react';
import packageJson from './../../../../package.json';
import styles from './Footer.module.scss';

function Footer() {


    return (
        <div className={styles.Footer}>
            {packageJson.version}
        </div>
    )
}

export default Footer;