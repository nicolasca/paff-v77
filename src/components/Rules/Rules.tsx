import React, { FunctionComponent, useEffect, useState } from 'react';
import { config } from '../../config';
import styles from './Rules.module.scss';


const Rules: FunctionComponent = () => {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    fetch(config.directus + '/paff/items/page?filter[title][like]=Règles')
      .then(response => response.json())
      .then((rules) => {
        setContent(rules.data[0].content);
      });
  }, []);

  return (
    <div className={styles.Container}>
  
      {content ?

        <div className="edito"
          dangerouslySetInnerHTML={{ __html: content }} />
        : null
      }
    </div>
  );
}

export default Rules;